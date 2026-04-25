'use client'

import type { CSSProperties, ReactNode } from 'react'

// Pass-through after perf triage — useScroll + useTransform on every
// mounted Parallax was adding scroll-listener cost.
interface ParallaxProps {
  children: ReactNode
  speed?: number
  className?: string
  style?: CSSProperties
}

export function Parallax({ children, className, style }: ParallaxProps) {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}
