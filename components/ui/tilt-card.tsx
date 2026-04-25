'use client'

import { cn } from '@/lib/utils'
import type { CSSProperties, ReactNode } from 'react'

/**
 * TiltCard — after the perf triage, this is a CSS-only hover scale,
 * not a cursor-tracking 3D tilt. The framer-motion + useTilt approach
 * was costly when 5+ instances all subscribed motion values and pointer
 * listeners. Visual remains: a small lift on hover.
 */
interface TiltCardProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  // Legacy props kept for source compat — ignored.
  maxTilt?: number
  scale?: number
}

export function TiltCard({ children, className, style }: TiltCardProps) {
  return (
    <div className={cn('tilt-card', className)} style={style}>
      {children}
    </div>
  )
}

interface TiltDepthProps {
  children: ReactNode
  depth?: number
  className?: string
  style?: CSSProperties
}

export function TiltDepth({ children, className, style }: TiltDepthProps) {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}
