'use client'

import { useReveal } from '@/hooks/use-reveal'
import { cn } from '@/lib/utils'

export function DashedDivider({ className }: { className?: string }) {
  const ref = useReveal<HTMLHRElement>()
  return <hr ref={ref} className={cn('dashed-divider', className)} />
}
