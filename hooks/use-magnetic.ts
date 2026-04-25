'use client'

import { useMotionValue, useReducedMotion, useSpring, type MotionValue } from 'framer-motion'
import { useEffect, useRef, type RefObject } from 'react'

interface MagneticOptions {
  strength?: number
  radius?: number
  stiffness?: number
  damping?: number
}

interface MagneticReturn<T extends HTMLElement> {
  ref: RefObject<T | null>
  x: MotionValue<number>
  y: MotionValue<number>
}

export function useMagnetic<T extends HTMLElement = HTMLElement>(
  options: MagneticOptions = {}
): MagneticReturn<T> {
  const { strength = 8, radius = 140, stiffness = 250, damping = 22 } = options
  const ref = useRef<T | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const xRaw = useMotionValue(0)
  const yRaw = useMotionValue(0)
  const x = useSpring(xRaw, { stiffness, damping, mass: 0.6 })
  const y = useSpring(yRaw, { stiffness, damping, mass: 0.6 })

  useEffect(() => {
    if (prefersReducedMotion) return
    if (typeof window === 'undefined') return
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return

    const el = ref.current
    if (!el) return

    function onMove(e: PointerEvent) {
      const node = ref.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)

      if (dist > radius) {
        xRaw.set(0)
        yRaw.set(0)
        return
      }

      const pull = 1 - dist / radius
      xRaw.set((dx / dist || 0) * strength * pull)
      yRaw.set((dy / dist || 0) * strength * pull)
    }

    function onLeave() {
      xRaw.set(0)
      yRaw.set(0)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [strength, radius, prefersReducedMotion, xRaw, yRaw])

  return { ref, x, y }
}
