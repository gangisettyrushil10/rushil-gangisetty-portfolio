'use client'

import { motion } from 'framer-motion'
import { Building2, ArrowUpRight } from 'lucide-react'
import { Section, SectionHeader } from '@/components/section'
import { experiences } from '@/lib/data'

export function Experience() {
  return (
    <Section className="bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Experience"
          title="Where I've Worked"
          description="Production experience across SaaS platforms, data pipelines, and enterprise systems."
        />

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

          <div className="flex flex-col gap-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1/2 md:-translate-x-1/2 top-0 ring-4 ring-background" />

                {/* Content */}
                <div className={`flex-1 ml-6 md:ml-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                    <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <div className="p-2 rounded-lg bg-secondary text-primary">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground flex items-center gap-2">
                          {exp.company}
                          <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                        </h3>
                        <p className="text-sm text-muted-foreground">{exp.role} • {exp.period}</p>
                      </div>
                    </div>
                    
                    <ul className={`mt-4 flex flex-col gap-2 ${index % 2 === 0 ? 'md:items-end' : ''}`}>
                      {exp.bullets.map((bullet, bulletIndex) => (
                        <li key={bulletIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                          <span className={index % 2 === 0 ? 'md:text-right' : ''}>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {exp.stack && (
                      <div className={`flex flex-wrap gap-2 mt-4 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                        {exp.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs font-mono bg-muted text-muted-foreground rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
