'use client'

import { motion } from 'framer-motion'
import { Building2, Code2, Database, Layout, Server, Wrench } from 'lucide-react'
import { Section, SectionHeader } from '@/components/section'
import { skills } from '@/lib/data'

const skillCategories = [
  { key: 'languages', label: 'Languages', icon: Code2, color: 'text-primary' },
  { key: 'frontend', label: 'Frontend & Product', icon: Layout, color: 'text-accent' },
  { key: 'backend', label: 'Backend APIs', icon: Server, color: 'text-primary' },
  { key: 'systems', label: 'Business Systems', icon: Building2, color: 'text-accent' },
  { key: 'data', label: 'Data & Analytics', icon: Database, color: 'text-primary' },
  { key: 'tools', label: 'Tools', icon: Wrench, color: 'text-primary' },
] as const

export function Skills() {
  return (
    <Section className="bg-secondary/14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Technical Strengths"
          title="A cleaner view of the stack"
          description="Grouped by how I actually work, not by how a keyword section usually looks."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = category.icon
            const skillList = skills[category.key]
            
            return (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="p-6 rounded-[24px] bg-card/84 border border-white/10 hover:border-white/16 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg bg-white/[0.04] ${category.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-foreground">{category.label}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm bg-white/[0.04] text-muted-foreground rounded-full hover:bg-white/[0.07] hover:text-foreground transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
