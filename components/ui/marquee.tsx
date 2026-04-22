'use client'

import { cn } from '@/lib/utils'

interface MarqueeProps {
  items: string[]
  className?: string
}

export function Marquee({ items, className }: MarqueeProps) {
  const sequence = [...items, ...items]

  return (
    <div className={cn('marquee py-4', className)} aria-hidden>
      <div className="marquee-track">
        {sequence.map((item, i) => (
          <span key={`${item}-${i}`} className="marquee-item">
            <span>{item}</span>
            <span className="marquee-sep" />
          </span>
        ))}
      </div>
    </div>
  )
}
