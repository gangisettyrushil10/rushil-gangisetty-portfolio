#!/usr/bin/env node

/**
 * Capture a repeatable 20–40 second portfolio walkthrough from a running build.
 *
 * Usage:
 *   npm run build && npm start
 *   node scripts/capture-portfolio-walkthrough.mjs
 *   PORTFOLIO_URL=https://example.com node scripts/capture-portfolio-walkthrough.mjs
 *
 * The script uses the Playwright dependency already installed in ../Fuzzy and
 * the system Chrome binary. It records JPEG frames, then calls the shared
 * AVFoundation encoder to create a network-ready H.264 MP4.
 */

import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from '@playwright/test'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const portfolioRoot = path.resolve(scriptDir, '..')
const baseUrl = process.env.PORTFOLIO_URL ?? 'http://127.0.0.1:3000'
const chromePath = process.env.CHROME_EXECUTABLE ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const fps = 8
const timestamp = new Date().toISOString().replaceAll(':', '-').replaceAll('.', '-')
const runDir = path.join(portfolioRoot, 'artifacts/portfolio-review/walkthrough', timestamp)
const framesDir = path.join(runDir, 'frames')
const outputPath = path.join(portfolioRoot, 'artifacts/portfolio-review/walkthrough/portfolio-walkthrough.mp4')
const encoderPath = path.join(scriptDir, 'frames-to-video.swift')

if (!fs.existsSync(chromePath)) throw new Error(`Chrome executable not found: ${chromePath}`)
fs.mkdirSync(framesDir, { recursive: true })

let frameNumber = 0
const framePath = () => path.join(framesDir, `frame-${String(frameNumber++).padStart(4, '0')}.jpg`)

const browser = await chromium.launch({ executablePath: chromePath, headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })
const consoleErrors = []
page.on('console', (message) => {
  if (message.type() === 'error') consoleErrors.push(message.text())
})
page.on('pageerror', (error) => consoleErrors.push(error.message))

async function frame() {
  await page.screenshot({ path: framePath(), type: 'jpeg', quality: 82 })
}

async function hold(seconds) {
  const count = Math.round(seconds * fps)
  for (let index = 0; index < count; index += 1) await frame()
}

async function glideTo(selector, seconds) {
  const destination = await page.locator(selector).evaluate((element) => {
    const top = element.getBoundingClientRect().top + window.scrollY
    return Math.max(0, top - 92)
  })
  const start = await page.evaluate(() => window.scrollY)
  const count = Math.max(1, Math.round(seconds * fps))

  for (let index = 1; index <= count; index += 1) {
    const linear = index / count
    const eased = linear < 0.5 ? 2 * linear * linear : 1 - Math.pow(-2 * linear + 2, 2) / 2
    await page.evaluate((nextY) => window.scrollTo(0, nextY), start + (destination - start) * eased)
    await page.waitForTimeout(18)
    await frame()
  }
}

try {
  await page.goto(baseUrl, { waitUntil: 'networkidle', timeout: 45_000 })
  await page.evaluate(() => document.fonts.ready)
  await hold(2.5)
  await page.getByRole('button', { name: /Petrova line mode/i }).first().click()
  await hold(2.5)

  await glideTo('#work', 3.5)
  await hold(2)
  await glideTo('.project-chapter-buzzr', 3)
  await hold(1.5)
  await glideTo('#systems', 3)
  await hold(2)
  await glideTo('#about', 3)
  await hold(1.5)
  await glideTo('.off-duty-section', 3)
  await page.getByRole('button', { name: 'Open the court', exact: true }).click()
  await page.waitForTimeout(350)
  await hold(2)
  await glideTo('#contact', 2.5)
  await hold(2)

  const metadata = {
    capturedAt: new Date().toISOString(),
    baseUrl,
    viewport: { width: 1440, height: 900 },
    fps,
    frameCount: frameNumber,
    seconds: frameNumber / fps,
    consoleErrors,
  }
  fs.writeFileSync(path.join(runDir, 'capture.json'), `${JSON.stringify(metadata, null, 2)}\n`)
} finally {
  await browser.close()
}

const encoded = spawnSync('/usr/bin/swift', [encoderPath, '--input', framesDir, '--output', outputPath, '--fps', String(fps)], {
  cwd: portfolioRoot,
  encoding: 'utf8',
  stdio: 'pipe',
})

if (encoded.status !== 0) {
  throw new Error(`Walkthrough encoding failed:\n${encoded.stderr || encoded.stdout}`)
}

console.log(encoded.stdout.trim())
console.log(`Capture evidence: ${runDir}`)
if (consoleErrors.length > 0) console.warn(`Browser console errors: ${consoleErrors.length}`)
