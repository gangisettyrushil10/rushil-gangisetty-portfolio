'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { createContext, type CSSProperties, type ReactNode } from 'react'

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

export function RevealGroup({
  children,
  stagger = 0.06,
  delayChildren = 0.05,
  className,
  style,
  amount = 0.15,
  once = true,
}: RevealGroupProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    )
  }

  return (
    <RevealGroupContext.Provider value={true}>
      <motion.div
        className={className}
        style={style}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount, margin: '-8% 0px' }}
        variants={{
          visible: {
            transition: { staggerChildren: stagger, delayChildren },
          },
        }}
      >
        {children}
      </motion.div>
    </RevealGroupContext.Provider>
  )
}
