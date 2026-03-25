'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Sparkles } from 'lucide-react'

const buildSteps = [
  { label: 'Research', done: true },
  { label: 'Prototype', done: true },
  { label: 'Integration', done: false },
  { label: 'Ship', done: false },
]

export function CurrentlyBuilding() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Building card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45 }}
          className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#43d7ff]" />
            <span className="text-[0.68rem] font-mono uppercase tracking-[0.2em] text-[#43d7ff]">
              Currently building
            </span>
          </div>
          <p className="mt-3 text-sm font-medium text-foreground">
            Collaborative filtering recommendation engine for Buzzr
          </p>
          <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
            Using user rating patterns to recommend games each person would find most entertaining.
          </p>

          {/* Progress steps */}
          <div className="mt-4 flex items-center gap-1">
            {buildSteps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      step.done
                        ? 'bg-[#12b981] shadow-[0_0_8px_rgba(18,185,129,0.5)]'
                        : 'border border-white/20 bg-white/5'
                    }`}
                  />
                  <span className={`mt-1.5 text-[0.58rem] font-mono uppercase tracking-[0.12em] ${
                    step.done ? 'text-[#12b981]' : 'text-muted-foreground/60'
                  }`}>
                    {step.label}
                  </span>
                </div>
                {i < buildSteps.length - 1 && (
                  <div className={`mb-4 h-[1px] w-6 sm:w-8 ${step.done ? 'bg-[#12b981]/40' : 'bg-white/8'}`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Next up card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5"
        >
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-[#9d8cff]" />
            <span className="text-[0.68rem] font-mono uppercase tracking-[0.2em] text-[#9d8cff]">
              Next chapter
            </span>
          </div>
          <p className="mt-3 text-sm font-medium text-foreground">
            M.S. in Computer Science at UT Dallas
          </p>
          <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
            Starting August 2026. Focused on deepening ML, systems, and research fundamentals.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#9d8cff]/20 bg-[#9d8cff]/8 px-3 py-1 text-[0.65rem] font-mono uppercase tracking-[0.16em] text-[#9d8cff]">
            Aug 2026
          </div>
        </motion.div>
      </div>
    </div>
  )
}
