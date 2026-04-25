'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

const COURT_W = 360
const COURT_H = 360
const RIM_X = COURT_W / 2
const RIM_Y = 96
const RIM_R = 30
const BALL_R = 10
const BALL_START_X = COURT_W - 60
const BALL_START_Y = COURT_H - 50

const ARC_DURATION = 0.85
const SWISH_DELAY = ARC_DURATION + 0.05
const FADE_DELAY = SWISH_DELAY + 0.45
const TOTAL_MS = (FADE_DELAY + 0.45) * 1000

export function BasketballWarmup() {
  const [visible, setVisible] = useState(true)
  const [phase, setPhase] = useState<'shoot' | 'swish'>('shoot')
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisible(false)
      return
    }

    const swishTimer = window.setTimeout(() => setPhase('swish'), SWISH_DELAY * 1000)
    const fadeTimer = window.setTimeout(() => setVisible(false), TOTAL_MS)

    function skip() {
      setVisible(false)
    }
    window.addEventListener('keydown', skip, { once: true })
    window.addEventListener('mousedown', skip, { once: true })

    return () => {
      window.clearTimeout(swishTimer)
      window.clearTimeout(fadeTimer)
      window.removeEventListener('keydown', skip)
      window.removeEventListener('mousedown', skip)
    }
  }, [prefersReducedMotion])

  if (prefersReducedMotion) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          aria-hidden
        >
          {/* CRT glow vignette behind the court */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(179,71,255,0.18), transparent 70%)',
            }}
          />

          <svg
            width={COURT_W}
            height={COURT_H}
            viewBox={`0 0 ${COURT_W} ${COURT_H}`}
            className="relative"
            style={{ filter: 'drop-shadow(0 0 24px rgba(179,71,255,0.18))' }}
          >
            {/* Decorative starfield inside court */}
            {Array.from({ length: 36 }).map((_, i) => {
              const x = (i * 71) % COURT_W
              const y = (i * 113) % COURT_H
              return <circle key={i} cx={x} cy={y} r={0.7} fill="rgba(255,255,255,0.16)" />
            })}

            {/* Backboard */}
            <motion.rect
              x={RIM_X - 52}
              y={RIM_Y - 46}
              width={104}
              height={42}
              fill="#141820"
              stroke="var(--phosphor)"
              strokeWidth={1.5}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
            <motion.rect
              x={RIM_X - 16}
              y={RIM_Y - 32}
              width={32}
              height={20}
              fill="none"
              stroke="var(--phosphor)"
              strokeWidth={1}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            />

            {/* Rim */}
            <motion.ellipse
              cx={RIM_X}
              cy={RIM_Y}
              rx={RIM_R}
              ry={6}
              fill="none"
              stroke="var(--crt-magenta)"
              strokeWidth={3}
              initial={{ opacity: 0, scaleX: 0.6 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              style={{ transformOrigin: `${RIM_X}px ${RIM_Y}px` }}
            />

            {/* Net — wiggles on swish */}
            <motion.path
              d={`M ${RIM_X - RIM_R + 2} ${RIM_Y} L ${RIM_X - 10} ${RIM_Y + 28} L ${RIM_X + 10} ${RIM_Y + 28} L ${RIM_X + RIM_R - 2} ${RIM_Y}`}
              fill="none"
              stroke="rgba(255,255,255,0.42)"
              strokeDasharray="2 2"
              initial={{ opacity: 0 }}
              animate={
                phase === 'swish'
                  ? { opacity: 1, scaleY: [1, 1.18, 0.94, 1] }
                  : { opacity: 1 }
              }
              transition={
                phase === 'swish'
                  ? { duration: 0.45, ease: 'easeOut' }
                  : { duration: 0.3, delay: 0.2 }
              }
              style={{ transformOrigin: `${RIM_X}px ${RIM_Y}px` }}
            />

            {/* Ball trail (subtle ghosts) */}
            {[0.06, 0.12, 0.18].map((delay, i) => (
              <motion.circle
                key={`trail-${i}`}
                r={BALL_R - i * 1.5}
                fill="#ff8a1c"
                opacity={0.3 - i * 0.08}
                initial={{ cx: BALL_START_X, cy: BALL_START_Y }}
                animate={{
                  cx: [BALL_START_X, COURT_W * 0.62, RIM_X],
                  cy: [BALL_START_Y, RIM_Y - 38, RIM_Y + 14],
                }}
                transition={{
                  duration: ARC_DURATION,
                  times: [0, 0.55, 1],
                  ease: 'easeOut',
                  delay: 0.25 + delay,
                }}
              />
            ))}

            {/* Basketball */}
            <motion.circle
              r={BALL_R}
              fill="#ff8a1c"
              stroke="#7a2f00"
              strokeWidth={1}
              initial={{ cx: BALL_START_X, cy: BALL_START_Y }}
              animate={{
                cx: [BALL_START_X, COURT_W * 0.62, RIM_X],
                cy: [BALL_START_Y, RIM_Y - 38, RIM_Y + 14],
              }}
              transition={{
                duration: ARC_DURATION,
                times: [0, 0.55, 1],
                ease: 'easeOut',
                delay: 0.25,
              }}
            />

            {/* Ball seams (faint) — orbits with the ball */}
            <motion.line
              x1={BALL_START_X - BALL_R}
              y1={BALL_START_Y}
              x2={BALL_START_X + BALL_R}
              y2={BALL_START_Y}
              stroke="#7a2f00"
              strokeWidth={0.8}
              opacity={0.6}
              initial={{ x1: BALL_START_X - BALL_R, y1: BALL_START_Y, x2: BALL_START_X + BALL_R, y2: BALL_START_Y }}
              animate={{
                x1: [BALL_START_X - BALL_R, COURT_W * 0.62 - BALL_R, RIM_X - BALL_R],
                y1: [BALL_START_Y, RIM_Y - 38, RIM_Y + 14],
                x2: [BALL_START_X + BALL_R, COURT_W * 0.62 + BALL_R, RIM_X + BALL_R],
                y2: [BALL_START_Y, RIM_Y - 38, RIM_Y + 14],
              }}
              transition={{
                duration: ARC_DURATION,
                times: [0, 0.55, 1],
                ease: 'easeOut',
                delay: 0.25,
              }}
            />

            {/* SWISH! flash */}
            <AnimatePresence>
              {phase === 'swish' && (
                <motion.text
                  key="swish"
                  x={RIM_X}
                  y={RIM_Y + 78}
                  textAnchor="middle"
                  fontFamily="var(--font-display)"
                  fontSize={28}
                  fill="var(--phosphor)"
                  initial={{ opacity: 0, scale: 0.6, y: RIM_Y + 90 }}
                  animate={{ opacity: 1, scale: 1, y: RIM_Y + 78 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 20 }}
                  style={{ filter: 'drop-shadow(0 0 14px rgba(179,71,255,0.8))' }}
                >
                  SWISH!
                </motion.text>
              )}
            </AnimatePresence>

            {/* Sparkles bursting from rim on swish */}
            {phase === 'swish' &&
              Array.from({ length: 6 }).map((_, i) => {
                const angle = (i / 6) * Math.PI * 2
                const r = 36
                return (
                  <motion.circle
                    key={`spark-${i}`}
                    cx={RIM_X}
                    cy={RIM_Y + 14}
                    r={1.6}
                    fill="var(--phosphor)"
                    initial={{ opacity: 1, cx: RIM_X, cy: RIM_Y + 14 }}
                    animate={{
                      opacity: 0,
                      cx: RIM_X + Math.cos(angle) * r,
                      cy: RIM_Y + 14 + Math.sin(angle) * r,
                    }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                )
              })}
          </svg>

          {/* Skip hint */}
          <p className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.22em] text-subtle-foreground">
            press any key to skip
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
