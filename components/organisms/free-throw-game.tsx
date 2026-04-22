'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

const COURT_W = 360
const COURT_H = 460
const RIM_X = COURT_W / 2
const RIM_Y = 78
const RIM_R = 28
const BALL_R = 10
const GRAVITY = 900 // px/s²

type Ball = {
  x: number
  y: number
  vx: number
  vy: number
  flying: boolean
}

const STORAGE_KEY = 'rushil:ft-high'

export function FreeThrowGame() {
  const [open, setOpen] = useState(false)
  const [score, setScore] = useState(0)
  const [high, setHigh] = useState(0)
  const [shots, setShots] = useState(0)
  const [angle, setAngle] = useState(78) // degrees from horizontal
  const [power, setPower] = useState(62) // 0–100
  const [message, setMessage] = useState<string>('')

  const ballRef = useRef<Ball>({
    x: COURT_W / 2,
    y: COURT_H - 48,
    vx: 0,
    vy: 0,
    flying: false,
  })
  const rafRef = useRef<number | null>(null)
  const lastTsRef = useRef<number>(0)
  const svgRef = useRef<SVGSVGElement | null>(null)

  // Open game via Shift+B
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tgt = e.target as HTMLElement | null
      if (tgt && (tgt.tagName === 'INPUT' || tgt.tagName === 'TEXTAREA' || tgt.isContentEditable)) return
      if (e.shiftKey && (e.key === 'B' || e.key === 'b')) {
        e.preventDefault()
        setOpen((p) => !p)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Load high score
  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = Number(localStorage.getItem(STORAGE_KEY) ?? '0')
    setHigh(Number.isFinite(stored) ? stored : 0)
  }, [])

  // Reset when opened
  useEffect(() => {
    if (!open) return
    setScore(0)
    setShots(0)
    setMessage('')
    ballRef.current = { x: COURT_W / 2, y: COURT_H - 48, vx: 0, vy: 0, flying: false }
  }, [open])

  // Escape closes
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Game input
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ', 'Space'].includes(e.key)) {
        e.preventDefault()
      }
      if (ballRef.current.flying) return
      if (e.key === 'ArrowLeft') setAngle((a) => Math.max(30, a - 2))
      else if (e.key === 'ArrowRight') setAngle((a) => Math.min(130, a + 2))
      else if (e.key === 'ArrowUp') setPower((p) => Math.min(100, p + 3))
      else if (e.key === 'ArrowDown') setPower((p) => Math.max(20, p - 3))
      else if (e.key === ' ' || e.key === 'Space') shoot()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Update a ref copy of the SVG for the animation loop to draw
  const drawBall = useCallback(() => {
    const svg = svgRef.current
    if (!svg) return
    const ballEl = svg.querySelector<SVGCircleElement>('#ball')
    if (!ballEl) return
    ballEl.setAttribute('cx', String(ballRef.current.x))
    ballEl.setAttribute('cy', String(ballRef.current.y))
  }, [])

  const endShot = useCallback((made: boolean) => {
    ballRef.current.flying = false
    setShots((s) => s + 1)
    if (made) {
      setScore((s) => {
        const next = s + 1
        setHigh((h) => {
          if (next > h) {
            try {
              localStorage.setItem(STORAGE_KEY, String(next))
            } catch {
              // ignore
            }
            return next
          }
          return h
        })
        return next
      })
      setMessage('SWISH!')
    } else {
      setMessage('MISS — tap SPACE to shoot again')
    }
    // Reset ball after short delay
    setTimeout(() => {
      ballRef.current = { x: COURT_W / 2, y: COURT_H - 48, vx: 0, vy: 0, flying: false }
      drawBall()
    }, 700)
  }, [drawBall])

  const shoot = useCallback(() => {
    if (ballRef.current.flying) return
    const rad = (angle * Math.PI) / 180
    const speed = 6 + (power / 100) * 22 // tuned range
    ballRef.current.vx = Math.cos(rad) * speed * 60
    ballRef.current.vy = -Math.sin(rad) * speed * 60
    ballRef.current.flying = true
    setMessage('')
    lastTsRef.current = 0

    const step = (ts: number) => {
      if (!ballRef.current.flying) return
      if (!lastTsRef.current) lastTsRef.current = ts
      const dt = Math.min(0.033, (ts - lastTsRef.current) / 1000)
      lastTsRef.current = ts

      ballRef.current.x += ballRef.current.vx * dt
      ballRef.current.y += ballRef.current.vy * dt
      ballRef.current.vy += GRAVITY * dt

      drawBall()

      // Rim collision — check if ball passes through hoop zone
      const dx = ballRef.current.x - RIM_X
      const dy = ballRef.current.y - RIM_Y
      const dist = Math.hypot(dx, dy)

      // Made shot: ball passes down through hoop plane inside rim radius
      const passedThroughRim =
        Math.abs(dy) < 6 && Math.abs(dx) < RIM_R - BALL_R && ballRef.current.vy > 0
      if (passedThroughRim) {
        endShot(true)
        return
      }

      // Bounce off rim edges (simple)
      if (dist < RIM_R + BALL_R && dist > RIM_R - BALL_R && ballRef.current.vy > 0) {
        const nx = dx / dist
        const ny = dy / dist
        const dot = ballRef.current.vx * nx + ballRef.current.vy * ny
        ballRef.current.vx = (ballRef.current.vx - 2 * dot * nx) * 0.55
        ballRef.current.vy = (ballRef.current.vy - 2 * dot * ny) * 0.55
      }

      // Out of bounds or bottom
      if (
        ballRef.current.y > COURT_H + 40 ||
        ballRef.current.x < -40 ||
        ballRef.current.x > COURT_W + 40
      ) {
        endShot(false)
        return
      }

      rafRef.current = requestAnimationFrame(step)
    }

    rafRef.current = requestAnimationFrame(step)
  }, [angle, power, drawBall, endShot])

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-background/85 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setOpen(false)
      }}
    >
      <div className="glow-box relative w-[360px] rounded-md bg-bg-card p-4 font-mono">
        {/* Title bar */}
        <div className="mb-3 flex items-center justify-between">
          <span className="font-display text-[22px] text-phosphor">🏀 FREE THROW</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="rounded p-1 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* HUD */}
        <div className="mb-2 grid grid-cols-3 gap-2 text-[11px] uppercase tracking-[0.14em]">
          <div className="rounded-sm border border-(--pill-border) bg-bg-card-muted px-2 py-1.5">
            <p className="text-subtle-foreground">Score</p>
            <p className="text-phosphor tabular-nums text-lg">{score}</p>
          </div>
          <div className="rounded-sm border border-(--pill-border) bg-bg-card-muted px-2 py-1.5">
            <p className="text-subtle-foreground">Shots</p>
            <p className="text-foreground tabular-nums text-lg">{shots}</p>
          </div>
          <div className="rounded-sm border border-(--pill-border) bg-bg-card-muted px-2 py-1.5">
            <p className="text-subtle-foreground">High</p>
            <p className="text-amber tabular-nums text-lg">{high}</p>
          </div>
        </div>

        {/* Court */}
        <svg
          ref={svgRef}
          width={COURT_W}
          height={COURT_H}
          viewBox={`0 0 ${COURT_W} ${COURT_H}`}
          className="rounded-sm border border-(--pill-border) bg-[#03040a]"
        >
          {/* Starfield dots inside court */}
          {[...Array(30)].map((_, i) => {
            const x = ((i * 71) % COURT_W) + 5
            const y = ((i * 113) % COURT_H) + 3
            return <circle key={i} cx={x} cy={y} r={0.7} fill="rgba(255,255,255,0.28)" />
          })}

          {/* Backboard */}
          <rect x={RIM_X - 50} y={RIM_Y - 40} width={100} height={40} fill="#141820" stroke="var(--phosphor)" strokeWidth={1.5} />

          {/* Rim */}
          <ellipse
            cx={RIM_X}
            cy={RIM_Y}
            rx={RIM_R}
            ry={6}
            fill="none"
            stroke="var(--crt-magenta)"
            strokeWidth={2.5}
          />

          {/* Net */}
          <path
            d={`M ${RIM_X - RIM_R + 2} ${RIM_Y} L ${RIM_X - 10} ${RIM_Y + 26} L ${RIM_X + 10} ${RIM_Y + 26} L ${RIM_X + RIM_R - 2} ${RIM_Y}`}
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            strokeDasharray="2 2"
          />

          {/* Ground */}
          <line
            x1={0}
            y1={COURT_H - 32}
            x2={COURT_W}
            y2={COURT_H - 32}
            stroke="var(--phosphor-dim)"
            strokeWidth={1}
            strokeDasharray="4 6"
          />

          {/* Aim guide (only when not flying) */}
          {!ballRef.current.flying && (
            <g opacity={0.35}>
              <line
                x1={COURT_W / 2}
                y1={COURT_H - 48}
                x2={COURT_W / 2 + Math.cos((angle * Math.PI) / 180) * (40 + power)}
                y2={COURT_H - 48 - Math.sin((angle * Math.PI) / 180) * (40 + power)}
                stroke="var(--phosphor)"
                strokeWidth={2}
                strokeLinecap="round"
              />
            </g>
          )}

          {/* Ball */}
          <circle
            id="ball"
            cx={COURT_W / 2}
            cy={COURT_H - 48}
            r={BALL_R}
            fill="#ff8a1c"
            stroke="#7a2f00"
            strokeWidth={1}
          />
        </svg>

        {/* Power + angle meters */}
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.14em] text-subtle-foreground">Power</p>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-sm border border-(--pill-border) bg-bg-card-muted">
              <div
                className="h-full bg-phosphor transition-all"
                style={{ width: `${power}%` }}
              />
            </div>
            <p className="mt-1 font-mono text-[11px] tabular-nums text-muted-foreground">
              {power.toFixed(0)}% · ↑/↓
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.14em] text-subtle-foreground">Angle</p>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-sm border border-(--pill-border) bg-bg-card-muted">
              <div
                className="h-full bg-magenta transition-all"
                style={{ width: `${((angle - 30) / 100) * 100}%` }}
              />
            </div>
            <p className="mt-1 font-mono text-[11px] tabular-nums text-muted-foreground">
              {angle.toFixed(0)}° · ←/→
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-3 flex items-center justify-between">
          <p className="font-mono text-[11px] text-phosphor">
            {message || 'SPACE to shoot · ESC to quit'}
          </p>
          <span className="kbd">⇧B</span>
        </div>
      </div>
    </div>
  )
}
