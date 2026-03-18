'use client'

import { motion } from 'framer-motion'
import { Building2 } from 'lucide-react'
import { Section, SectionHeader } from '@/components/section'
import { experiences } from '@/lib/data'

export function Experience() {
  return (
    <Section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Experience"
          title="Where the same instincts showed up in real work"
          description="The internships reinforce the same story as the projects: ship useful software, handle messy data honestly, and leave the workflow more reliable than you found it."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {experiences.map((exp, index) => (
            <motion.article
              key={exp.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="case-study-shell rounded-[26px]"
            >
              <div className="relative h-full overflow-hidden p-6 sm:p-7">
                <div className="window-grid absolute inset-0 opacity-30" />
                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div className="inline-flex rounded-2xl bg-primary/12 p-3 text-primary">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[0.68rem] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                      {exp.period}
                    </span>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-2xl font-semibold text-foreground">{exp.company}</h3>
                    <p className="mt-2 text-sm font-mono uppercase tracking-[0.18em] text-accent">{exp.role}</p>
                  </div>

                  <ul className="mt-6 flex flex-1 flex-col gap-3">
                    {exp.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {exp.stack && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {exp.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[0.68rem] font-mono uppercase tracking-[0.14em] text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  )
}
