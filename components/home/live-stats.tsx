'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface StatItem {
  value: number
  suffix?: string
  prefix?: string
  label: string
  format?: 'number' | 'percent'
}

const stats: StatItem[] = [
  { value: 20, label: 'Weekly active users', format: 'number' },
  { value: 10838, label: 'Live games tracked', format: 'number' },
  { value: 8, label: 'Leagues covered', format: 'number' },
  { value: 100, label: 'Week-1 retention', suffix: '%', format: 'percent' },
]

function useCountUp(target: number, duration = 1800, startDelay = 200) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true

          const timeout = setTimeout(() => {
            const start = performance.now()
            const step = (now: number) => {
              const elapsed = now - start
              const progress = Math.min(elapsed / duration, 1)
              const eased = 1 - Math.pow(1 - progress, 3)
              setCount(Math.floor(eased * target))
              if (progress < 1) requestAnimationFrame(step)
            }
            requestAnimationFrame(step)
          }, startDelay)

          return () => clearTimeout(timeout)
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration, startDelay])

  return { count, ref }
}

function formatNumber(n: number): string {
  return n.toLocaleString('en-US')
}

export function LiveStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="grid grid-cols-2 gap-3 lg:grid-cols-4"
    >
      {stats.map((stat, i) => (
        <StatCard key={stat.label} stat={stat} index={i} />
      ))}
    </motion.div>
  )
}

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const { count, ref } = useCountUp(stat.value, 1800, index * 150)

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur"
    >
      <div className="flex items-baseline gap-1">
        <span className="font-display text-2xl font-semibold text-foreground">
          {stat.prefix}
          {formatNumber(count)}
          {stat.suffix}
        </span>
      </div>
      <div className="mt-1 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#12b981] shadow-[0_0_8px_rgba(18,185,129,0.6)]" />
        <span className="text-[0.68rem] font-mono uppercase tracking-[0.16em] text-muted-foreground">
          {stat.label}
        </span>
      </div>
    </div>
  )
}
