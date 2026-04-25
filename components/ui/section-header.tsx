'use client'

import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  label: string
  title: ReactNode
  cta?: { href: string; text: string }
  className?: string
}

export function SectionHeader({ label, title, cta, className }: SectionHeaderProps) {
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
