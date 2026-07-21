#!/usr/bin/env node

/**
 * Capture truthful Fuzzy product media for the portfolio.
 *
 * The script launches the built Electron app in its documented E2E mode,
 * forces the deterministic offline provider, and gives Electron a fresh
 * temporary user-data directory. It never opens Fuzzy's normal profile.
 *
 * Usage from the portfolio repository:
 *   node scripts/capture-fuzzy-media.mjs
 *   node scripts/capture-fuzzy-media.mjs --no-encode
 *   FUZZY_ELECTRON_EXECUTABLE=/path/to/Electron node scripts/capture-fuzzy-media.mjs
 *
 * Prerequisites:
 *   - ../Fuzzy/node_modules is installed
 *   - ../Fuzzy/out/main/index.js exists (`pnpm --dir ../Fuzzy build`)
 *   - FUZZY_ELECTRON_EXECUTABLE may point at an alternate matching runtime
 *   - macOS + /usr/bin/swift for the default MP4 encoding step
 */

import { createRequire } from 'node:module'
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url))
const PORTFOLIO_ROOT = path.resolve(SCRIPT_DIR, '..')
const FUZZY_ROOT = path.resolve(PORTFOLIO_ROOT, '../Fuzzy')
const FUZZY_ENTRY = path.join(FUZZY_ROOT, 'out/main/index.js')
const PUBLIC_DIR = path.join(PORTFOLIO_ROOT, 'public/media/projects/fuzzy')
const ARTIFACT_ROOT = path.join(PORTFOLIO_ROOT, 'artifacts/project-capture/fuzzy')
const ENCODER = path.join(SCRIPT_DIR, 'frames-to-video.swift')
const SHOULD_ENCODE = !process.argv.includes('--no-encode')
const FPS = 8
const ELECTRON_EXECUTABLE = process.env.FUZZY_ELECTRON_EXECUTABLE

if (!fs.existsSync(FUZZY_ENTRY)) {
  throw new Error(
    `Fuzzy's built Electron entry was not found at ${FUZZY_ENTRY}. Run \`pnpm --dir ../Fuzzy build\` first.`
  )
}

const fuzzyRequire = createRequire(path.join(FUZZY_ROOT, 'package.json'))
const { _electron: electron } = fuzzyRequire('@playwright/test')

const timestamp = new Date().toISOString().replaceAll(':', '-').replaceAll('.', '-')
const runDir = path.join(ARTIFACT_ROOT, timestamp)
const framesDir = path.join(runDir, 'frames')
fs.mkdirSync(PUBLIC_DIR, { recursive: true })
fs.mkdirSync(framesDir, { recursive: true })

const temporaryRoot = fs.realpathSync(os.tmpdir())
const userData = fs.mkdtempSync(path.join(temporaryRoot, 'fuzzy-portfolio-e2e-'))
const normalUserData = path.resolve(
  os.homedir(),
  'Library/Application Support/fuzzy'
)

if (path.resolve(userData) === normalUserData || !path.resolve(userData).startsWith(temporaryRoot)) {
  throw new Error(`Refusing to launch with unsafe user-data path: ${userData}`)
}

const childEnv = { ...process.env }
delete childEnv.ELECTRON_RUN_AS_NODE
delete childEnv.OPENAI_API_KEY
delete childEnv.GROQ_API_KEY
delete childEnv.ANTHROPIC_API_KEY
delete childEnv.GOOGLE_API_KEY
delete childEnv.GEMINI_API_KEY
childEnv.FUZZY_E2E = '1'
childEnv.FUZZY_USER_DATA = userData

let app
let frameNumber = 0

function framePath() {
  const name = `frame-${String(frameNumber).padStart(4, '0')}.png`
  frameNumber += 1
  return path.join(framesDir, name)
}

async function recordHold(page, milliseconds) {
  const count = Math.max(1, Math.round((milliseconds / 1000) * FPS))
  const interval = 1000 / FPS
  for (let index = 0; index < count; index += 1) {
    const started = performance.now()
    await page.screenshot({ path: framePath(), type: 'png' })
    const remaining = interval - (performance.now() - started)
    if (remaining > 0) await page.waitForTimeout(remaining)
  }
}

async function saveStill(page, artifactName, publicName) {
  const artifactPath = path.join(runDir, `${artifactName}.png`)
  const publicPath = path.join(PUBLIC_DIR, `${publicName}.webp`)
  await page.screenshot({ path: artifactPath, type: 'png' })
  // Playwright's high-level screenshot API exposes PNG/JPEG only. Chromium's
  // captureScreenshot protocol supports WebP natively, avoiding a separate
  // image dependency while preserving this exact rendered frame.
  const session = await page.context().newCDPSession(page)
  try {
    const capture = await session.send('Page.captureScreenshot', {
      format: 'webp',
      quality: 88,
      fromSurface: true,
      captureBeyondViewport: false
    })
    fs.writeFileSync(publicPath, Buffer.from(capture.data, 'base64'))
  } finally {
    await session.detach()
  }
  return { artifactPath, publicPath }
}

async function waitForSample(page) {
  const deadline = Date.now() + 30_000
  let lastState = { documents: 0, pages: 0 }
  while (Date.now() < deadline) {
    lastState = await page.evaluate(async () => {
      const docs = await window.fuzzy.documents.list()
      const pages = docs[0] ? await window.fuzzy.pages.listForDocument(docs[0].id) : []
      return { documents: docs.length, pages: pages.length }
    })
    if (lastState.documents > 0 && lastState.pages > 0) break
    await page.waitForTimeout(500)
  }
  if (lastState.documents === 0 || lastState.pages === 0) {
    throw new Error(
      `The isolated sample import did not finish (documents=${lastState.documents}, pages=${lastState.pages}).`
    )
  }

  try {
    await page.waitForFunction(
      () => {
        const pageSurface = document.querySelector('[data-page-number], [data-section-number]')
        const readerText = document.body.innerText
        return Boolean(pageSurface) && !readerText.includes('Opening PDF…')
      },
      undefined,
      { timeout: 30_000, polling: 250 }
    )
  } catch (error) {
    const diagnostics = await page.evaluate(async () => {
      const documents = await window.fuzzy.documents.list()
      const first = documents[0]
      const bytes = first ? await window.fuzzy.documents.readFile(first.id).catch(() => null) : null
      return {
        bodyText: document.body.innerText.slice(0, 3000),
        document: first ?? null,
        readableBytes: bytes?.byteLength ?? null,
        pageSurface: Boolean(document.querySelector('[data-page-number], [data-section-number]'))
      }
    })
    console.error('Fuzzy reader diagnostics:', JSON.stringify(diagnostics, null, 2))
    throw error
  }
}

async function getRealSelection(page) {
  return page.evaluate(async () => {
    const documentRecord = (await window.fuzzy.documents.list())[0]
    if (!documentRecord) throw new Error('Sample document did not appear in the isolated library.')
    const pages = await window.fuzzy.pages.listForDocument(documentRecord.id)
    const pageWithText = pages.find((item) => (item.textContent ?? '').trim().length > 0)
    if (!pageWithText) throw new Error('Sample document has no extracted page text.')

    const source = (pageWithText.textContent ?? '').replace(/\s+/g, ' ').trim()
    const intended = 'Select this sentence and click Explain.'
    const text = source.includes(intended)
      ? intended
      : source.split(/(?<=[.!?])\s+/).find((sentence) => sentence.length >= 36)?.slice(0, 180) ??
        source.slice(0, 180)

    return {
      documentId: documentRecord.id,
      pageNumber: pageWithText.pageNumber,
      text
    }
  })
}

try {
  console.log(`Launching Fuzzy with temporary user data: ${userData}`)
  app = await electron.launch({
    ...(ELECTRON_EXECUTABLE ? { executablePath: ELECTRON_EXECUTABLE } : {}),
    // Launch the package directory (whose `main` points at FUZZY_ENTRY) so
    // Electron's app path remains ../Fuzzy and bundled development resources,
    // including the documented sample PDF, resolve exactly as they do in dev.
    args: [FUZZY_ROOT],
    cwd: FUZZY_ROOT,
    env: childEnv,
    timeout: 120_000
  })

  const page = await app.firstWindow({ timeout: 60_000 })
  page.on('console', (message) => {
    if (message.type() === 'error' || message.type() === 'warning') {
      console.error(`[fuzzy:${message.type()}] ${message.text()}`)
    }
  })
  page.on('pageerror', (error) => console.error(`[fuzzy:pageerror] ${error.message}`))
  await page.waitForLoadState('domcontentloaded')
  const runtimePaths = await app.evaluate(({ app: electronApp }) => ({
    appPath: electronApp.getAppPath(),
    userData: electronApp.getPath('userData')
  }))
  console.log(`Fuzzy app path: ${runtimePaths.appPath}`)
  console.log(`Fuzzy runtime profile: ${runtimePaths.userData}`)
  if (path.resolve(runtimePaths.userData) !== path.resolve(userData)) {
    throw new Error(`Electron did not accept the isolated profile path: ${runtimePaths.userData}`)
  }

  // BrowserWindow is 1440×900 by default, but set the content size explicitly
  // so every screenshot and video frame has a stable, validated pixel size.
  await app.evaluate(({ BrowserWindow }) => {
    const window = BrowserWindow.getAllWindows()[0]
    window.setContentSize(1440, 900)
    window.center()
  })
  await page.waitForTimeout(500)
  await page.evaluate(() => document.fonts.ready)

  await page.evaluate(async () => {
    await window.fuzzy.settings.setProviderMode('mock')
  })

  const sampleButton = page.getByRole('button', { name: /try sample/i }).first()
  await sampleButton.click()
  await waitForSample(page)

  const dismissOnboarding = page.getByRole('button', { name: 'Dismiss', exact: true })
  if (await dismissOnboarding.isVisible().catch(() => false)) await dismissOnboarding.click()
  await page.waitForTimeout(900)

  const cover = await saveStill(page, 'reader-overview', 'cover')
  await recordHold(page, 900)

  await page.keyboard.press('Meta+K')
  await page.getByRole('dialog', { name: 'Command palette' }).waitFor({ state: 'visible' })
  await recordHold(page, 1250)
  await page.keyboard.press('Escape')
  await recordHold(page, 500)

  const selection = await getRealSelection(page)
  await page.evaluate((input) => {
    if (!window.__FUZZY_TEST__) throw new Error('The E2E bridge was not attached.')
    window.__FUZZY_TEST__.seedSelection(input)
  }, selection)

  const explainButton = page.getByRole('button', { name: 'Explain', exact: true })
  await explainButton.waitFor({ state: 'visible' })
  await recordHold(page, 900)
  await explainButton.click()
  await recordHold(page, 5000)

  const saveNoteButton = page.getByRole('button', { name: /save note/i })
  await saveNoteButton.waitFor({ state: 'visible', timeout: 30_000 })
  const workflow = await saveStill(page, 'tutor-explanation', 'workflow')
  await recordHold(page, 1000)

  await saveNoteButton.click()
  await recordHold(page, 1250)
  await page.getByRole('tab', { name: 'Notes', exact: true }).click()
  await recordHold(page, 1300)

  const viewport = await page.evaluate(() => ({ width: window.innerWidth, height: window.innerHeight }))
  const metadata = {
    capturedAt: new Date().toISOString(),
    sourceRepository: FUZZY_ROOT,
    sourceEntry: FUZZY_ENTRY,
    mode: 'FUZZY_E2E=1 / provider=mock / temporary user data',
    viewport,
    selection,
    fps: FPS,
    frameCount: frameNumber,
    cover,
    workflow
  }
  fs.writeFileSync(path.join(runDir, 'capture.json'), `${JSON.stringify(metadata, null, 2)}\n`)

  await app.close()
  app = undefined

  if (viewport.width !== 1440 || viewport.height !== 900) {
    throw new Error(`Expected a 1440×900 viewport; captured ${viewport.width}×${viewport.height}.`)
  }
  if (frameNumber < 40) {
    throw new Error(`Expected at least 40 interaction frames; captured ${frameNumber}.`)
  }

  const videoPath = path.join(PUBLIC_DIR, 'demo.mp4')
  if (SHOULD_ENCODE) {
    if (process.platform !== 'darwin' || !fs.existsSync('/usr/bin/swift')) {
      throw new Error('MP4 encoding requires macOS with /usr/bin/swift. Re-run with --no-encode to keep frames only.')
    }
    const result = spawnSync(
      '/usr/bin/swift',
      [ENCODER, '--input', framesDir, '--output', videoPath, '--fps', String(FPS)],
      { cwd: PORTFOLIO_ROOT, encoding: 'utf8', stdio: 'pipe' }
    )
    if (result.stdout) process.stdout.write(result.stdout)
    if (result.stderr) process.stderr.write(result.stderr)
    if (result.status !== 0) {
      throw new Error(`The Swift encoder exited with status ${result.status}.`)
    }
  }

  console.log('Fuzzy media capture complete.')
  console.log(`  cover:   ${cover.publicPath}`)
  console.log(`  workflow:${workflow.publicPath}`)
  console.log(`  frames:  ${framesDir} (${frameNumber} PNGs at ${FPS} fps)`)
  if (SHOULD_ENCODE) console.log(`  video:   ${videoPath}`)
  console.log(`  evidence:${runDir}`)
} finally {
  if (app) {
    try {
      await app.close()
    } catch {
      // The application may already have closed after a capture error.
    }
  }

  const resolvedTempProfile = path.resolve(userData)
  if (resolvedTempProfile.startsWith(temporaryRoot + path.sep)) {
    fs.rmSync(resolvedTempProfile, { recursive: true, force: true })
    console.log(`Removed temporary Fuzzy profile: ${resolvedTempProfile}`)
  }
}
