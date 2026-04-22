'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TextCycleProps {
  words: string[]
  intervalMs?: number
  className?: string
}

export function TextCycle({ words, intervalMs = 2800, className }: TextCycleProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (words.length < 2) return
    const id = setInterval(() => setIndex((prev) => (prev + 1) % words.length), intervalMs)
    return () => clearInterval(id)
  }, [words.length, intervalMs])

  return (
    <span className={cn('relative inline-block align-baseline', className)} aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
          transition={{ duration: 0.45, ease: [0, 0, 0.2, 1] }}
          className="inline-block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
