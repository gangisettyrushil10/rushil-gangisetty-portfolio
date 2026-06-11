'use client'

import { motion } from 'framer-motion'
import { Sparkles, GraduationCap } from 'lucide-react'

export function CurrentlyBuilding() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45 }}
      className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6"
    >
      <div className="flex items-center gap-2 text-sm">
        <Sparkles className="h-3.5 w-3.5 text-[#7df9ff]" />
        <span className="text-muted-foreground">Currently building:</span>
        <span className="text-foreground">
          Fuzzy study workflows, PixelDraw generation polish, and Buzzr recommendations
        </span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <GraduationCap className="h-3.5 w-3.5 text-[#6ee7b7]" />
        <span className="text-muted-foreground">Next:</span>
        <span className="text-foreground">MS CS at UT Dallas, Aug 2026</span>
      </div>
    </motion.div>
  )
}
