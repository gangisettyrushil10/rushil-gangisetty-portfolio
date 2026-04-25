'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { useContext, type CSSProperties, type ElementType, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { RevealGroupContext } from '@/components/ui/reveal-group'

type SpringPreset = 'soft' | 'snappy' | 'bouncy'

const SPRINGS: Record<SpringPreset, { type: 'spring'; stiffness: number; damping: number; mass: number }> = {
  soft: { type: 'spring', stiffness: 220, damping: 26, mass: 0.9 },
  snappy: { type: 'spring', stiffness: 380, damping: 30, mass: 0.7 },
  bouncy: { type: 'spring', stiffness: 260, damping: 18, mass: 1.0 },
}

const motionMap: Record<string, ElementType> = {
  div: motion.div,
  header: motion.header,
  section: motion.section,
  article: motion.article,
  aside: motion.aside,
  footer: motion.footer,
  main: motion.main,
  nav: motion.nav,
  span: motion.span,
  ul: motion.ul,
  li: motion.li,
}

interface RevealProps {
  children: ReactNode
  as?: keyof typeof motionMap
  delay?: number
  className?: string
  style?: CSSProperties
  y?: number
  spring?: SpringPreset
  once?: boolean
  amount?: number
}

export function Reveal({
  children,
  as = 'div',
  delay = 0,
  className,
  style,
  y = 18,
  spring = 'soft',
  once = true,
  amount = 0.15,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion()
  const inGroup = useContext(RevealGroupContext)
  const Component = motionMap[as] ?? motion.div

  if (prefersReducedMotion) {
    return (
      <Component className={className} style={style}>
        {children}
      </Component>
    )
  }

  const transition = { ...SPRINGS[spring], delay: delay / 1000 }

  if (inGroup) {
    const variants: Variants = {
      hidden: { opacity: 0, y },
      visible: { opacity: 1, y: 0, transition },
    }
    return (
      <Component className={cn(className)} style={style} variants={variants}>
        {children}
      </Component>
    )
  }

  return (
    <Component
      className={cn(className)}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount, margin: '-8% 0px' }}
      transition={transition}
    >
      {children}
    </Component>
  )
}
