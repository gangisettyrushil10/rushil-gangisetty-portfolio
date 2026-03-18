'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink, Github, Play } from 'lucide-react'
import { Section, SectionHeader } from '@/components/section'
import { Button } from '@/components/ui/button'
import { projects } from '@/lib/data'
import { cn } from '@/lib/utils'

function getPreviewSrc(project: (typeof projects)[number]) {
  return project.gallery?.find((item) => item.src)
}

export function FeaturedProjects() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 4)

  return (
    <Section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            badge="Deep Dives"
            title="Projects worth spending a few minutes on"
            description="The homepage gives the quick read. These are the projects that carry the full argument: product judgment, backend discipline, data work, and AI that stays grounded in a real workflow."
            className="mb-0 max-w-3xl"
          />
          <Button asChild variant="outline" className="border-white/12 bg-white/[0.03] hover:bg-white/[0.06]">
            <Link href="/projects">
              View all projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-12 space-y-8">
          {featuredProjects.map((project, index) => {
            const preview = getPreviewSrc(project)
            const primaryExternal = project.liveUrl ?? project.video?.url ?? project.githubUrl
            const reverse = index % 2 === 1

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="case-study-shell rounded-[30px]"
              >
                <div className={cn('grid gap-6 p-5 sm:p-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:p-8', reverse && 'lg:grid-cols-[0.95fr_1.05fr]')}>
                  <div className={cn('space-y-6', reverse && 'lg:order-2')}>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[0.68rem] font-mono uppercase tracking-[0.18em] text-primary/90">
                        {String(index + 1).padStart(2, '0')} • {project.category}
                      </span>
                      <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[0.68rem] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                        {project.status}
                      </span>
                    </div>

                    <div>
                      <p className="text-[0.72rem] font-mono uppercase tracking-[0.22em] text-accent">{project.role}</p>
                      <h3 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground sm:text-[2.4rem]">
                        {project.title}
                      </h3>
                      <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
                        {project.description}
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {project.outcomes.slice(0, 2).map((outcome) => (
                        <div key={outcome} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 backdrop-blur">
                          <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-muted-foreground">Why it matters</p>
                          <p className="mt-2 text-sm leading-6 text-foreground/90">{outcome}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.metrics.map((metric) => (
                        <div key={`${project.id}-${metric.label}`} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
                          <span className="text-sm font-semibold text-foreground">{metric.value}</span>
                          <span className="ml-2 text-[0.68rem] font-mono uppercase tracking-[0.14em] text-muted-foreground">{metric.label}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.stack.slice(0, 6).map((item) => (
                        <span
                          key={`${project.id}-${item}`}
                          className="rounded-full border border-white/10 bg-transparent px-3 py-1.5 text-[0.7rem] font-mono uppercase tracking-[0.14em] text-muted-foreground"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3 pt-2">
                      <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                        <Link href={`/projects/${project.id}`}>
                          Read deep dive
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      {primaryExternal && (
                        <Button asChild variant="outline" className="border-white/12 bg-white/[0.03] hover:bg-white/[0.06]">
                          <a href={primaryExternal} target="_blank" rel="noopener noreferrer">
                            {project.video?.url && !project.liveUrl ? <Play className="mr-2 h-4 w-4" /> : <ExternalLink className="mr-2 h-4 w-4" />}
                            {project.liveUrl ? 'Open live link' : project.video?.url ? 'Watch demo' : 'View code'}
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && project.githubUrl !== primaryExternal && (
                        <Button asChild variant="ghost">
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" />
                            View code
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className={cn('relative overflow-hidden rounded-[26px] border border-white/10 bg-black/25', reverse && 'lg:order-1')}>
                    <div className="window-grid absolute inset-0 opacity-30" />
                    {preview?.src ? (
                      <div className="relative aspect-[16/11]">
                        <Image
                          src={preview.src}
                          alt={preview.alt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 42vw"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="project-preview-fallback relative flex aspect-[16/11] flex-col justify-between p-6">
                        <div className="flex items-center justify-between gap-3">
                          <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[0.68rem] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                            Media placeholder
                          </span>
                          <span className="rounded-full bg-accent/15 px-3 py-1 text-[0.68rem] font-mono uppercase tracking-[0.18em] text-accent">
                            Add demo assets next
                          </span>
                        </div>
                        <div>
                          <p className="text-[0.7rem] font-mono uppercase tracking-[0.2em] text-primary/80">Suggested screenshot</p>
                          <h4 className="mt-3 max-w-md text-2xl font-semibold text-foreground">
                            {project.gallery?.[0]?.label ?? project.video?.title ?? 'Core workflow screen'}
                          </h4>
                          <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
                            {project.gallery?.[0]?.caption ?? project.video?.caption ?? 'Capture the moment that makes the project feel real in under ten seconds.'}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="border-t border-white/10 bg-black/35 px-5 py-4 backdrop-blur">
                      <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-muted-foreground">Deep-dive angle</p>
                      <p className="mt-2 text-sm leading-6 text-foreground/90">{project.challenge}</p>
                    </div>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
