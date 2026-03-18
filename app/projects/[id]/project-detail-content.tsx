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
      <section className="relative overflow-hidden px-4 pb-18 pt-32 sm:px-6 sm:pb-20 sm:pt-40 lg:px-8">
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

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
            <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
              <span className="section-label">{project.category}</span>
              <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-foreground sm:text-[5rem]">
                {project.title}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground sm:text-[1.06rem]">
                {project.longDescription}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:brightness-110"
                  >
                    <Github className="h-4 w-4" />
                    View repo
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-5 py-3 text-sm font-medium text-foreground transition hover:border-white/18 hover:bg-white/9"
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
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-5 py-3 text-sm font-medium text-foreground transition hover:border-white/18 hover:bg-white/9"
                  >
                    <Play className="h-4 w-4" />
                    Watch walkthrough
                  </a>
                )}
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={`${project.id}-${tech}`}
                    className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-secondary-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="glass-panel-strong rounded-[32px] p-6 sm:p-7"
            >
              <p className="text-[0.68rem] font-mono uppercase tracking-[0.2em] text-primary/90">Why this project matters</p>
              <p className="mt-4 text-lg font-medium text-foreground">{project.recruiterAngle}</p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{project.proofLine}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {project.metrics.map((metric) => (
                  <div key={`${project.id}-${metric.label}`} className="metric-pill rounded-2xl px-4 py-4">
                    <p className="text-xl font-semibold text-foreground">{metric.value}</p>
                    <p className="mt-1 text-[0.68rem] font-mono uppercase tracking-[0.16em] text-muted-foreground">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>

              {project.links && project.links.length > 0 && (
                <div className="surface-line mt-6 pt-6">
                  <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-accent">Links</p>
                  <div className="mt-4 flex flex-wrap gap-3">
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
            </motion.aside>
          </div>
        </div>
      </section>

      <Section className="pt-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]" style={style}>
            <div className="project-shell rounded-[32px] p-5 sm:p-6">
              <div className="project-visual rounded-[26px] border border-white/10">
                {preview?.src ? (
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[26px]">
                    <Image
                      src={preview.src}
                      alt={preview.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/72 via-black/18 to-transparent p-5 sm:p-6">
                      <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-white/75">{preview.label}</p>
                      <p className="mt-3 max-w-xl text-sm leading-7 text-white/86">{preview.caption}</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative flex aspect-[16/10] flex-col justify-between p-6 sm:p-7">
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
                        {project.previewTitle ?? 'Project story'}
                      </p>
                      <h2 className="mt-3 max-w-md text-3xl font-semibold leading-tight text-white">
                        {project.title}
                      </h2>
                      <p className="mt-4 max-w-xl text-sm leading-7 text-white/80">
                        {project.previewNote ?? project.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {project.metrics.slice(0, 4).map((metric) => (
                        <div
                          key={`${project.id}-${metric.label}-visual`}
                          className="rounded-2xl border border-white/10 bg-black/22 px-4 py-3 backdrop-blur"
                        >
                          <p className="text-lg font-semibold text-white">{metric.value}</p>
                          <p className="mt-1 text-[0.68rem] font-mono uppercase tracking-[0.16em] text-white/65">
                            {metric.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-6">
              <div className="glass-panel rounded-[30px] p-6">
                <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-primary/90">Challenge</p>
                <p className="mt-4 text-sm leading-7 text-foreground/90">{project.challenge}</p>
              </div>

              <div className="glass-panel rounded-[30px] p-6">
                <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-accent">What this proves</p>
                <div className="mt-4 space-y-3">
                  {project.outcomes.map((outcome) => (
                    <div key={outcome} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                      <p className="text-sm leading-6 text-foreground/90">{outcome}</p>
                    </div>
                  ))}
                </div>
              </div>

              {embedUrl && (
                <div className="glass-panel rounded-[30px] p-4">
                  <div className="overflow-hidden rounded-[24px] border border-white/10">
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
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-[rgba(7,10,22,0.36)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="glass-panel rounded-[30px] p-6">
              <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-primary/90">Key decisions</p>
              <div className="mt-4 space-y-3">
                {project.decisions.map((decision) => (
                  <div key={decision} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                    <p className="text-sm leading-6 text-foreground/90">{decision}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel rounded-[30px] p-6">
              <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-accent">What I learned</p>
              <div className="mt-4 space-y-3">
                {project.learnings.map((learning) => (
                  <div key={learning} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                    <p className="text-sm leading-6 text-foreground/90">{learning}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel rounded-[30px] p-6">
              <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-primary/90">Snapshot</p>
              <div className="mt-4 space-y-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                  <p className="text-[0.68rem] font-mono uppercase tracking-[0.16em] text-muted-foreground">Role</p>
                  <p className="mt-2 text-sm text-foreground">{project.role}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                  <p className="text-[0.68rem] font-mono uppercase tracking-[0.16em] text-muted-foreground">Timeline</p>
                  <p className="mt-2 text-sm text-foreground">{project.timeline}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                  <p className="text-[0.68rem] font-mono uppercase tracking-[0.16em] text-muted-foreground">Status</p>
                  <p className="mt-2 text-sm text-foreground">{project.status}</p>
                </div>
                {project.storeLinks && project.storeLinks.length > 0 && (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
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
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <span className="section-label">Keep exploring</span>
              <h2 className="mt-5 text-3xl font-semibold leading-tight text-foreground sm:text-[3rem]">
                Related flagship work.
              </h2>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {relatedProjects.map((relatedProject) => (
              <Link key={relatedProject.id} href={`/projects/${relatedProject.id}`} className="glass-panel block rounded-[28px] p-6 transition hover:border-white/18">
                <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-primary/90">{relatedProject.category}</p>
                <h3 className="mt-4 text-2xl font-semibold text-foreground">{relatedProject.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{relatedProject.recruiterAngle}</p>
                <div className="mt-5 flex items-center gap-2 text-sm font-medium text-foreground">
                  Read next
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
