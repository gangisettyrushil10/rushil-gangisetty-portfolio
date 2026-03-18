'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Github } from 'lucide-react'
import { ProjectCard } from '@/components/project-card'
import { Section, SectionHeader } from '@/components/section'
import { projectDomains, projects } from '@/lib/data'

export function ProjectsContent() {
  const featuredProjects = projects.filter((project) => project.featured)
  const supportingProjects = projects.filter((project) => !project.featured)

  return (
    <>
      <section className="relative overflow-hidden px-4 pb-18 pt-32 sm:px-6 sm:pb-22 sm:pt-40 lg:px-8">
        <div className="absolute inset-0 aurora-backdrop opacity-80" />
        <div className="absolute inset-0 grid-pattern opacity-30" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <span className="section-label">GitHub-first curation</span>
              <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-foreground sm:text-[5rem]">
                A smaller project list that says more.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-[1.06rem]">
                I went through the public work on my GitHub and rebuilt this page around the projects that best represent how I build right now.
                The goal is clarity, not volume.
              </p>
            </div>

            <div className="glass-panel rounded-[30px] p-6">
              <p className="text-[0.68rem] font-mono uppercase tracking-[0.2em] text-primary/90">How to read this page</p>
              <div className="mt-4 grid gap-3">
                {projectDomains.map((domain, index) => (
                  <div key={domain.name} className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-[0.68rem] font-mono uppercase tracking-[0.16em] text-accent">
                      0{index + 1}
                    </p>
                    <h2 className="mt-2 text-lg font-semibold text-foreground">{domain.name}</h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{domain.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section className="pt-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Selected Repos"
            title="The four projects that best represent my current level."
            description="These are the ones I would open in an interview, send to a hiring manager, or use to explain the kind of engineer I want to be."
          />

          <div className="grid gap-6">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} featured />
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-[rgba(7,10,22,0.36)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Supporting Work"
            title="Useful GitHub context, just not where I want a recruiter to start."
            description="These repos still show range. I simply do not want the portfolio buried under older experiments, utilities, or quieter internal-style projects."
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
                    Read more
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
