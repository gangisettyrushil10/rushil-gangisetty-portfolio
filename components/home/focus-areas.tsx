'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, BrainCircuit, Database, Layers3, ServerCog } from 'lucide-react'
import { Section, SectionHeader } from '@/components/section'
import { focusAreas } from '@/lib/data'

const icons = [Layers3, ServerCog, Database, BrainCircuit]

export function FocusAreas() {
  return (
    <Section className="bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Core Lanes"
          title="A few ways to think about my work"
          description="I can apply broadly, but these are the lanes that line up most honestly with the projects on this site."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {focusAreas.map((area, index) => {
            const Icon = icons[index] ?? Layers3

            return (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="soft-spotlight rounded-2xl border border-border bg-card p-6 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="p-3 rounded-xl bg-secondary text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    {area.proof}
                  </span>
                </div>

                <h3 className="font-display mt-5 text-xl sm:text-[1.45rem] font-semibold text-foreground">
                  {area.title}
                </h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  {area.description}
                </p>

                <Link
                  href={area.href}
                  className="mt-5 inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  See project
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
