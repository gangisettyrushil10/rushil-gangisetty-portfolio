'use client'

import { useEffect, useRef, type CSSProperties } from 'react'
import {
  useObservation,
  type ObservationMode,
} from '@/components/observatory/observation-provider'

type PlanetaryFieldProps = {
  className?: string
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
const MAX_DPR = 1.75

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
  const count = clamp(Math.round((width * height) / 8_800), 86, 210)

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

    if (particle.radius > 1.7) {
      const glowRadius = particle.radius * (mode === 'adrian' ? 5.4 : 3.6)
      const glow = context.createRadialGradient(x, y, 0, x, y, glowRadius)
      glow.addColorStop(
        0,
        mode === 'petrova'
          ? `rgba(255, 41, 24, ${alpha * 0.68})`
          : warmAdrianAccent
            ? `rgba(255, 105, 25, ${alpha * 0.62})`
            : particle.ember
              ? `rgba(176, 255, 61, ${alpha * 0.48})`
              : `rgba(244, 255, 213, ${alpha * 0.5})`
      )
      glow.addColorStop(1, 'rgba(0, 0, 0, 0)')
      context.fillStyle = glow
      context.beginPath()
      context.arc(x, y, glowRadius, 0, TAU)
      context.fill()
    }

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
  const sampleCount = Math.round(clamp(width / 24, 42, 86))
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
  context.shadowColor = `rgba(${layer.color}, ${0.17 + layer.depth * 0.11})`
  context.shadowBlur = 8 + layer.depth * 13
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

  context.shadowBlur = 6 + layer.depth * 7
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

  context.shadowBlur = 3
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

function drawShipSilhouette(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  pointer: PointerVector
) {
  const scale = clamp(Math.min(width, height) / 760, 0.58, 1.35)
  const x = width * 0.77 + pointer.x * 25
  const y = height * 0.85 + pointer.y * 16

  context.save()
  context.translate(x, y)
  context.rotate(-0.13 + pointer.x * 0.008)
  context.scale(scale, scale)
  context.lineJoin = 'round'

  context.fillStyle = 'rgba(0, 2, 2, 0.97)'
  context.strokeStyle = 'rgba(188, 240, 95, 0.23)'
  context.lineWidth = 1.2
  context.beginPath()
  context.moveTo(-196, 20)
  context.lineTo(-154, -19)
  context.lineTo(55, -25)
  context.lineTo(139, -9)
  context.lineTo(174, 3)
  context.lineTo(124, 17)
  context.lineTo(48, 29)
  context.lineTo(-159, 31)
  context.closePath()
  context.fill()
  context.stroke()

  context.beginPath()
  context.ellipse(-107, 4, 39, 56, Math.PI / 2, 0, TAU)
  context.fill()
  context.strokeStyle = 'rgba(214, 252, 138, 0.34)'
  context.lineWidth = 2
  context.stroke()

  context.strokeStyle = 'rgba(159, 190, 97, 0.25)'
  context.lineWidth = 1
  for (let beam = -72; beam <= 90; beam += 27) {
    context.beginPath()
    context.moveTo(beam, -22)
    context.lineTo(beam + 22, 27)
    context.stroke()
  }

  context.strokeStyle = 'rgba(242, 247, 221, 0.38)'
  context.beginPath()
  context.moveTo(-68, -23)
  context.lineTo(-55, -87)
  context.lineTo(-22, -108)
  context.stroke()
  context.fillStyle = 'rgba(255, 72, 32, 0.7)'
  context.beginPath()
  context.arc(-20, -109, 2.4, 0, TAU)
  context.fill()

  context.fillStyle = 'rgba(0, 0, 0, 0.98)'
  context.beginPath()
  context.moveTo(55, -24)
  context.lineTo(91, -61)
  context.lineTo(118, -59)
  context.lineTo(105, -12)
  context.closePath()
  context.fill()
  context.stroke()

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

export function PlanetaryField({ className }: PlanetaryFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const modeRef = useRef<ObservationMode>('adrian')
  const drawStaticFrameRef = useRef<(() => void) | null>(null)
  const { mode } = useObservation()

  modeRef.current = mode

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d', { alpha: false })
    if (!context) return

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const coarsePointerQuery = window.matchMedia('(pointer: coarse)')
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    const frameInterval = 1_000 / (coarsePointerQuery.matches || connection?.saveData ? 24 : 30)
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

    const draw = (time: number) => {
      pointer.x += (pointerTarget.x - pointer.x) * 0.035
      pointer.y += (pointerTarget.y - pointer.y) * 0.035

      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      context.clearRect(0, 0, width, height)

      const activeMode = modeRef.current
      fillBackground(context, width, height, activeMode)
      drawParticles(context, particles, width, height, time, activeMode, pointer)

      if (activeMode === 'adrian') {
        drawAdrianAurora(context, width, height, time, pointer)
        drawShipSilhouette(context, width, height, pointer)
      } else {
        drawPetrovaField(context, width, height, time, pointer)
      }

      drawVignette(context, width, height, activeMode)
    }

    const drawStaticFrame = () => {
      pointer.x = 0
      pointer.y = 0
      draw(18.5)
    }
    drawStaticFrameRef.current = drawStaticFrame

    const tick = (timestamp: number) => {
      if (disposed || document.hidden || reducedMotion || !inViewport) return

      if (timestamp - lastFrameTime >= frameInterval) {
        draw(timestamp / 1_000)
        lastFrameTime = timestamp
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
      const nextDpr = clamp(window.devicePixelRatio || 1, 1, MAX_DPR)

      if (nextWidth === width && nextHeight === height && nextDpr === dpr) return

      width = nextWidth
      height = nextHeight
      dpr = nextDpr
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      particles = makeParticles(width, height)
      draw(reducedMotion ? 18.5 : performance.now() / 1_000)
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

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={fieldStyle}
      data-planetary-field="true"
      data-render-mode={mode}
      aria-hidden="true"
    />
  )
}
