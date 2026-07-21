// @ts-check

/** @param {number} value @param {number} minimum @param {number} maximum */
export function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value))
}

/**
 * @param {number} dx
 * @param {number} dy
 * @param {number} width
 * @param {number} height
 * @returns {{ power: number, aim: number }}
 */
export function shotFromDrag(dx, dy, width, height) {
  const safeWidth = Math.max(width, 1)
  const safeHeight = Math.max(height, 1)

  return {
    power: clamp((-dy / safeHeight) * 1.75 + 0.4, 0.28, 1.12),
    aim: clamp((dx / safeWidth) * 1.8, -0.72, 0.72),
  }
}

/** @param {{ power: number, aim: number }} shot */
export function isMadeShot({ power, aim }) {
  return power >= 0.72 && power <= 0.94 && Math.abs(aim) <= 0.22
}

/**
 * @param {{ power: number, aim: number }} shot
 * @param {number} progress
 * @returns {{ x: number, y: number }}
 */
export function trajectoryPoint(shot, progress) {
  const t = clamp(progress, 0, 1)
  const start = { x: 18, y: 78 }
  const finishX = 79 + shot.aim * 18
  const finishY = isMadeShot(shot) ? 38 : 44 + Math.abs(shot.power - 0.82) * 36
  const arcHeight = 51 + shot.power * 24

  return {
    x: start.x + (finishX - start.x) * t,
    y: start.y + (finishY - start.y) * t - Math.sin(Math.PI * t) * arcHeight,
  }
}
