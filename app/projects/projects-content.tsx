'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Github } from 'lucide-react'
import { ProjectCard } from '@/components/organisms/project-card'
import { Section, SectionHeader } from '@/components/templates/section'
import { featuredProjectOrder, projects } from '@/lib/data'

export function ProjectsContent() {
  const featuredProjects = projects
    .filter((project) => project.featured)
    .sort((a, b) => featuredProjectOrder.indexOf(a.id) - featuredProjectOrder.indexOf(b.id))
  const supportingProjects = projects.filter((project) => !project.featured)

  return (
    <>
      <section className="relative overflow-hidden px-4 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8">
        <div className="absolute inset-0 aurora-backdrop opacity-80" />
        <div className="absolute inset-0 grid-pattern opacity-30" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <span className="section-label">Projects</span>
            <h1 className="mt-5 text-4xl font-semibold leading-[0.94] tracking-[-0.06em] text-foreground sm:text-[4.1rem]">
              Projects that best represent my work.
            </h1>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
              Flagship projects first, followed by a smaller set of supporting work.
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

          <div className="grid gap-4">
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
            description="Smaller or earlier projects that still add useful range."
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {supportingProjects.map((project, index) => {
              const preview = project.gallery?.find((item) => item.src)

              return (
                <motion.article
                  key={project.id}
                  initial={false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.42, delay: index * 0.08 }}
                  className="glass-panel rounded-[24px] p-5"
                >
                  {preview?.src && (
                    <div className="project-visual mb-4 rounded-[18px] border border-white/8">
                      <div className="relative aspect-[16/10] overflow-hidden rounded-[18px]">
                        <Image
                          src={preview.src}
                          alt={preview.alt}
                          fill
                          sizes="(max-width: 1280px) 100vw, 32vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/72 via-black/16 to-transparent p-4">
                          <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-white/75">
                            {preview.label}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-primary/90">{project.category}</p>
                  <h3 className="mt-3 text-xl font-semibold text-foreground">{project.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.description}</p>
                  <p className="mt-2.5 text-sm font-medium text-foreground/92">{project.proofLine}</p>

                  <div className="mt-4 grid grid-cols-2 gap-2.5">
                    {project.metrics.slice(0, 2).map((metric) => (
                      <div key={`${project.id}-${metric.label}`} className="metric-pill rounded-2xl px-4 py-3">
                        <p className="text-lg font-semibold text-foreground">{metric.value}</p>
                        <p className="mt-1 text-[0.68rem] font-mono uppercase tracking-[0.16em] text-muted-foreground">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2.5">
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
              )
            })}
          </div>
        </div>
      </Section>
    </>
  )
}
