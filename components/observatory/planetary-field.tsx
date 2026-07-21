'use client'

import { useEffect, useRef, type CSSProperties } from 'react'
import {
  useObservation,
  type ObservationMode,
} from '@/components/observatory/observation-provider'

type PlanetaryFieldProps = {
  className?: string
  centrifugeEngaged?: boolean
  activationSequence?: number
}

type FieldParticle = {
  x: number
  y: number
  radius: number
  alpha: number
  drift: number
  fall: number
  phase: number
  ember: boolean
}

type PointerVector = {
  x: number
  y: number
}

type AuroraLayer = {
  anchor: number
  amplitude: number
  thickness: number
  frequency: number
  slope: number
  speed: number
  phase: number
  depth: number
  color: string
  highlight: string
}

type AuroraPoint = {
  x: number
  top: number
  spine: number
  bottom: number
}

const TAU = Math.PI * 2
const MAX_DPR = 1.5
const CONSTRAINED_DPR = 1.25
const DESKTOP_FPS = 45
const CONSTRAINED_FPS = 24

const AURORA_LAYERS: AuroraLayer[] = [
  {
    anchor: -0.17,
    amplitude: 0.115,
    thickness: 0.55,
    frequency: 0.68,
    slope: 0.14,
    speed: 0.105,
    phase: 0.35,
    depth: 0.35,
    color: '45, 154, 24',
    highlight: '169, 255, 76',
  },
  {
    anchor: -0.04,
    amplitude: 0.095,
    thickness: 0.48,
    frequency: 0.83,
    slope: -0.12,
    speed: -0.13,
    phase: 2.1,
    depth: 0.5,
    color: '79, 211, 23',
    highlight: '224, 255, 105',
  },
  {
    anchor: 0.09,
    amplitude: 0.078,
    thickness: 0.41,
    frequency: 1.04,
    slope: 0.09,
    speed: 0.17,
    phase: 4.35,
    depth: 0.67,
    color: '116, 239, 29',
    highlight: '238, 255, 139',
  },
  {
    anchor: 0.24,
    amplitude: 0.066,
    thickness: 0.34,
    frequency: 1.22,
    slope: -0.075,
    speed: -0.205,
    phase: 1.25,
    depth: 0.82,
    color: '153, 255, 36',
    highlight: '250, 255, 183',
  },
  {
    anchor: 0.39,
    amplitude: 0.052,
    thickness: 0.29,
    frequency: 1.46,
    slope: 0.055,
    speed: 0.235,
    phase: 5.4,
    depth: 1,
    color: '91, 219, 22',
    highlight: '217, 255, 91',
  },
]

const fieldStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  zIndex: 0,
  display: 'block',
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
  background: '#020302',
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function wrapCoordinate(value: number, span: number) {
  return ((value % span) + span) % span
}

function seededRandom(seed: number) {
  let state = seed >>> 0

  return () => {
    state += 0x6d2b79f5
    let value = state
    value = Math.imul(value ^ (value >>> 15), value | 1)
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61)
    return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296
  }
}

function makeParticles(width: number, height: number) {
  const random = seededRandom(0xad314e + Math.round(width) * 17 + Math.round(height) * 29)
  const count = clamp(Math.round((width * height) / 9_600), 70, 150)

  return Array.from({ length: count }, (_, index): FieldParticle => {
    const ember = index % 3 !== 0

    return {
      x: random(),
      y: random(),
      radius: ember ? 0.45 + random() * 2.5 : 0.35 + random() * 1.25,
      alpha: 0.22 + random() * 0.72,
      drift: (random() - 0.5) * (ember ? 3.2 : 0.5),
      fall: ember ? 1.1 + random() * 4.2 : 0.08 + random() * 0.22,
      phase: random() * TAU,
      ember,
    }
  })
}

function fillBackground(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  mode: ObservationMode
) {
  const base = context.createLinearGradient(0, 0, 0, height)

  if (mode === 'adrian') {
    base.addColorStop(0, '#010403')
    base.addColorStop(0.5, '#020703')
    base.addColorStop(1, '#010301')
  } else {
    base.addColorStop(0, '#050102')
    base.addColorStop(0.52, '#080204')
    base.addColorStop(1, '#030101')
  }

  context.fillStyle = base
  context.fillRect(0, 0, width, height)

  const haze = context.createRadialGradient(
    width * 0.72,
    height * 0.48,
    0,
    width * 0.72,
    height * 0.48,
    Math.max(width, height) * 0.84
  )

  if (mode === 'adrian') {
    haze.addColorStop(0, 'rgba(100, 194, 22, 0.16)')
    haze.addColorStop(0.45, 'rgba(32, 104, 17, 0.08)')
  } else {
    haze.addColorStop(0, 'rgba(146, 18, 35, 0.15)')
    haze.addColorStop(0.45, 'rgba(48, 8, 22, 0.11)')
  }
  haze.addColorStop(1, 'rgba(0, 0, 0, 0)')

  context.fillStyle = haze
  context.fillRect(0, 0, width, height)
}

function drawParticles(
  context: CanvasRenderingContext2D,
  particles: FieldParticle[],
  width: number,
  height: number,
  time: number,
  mode: ObservationMode,
  pointer: PointerVector
) {
  context.save()
  context.globalCompositeOperation = 'lighter'

  particles.forEach((particle, index) => {
    if (mode === 'petrova' && particle.ember && index % 2 !== 0) return

    const warmAdrianAccent = mode === 'adrian' && particle.ember && index % 11 === 0

    const layer = 0.25 + (index % 5) * 0.13
    const margin = 18
    const x =
      wrapCoordinate(
        particle.x * width + time * particle.drift + pointer.x * layer * 5 + margin,
        width + margin * 2
      ) - margin
    const y =
      wrapCoordinate(
        particle.y * height + time * particle.fall + pointer.y * layer * 3 + margin,
        height + margin * 2
      ) - margin
    const pulse = 0.7 + Math.sin(time * 0.62 + particle.phase) * 0.3
    const alpha = particle.alpha * pulse * (mode === 'petrova' ? 0.58 : 0.82)

    context.fillStyle =
      mode === 'petrova'
        ? particle.ember
          ? `rgba(255, 47, 45, ${alpha})`
          : `rgba(255, 225, 219, ${alpha * 0.9})`
        : warmAdrianAccent
          ? `rgba(255, 112, 30, ${alpha * 0.88})`
          : particle.ember
            ? `rgba(188, 255, 77, ${alpha * 0.74})`
            : `rgba(245, 255, 224, ${alpha * 0.82})`
    context.beginPath()
    context.arc(x, y, particle.radius, 0, TAU)
    context.fill()
  })

  context.restore()
}

function makeAuroraPoints(
  width: number,
  height: number,
  time: number,
  pointer: PointerVector,
  layer: AuroraLayer,
  layerIndex: number
) {
  const sampleCount = Math.round(clamp(width / 26, 36, 64))
  const xStart = -width * 0.08
  const xSpan = width * 1.16
  const breath = 0.92 + Math.sin(time * 0.095 + layer.phase) * 0.08
  const points: AuroraPoint[] = []

  for (let sample = 0; sample < sampleCount; sample += 1) {
    const progress = sample / (sampleCount - 1)
    const x = xStart + progress * xSpan
    const normalizedX = x / Math.max(1, width)
    const longWave = Math.sin(
      normalizedX * TAU * layer.frequency + layer.phase + time * layer.speed
    )
    const crossWave = Math.sin(
      normalizedX * TAU * (layer.frequency * 2.37) +
        layer.phase * 1.57 -
        time * layer.speed * 1.62
    )
    const fineWave = Math.sin(
      (normalizedX + longWave * 0.035) * TAU * (3.15 + layerIndex * 0.19) -
        layer.phase * 0.72 +
        time * 0.12
    )
    const eddy =
      longWave * layer.amplitude +
      crossWave * layer.amplitude * 0.32 +
      fineWave * layer.amplitude * 0.13
    const pointerLift = pointer.y * (5 + layer.depth * 12)
    const pointerDrift = pointer.x * (7 + layer.depth * 17)
    const top =
      height * (layer.anchor + layer.slope * (normalizedX - 0.5) + eddy) +
      pointerLift +
      pointerDrift * Math.sin(progress * Math.PI)
    const fold =
      0.72 +
      Math.sin(
        normalizedX * TAU * (1.8 + layerIndex * 0.13) -
          time * layer.speed * 2.15 +
          layer.phase
      ) *
        0.19 +
      Math.sin(normalizedX * TAU * 4.1 + time * 0.08 + layerIndex) * 0.09
    const curtainDepth = height * layer.thickness * breath * fold
    const spine = top + curtainDepth * (0.18 + 0.035 * Math.sin(fineWave + time * 0.11))

    points.push({
      x,
      top,
      spine,
      bottom: top + curtainDepth,
    })
  }

  return points
}

function drawAuroraCurtain(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: PointerVector,
  layer: AuroraLayer,
  layerIndex: number
) {
  const points = makeAuroraPoints(width, height, time, pointer, layer, layerIndex)
  const gradient = context.createLinearGradient(
    0,
    height * (layer.anchor - 0.16),
    0,
    height * (layer.anchor + layer.thickness + 0.2)
  )
  gradient.addColorStop(0, `rgba(${layer.highlight}, 0)`)
  gradient.addColorStop(0.14, `rgba(${layer.highlight}, 0.22)`)
  gradient.addColorStop(0.34, `rgba(${layer.color}, 0.48)`)
  gradient.addColorStop(0.66, `rgba(${layer.color}, 0.18)`)
  gradient.addColorStop(1, `rgba(${layer.color}, 0)`)

  context.save()
  context.globalCompositeOperation = 'screen'
  context.globalAlpha = 0.38 + layer.depth * 0.32
  context.fillStyle = gradient
  context.beginPath()
  points.forEach((point, index) => {
    if (index === 0) context.moveTo(point.x, point.top)
    else context.lineTo(point.x, point.top)
  })
  for (let index = points.length - 1; index >= 0; index -= 1) {
    context.lineTo(points[index].x, points[index].bottom)
  }
  context.closePath()
  context.fill()

  context.globalAlpha = 0.42 + layer.depth * 0.25
  context.strokeStyle = `rgba(${layer.highlight}, ${0.22 + layer.depth * 0.17})`
  context.lineWidth = 0.7 + layer.depth * 1.15
  context.beginPath()
  points.forEach((point, index) => {
    const shimmer = Math.sin(index * 0.62 - time * 0.31 + layer.phase) * 1.8
    if (index === 0) context.moveTo(point.x, point.spine + shimmer)
    else context.lineTo(point.x, point.spine + shimmer)
  })
  context.stroke()

  context.globalAlpha = 0.12 + layer.depth * 0.11
  context.lineWidth = 0.55 + layer.depth * 0.45
  context.strokeStyle = `rgba(${layer.highlight}, 0.72)`
  const foldStride = layerIndex < 2 ? 7 : 5
  for (let index = (layerIndex * 3) % foldStride; index < points.length; index += foldStride) {
    const point = points[index]
    const bend = Math.sin(index * 1.7 + time * 0.18 + layer.phase) * (8 + layer.depth * 8)
    context.beginPath()
    context.moveTo(point.x, point.spine)
    context.bezierCurveTo(
      point.x + bend * 0.18,
      point.spine + (point.bottom - point.spine) * 0.25,
      point.x + bend,
      point.spine + (point.bottom - point.spine) * 0.68,
      point.x + bend * 0.5,
      point.bottom
    )
    context.stroke()
  }
  context.restore()
}

function drawAdrianAurora(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: PointerVector
) {
  const span = Math.max(width, height)
  const glowX = width * 0.69 + pointer.x * 12
  const glowY = height * 0.31 + pointer.y * 8
  const atmosphere = context.createRadialGradient(
    glowX,
    glowY,
    0,
    glowX,
    glowY,
    span * 0.82
  )
  atmosphere.addColorStop(0, 'rgba(194, 255, 77, 0.16)')
  atmosphere.addColorStop(0.24, 'rgba(94, 222, 29, 0.12)')
  atmosphere.addColorStop(0.55, 'rgba(25, 116, 21, 0.07)')
  atmosphere.addColorStop(1, 'rgba(0, 0, 0, 0)')
  context.fillStyle = atmosphere
  context.fillRect(0, 0, width, height)

  AURORA_LAYERS.forEach((layer, layerIndex) => {
    drawAuroraCurtain(context, width, height, time, pointer, layer, layerIndex)
  })

  const stormX = width * 0.73 + Math.sin(time * 0.13) * width * 0.025 + pointer.x * 18
  const stormY = height * 0.58 + Math.cos(time * 0.095) * height * 0.018 + pointer.y * 12
  const stormRadius = clamp(Math.min(width, height) * 0.15, 68, 150)
  const storm = context.createRadialGradient(stormX, stormY, 0, stormX, stormY, stormRadius)
  storm.addColorStop(0, 'rgba(255, 198, 62, 0.3)')
  storm.addColorStop(0.2, 'rgba(255, 106, 27, 0.18)')
  storm.addColorStop(0.58, 'rgba(136, 76, 8, 0.07)')
  storm.addColorStop(1, 'rgba(0, 0, 0, 0)')
  context.save()
  context.globalCompositeOperation = 'screen'
  context.fillStyle = storm
  context.fillRect(
    stormX - stormRadius,
    stormY - stormRadius,
    stormRadius * 2,
    stormRadius * 2
  )

  context.translate(stormX, stormY)
  context.rotate(-0.23 + Math.sin(time * 0.07) * 0.04)
  context.lineCap = 'round'
  for (let spiral = 0; spiral < 5; spiral += 1) {
    context.beginPath()
    for (let step = 0; step <= 48; step += 1) {
      const progress = step / 48
      const angle = progress * TAU * 1.5 + spiral * 1.16 + time * (0.09 + spiral * 0.012)
      const radius = stormRadius * (0.08 + progress * (0.34 + spiral * 0.055))
      const wobble = 1 + Math.sin(angle * 2.7 - time * 0.16 + spiral) * 0.09
      const x = Math.cos(angle) * radius * wobble
      const y = Math.sin(angle) * radius * (0.3 + spiral * 0.025) * wobble
      if (step === 0) context.moveTo(x, y)
      else context.lineTo(x, y)
    }
    context.strokeStyle = `rgba(255, ${126 + spiral * 15}, ${35 + spiral * 7}, ${0.2 - spiral * 0.018})`
    context.lineWidth = 0.75 + (4 - spiral) * 0.24
    context.stroke()
  }
  context.restore()

  const lowerGlow = context.createLinearGradient(0, height * 0.56, 0, height)
  lowerGlow.addColorStop(0, 'rgba(8, 60, 10, 0)')
  lowerGlow.addColorStop(0.64, 'rgba(38, 123, 14, 0.045)')
  lowerGlow.addColorStop(1, 'rgba(107, 185, 25, 0.095)')
  context.fillStyle = lowerGlow
  context.fillRect(0, height * 0.56, width, height * 0.44)
}

function drawTetheredAstronaut(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  rotation: number,
  mode: ObservationMode,
  engagement: number
) {
  const accent = mode === 'adrian' ? 'rgba(213, 255, 142, 0.92)' : 'rgba(255, 190, 174, 0.94)'
  const suit = mode === 'adrian' ? 'rgba(226, 235, 211, 0.94)' : 'rgba(239, 220, 215, 0.94)'
  const visor = mode === 'adrian' ? 'rgba(151, 235, 72, 0.32)' : 'rgba(255, 78, 69, 0.34)'

  context.save()
  context.translate(x, y)
  context.rotate(rotation)
  context.lineCap = 'round'
  context.lineJoin = 'round'

  context.fillStyle = 'rgba(5, 8, 7, 0.94)'
  context.strokeStyle = accent
  context.lineWidth = 1.35
  context.beginPath()
  context.rect(-11, -2, 18, 24)
  context.fill()
  context.stroke()

  context.fillStyle = suit
  context.beginPath()
  context.moveTo(-7, 3)
  context.lineTo(7, 2)
  context.lineTo(10, 28)
  context.lineTo(-8, 29)
  context.closePath()
  context.fill()

  context.fillStyle = 'rgba(5, 8, 7, 0.98)'
  context.strokeStyle = accent
  context.lineWidth = 1.5
  context.beginPath()
  context.arc(0, -8, 12.5, 0, TAU)
  context.fill()
  context.stroke()

  context.fillStyle = visor
  context.beginPath()
  context.ellipse(2, -9, 8, 6.5, -0.15, 0, TAU)
  context.fill()

  context.strokeStyle = suit
  context.lineWidth = 4.8
  context.beginPath()
  context.moveTo(-6, 9)
  context.lineTo(-16, 19 - engagement * 3)
  context.lineTo(-22, 13 - engagement * 5)
  context.stroke()
  context.beginPath()
  context.moveTo(7, 10)
  context.lineTo(18, 15 + engagement * 3)
  context.lineTo(23, 7 + engagement * 4)
  context.stroke()

  context.lineWidth = 5.5
  context.beginPath()
  context.moveTo(-4, 27)
  context.lineTo(-10, 42)
  context.lineTo(-16, 48)
  context.stroke()
  context.beginPath()
  context.moveTo(5, 27)
  context.lineTo(11, 40)
  context.lineTo(19, 45)
  context.stroke()

  context.fillStyle = engagement > 0.45 ? accent : 'rgba(157, 165, 152, 0.72)'
  context.beginPath()
  context.arc(-10, 9, 1.8, 0, TAU)
  context.fill()

  context.restore()
}

function drawMissionCrew(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: PointerVector,
  mode: ObservationMode,
  visibleHeight: number,
  centrifugePhase: number,
  engagement: number,
  activationSequence: number,
  activationAge: number,
  reducedMotion: boolean
) {
  const compact = width < 680
  const scale = clamp(Math.min(width, height) / 820, 0.5, 1.18) * (compact ? 0.82 : 1)
  const driftTime = reducedMotion ? 0 : time
  const x = width * (compact ? 0.79 : 0.78) + pointer.x * 21 + Math.sin(driftTime * 0.31) * 5
  const y = visibleHeight * (compact ? 0.34 : 0.76) + pointer.y * 14 + Math.cos(driftTime * 0.27) * 5
  const shipRotation = -0.11 + pointer.x * 0.009 + Math.sin(driftTime * 0.2) * 0.012
  const ringRadius = 28 + engagement * 31
  const ringPhase = reducedMotion ? 0.68 : centrifugePhase
  const accent = mode === 'adrian' ? '190, 255, 94' : '255, 92, 75'
  const pale = mode === 'adrian' ? '238, 255, 207' : '255, 222, 211'
  const warm = mode === 'adrian' ? '255, 116, 37' : '255, 188, 122'

  context.save()
  context.translate(x, y)
  context.rotate(shipRotation)
  context.scale(scale, scale)
  context.lineCap = 'round'
  context.lineJoin = 'round'

  const astronautX = 132 + Math.sin(driftTime * 0.48 + activationSequence) * (5 + engagement * 7)
  const astronautY = -104 - engagement * 15 + Math.cos(driftTime * 0.39) * 5

  context.strokeStyle = `rgba(${pale}, 0.58)`
  context.lineWidth = 1.15
  context.setLineDash([3, 4])
  context.lineDashOffset = reducedMotion ? 0 : -driftTime * 5
  context.beginPath()
  context.moveTo(100, -10)
  context.bezierCurveTo(128, -32, 92 + engagement * 20, -82, astronautX, astronautY + 12)
  context.stroke()
  context.setLineDash([])

  context.save()
  context.translate(-31, 1)
  context.strokeStyle = `rgba(${accent}, ${0.34 + engagement * 0.48})`
  context.lineWidth = 1.25 + engagement * 0.8
  context.beginPath()
  context.ellipse(0, 0, ringRadius, ringRadius * 0.46, 0, 0, TAU)
  context.stroke()

  for (let spoke = 0; spoke < 8; spoke += 1) {
    const angle = ringPhase + (spoke / 8) * TAU
    const spokeX = Math.cos(angle) * ringRadius
    const spokeY = Math.sin(angle) * ringRadius * 0.46
    context.strokeStyle = `rgba(${accent}, ${0.17 + engagement * 0.36})`
    context.lineWidth = spoke % 2 === 0 ? 1.2 : 0.72
    context.beginPath()
    context.moveTo(0, 0)
    context.lineTo(spokeX, spokeY)
    context.stroke()

    if (spoke % 2 === 0) {
      context.fillStyle = `rgba(${spoke === 0 || spoke === 4 ? warm : accent}, ${0.58 + engagement * 0.32})`
      context.beginPath()
      context.arc(spokeX, spokeY, 2.2 + engagement * 1.2, 0, TAU)
      context.fill()
    }
  }

  if (!reducedMotion && activationAge < 1.2) {
    const pulseProgress = clamp(activationAge / 1.2, 0, 1)
    context.strokeStyle = `rgba(${accent}, ${(1 - pulseProgress) * 0.72})`
    context.lineWidth = 1.5
    context.beginPath()
    context.ellipse(
      0,
      0,
      ringRadius + pulseProgress * 38,
      ringRadius * 0.46 + pulseProgress * 18,
      0,
      0,
      TAU
    )
    context.stroke()
  }
  context.restore()

  context.fillStyle = 'rgba(1, 4, 3, 0.96)'
  context.strokeStyle = `rgba(${accent}, 0.54)`
  context.lineWidth = 1.35
  context.beginPath()
  context.moveTo(-176, -17)
  context.lineTo(-133, -27)
  context.lineTo(100, -24)
  context.lineTo(154, -8)
  context.lineTo(178, 1)
  context.lineTo(153, 11)
  context.lineTo(101, 25)
  context.lineTo(-134, 28)
  context.lineTo(-176, 17)
  context.closePath()
  context.fill()
  context.stroke()

  const hull = context.createLinearGradient(-130, -25, 128, 25)
  hull.addColorStop(0, mode === 'adrian' ? 'rgba(24, 37, 23, 0.92)' : 'rgba(43, 15, 17, 0.94)')
  hull.addColorStop(0.5, 'rgba(5, 8, 7, 0.98)')
  hull.addColorStop(1, mode === 'adrian' ? 'rgba(29, 45, 24, 0.88)' : 'rgba(50, 17, 18, 0.9)')
  context.fillStyle = hull
  context.beginPath()
  context.moveTo(-129, -24)
  context.lineTo(100, -21)
  context.lineTo(151, -7)
  context.lineTo(170, 1)
  context.lineTo(149, 9)
  context.lineTo(99, 22)
  context.lineTo(-129, 25)
  context.closePath()
  context.fill()

  context.strokeStyle = `rgba(${pale}, 0.28)`
  context.lineWidth = 0.8
  for (let frame = -111; frame <= 95; frame += 34) {
    context.beginPath()
    context.moveTo(frame, -22)
    context.lineTo(frame + 13, 23)
    context.stroke()
  }

  context.strokeStyle = `rgba(${accent}, ${0.42 + engagement * 0.34})`
  context.lineWidth = 2
  context.beginPath()
  context.ellipse(-31, 1, 15, 24, Math.PI / 2, 0, TAU)
  context.stroke()
  context.fillStyle = `rgba(${accent}, ${0.17 + engagement * 0.28})`
  context.beginPath()
  context.arc(-31, 1, 7, 0, TAU)
  context.fill()

  context.fillStyle = `rgba(${warm}, ${0.38 + engagement * 0.58})`
  context.beginPath()
  context.moveTo(-176, -10)
  context.lineTo(-176 - 11 * engagement, 0)
  context.lineTo(-176, 10)
  context.closePath()
  context.fill()

  context.strokeStyle = `rgba(${pale}, 0.45)`
  context.lineWidth = 1.05
  context.beginPath()
  context.moveTo(76, -21)
  context.lineTo(89, -66)
  context.lineTo(112, -78)
  context.stroke()
  context.fillStyle = `rgba(${warm}, 0.88)`
  context.beginPath()
  context.arc(113, -79, 2.3, 0, TAU)
  context.fill()

  context.fillStyle = `rgba(${pale}, 0.72)`
  context.font = '7px ui-monospace, SFMono-Regular, monospace'
  context.letterSpacing = '1px'
  context.fillText('HM / 03', 42, 5)

  drawTetheredAstronaut(
    context,
    astronautX,
    astronautY,
    0.12 + Math.sin(driftTime * 0.25 + activationSequence) * 0.08,
    mode,
    engagement
  )

  context.restore()
}

function drawPetrovaField(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: PointerVector
) {
  const centerX = width * 0.68 + pointer.x * 18
  const centerY = height * 0.49 + pointer.y * 12
  const span = Math.max(width, height)

  context.save()
  context.globalCompositeOperation = 'lighter'
  context.lineCap = 'round'

  const contourCount = height < 680 ? 12 : 17
  for (let line = 0; line < contourCount; line += 1) {
    const ratio = (line + 0.5) / contourCount
    const baseY = ratio * height
    const signalCenter = width * (0.52 + Math.sin(time * 0.074) * 0.3)
    const counterCenter = width * (0.47 + Math.cos(time * 0.051 + line * 0.035) * 0.36)

    context.beginPath()
    for (let x = -20; x <= width + 20; x += 22) {
      const distance = (x - signalCenter) / Math.max(1, width * 0.19)
      const counterDistance = (x - counterCenter) / Math.max(1, width * 0.26)
      const disturbance = Math.exp(-(distance * distance))
      const counterDisturbance = Math.exp(-(counterDistance * counterDistance))
      const y =
        baseY +
        Math.sin(x * 0.007 + line * 0.72 + time * 0.17) * (5 + line * 0.16) +
        Math.sin(x * 0.024 - line - time * 0.115) * 2.35 +
        disturbance * Math.sin(distance * 11 - time * 0.52) * height * 0.031 +
        counterDisturbance *
          Math.sin(counterDistance * 7.5 + time * 0.29 + line * 0.19) *
          height *
          0.014

      if (x === -20) context.moveTo(x, y)
      else context.lineTo(x, y)
    }
    const contourPulse = 0.88 + Math.sin(time * 0.21 + line * 0.61) * 0.12
    context.strokeStyle = `rgba(255, ${54 + (line % 4) * 15}, ${68 + (line % 3) * 11}, ${(0.15 + (line % 5) * 0.022) * contourPulse})`
    context.lineWidth = line % 4 === 0 ? 1.35 : 0.72
    context.shadowColor = line % 4 === 0 ? 'rgba(255, 35, 55, 0.2)' : 'transparent'
    context.shadowBlur = line % 4 === 0 ? 7 : 0
    context.stroke()
  }
  context.shadowBlur = 0

  context.save()
  context.translate(centerX, centerY)
  context.rotate(-0.12 + pointer.x * 0.01 + Math.sin(time * 0.047) * 0.075)
  context.setLineDash([8, 14])
  context.lineDashOffset = -time * 5
  for (let orbit = 0; orbit < 6; orbit += 1) {
    const orbitBreath = 1 + Math.sin(time * 0.12 + orbit * 0.77) * 0.025
    context.beginPath()
    context.ellipse(
      0,
      0,
      span * (0.14 + orbit * 0.085) * orbitBreath,
      span * (0.035 + orbit * 0.024) * (2 - orbitBreath),
      orbit * 0.17 + Math.sin(time * 0.063 + orbit) * 0.028,
      0,
      TAU
    )
    context.strokeStyle = `rgba(255, ${63 + orbit * 15}, ${73 + orbit * 6}, ${0.48 - orbit * 0.042})`
    context.lineWidth = orbit === 0 ? 1.45 : 0.9
    context.stroke()
  }
  context.restore()

  context.setLineDash([])
  const sourceX = width * 0.91 + pointer.x * 9
  const sourceY = height * 0.83 + pointer.y * 7
  const targetX = width * 0.09 - pointer.x * 5
  const targetY = height * 0.11 - pointer.y * 4
  const dx = targetX - sourceX
  const dy = targetY - sourceY
  const length = Math.hypot(dx, dy)
  const angle = Math.atan2(dy, dx)

  context.save()
  context.translate(sourceX, sourceY)
  context.rotate(angle)

  const beam = context.createLinearGradient(0, 0, length, 0)
  beam.addColorStop(0, 'rgba(255, 52, 63, 0.05)')
  beam.addColorStop(0.42, 'rgba(255, 85, 89, 0.52)')
  beam.addColorStop(0.72, 'rgba(255, 218, 180, 0.9)')
  beam.addColorStop(1, 'rgba(255, 50, 68, 0.12)')
  context.strokeStyle = 'rgba(255, 44, 61, 0.16)'
  context.lineWidth = 10
  context.beginPath()
  context.moveTo(0, 0)
  context.lineTo(length, 0)
  context.stroke()

  context.strokeStyle = beam
  context.lineWidth = 1.45
  context.stroke()

  for (let filament = 0; filament < 5; filament += 1) {
    context.beginPath()
    const offset = (filament - 2) * 5.2
    for (let x = 0; x <= length + 10; x += 12) {
      const progress = x / Math.max(1, length)
      const envelope = Math.sin(clamp(progress, 0, 1) * Math.PI)
      const drift =
        Math.sin(x * (0.011 + filament * 0.0014) - time * (0.2 + filament * 0.025) + filament) *
          (4.5 + filament * 0.85) +
        Math.sin(x * 0.027 + time * 0.31 - filament * 1.4) * 1.8
      const y = offset + drift * envelope
      if (x === 0) context.moveTo(x, y)
      else context.lineTo(x, y)
    }
    context.strokeStyle = `rgba(255, ${56 + filament * 19}, ${71 + filament * 13}, ${0.11 + filament * 0.014})`
    context.lineWidth = filament === 2 ? 1.05 : 0.58
    context.stroke()
  }

  context.lineWidth = 0.8
  context.strokeStyle = 'rgba(255, 198, 171, 0.72)'
  context.beginPath()
  const waveformStart = length * 0.22
  const waveformEnd = length * 0.8
  for (let x = waveformStart; x <= waveformEnd; x += 8) {
    const envelope = Math.sin(((x - waveformStart) / (waveformEnd - waveformStart)) * Math.PI)
    const y = Math.sin(x * 0.075 - time * 0.9) * 9 * envelope
    if (x === waveformStart) context.moveTo(x, y)
    else context.lineTo(x, y)
  }
  context.stroke()

  for (let pulse = 0; pulse < 6; pulse += 1) {
    const progress = (time * 0.085 + pulse / 6) % 1
    const pulseX = progress * length
    const pulseRadius = pulse % 2 === 0 ? 3.2 : 2
    const glow = context.createRadialGradient(pulseX, 0, 0, pulseX, 0, pulseRadius * 5)
    glow.addColorStop(0, 'rgba(255, 244, 222, 0.95)')
    glow.addColorStop(0.2, 'rgba(255, 77, 73, 0.68)')
    glow.addColorStop(1, 'rgba(0, 0, 0, 0)')
    context.fillStyle = glow
    context.beginPath()
    context.arc(pulseX, 0, pulseRadius * 5, 0, TAU)
    context.fill()
  }
  context.restore()

  const sweepY = ((time * 0.035) % 1) * height
  const scan = context.createLinearGradient(0, sweepY - 42, 0, sweepY + 42)
  scan.addColorStop(0, 'rgba(255, 25, 48, 0)')
  scan.addColorStop(0.48, 'rgba(255, 40, 58, 0.025)')
  scan.addColorStop(0.5, 'rgba(255, 145, 126, 0.34)')
  scan.addColorStop(0.52, 'rgba(255, 40, 58, 0.025)')
  scan.addColorStop(1, 'rgba(255, 25, 48, 0)')
  context.fillStyle = scan
  context.fillRect(0, sweepY - 42, width, 84)

  context.save()
  context.translate(centerX, centerY)
  context.rotate(time * 0.025)
  context.strokeStyle = 'rgba(255, 146, 129, 0.58)'
  context.lineWidth = 0.75
  for (let mark = 0; mark < 24; mark += 1) {
    const markAngle = (mark / 24) * TAU
    const inner = span * 0.092
    const outer = inner + (mark % 3 === 0 ? 12 : 6)
    context.beginPath()
    context.moveTo(Math.cos(markAngle) * inner, Math.sin(markAngle) * inner)
    context.lineTo(Math.cos(markAngle) * outer, Math.sin(markAngle) * outer)
    context.stroke()
  }
  context.beginPath()
  context.arc(0, 0, span * 0.092, 0, TAU)
  context.stroke()
  context.restore()

  context.restore()
}

function drawVignette(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  mode: ObservationMode
) {
  const textShield = context.createLinearGradient(0, 0, width, 0)
  textShield.addColorStop(0, mode === 'adrian' ? 'rgba(0, 2, 1, 0.9)' : 'rgba(2, 1, 5, 0.87)')
  textShield.addColorStop(0.31, mode === 'adrian' ? 'rgba(0, 2, 1, 0.58)' : 'rgba(2, 1, 5, 0.52)')
  textShield.addColorStop(0.62, 'rgba(0, 0, 0, 0.06)')
  textShield.addColorStop(1, 'rgba(0, 0, 0, 0.2)')
  context.fillStyle = textShield
  context.fillRect(0, 0, width, height)

  const edge = context.createRadialGradient(
    width * 0.58,
    height * 0.45,
    Math.min(width, height) * 0.12,
    width * 0.58,
    height * 0.45,
    Math.max(width, height) * 0.79
  )
  edge.addColorStop(0, 'rgba(0, 0, 0, 0)')
  edge.addColorStop(0.66, 'rgba(0, 0, 0, 0.08)')
  edge.addColorStop(1, mode === 'adrian' ? 'rgba(0, 0, 0, 0.62)' : 'rgba(0, 0, 0, 0.44)')
  context.fillStyle = edge
  context.fillRect(0, 0, width, height)
}

export function PlanetaryField({
  className,
  centrifugeEngaged = false,
  activationSequence = 0,
}: PlanetaryFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const modeRef = useRef<ObservationMode>('adrian')
  const centrifugeEngagedRef = useRef(centrifugeEngaged)
  const activationSequenceRef = useRef(activationSequence)
  const activationStartedAtRef = useRef(Number.NEGATIVE_INFINITY)
  const drawStaticFrameRef = useRef<(() => void) | null>(null)
  const { mode } = useObservation()

  modeRef.current = mode
  centrifugeEngagedRef.current = centrifugeEngaged
  activationSequenceRef.current = activationSequence

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d', { alpha: false })
    if (!context) return

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const coarsePointerQuery = window.matchMedia('(pointer: coarse)')
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    const qualityConstrained = coarsePointerQuery.matches || Boolean(connection?.saveData)
    const frameInterval = 1_000 / (qualityConstrained ? CONSTRAINED_FPS : DESKTOP_FPS)
    const maxDpr = qualityConstrained ? CONSTRAINED_DPR : MAX_DPR
    const pointer = { x: 0, y: 0 }
    const pointerTarget = { x: 0, y: 0 }
    let particles: FieldParticle[] = []
    let width = 1
    let height = 1
    let dpr = 1
    let frameId = 0
    let lastFrameTime = 0
    let reducedMotion = motionQuery.matches
    let inViewport = true
    let disposed = false
    let centrifugeMix = centrifugeEngagedRef.current ? 1 : 0
    let centrifugePhase = 0.68

    const draw = (time: number, deltaSeconds: number, staticPose = false) => {
      const safeDelta = clamp(deltaSeconds, 0, 0.1)
      const pointerEase = staticPose ? 1 : 1 - Math.exp(-safeDelta * 5.4)
      const centrifugeEase = staticPose ? 1 : 1 - Math.exp(-safeDelta * 6.8)
      pointer.x += (pointerTarget.x - pointer.x) * pointerEase
      pointer.y += (pointerTarget.y - pointer.y) * pointerEase
      centrifugeMix +=
        ((centrifugeEngagedRef.current ? 1 : 0) - centrifugeMix) * centrifugeEase
      if (!staticPose && !reducedMotion) {
        const direction = activationSequenceRef.current % 2 === 0 ? 1 : -1
        centrifugePhase += safeDelta * (0.22 + centrifugeMix * 2.65) * direction
      }

      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      const activeMode = modeRef.current
      fillBackground(context, width, height, activeMode)
      drawParticles(context, particles, width, height, time, activeMode, pointer)

      if (activeMode === 'adrian') {
        drawAdrianAurora(context, width, height, time, pointer)
      } else {
        drawPetrovaField(context, width, height, time, pointer)
      }

      drawMissionCrew(
        context,
        width,
        height,
        time,
        pointer,
        activeMode,
        Math.min(height, window.innerHeight),
        centrifugePhase,
        centrifugeMix,
        activationSequenceRef.current,
        reducedMotion ? 2 : Math.max(0, time - activationStartedAtRef.current),
        reducedMotion
      )

      drawVignette(context, width, height, activeMode)
    }

    const drawStaticFrame = () => {
      if (reducedMotion) {
        pointer.x = 0
        pointer.y = 0
        pointerTarget.x = 0
        pointerTarget.y = 0
        draw(18.5, 0, true)
        return
      }

      draw(performance.now() / 1_000, 1 / DESKTOP_FPS)
    }
    drawStaticFrameRef.current = drawStaticFrame

    const tick = (timestamp: number) => {
      if (disposed || document.hidden || reducedMotion || !inViewport) return

      if (lastFrameTime === 0) lastFrameTime = timestamp - frameInterval
      const elapsed = timestamp - lastFrameTime

      if (elapsed >= frameInterval) {
        draw(timestamp / 1_000, elapsed / 1_000)
        lastFrameTime = timestamp - (elapsed % frameInterval)
      }

      frameId = window.requestAnimationFrame(tick)
    }

    const startAnimation = () => {
      window.cancelAnimationFrame(frameId)
      if (document.hidden || disposed || !inViewport) {
        return
      }
      if (reducedMotion) {
        canvas.dataset.motion = 'static'
        drawStaticFrame()
        return
      }
      canvas.dataset.motion = 'live'
      lastFrameTime = 0
      frameId = window.requestAnimationFrame(tick)
    }

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const nextWidth = Math.max(1, Math.round(bounds.width))
      const nextHeight = Math.max(1, Math.round(bounds.height))
      const nextDpr = clamp(window.devicePixelRatio || 1, 1, maxDpr)

      if (nextWidth === width && nextHeight === height && nextDpr === dpr) return

      width = nextWidth
      height = nextHeight
      dpr = nextDpr
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      particles = makeParticles(width, height)
      draw(reducedMotion ? 18.5 : performance.now() / 1_000, 1 / DESKTOP_FPS, reducedMotion)
    }

    const trackPointer = (event: PointerEvent) => {
      if (reducedMotion || event.pointerType === 'touch') return
      pointerTarget.x = clamp((event.clientX / Math.max(1, window.innerWidth)) * 2 - 1, -1, 1)
      pointerTarget.y = clamp((event.clientY / Math.max(1, window.innerHeight)) * 2 - 1, -1, 1)
    }

    const resetPointer = () => {
      pointerTarget.x = 0
      pointerTarget.y = 0
    }

    const handleVisibility = () => {
      window.cancelAnimationFrame(frameId)
      if (!document.hidden) startAnimation()
    }

    const handleMotionPreference = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches
      resetPointer()
      startAnimation()
    }

    const resizeObserver = new ResizeObserver(resize)
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        inViewport = entry?.isIntersecting ?? true
        window.cancelAnimationFrame(frameId)
        if (inViewport) startAnimation()
      },
      { rootMargin: '120px 0px' }
    )
    resizeObserver.observe(canvas)
    intersectionObserver.observe(canvas)
    window.addEventListener('pointermove', trackPointer, { passive: true })
    window.addEventListener('blur', resetPointer)
    document.addEventListener('visibilitychange', handleVisibility)
    motionQuery.addEventListener('change', handleMotionPreference)

    resize()
    startAnimation()

    return () => {
      disposed = true
      window.cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      window.removeEventListener('pointermove', trackPointer)
      window.removeEventListener('blur', resetPointer)
      document.removeEventListener('visibilitychange', handleVisibility)
      motionQuery.removeEventListener('change', handleMotionPreference)
      drawStaticFrameRef.current = null
    }
  }, [])

  useEffect(() => {
    drawStaticFrameRef.current?.()
  }, [mode])

  useEffect(() => {
    if (activationSequence > 0) activationStartedAtRef.current = performance.now() / 1_000
    drawStaticFrameRef.current?.()
  }, [centrifugeEngaged, activationSequence])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={fieldStyle}
      data-planetary-field="true"
      data-render-mode={mode}
      data-centrifuge-engaged={centrifugeEngaged ? 'true' : 'false'}
      data-activation-sequence={activationSequence}
      aria-hidden="true"
    />
  )
}
