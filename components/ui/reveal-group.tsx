'use client'

import { createContext, type CSSProperties, type ReactNode } from 'react'

// Context kept for source compatibility with any caller importing it,
// even though Reveal no longer reads from it after the perf triage.
export const RevealGroupContext = createContext<boolean>(false)

interface RevealGroupProps {
  children: ReactNode
  stagger?: number
  delayChildren?: number
  className?: string
  style?: CSSProperties
  amount?: number
  once?: boolean
}

export function RevealGroup({ children, className, style }: RevealGroupProps) {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}
