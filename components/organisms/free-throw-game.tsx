'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

const COURT_W = 360
const COURT_H = 460
const RIM_X = COURT_W / 2
const RIM_Y = 78
const RIM_R = 30
const BALL_R = 10
const BALL_START_X = COURT_W / 2
const BALL_START_Y = COURT_H - 48
const GRAVITY = 900

type Ball = {
  x: number
  y: number
  vx: number
  vy: number
  flying: boolean
}

const STORAGE_KEY = 'rushil:ft-high'

function broadcastModal(open: boolean) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent('rushil:modal-open', { detail: { open } }))
}

export function FreeThrowGame() {
  const [open, setOpen] = useState(false)
  const [score, setScore] = useState(0)
  const [high, setHigh] = useState(0)
  const [shots, setShots] = useState(0)
  const [angle, setAngle] = useState(78)
  const [power, setPower] = useState(62)
  const [flying, setFlying] = useState(false)
  const [message, setMessage] = useState<string>('SPACE to shoot · ESC to quit')
  const [flash, setFlash] = useState<'swish' | 'miss' | null>(null)

  const ballRef = useRef<Ball>({
    x: BALL_START_X,
    y: BALL_START_Y,
    vx: 0,
    vy: 0,
    flying: false,
  })
  const prevRef = useRef<{ x: number; y: number }>({ x: BALL_START_X, y: BALL_START_Y })
  const rafRef = useRef<number | null>(null)
  const lastTsRef = useRef<number>(0)
  const svgRef = useRef<SVGSVGElement | null>(null)

  // Open/close via ⇧B
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

  // Broadcast modal state so SpellSystem and others can pause their keystroke listeners
  useEffect(() => {
    broadcastModal(open)
  }, [open])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = Number(localStorage.getItem(STORAGE_KEY) ?? '0')
    setHigh(Number.isFinite(stored) ? stored : 0)
  }, [])

  // Reset per open
  useEffect(() => {
    if (!open) return
    setScore(0)
    setShots(0)
    setMessage('SPACE to shoot · ←/→ aim · ↑/↓ power · ESC quit')
    setFlash(null)
    setFlying(false)
    ballRef.current = { x: BALL_START_X, y: BALL_START_Y, vx: 0, vy: 0, flying: false }
    prevRef.current = { x: BALL_START_X, y: BALL_START_Y }
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const drawBall = useCallback(() => {
    const svg = svgRef.current
    if (!svg) return
    const ballEl = svg.querySelector<SVGCircleElement>('#ball')
    if (!ballEl) return
    ballEl.setAttribute('cx', String(ballRef.current.x))
    ballEl.setAttribute('cy', String(ballRef.current.y))
  }, [])

  const endShot = useCallback(
    (made: boolean) => {
      setFlying(false)
      ballRef.current.flying = false
      setShots((s) => s + 1)
      setFlash(made ? 'swish' : 'miss')
      if (made) {
        setScore((s) => {
          const next = s + 1
          setHigh((h) => {
            if (next > h) {
              try {
                localStorage.setItem(STORAGE_KEY, String(next))
              } catch {
                /* ignore */
              }
              return next
            }
            return h
          })
          return next
        })
        setMessage('SWISH! SPACE for another')
      } else {
        setMessage('MISS — SPACE to shoot again')
      }
      window.setTimeout(() => {
        ballRef.current = { x: BALL_START_X, y: BALL_START_Y, vx: 0, vy: 0, flying: false }
        prevRef.current = { x: BALL_START_X, y: BALL_START_Y }
        setFlash(null)
        drawBall()
      }, 700)
    },
    [drawBall]
  )

  const shoot = useCallback(() => {
    if (ballRef.current.flying) return
    const rad = (angle * Math.PI) / 180
    const speed = 5 + (power / 100) * 18
    ballRef.current.x = BALL_START_X
    ballRef.current.y = BALL_START_Y
    ballRef.current.vx = Math.cos(rad) * speed * 60
    ballRef.current.vy = -Math.sin(rad) * speed * 60
    ballRef.current.flying = true
    setFlying(true)
    setMessage('incoming…')
    setFlash(null)
    prevRef.current = { x: BALL_START_X, y: BALL_START_Y }
    lastTsRef.current = 0

    const step = (ts: number) => {
      if (!ballRef.current.flying) return
      if (!lastTsRef.current) lastTsRef.current = ts
      const dt = Math.min(0.033, (ts - lastTsRef.current) / 1000)
      lastTsRef.current = ts

      prevRef.current.x = ballRef.current.x
      prevRef.current.y = ballRef.current.y

      ballRef.current.x += ballRef.current.vx * dt
      ballRef.current.y += ballRef.current.vy * dt
      ballRef.current.vy += GRAVITY * dt

      drawBall()

      // Made: ball segment crosses the rim plane downward within rim horizontal window
      const yCrossed =
        prevRef.current.y < RIM_Y && ballRef.current.y >= RIM_Y && ballRef.current.vy > 0
      if (yCrossed) {
        // Interpolate x at the moment of crossing
        const t = (RIM_Y - prevRef.current.y) / (ballRef.current.y - prevRef.current.y)
        const xAtCross = prevRef.current.x + (ballRef.current.x - prevRef.current.x) * t
        if (Math.abs(xAtCross - RIM_X) < RIM_R - BALL_R + 2) {
          endShot(true)
          return
        }
      }

      // Rim edge bounce — ball close to rim ring
      const dx = ballRef.current.x - RIM_X
      const dy = ballRef.current.y - RIM_Y
      const dist = Math.hypot(dx, dy)
      if (dist > RIM_R - BALL_R - 1 && dist < RIM_R + BALL_R + 1 && ballRef.current.vy > 0) {
        const nx = dx / (dist || 1)
        const ny = dy / (dist || 1)
        const dot = ballRef.current.vx * nx + ballRef.current.vy * ny
        ballRef.current.vx = (ballRef.current.vx - 2 * dot * nx) * 0.5
        ballRef.current.vy = (ballRef.current.vy - 2 * dot * ny) * 0.5
      }

      // Offscreen → miss
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

  // Game input
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ', 'Space'].includes(e.key)) {
        e.preventDefault()
      }
      if (flying) return // no aim adjustments mid-flight
      if (e.key === 'ArrowLeft') setAngle((a) => Math.max(30, a - 2))
      else if (e.key === 'ArrowRight') setAngle((a) => Math.min(130, a + 2))
      else if (e.key === 'ArrowUp') setPower((p) => Math.min(100, p + 3))
      else if (e.key === 'ArrowDown') setPower((p) => Math.max(20, p - 3))
      else if (e.key === ' ' || e.key === 'Space') shoot()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, flying, shoot])

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-background/88 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setOpen(false)
      }}
    >
      <div className="relative w-[360px] max-w-[92vw] rounded-md border border-(--pill-border) bg-bg-card p-4 font-mono shadow-[0_0_0_1px_var(--phosphor),0_0_28px_rgba(179,71,255,0.35)]">
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
          <div
            className="rounded-sm border border-(--pill-border) bg-bg-card-muted px-2 py-1.5"
            style={{ borderColor: 'var(--crt-amber)' }}
          >
            <p className="text-subtle-foreground">High</p>
            <p className="tabular-nums text-lg" style={{ color: 'var(--crt-amber)' }}>
              {high}
            </p>
          </div>
        </div>

        {/* Court */}
        <svg
          ref={svgRef}
          width={COURT_W}
          height={COURT_H}
          viewBox={`0 0 ${COURT_W} ${COURT_H}`}
          className="w-full max-w-full rounded-sm border border-(--pill-border) bg-[#03040a]"
        >
          {/* decorative starfield inside court */}
          {[...Array(30)].map((_, i) => {
            const x = ((i * 71) % COURT_W) + 5
            const y = ((i * 113) % COURT_H) + 3
            return <circle key={i} cx={x} cy={y} r={0.7} fill="rgba(255,255,255,0.25)" />
          })}

          {/* Backboard */}
          <rect
            x={RIM_X - 52}
            y={RIM_Y - 42}
            width={104}
            height={42}
            fill="#141820"
            stroke="var(--phosphor)"
            strokeWidth={1.5}
          />
          <rect x={RIM_X - 16} y={RIM_Y - 30} width={32} height={20} fill="none" stroke="var(--phosphor)" strokeWidth={1} />

          {/* Rim */}
          <ellipse
            cx={RIM_X}
            cy={RIM_Y}
            rx={RIM_R}
            ry={6}
            fill="none"
            stroke="var(--crt-magenta)"
            strokeWidth={3}
          />

          {/* Net */}
          <path
            d={`M ${RIM_X - RIM_R + 2} ${RIM_Y} L ${RIM_X - 10} ${RIM_Y + 28} L ${RIM_X + 10} ${RIM_Y + 28} L ${RIM_X + RIM_R - 2} ${RIM_Y}`}
            fill="none"
            stroke="rgba(255,255,255,0.38)"
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

          {/* Aim guide while not flying */}
          {!flying && (
            <g opacity={0.42}>
              <line
                x1={BALL_START_X}
                y1={BALL_START_Y}
                x2={BALL_START_X + Math.cos((angle * Math.PI) / 180) * (40 + power)}
                y2={BALL_START_Y - Math.sin((angle * Math.PI) / 180) * (40 + power)}
                stroke="var(--phosphor)"
                strokeWidth={2}
                strokeLinecap="round"
              />
              <circle
                cx={BALL_START_X + Math.cos((angle * Math.PI) / 180) * (40 + power)}
                cy={BALL_START_Y - Math.sin((angle * Math.PI) / 180) * (40 + power)}
                r={3}
                fill="var(--phosphor)"
              />
            </g>
          )}

          {/* Ball */}
          <circle
            id="ball"
            cx={BALL_START_X}
            cy={BALL_START_Y}
            r={BALL_R}
            fill="#ff8a1c"
            stroke="#7a2f00"
            strokeWidth={1}
          />

          {/* Flash overlay */}
          {flash === 'swish' && (
            <text
              x={RIM_X}
              y={RIM_Y + 4}
              textAnchor="middle"
              fontFamily="var(--font-display)"
              fontSize="26"
              fill="var(--phosphor)"
              style={{ filter: 'drop-shadow(0 0 10px rgba(179,71,255,0.6))' }}
            >
              SWISH!
            </text>
          )}
          {flash === 'miss' && (
            <text
              x={RIM_X}
              y={RIM_Y + 4}
              textAnchor="middle"
              fontFamily="var(--font-display)"
              fontSize="22"
              fill="var(--crt-magenta)"
            >
              MISS
            </text>
          )}
        </svg>

        {/* Power + angle meters */}
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.14em] text-subtle-foreground">Power</p>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-sm border border-(--pill-border) bg-bg-card-muted">
              <div
                className="h-full transition-all"
                style={{ width: `${power}%`, background: 'var(--phosphor)' }}
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
                className="h-full transition-all"
                style={{
                  width: `${((angle - 30) / 100) * 100}%`,
                  background: 'var(--crt-magenta)',
                }}
              />
            </div>
            <p className="mt-1 font-mono text-[11px] tabular-nums text-muted-foreground">
              {angle.toFixed(0)}° · ←/→
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="min-w-0 truncate font-mono text-[11px] text-phosphor">{message}</p>
          <span className="kbd">⇧B</span>
        </div>
      </div>
    </div>
  )
}
