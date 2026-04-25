'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ScrollPinBandProps {
  children: ReactNode
  height?: string
  className?: string
}

export function ScrollPinBand({ children, height = '220vh', className }: ScrollPinBandProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0.18, 0.55, 1.0], [1, 1.04, 1])
  const y = useTransform(scrollYProgress, [0.18, 0.55, 1.0], [0, -20, 0])
  const opacity = useTransform(scrollYProgress, [0.55, 1.0], [1, 0.85])

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <div ref={ref} style={{ height }} className={cn('relative', className)}>
      <div className="sticky top-[10vh]">
        <motion.div style={{ scale, y, opacity }}>{children}</motion.div>
      </div>
    </div>
  )
}
