'use client'

import type { CSSProperties, ElementType, ReactNode } from 'react'
import { useReveal } from '@/hooks/use-reveal'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: ReactNode
  as?: ElementType
  delay?: number
  className?: string
  style?: CSSProperties
}

export function Reveal({ children, as: Component = 'div', delay = 0, className, style }: RevealProps) {
  const ref = useReveal<HTMLElement>()

  return (
    <Component
      ref={ref}
      className={cn('reveal', className)}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Component>
  )
}
