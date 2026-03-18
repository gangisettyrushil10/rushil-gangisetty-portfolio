'use client'

import type { CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, ExternalLink, Github, Play } from 'lucide-react'
import { Section } from '@/components/section'
import type { Project } from '@/lib/data'
import { projects } from '@/lib/data'

interface ProjectDetailContentProps {
  project: Project
}

function getYouTubeEmbedUrl(url?: string) {
  if (!url) return null

  try {
    const parsed = new URL(url)

    if (parsed.hostname.includes('youtu.be')) {
      return `https://www.youtube.com/embed/${parsed.pathname.replace('/', '')}`
    }

    if (parsed.hostname.includes('youtube.com')) {
      const videoId = parsed.searchParams.get('v')
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`
      }
    }
  } catch {
    return null
  }

  return null
}

export function ProjectDetailContent({ project }: ProjectDetailContentProps) {
  const relatedProjects = projects.filter((item) => item.id !== project.id && item.featured).slice(0, 3)
  const preview = project.gallery?.find((item) => item.src)
  const embedUrl = getYouTubeEmbedUrl(project.video?.url)
  const style = {
    '--project-primary': project.theme?.primary ?? '#43d7ff',
    '--project-secondary': project.theme?.secondary ?? '#ff6cab',
    '--project-glow': project.theme?.glow ?? 'rgba(67, 215, 255, 0.34)',
  } as CSSProperties

  return (
    <>
      <section className="relative overflow-hidden px-4 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8">
        <div className="absolute inset-0 aurora-backdrop opacity-80" />
        <div className="absolute inset-0 grid-pattern opacity-30" />

        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42 }}
            className="mt-6 max-w-5xl"
          >
            <span className="section-label">{project.category}</span>
            <h1 className="mt-5 text-4xl font-semibold leading-[0.94] tracking-[-0.06em] text-foreground sm:text-[4.1rem]">
              {project.title}
            </h1>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
              {project.longDescription}
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-white/18 hover:bg-white/9"
              >
                All projects
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:brightness-110"
                >
                  <Github className="h-4 w-4" />
                  View repository
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-white/18 hover:bg-white/9"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live demo
                </a>
              )}

              {!project.liveUrl && project.video?.url && (
                <a
                  href={project.video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-white/18 hover:bg-white/9"
                >
                  <Play className="h-4 w-4" />
                  Watch demo
                </a>
              )}
            </div>

            <div className="mt-6 grid gap-2.5 sm:grid-cols-3">
              {project.metrics.slice(0, 3).map((metric) => (
                <div key={`${project.id}-${metric.label}`} className="metric-pill rounded-2xl px-4 py-3">
                  <p className="text-lg font-semibold text-foreground">{metric.value}</p>
                  <p className="mt-1 text-[0.68rem] font-mono uppercase tracking-[0.16em] text-muted-foreground">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Section className="pt-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-[1.02fr_0.98fr]" style={style}>
            <div className="project-shell rounded-[28px] p-4 sm:p-5">
              <div className="project-visual rounded-[22px] border border-white/10">
                {preview?.src ? (
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] lg:aspect-[16/11]">
                    <Image
                      src={preview.src}
                      alt={preview.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/72 via-black/18 to-transparent p-4 sm:p-5">
                      <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-white/75">{preview.label}</p>
                      <p className="mt-3 max-w-xl text-sm leading-7 text-white/86">{preview.caption}</p>
                    </div>
                  </div>
                ) : embedUrl ? (
                    <div className="overflow-hidden rounded-[22px] border border-white/10">
                    <div className="aspect-video">
                      <iframe
                        src={embedUrl}
                        title={project.video?.title ?? `${project.title} demo`}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    </div>
                  </div>
                ) : (
                  <div className="relative flex aspect-[16/10] flex-col justify-between p-5 sm:p-6 lg:aspect-[16/11]">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[0.66rem] font-mono uppercase tracking-[0.18em] text-white/75">
                        {project.repoName ?? project.title}
                      </span>
                      <span className="rounded-full bg-white/8 px-3 py-1 text-[0.66rem] font-mono uppercase tracking-[0.18em] text-white/75">
                        {project.status}
                      </span>
                    </div>

                    <div>
                      <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-white/70">
                        Overview
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.stack.slice(0, 4).map((tech) => (
                          <span
                            key={`${project.id}-${tech}-visual`}
                            className="rounded-full border border-white/10 bg-black/18 px-3 py-1.5 text-xs text-white/80"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2.5">
                      <div className="h-16 rounded-2xl border border-white/10 bg-black/18" />
                      <div className="h-16 rounded-2xl border border-white/10 bg-black/14" />
                      <div className="h-16 rounded-2xl border border-white/10 bg-black/10" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="glass-panel rounded-[24px] p-5">
                <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-primary/90">Challenge</p>
                <p className="mt-3 text-sm leading-6 text-foreground/90">{project.challenge}</p>
              </div>

              <div className="glass-panel rounded-[24px] p-5">
                <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-accent">Results</p>
                <div className="mt-3 space-y-2.5">
                  {project.outcomes.map((outcome) => (
                    <div key={outcome} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                      <p className="text-sm leading-6 text-foreground/90">{outcome}</p>
                    </div>
                  ))}
                </div>
              </div>

              {project.links && project.links.length > 0 && (
                <div className="glass-panel rounded-[24px] p-5">
                  <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-primary/90">References</p>
                  <div className="mt-3 flex flex-wrap gap-2.5">
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-foreground transition hover:border-white/18 hover:bg-white/8"
                      >
                        {link.label}
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-[rgba(4,4,5,0.68)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="glass-panel rounded-[24px] p-5">
              <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-primary/90">Approach</p>
              <div className="mt-3 space-y-2.5">
                {project.decisions.map((decision) => (
                  <div key={decision} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                    <p className="text-sm leading-6 text-foreground/90">{decision}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel rounded-[24px] p-5">
              <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-accent">Stack</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={`${project.id}-${tech}`}
                    className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1.5 text-xs text-foreground/88"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                  <p className="text-[0.68rem] font-mono uppercase tracking-[0.16em] text-muted-foreground">Role</p>
                  <p className="mt-2 text-sm text-foreground">{project.role}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                  <p className="text-[0.68rem] font-mono uppercase tracking-[0.16em] text-muted-foreground">Timeline</p>
                  <p className="mt-2 text-sm text-foreground">{project.timeline}</p>
                </div>
              </div>

              {project.storeLinks && project.storeLinks.length > 0 && (
                <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                  <p className="text-[0.68rem] font-mono uppercase tracking-[0.16em] text-muted-foreground">Release path</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.storeLinks.map((store) => (
                      <span
                        key={`${project.id}-${store.label}`}
                        className="rounded-full border border-white/10 bg-black/18 px-3 py-1.5 text-xs text-foreground/88"
                      >
                        {store.label}
                        {store.status ? ` • ${store.status}` : ''}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div>
            <span className="section-label">Related work</span>
            <h2 className="mt-4 text-2xl font-semibold leading-tight text-foreground sm:text-[2.45rem]">
              Related flagship work.
            </h2>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {relatedProjects.map((relatedProject) => (
              <Link key={relatedProject.id} href={`/projects/${relatedProject.id}`} className="glass-panel block rounded-[24px] p-5 transition hover:border-white/18">
                <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-primary/90">{relatedProject.category}</p>
                <h3 className="mt-3 text-xl font-semibold text-foreground">{relatedProject.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{relatedProject.recruiterAngle}</p>
                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-foreground">
                  Open case study
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </>
  )
}
