'use client'

import { motion } from 'framer-motion'
import { Section, SectionHeader } from '@/components/section'
import { ProjectCard } from '@/components/project-card'
import { projectDomains, projects } from '@/lib/data'

export function ProjectsContent() {
  const flagshipProjects = projects.filter((p) => p.featured)
  const supportingProjects = projects.filter((p) => !p.featured)

  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-40">
        <div className="absolute inset-0 animated-gradient opacity-80" />
        <div className="absolute inset-0 hero-noise opacity-80" />
        <div className="absolute inset-0 grid-pattern opacity-35" />
        <div className="absolute inset-0 arcade-scanlines opacity-15" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-block rounded-full border border-white/10 bg-black/25 px-4 py-2 text-[0.72rem] font-mono uppercase tracking-[0.22em] text-primary/90 backdrop-blur">
              Projects
            </span>
            <h1 className="mt-6 font-display text-5xl font-semibold tracking-[-0.05em] text-foreground sm:text-[4.25rem]">
              Projects I would actually want a recruiter to open.
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-[1.08rem]">
              This is not everything I have touched. It is the smaller set of work that gives the clearest read on how I build: product surfaces, backend systems, data workflows, and AI features that sit inside real software.
            </p>
          </motion.div>
        </div>
      </section>

      <Section className="bg-background pt-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Flagship Work"
            title="Start here"
            description="If you only have a few minutes, these are the projects that tell the story best."
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {flagshipProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                featured={index === 0}
              />
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-secondary/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Lanes"
            title="The kinds of problems underneath the project list"
            description="A simple way to read the portfolio without turning it into a wall of job titles."
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {projectDomains.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="case-study-shell rounded-[24px] p-5"
              >
                <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-primary/85">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{category.name}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{category.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {supportingProjects.length > 0 && (
        <Section className="bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              badge="Additional Depth"
              title="Supporting work"
              description="Still useful context, just not where I would want someone to start on a first pass."
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {supportingProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          </div>
        </Section>
      )}
    </>
  )
}
