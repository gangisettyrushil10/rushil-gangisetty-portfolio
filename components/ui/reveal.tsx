'use client'

import { createElement, type CSSProperties, type ElementType, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Reveal — was a framer-motion springy entrance wrapper. After the perf
 * triage, it just renders its children inside the requested element with
 * no animation. The API stays drop-in so existing call sites keep working.
 */
interface RevealProps {
  children: ReactNode
  as?: ElementType
  delay?: number
  className?: string
  style?: CSSProperties
  // Legacy props kept for source compatibility but ignored.
  y?: number
  spring?: 'soft' | 'snappy' | 'bouncy'
  once?: boolean
  amount?: number
}

export function Reveal({ children, as = 'div', className, style }: RevealProps) {
  return createElement(as, { className: cn(className), style }, children)
}
