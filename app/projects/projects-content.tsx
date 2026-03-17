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
      {/* Hero */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="absolute inset-0 animated-gradient opacity-50" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-mono tracking-wider text-primary uppercase mb-4">
              Portfolio
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
              Projects
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl">
              This is the small set of projects I would actually want a recruiter or hiring manager to read. The goal is not to show everything I have touched. It is to show the work that feels most real.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Flagship Projects */}
      <Section className="bg-background pt-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Flagship Work"
            title="Featured Projects"
            description="Together, these four projects show the range I care most about: product work, backend APIs, data-heavy applications, and AI features that belong inside a real product."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

      {/* Project Categories */}
      <Section className="bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Categories"
            title="Core domains"
            description="A simple way to understand the kind of work I tend to do best."
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {projectDomains.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <h3 className="font-semibold text-foreground mb-2">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {supportingProjects.length > 0 && (
        <Section className="bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              badge="Additional Depth"
              title="Specialized supporting work"
              description="Useful extra depth, but not where I want someone to start."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
