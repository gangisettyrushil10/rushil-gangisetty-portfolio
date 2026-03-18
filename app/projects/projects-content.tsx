'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Github } from 'lucide-react'
import { ProjectCard } from '@/components/project-card'
import { Section, SectionHeader } from '@/components/section'
import { projects } from '@/lib/data'

export function ProjectsContent() {
  const featuredProjects = projects.filter((project) => project.featured)
  const supportingProjects = projects.filter((project) => !project.featured)

  return (
    <>
      <section className="relative overflow-hidden px-4 pb-18 pt-32 sm:px-6 sm:pb-22 sm:pt-40 lg:px-8">
        <div className="absolute inset-0 aurora-backdrop opacity-80" />
        <div className="absolute inset-0 grid-pattern opacity-30" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <span className="section-label">Projects</span>
            <h1 className="mt-6 text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-foreground sm:text-[5rem]">
              A curated view of the work that best represents my current level.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground sm:text-[1.06rem]">
              This page is intentionally selective. The flagship projects lead with the clearest signal, and the supporting work provides additional context without crowding the story.
            </p>
          </div>
        </div>
      </section>

      <Section className="pt-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Flagship Work"
            title="Start with these four projects."
            description="They provide the most accurate picture of how I build across product software, backend workflows, data-intensive systems, and applied AI."
          />

          <div className="grid gap-6">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-[rgba(4,4,5,0.68)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Supporting Work"
            title="Additional GitHub context."
            description="These projects are smaller or earlier, but still useful for understanding range."
          />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {supportingProjects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.42, delay: index * 0.08 }}
                className="glass-panel rounded-[28px] p-6"
              >
                <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-primary/90">{project.category}</p>
                <h3 className="mt-4 text-2xl font-semibold text-foreground">{project.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{project.description}</p>
                <p className="mt-3 text-sm font-medium text-foreground/92">{project.recruiterAngle}</p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  {project.metrics.slice(0, 2).map((metric) => (
                    <div key={`${project.id}-${metric.label}`} className="metric-pill rounded-2xl px-4 py-3">
                      <p className="text-lg font-semibold text-foreground">{metric.value}</p>
                      <p className="mt-1 text-[0.68rem] font-mono uppercase tracking-[0.16em] text-muted-foreground">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href={`/projects/${project.id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-foreground transition hover:border-white/18 hover:bg-white/8"
                  >
                    Case study
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-foreground transition hover:border-white/18 hover:bg-white/8"
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </Section>
    </>
  )
}
