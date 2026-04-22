'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Github } from 'lucide-react'
import { ProjectCard } from '@/components/organisms/project-card'
import { Section, SectionHeader } from '@/components/templates/section'
import { Reveal } from '@/components/ui/reveal'
import { DashedDivider } from '@/components/ui/dashed-divider'
import { projects } from '@/lib/data'

export function ProjectsContent() {
  const featuredProjects = projects.filter((project) => project.featured)
  const supportingProjects = projects.filter((project) => !project.featured)

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 sm:pt-36">
      <Reveal>
        <span className="section-label">Projects</span>
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-[3.5rem]">
          Projects that best represent{' '}
          <span className="font-serif-italic text-accent">my work</span>.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
          Flagship projects first, followed by a smaller set of supporting work pulled from GitHub.
        </p>
      </Reveal>

      <DashedDivider className="my-12" />

      <SectionHeader
        badge="Flagship"
        title="Start with these five projects."
        description="They give the most accurate picture of how I build across product software, backend workflows, data-intensive systems, and applied AI."
      />

      <div className="grid gap-4">
        {featuredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      <Section>
        <SectionHeader
          badge="Supporting"
          title="Additional GitHub context."
          description="Smaller or earlier projects that still add useful range."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {supportingProjects.map((project, index) => {
            const preview = project.gallery?.find((item) => item.src)
            return (
              <Reveal key={project.id} delay={index * 60} className="bento-cell flex flex-col gap-3 p-5">
                {preview?.src && (
                  <div className="mb-1 overflow-hidden rounded-md border border-(--pill-border)">
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={preview.src}
                        alt={preview.alt}
                        fill
                        sizes="(max-width: 1280px) 100vw, 32vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-transparent to-transparent p-3">
                        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/85">
                          {preview.label}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <span className="section-label">{project.category}</span>
                <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground sm:text-xl">
                  {project.title}
                </h3>
                <p className="text-sm leading-6 text-muted-foreground">{project.description}</p>

                <div className="grid grid-cols-2 gap-2">
                  {project.metrics.slice(0, 2).map((metric) => (
                    <div
                      key={`${project.id}-${metric.label}`}
                      className="rounded-md border border-dashed border-(--pill-border) bg-bg-card-muted px-3 py-2"
                    >
                      <p className="text-base font-semibold text-foreground">{metric.value}</p>
                      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-subtle-foreground">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap gap-2">
                  <Link
                    href={`/projects/${project.id}`}
                    className="inline-flex items-center gap-2 rounded-lg border border-dashed border-(--pill-border) bg-bg-card px-3 py-1.5 text-sm text-foreground transition hover:border-(--border-strong)"
                  >
                    Case study
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-dashed border-(--pill-border) bg-bg-card px-3 py-1.5 text-sm text-foreground transition hover:border-(--border-strong)"
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                  )}
                </div>
              </Reveal>
            )
          })}
        </div>
      </Section>
    </div>
  )
}
