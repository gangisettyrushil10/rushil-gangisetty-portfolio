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

const TAU = Math.PI * 2
const MAX_DPR = 1.75

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
    base.addColorStop(0, '#010303')
    base.addColorStop(0.52, '#030403')
    base.addColorStop(1, '#070101')
  } else {
    base.addColorStop(0, '#020207')
    base.addColorStop(0.52, '#050307')
    base.addColorStop(1, '#080103')
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
    haze.addColorStop(0, 'rgba(53, 89, 10, 0.13)')
    haze.addColorStop(0.45, 'rgba(52, 9, 3, 0.08)')
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
        particle.ember
          ? `rgba(255, ${mode === 'adrian' ? 71 : 41}, 24, ${alpha * 0.68})`
          : `rgba(255, 235, 221, ${alpha * 0.58})`
      )
      glow.addColorStop(1, 'rgba(0, 0, 0, 0)')
      context.fillStyle = glow
      context.beginPath()
      context.arc(x, y, glowRadius, 0, TAU)
      context.fill()
    }

    context.fillStyle = particle.ember
      ? `rgba(255, ${mode === 'adrian' ? 84 : 47}, ${mode === 'adrian' ? 29 : 45}, ${alpha})`
      : `rgba(255, 244, 235, ${alpha * 0.9})`
    context.beginPath()
    context.arc(x, y, particle.radius, 0, TAU)
    context.fill()
  })

  context.restore()
}

function drawAdrianPlanet(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: PointerVector
) {
  const radius = Math.max(width * 0.64, height * 0.79)
  const centerX = width * 0.79 + pointer.x * 14
  const centerY = height * 0.46 + pointer.y * 10

  const aura = context.createRadialGradient(
    centerX,
    centerY,
    radius * 0.76,
    centerX,
    centerY,
    radius * 1.12
  )
  aura.addColorStop(0, 'rgba(136, 255, 23, 0.15)')
  aura.addColorStop(0.71, 'rgba(82, 227, 11, 0.09)')
  aura.addColorStop(0.84, 'rgba(225, 255, 78, 0.22)')
  aura.addColorStop(0.9, 'rgba(122, 255, 25, 0.08)')
  aura.addColorStop(1, 'rgba(0, 0, 0, 0)')
  context.fillStyle = aura
  context.beginPath()
  context.arc(centerX, centerY, radius * 1.12, 0, TAU)
  context.fill()

  context.save()
  context.beginPath()
  context.arc(centerX, centerY, radius, 0, TAU)
  context.clip()

  const sphere = context.createRadialGradient(
    centerX - radius * 0.42,
    centerY - radius * 0.5,
    radius * 0.035,
    centerX,
    centerY,
    radius * 1.03
  )
  sphere.addColorStop(0, '#e7ff51')
  sphere.addColorStop(0.18, '#8ee51c')
  sphere.addColorStop(0.42, '#45ae0b')
  sphere.addColorStop(0.69, '#176706')
  sphere.addColorStop(0.88, '#07310a')
  sphere.addColorStop(1, '#010603')
  context.fillStyle = sphere
  context.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2)

  const stormX = centerX - radius * 0.27 + Math.sin(time * 0.09) * radius * 0.018
  const stormY = centerY + radius * 0.14
  const storm = context.createRadialGradient(
    stormX,
    stormY,
    radius * 0.015,
    stormX,
    stormY,
    radius * 0.27
  )
  storm.addColorStop(0, 'rgba(255, 198, 34, 0.75)')
  storm.addColorStop(0.3, 'rgba(255, 100, 12, 0.5)')
  storm.addColorStop(0.68, 'rgba(102, 70, 3, 0.2)')
  storm.addColorStop(1, 'rgba(0, 0, 0, 0)')
  context.fillStyle = storm
  context.fillRect(stormX - radius * 0.3, stormY - radius * 0.3, radius * 0.6, radius * 0.6)

  context.globalCompositeOperation = 'screen'
  const bandCount = 27
  const step = Math.max(14, radius / 56)

  for (let band = 0; band < bandCount; band += 1) {
    const ratio = (band + 0.5) / bandCount
    const baseY = centerY - radius + ratio * radius * 2
    const amplitude = radius * (0.018 + ((band * 7) % 9) * 0.0035)
    const phase = band * 0.91

    context.beginPath()
    for (let x = centerX - radius; x <= centerX + radius + step; x += step) {
      const normalizedX = (x - centerX) / radius
      const wave =
        Math.sin(normalizedX * (7.5 + (band % 4) * 0.65) + phase + time * 0.12) *
          amplitude +
        Math.sin(normalizedX * 17 - phase * 0.63 - time * 0.075) * amplitude * 0.34 +
        Math.sin(normalizedX * 2.2 + ratio * 5.5 + time * 0.045) * radius * 0.022
      const y = baseY + wave

      if (x === centerX - radius) context.moveTo(x, y)
      else context.lineTo(x, y)
    }

    const hue = 48 + ((band * 13) % 55)
    const lightness = 42 + ((band * 11) % 22)
    context.strokeStyle = `hsla(${hue}, 91%, ${lightness}%, ${0.1 + (band % 5) * 0.018})`
    context.lineWidth = radius * (0.014 + (band % 4) * 0.004)
    context.lineCap = 'round'
    context.stroke()

    if (band % 3 === 0) {
      context.strokeStyle = `hsla(${hue + 8}, 100%, 78%, 0.17)`
      context.lineWidth = Math.max(0.65, radius * 0.0013)
      context.stroke()
    }
  }

  context.save()
  context.translate(stormX, stormY)
  context.rotate(-0.23)
  for (let ring = 0; ring < 7; ring += 1) {
    context.beginPath()
    context.ellipse(
      0,
      0,
      radius * (0.06 + ring * 0.023),
      radius * (0.018 + ring * 0.009),
      Math.sin(time * 0.07 + ring) * 0.12,
      0,
      TAU
    )
    context.strokeStyle = `rgba(255, ${133 + ring * 9}, ${35 + ring * 2}, ${0.24 - ring * 0.018})`
    context.lineWidth = Math.max(0.8, radius * 0.0027)
    context.stroke()
  }
  context.restore()

  const shade = context.createLinearGradient(centerX - radius, centerY, centerX + radius, centerY)
  shade.addColorStop(0, 'rgba(0, 0, 0, 0)')
  shade.addColorStop(0.58, 'rgba(0, 0, 0, 0.08)')
  shade.addColorStop(0.82, 'rgba(0, 0, 0, 0.48)')
  shade.addColorStop(1, 'rgba(0, 0, 0, 0.94)')
  context.globalCompositeOperation = 'source-over'
  context.fillStyle = shade
  context.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2)
  context.restore()

  context.save()
  context.strokeStyle = 'rgba(205, 255, 91, 0.48)'
  context.lineWidth = Math.max(1, radius * 0.003)
  context.beginPath()
  context.arc(centerX, centerY, radius, Math.PI * 0.64, Math.PI * 1.52)
  context.stroke()
  context.restore()
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
    const signalCenter = width * (0.2 + 0.6 * (0.5 + Math.sin(time * 0.07) * 0.5))

    context.beginPath()
    for (let x = -20; x <= width + 20; x += 22) {
      const distance = (x - signalCenter) / Math.max(1, width * 0.19)
      const disturbance = Math.exp(-(distance * distance))
      const y =
        baseY +
        Math.sin(x * 0.008 + line * 0.72 + time * 0.16) * (5 + line * 0.16) +
        Math.sin(x * 0.025 - line - time * 0.1) * 2.2 +
        disturbance * Math.sin(distance * 11 - time * 0.5) * height * 0.028

      if (x === -20) context.moveTo(x, y)
      else context.lineTo(x, y)
    }
    context.strokeStyle = `rgba(255, ${54 + (line % 4) * 15}, ${68 + (line % 3) * 11}, ${0.15 + (line % 5) * 0.022})`
    context.lineWidth = line % 4 === 0 ? 1.25 : 0.75
    context.stroke()
  }

  context.save()
  context.translate(centerX, centerY)
  context.rotate(-0.12 + pointer.x * 0.01)
  context.setLineDash([8, 14])
  context.lineDashOffset = -time * 5
  for (let orbit = 0; orbit < 6; orbit += 1) {
    context.beginPath()
    context.ellipse(
      0,
      0,
      span * (0.14 + orbit * 0.085),
      span * (0.035 + orbit * 0.024),
      orbit * 0.17,
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
  context.strokeStyle = beam
  context.lineWidth = 1.5
  context.beginPath()
  context.moveTo(0, 0)
  context.lineTo(length, 0)
  context.stroke()

  context.strokeStyle = 'rgba(255, 44, 61, 0.2)'
  context.lineWidth = 8
  context.stroke()

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
        drawAdrianPlanet(context, width, height, time, pointer)
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
