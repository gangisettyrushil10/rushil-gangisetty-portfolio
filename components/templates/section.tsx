'use client'

import { Reveal } from '@/components/ui/reveal'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn('py-12 sm:py-16', className)}>
      {children}
    </section>
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
    <Reveal className={cn('mb-8 max-w-3xl', className)}>
      {badge && <span className="section-label">{badge}</span>}
      <h2 className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-[2.1rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[15px] leading-7 text-muted-foreground">{description}</p>
      )}
    </Reveal>
  )
}
