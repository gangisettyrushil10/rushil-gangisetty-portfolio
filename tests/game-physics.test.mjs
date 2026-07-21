import assert from 'node:assert/strict'
import test from 'node:test'
import { clamp, isMadeShot, shotFromDrag, trajectoryPoint } from '../lib/game-physics.js'

test('clamp keeps values inside the requested range', () => {
  assert.equal(clamp(-2, 0, 1), 0)
  assert.equal(clamp(2, 0, 1), 1)
  assert.equal(clamp(0.4, 0, 1), 0.4)
})

test('an upward centered flick creates a controlled shot', () => {
  const shot = shotFromDrag(0, -85, 600, 360)
  assert.equal(shot.aim, 0)
  assert.ok(shot.power > 0.72 && shot.power < 1.12)
})

test('only the documented power and aim window scores', () => {
  assert.equal(isMadeShot({ power: 0.82, aim: 0 }), true)
  assert.equal(isMadeShot({ power: 0.6, aim: 0 }), false)
  assert.equal(isMadeShot({ power: 0.82, aim: 0.4 }), false)
})

test('trajectory begins at the ball and reaches the scoring hoop', () => {
  const shot = { power: 0.82, aim: 0 }
  assert.deepEqual(trajectoryPoint(shot, 0), { x: 18, y: 78 })
  const end = trajectoryPoint(shot, 1)
  assert.equal(end.x, 79)
  assert.ok(Math.abs(end.y - 38) < Number.EPSILON * 64)
  assert.ok(trajectoryPoint(shot, 0.5).y < 0)
})
