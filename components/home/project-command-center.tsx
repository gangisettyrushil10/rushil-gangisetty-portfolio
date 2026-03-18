'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink, Github, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { projects, type Project } from '@/lib/data'
import { cn } from '@/lib/utils'

const featuredProjects = projects.filter((project) => project.featured)

function getPreview(project: Project) {
  return project.gallery?.find((item) => item.src)
}

function getAvailabilityLabel(project: Project) {
  if (project.liveUrl) return 'Live now'
  if (project.video?.url) return 'Demo ready'
  if (project.storeLinks?.length) return 'Mobile release planned'
  return 'Case study ready'
}

function getPrimaryLink(project: Project) {
  if (project.liveUrl) {
    return {
      href: project.liveUrl,
      label: 'Open live demo',
      icon: ExternalLink,
      external: true,
    }
  }

  if (project.video?.url) {
    return {
      href: project.video.url,
      label: 'Watch demo',
      icon: Play,
      external: true,
    }
  }

  if (project.githubUrl) {
    return {
      href: project.githubUrl,
      label: 'View code',
      icon: Github,
      external: true,
    }
  }

  return {
    href: `/projects/${project.id}`,
    label: 'Open case study',
    icon: ArrowUpRight,
    external: false,
  }
}

export function ProjectCommandCenter() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % featuredProjects.length)
    }, 4800)

    return () => window.clearInterval(timer)
  }, [])

  const activeProject = featuredProjects[activeIndex]
  const preview = useMemo(() => getPreview(activeProject), [activeProject])
  const primaryAction = useMemo(() => getPrimaryLink(activeProject), [activeProject])
  const PrimaryIcon = primaryAction.icon

  return (
    <div className="panel-shell relative overflow-hidden rounded-[30px] border border-white/10 bg-card/80 p-4 shadow-[0_30px_110px_-70px_rgba(21,161,255,0.5)] backdrop-blur-xl sm:p-6">
      <div className="pointer-events-none absolute -top-16 right-10 h-48 w-48 rounded-full bg-primary/16 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-accent/14 blur-3xl" />

      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <p className="text-[0.68rem] font-mono uppercase tracking-[0.28em] text-primary/90">Selected Work</p>
            <p className="mt-1 text-sm text-muted-foreground">The one dynamic section on the page. Start here.</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[0.72rem] font-mono uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-accent" />
            {String(activeIndex + 1).padStart(2, '0')} / {String(featuredProjects.length).padStart(2, '0')}
          </div>
        </div>

        <div className="mt-4 h-[2px] w-full overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            key={activeProject.id}
            initial={{ scaleX: 0, transformOrigin: 'left' }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 4.5, ease: 'linear' }}
            className="h-full origin-left rounded-full bg-gradient-to-r from-primary via-primary to-accent"
          />
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-[0.82fr_1.18fr]">
          <div className="grid gap-3">
            {featuredProjects.map((project, index) => {
              const isActive = index === activeIndex

              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    'group rounded-[22px] border px-4 py-4 text-left transition-all duration-300',
                    isActive
                      ? 'border-primary/40 bg-white/[0.04] shadow-[0_20px_80px_-60px_rgba(21,161,255,0.85)]'
                      : 'border-white/8 bg-black/12 hover:border-white/16 hover:bg-white/[0.03]',
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[0.68rem] font-mono uppercase tracking-[0.24em] text-muted-foreground">
                        {String(index + 1).padStart(2, '0')}
                      </p>
                      <p className={cn('mt-2 text-base font-semibold transition-colors', isActive ? 'text-foreground' : 'text-foreground/85 group-hover:text-foreground')}>
                        {project.title}
                      </p>
                    </div>
                    <span className={cn('rounded-full px-2.5 py-1 text-[0.65rem] font-mono uppercase tracking-[0.16em]', isActive ? 'bg-primary/15 text-primary' : 'bg-white/[0.04] text-muted-foreground')}>
                      {project.category}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground line-clamp-2">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.metrics.slice(0, 2).map((metric) => (
                      <span
                        key={`${project.id}-${metric.label}`}
                        className={cn(
                          'rounded-full border px-2.5 py-1 text-[0.68rem] font-mono uppercase tracking-[0.14em]',
                          isActive ? 'border-primary/20 bg-primary/8 text-primary' : 'border-white/10 text-muted-foreground',
                        )}
                      >
                        {metric.value} {metric.label}
                      </span>
                    ))}
                  </div>
                </button>
              )
            })}
          </div>

          <div className="overflow-hidden rounded-[26px] border border-white/10 bg-black/18">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="h-full"
              >
                <div className="relative aspect-[1.18/0.9] border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(21,161,255,0.18),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(255,115,52,0.12),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))]">
                  {preview?.src ? (
                    <Image
                      src={preview.src}
                      alt={preview.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="project-preview-fallback absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
                      <div className="flex items-center justify-between gap-4">
                        <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[0.68rem] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                          Media direction
                        </span>
                        <span className="rounded-full bg-accent/15 px-3 py-1 text-[0.68rem] font-mono uppercase tracking-[0.18em] text-accent">
                          {getAvailabilityLabel(activeProject)}
                        </span>
                      </div>
                      <div>
                        <p className="text-[0.7rem] font-mono uppercase tracking-[0.26em] text-primary/80">
                          Best visual to add next
                        </p>
                        <h3 className="mt-3 max-w-md text-2xl font-semibold leading-tight text-foreground">
                          {activeProject.gallery?.[0]?.label ?? activeProject.video?.title ?? activeProject.title}
                        </h3>
                        <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
                          {activeProject.gallery?.[0]?.caption ?? activeProject.video?.caption ?? activeProject.description}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[0.68rem] font-mono uppercase tracking-[0.18em] text-white/80 backdrop-blur">
                    {getAvailabilityLabel(activeProject)}
                  </div>
                </div>

                <div className="space-y-5 p-5 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="max-w-2xl">
                      <p className="text-[0.72rem] font-mono uppercase tracking-[0.24em] text-primary/85">
                        {activeProject.role}
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold text-foreground sm:text-[2rem]">
                        {activeProject.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                        {activeProject.longDescription}
                      </p>
                    </div>
                    <div className="grid min-w-[170px] gap-2 text-sm text-muted-foreground">
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                        <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-muted-foreground">Why this one matters</p>
                        <p className="mt-2 leading-6 text-foreground/90">{activeProject.outcomes[0]}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {activeProject.stack.slice(0, 4).map((item) => (
                      <span
                        key={`${activeProject.id}-${item}`}
                        className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-[0.72rem] font-mono uppercase tracking-[0.12em] text-muted-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {activeProject.metrics.slice(0, 3).map((metric) => (
                      <div key={`${activeProject.id}-${metric.label}`} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                        <p className="text-[1.15rem] font-semibold text-foreground">{metric.value}</p>
                        <p className="mt-1 text-[0.72rem] font-mono uppercase tracking-[0.16em] text-muted-foreground">{metric.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                      {primaryAction.external ? (
                        <a href={primaryAction.href} target="_blank" rel="noopener noreferrer">
                          <PrimaryIcon className="mr-2 h-4 w-4" />
                          {primaryAction.label}
                        </a>
                      ) : (
                        <Link href={primaryAction.href}>
                          <PrimaryIcon className="mr-2 h-4 w-4" />
                          {primaryAction.label}
                        </Link>
                      )}
                    </Button>
                    <Button asChild variant="outline">
                      <Link href={`/projects/${activeProject.id}`}>
                        <ArrowUpRight className="mr-2 h-4 w-4" />
                        Read deep dive
                      </Link>
                    </Button>
                    {activeProject.githubUrl && primaryAction.href !== activeProject.githubUrl && (
                      <Button asChild variant="ghost">
                        <a href={activeProject.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          View code
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
