'use client'

import { motion, useMotionValue, useTransform, type MotionValue } from 'framer-motion'
import { createContext, useContext, type CSSProperties, type ReactNode } from 'react'
import { useTilt } from '@/hooks/use-tilt'
import { cn } from '@/lib/utils'

interface TiltContextValue {
  rotateX: MotionValue<number>
  rotateY: MotionValue<number>
  enabled: boolean
}

const TiltContext = createContext<TiltContextValue | null>(null)

interface TiltCardProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  maxTilt?: number
  scale?: number
}

export function TiltCard({
  children,
  className,
  style,
  maxTilt = 6,
  scale = 1.02,
}: TiltCardProps) {
  const tilt = useTilt<HTMLDivElement>({ maxTilt, scale })

  return (
    <TiltContext.Provider value={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, enabled: tilt.enabled }}>
      <motion.div
        ref={tilt.ref}
        className={cn(className)}
        style={{
          ...style,
          transformStyle: 'preserve-3d',
          perspective: 800,
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      >
        <motion.div
          style={{
            rotateX: tilt.rotateX,
            rotateY: tilt.rotateY,
            scale: tilt.scale,
            transformStyle: 'preserve-3d',
            height: '100%',
            width: '100%',
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </TiltContext.Provider>
  )
}

interface TiltDepthProps {
  children: ReactNode
  depth?: number
  className?: string
  style?: CSSProperties
}

export function TiltDepth({ children, depth = 1, className, style }: TiltDepthProps) {
  const ctx = useContext(TiltContext)
  const zero = useMotionValue(0)
  const rx = ctx?.rotateX ?? zero
  const ry = ctx?.rotateY ?? zero
  const tx = useTransform(ry, [-10, 10], [6 * depth, -6 * depth])
  const ty = useTransform(rx, [-10, 10], [-6 * depth, 6 * depth])

  if (!ctx?.enabled) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className={className}
      style={{ ...style, x: tx, y: ty, transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  )
}
