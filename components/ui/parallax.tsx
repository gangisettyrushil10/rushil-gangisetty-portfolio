'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef, type CSSProperties, type ReactNode } from 'react'

interface ParallaxProps {
  children: ReactNode
  speed?: number
  className?: string
  style?: CSSProperties
}

export function Parallax({ children, speed = 0.4, className, style }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, -120 * speed])

  if (prefersReducedMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    )
  }

  return (
    <motion.div ref={ref} className={className} style={{ ...style, y }}>
      {children}
    </motion.div>
  )
}
