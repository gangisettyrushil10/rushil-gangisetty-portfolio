'use client'

import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  label: string
  title: ReactNode
  cta?: { href: string; text: string }
  className?: string
}

export function SectionHeader({ label, title, cta, className }: SectionHeaderProps) {
  const ref = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.95', 'start 0.55'],
  })
  const titleScale = useTransform(scrollYProgress, [0, 1], [0.92, 1])
  const titleOpacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const labelX = useTransform(scrollYProgress, [0, 1], [-8, 0])
  const labelOpacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  if (prefersReducedMotion) {
    return (
      <header className={cn('flex items-end justify-between gap-4 pb-6', className)}>
        <div>
          <span className="section-label">{label}</span>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
            {title}
          </h2>
        </div>
        {cta && (
          <Link
            href={cta.href}
            className="hidden items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground sm:inline-flex"
          >
            {cta.text}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        )}
      </header>
    )
  }

  return (
    <header ref={ref} className={cn('flex items-end justify-between gap-4 pb-6', className)}>
      <div>
        <motion.span
          className="section-label inline-block"
          style={{ x: labelX, opacity: labelOpacity }}
        >
          {label}
        </motion.span>
        <motion.h2
          className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl"
          style={{ scale: titleScale, opacity: titleOpacity, transformOrigin: 'left center' }}
        >
          {title}
        </motion.h2>
      </div>
      {cta && (
        <Link
          href={cta.href}
          className="hidden items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground sm:inline-flex"
        >
          {cta.text}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      )}
    </header>
  )
}
