'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const floatingStats = [
  { value: '20', label: 'WAU', delay: 0.6 },
  { value: '10,838', label: 'Games', delay: 0.8 },
  { value: '8', label: 'Leagues', delay: 1.0 },
]

export function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[280px] sm:w-[300px]">
      {/* Glow behind phone */}
      <div className="absolute inset-0 -z-10 scale-110 rounded-[3rem] bg-gradient-to-br from-[#43d7ff]/20 via-transparent to-[#12b981]/20 blur-3xl" />

      {/* Phone frame */}
      <div className="phone-frame relative overflow-hidden rounded-[2.5rem] border-[3px] border-white/15 bg-black shadow-[0_0_60px_-20px_rgba(67,215,255,0.3)]">
        {/* Notch */}
        <div className="absolute left-1/2 top-0 z-20 h-6 w-28 -translate-x-1/2 rounded-b-2xl bg-black" />

        {/* Screen content */}
        <div className="relative aspect-[9/19.5] overflow-hidden">
          <Image
            src="/projects/buzzr-home.png"
            alt="Buzzr app home screen showing live sports ratings and entertainment scores"
            fill
            sizes="300px"
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Floating stat badges */}
      {floatingStats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: stat.delay, ease: 'easeOut' }}
          className={`absolute z-10 rounded-2xl border border-white/12 bg-black/80 px-3 py-2 backdrop-blur-md ${
            i === 0
              ? '-left-16 top-[20%] sm:-left-20'
              : i === 1
                ? '-right-16 top-[45%] sm:-right-20'
                : '-left-12 bottom-[20%] sm:-left-16'
          }`}
        >
          <p className="font-display text-lg font-semibold text-[#43d7ff]">{stat.value}</p>
          <p className="text-[0.6rem] font-mono uppercase tracking-[0.18em] text-muted-foreground">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  )
}
