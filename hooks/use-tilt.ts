'use client'

import { useMotionValue, useReducedMotion, useSpring, type MotionValue } from 'framer-motion'
import { useEffect, useRef, type RefObject } from 'react'

interface TiltOptions {
  maxTilt?: number
  scale?: number
  stiffness?: number
  damping?: number
}

interface TiltReturn<T extends HTMLElement> {
  ref: RefObject<T | null>
  rotateX: MotionValue<number>
  rotateY: MotionValue<number>
  scale: MotionValue<number>
  enabled: boolean
}

export function useTilt<T extends HTMLElement = HTMLElement>(
  options: TiltOptions = {}
): TiltReturn<T> {
  const { maxTilt = 8, scale: hoverScale = 1.02, stiffness = 200, damping = 18 } = options
  const ref = useRef<T | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const rxRaw = useMotionValue(0)
  const ryRaw = useMotionValue(0)
  const sRaw = useMotionValue(1)
  const rotateX = useSpring(rxRaw, { stiffness, damping, mass: 0.6 })
  const rotateY = useSpring(ryRaw, { stiffness, damping, mass: 0.6 })
  const scale = useSpring(sRaw, { stiffness, damping, mass: 0.6 })

  useEffect(() => {
    if (prefersReducedMotion) return
    if (typeof window === 'undefined') return
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return

    const el = ref.current
    if (!el) return
    const node: T = el

    function onMove(e: PointerEvent) {
      const rect = node.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height
      const nx = px * 2 - 1
      const ny = py * 2 - 1
      ryRaw.set(nx * maxTilt)
      rxRaw.set(-ny * maxTilt)
    }

    function onEnter() {
      sRaw.set(hoverScale)
      node.style.willChange = 'transform'
    }

    function onLeave() {
      rxRaw.set(0)
      ryRaw.set(0)
      sRaw.set(1)
      node.style.willChange = ''
    }

    node.addEventListener('pointermove', onMove)
    node.addEventListener('pointerenter', onEnter)
    node.addEventListener('pointerleave', onLeave)
    return () => {
      node.removeEventListener('pointermove', onMove)
      node.removeEventListener('pointerenter', onEnter)
      node.removeEventListener('pointerleave', onLeave)
    }
  }, [maxTilt, hoverScale, prefersReducedMotion, rxRaw, ryRaw, sRaw])

  return { ref, rotateX, rotateY, scale, enabled: !prefersReducedMotion }
}
