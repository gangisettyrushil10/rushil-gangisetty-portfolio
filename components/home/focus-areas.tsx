'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, BrainCircuit, Database, Layers3, ServerCog } from 'lucide-react'
import { Section, SectionHeader } from '@/components/section'
import { focusAreas } from '@/lib/data'

const icons = [Layers3, ServerCog, Database, BrainCircuit]
const accentClasses = [
  'from-primary/18 to-primary/6 text-primary',
  'from-accent/18 to-accent/6 text-accent',
  'from-primary/18 to-accent/8 text-primary',
  'from-accent/18 to-primary/6 text-accent',
]

export function FocusAreas() {
  return (
    <Section className="bg-secondary/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Where I Fit Best"
          title="The work tends to cluster in four lanes"
          description="I can apply broadly, but this is the honest read of the portfolio. These are the patterns that keep showing up across the projects and internships."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {focusAreas.map((area, index) => {
            const Icon = icons[index] ?? Layers3
            const accentClass = accentClasses[index] ?? accentClasses[0]

            return (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="case-study-shell rounded-[26px]"
              >
                <div className="relative overflow-hidden p-6 sm:p-7">
                  <div className="window-grid absolute inset-0 opacity-30" />
                  <div className="relative z-10 flex h-full flex-col justify-between gap-10">
                    <div className="flex items-start justify-between gap-4">
                      <div className={`inline-flex rounded-2xl bg-gradient-to-br p-3 ${accentClass}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[0.68rem] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                        Proof: {area.proof}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display text-2xl font-semibold text-foreground sm:text-[2rem]">
                        {area.title}
                      </h3>
                      <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-[0.98rem]">
                        {area.description}
                      </p>
                    </div>

                    <Link
                      href={area.href}
                      className="inline-flex items-center gap-2 text-sm text-foreground transition-colors hover:text-primary"
                    >
                      Open supporting project
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
