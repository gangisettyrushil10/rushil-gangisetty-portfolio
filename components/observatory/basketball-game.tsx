'use client'

import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import { RotateCcw, Target } from 'lucide-react'
import { isMadeShot, shotFromDrag, trajectoryPoint } from '@/lib/game-physics'

type ShotInput = { power: number; aim: number }

const BEST_KEY = 'rushil.observatory-court-best'
const SHOT_DURATION_MS = 820

type BallStyle = CSSProperties & { '--ball-x': string; '--ball-y': string }

export default function BasketballGame() {
  const courtRef = useRef<HTMLDivElement>(null)
  const dragStartRef = useRef<{ x: number; y: number } | null>(null)
  const animationRef = useRef<number | null>(null)
  const powerFrameRef = useRef<number | null>(null)
  const powerRef = useRef(0.5)
  const [ball, setBall] = useState({ x: 18, y: 78 })
  const [power, setPower] = useState(0.5)
  const [score, setScore] = useState(0)
  const [shots, setShots] = useState(0)
  const [best, setBest] = useState(0)
  const [isShooting, setIsShooting] = useState(false)
  const [message, setMessage] = useState('Flick the ball toward the hoop, or press Space.')

  useEffect(() => {
    try {
      setBest(Number.parseInt(localStorage.getItem(BEST_KEY) ?? '0', 10) || 0)
    } catch {
      // Score persistence is optional.
    }
  }, [])

  useEffect(() => {
    let start = performance.now()
    const update = (now: number) => {
      if (!isShooting && !dragStartRef.current) {
        const nextPower = 0.58 + (Math.sin((now - start) / 520) + 1) * 0.2
        powerRef.current = nextPower
        setPower(nextPower)
      }
      powerFrameRef.current = requestAnimationFrame(update)
    }
    powerFrameRef.current = requestAnimationFrame(update)
    return () => {
      if (powerFrameRef.current) cancelAnimationFrame(powerFrameRef.current)
    }
  }, [isShooting])

  useEffect(() => () => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current)
  }, [])

  const launch = useCallback((shot: ShotInput) => {
    if (isShooting) return
    setIsShooting(true)
    setPower(shot.power)
    const made = isMadeShot(shot)
    const startTime = performance.now()

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / SHOT_DURATION_MS, 1)
      setBall(trajectoryPoint(shot, progress))

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      const nextShots = shots + 1
      const nextScore = score + (made ? 1 : 0)
      const nextBest = Math.max(best, nextScore)
      setShots(nextShots)
      setScore(nextScore)
      setBest(nextBest)
      setMessage(made ? 'Clean signal. Nothing but net.' : shot.power < 0.72 ? 'Short orbit. Add a little lift.' : shot.power > 0.94 ? 'Long orbit. Ease the power.' : 'Good height. Correct the aim.')

      try {
        localStorage.setItem(BEST_KEY, String(nextBest))
      } catch {
        // Score persistence is optional.
      }

      window.setTimeout(() => {
        setBall({ x: 18, y: 78 })
        setIsShooting(false)
      }, 360)
    }

    animationRef.current = requestAnimationFrame(animate)
  }, [best, isShooting, score, shots])

  function pointerDown(event: PointerEvent<HTMLButtonElement>) {
    if (isShooting) return
    event.currentTarget.setPointerCapture(event.pointerId)
    dragStartRef.current = { x: event.clientX, y: event.clientY }
    setMessage('Release to launch.')
  }

  function pointerUp(event: PointerEvent<HTMLButtonElement>) {
    const start = dragStartRef.current
    const bounds = courtRef.current?.getBoundingClientRect()
    dragStartRef.current = null
    if (!start || !bounds) return
    launch(shotFromDrag(event.clientX - start.x, event.clientY - start.y, bounds.width, bounds.height))
  }

  function reset() {
    if (animationRef.current) cancelAnimationFrame(animationRef.current)
    setBall({ x: 18, y: 78 })
    setScore(0)
    setShots(0)
    setIsShooting(false)
    setMessage('Court reset. Flick upward, or press Space.')
  }

  return (
    <div className="court-game" aria-label="Observatory free throw game">
      <div className="court-scoreboard" aria-live="polite">
        <div><span>Score</span><strong>{score}</strong></div>
        <div><span>Attempts</span><strong>{shots}</strong></div>
        <div><span>Best run</span><strong>{best}</strong></div>
        <button type="button" onClick={reset} disabled={isShooting}><RotateCcw aria-hidden="true" />Reset</button>
      </div>

      <div ref={courtRef} className="court-surface">
        <span className="court-stars" aria-hidden="true" />
        <span className="court-key" aria-hidden="true" />
        <span className="court-hoop" aria-hidden="true"><i /></span>
        <span className="court-backboard" aria-hidden="true" />
        <button
          type="button"
          className="court-ball"
          style={{ '--ball-x': `${ball.x}%`, '--ball-y': `${ball.y}%` } as BallStyle}
          onPointerDown={pointerDown}
          onPointerUp={pointerUp}
          onPointerCancel={() => { dragStartRef.current = null }}
          onKeyDown={(event) => {
            if (event.code === 'Space') {
              event.preventDefault()
              launch({ power: powerRef.current, aim: 0 })
            }
          }}
          aria-label="Basketball. Flick upward with a pointer or press Space to shoot."
          disabled={isShooting}
        >
          <span aria-hidden="true" />
        </button>
        <div className="court-power" aria-hidden="true"><span style={{ width: `${power * 100}%` }} /></div>
        <div className="court-target"><Target aria-hidden="true" /><span>Ideal power band: 72–94%</span></div>
      </div>
      <p className="court-message" role="status">{message}</p>
    </div>
  )
}
