import assert from 'node:assert/strict'
import { readFile, stat } from 'node:fs/promises'
import test from 'node:test'

const requiredMedia = [
  'public/og.png',
  'public/media/portrait-rushil.webp',
  'public/media/projects/fuzzy/cover.webp',
  'public/media/projects/fuzzy/workflow.webp',
  'public/media/projects/fuzzy/demo.mp4',
  'public/media/projects/buzzr/cover.webp',
  'public/media/projects/buzzr/workflow.webp',
  'public/media/projects/analytics/cover.webp',
  'public/media/inspiration/hail-mary-adrian.jpeg',
  'public/media/inspiration/hail-mary-red-space.jpeg',
]

test('required public media is present and non-empty', async () => {
  for (const path of requiredMedia) {
    const metadata = await stat(path)
    assert.ok(metadata.isFile(), `${path} should be a file`)
    assert.ok(metadata.size > 1_000, `${path} should contain a real asset`)
  }
})

test('known unsupported claims and dead release links stay out of project data', async () => {
  const source = await readFile('lib/data.ts', 'utf8')
  for (const forbidden of [
    '100% rollback coverage',
    '40+ integration tests',
    '50% review-time reduction',
    '100+ sample documents',
    'testflight.apple.com/join/buzzr',
  ]) {
    assert.equal(source.includes(forbidden), false, `Found forbidden stale claim: ${forbidden}`)
  }
})

test('the Fuzzy capture workflow keeps user data isolated', async () => {
  const source = await readFile('scripts/capture-fuzzy-media.mjs', 'utf8')
  assert.match(source, /mkdtempSync/)
  assert.match(source, /FUZZY_USER_DATA/)
  assert.match(source, /delete childEnv\.OPENAI_API_KEY/)
  assert.match(source, /fs\.rmSync\(resolvedTempProfile/)
})

test('observation modes use distinct live renderers with safe animation lifecycle', async () => {
  const field = await readFile('components/observatory/planetary-field.tsx', 'utf8')
  const provider = await readFile('components/observatory/observation-provider.tsx', 'utf8')
  const layout = await readFile('app/layout.tsx', 'utf8')

  assert.match(field, /drawAdrianPlanet/)
  assert.match(field, /drawPetrovaField/)
  assert.match(field, /prefers-reduced-motion: reduce/)
  assert.match(field, /visibilitychange/)
  assert.match(field, /IntersectionObserver/)
  assert.match(field, /MAX_DPR/)
  assert.match(field, /wrapCoordinate/)
  assert.match(field, /data-render-mode/)
  assert.match(provider, /applyModeToRoot\(nextMode\)/)
  assert.match(provider, /Petrova line mode/)
  assert.match(layout, /observationBootScript/)
})
