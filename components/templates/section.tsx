'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className={cn('py-14 sm:py-18', className)}
    >
      {children}
    </motion.section>
  )
}

interface SectionHeaderProps {
  badge?: string
  title: string
  description?: string
  className?: string
}

export function SectionHeader({ badge, title, description, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-8 max-w-3xl sm:mb-10', className)}>
      {badge && (
        <motion.span
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="section-label"
        >
          {badge}
        </motion.span>
      )}
      <motion.h2
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, delay: 0.06 }}
        className="mt-4 text-2xl font-semibold leading-[0.98] tracking-[-0.05em] text-foreground sm:text-[2.45rem]"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, delay: 0.12 }}
          className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base"
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
