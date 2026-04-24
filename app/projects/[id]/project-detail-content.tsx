'use client'

import type { CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, ExternalLink, Github, Play } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { DashedDivider } from '@/components/ui/dashed-divider'
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
      if (videoId) return `https://www.youtube.com/embed/${videoId}`
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
    '--project-primary': project.theme?.primary ?? '#b347ff',
  } as CSSProperties

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32" style={style}>
      {/* ── Hero ── */}
      <Reveal>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to projects
        </Link>

        <div className="mt-6 max-w-4xl">
          <span className="section-label">{project.category}</span>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-[3.5rem]">
            {project.title}
          </h1>
          <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
            {project.longDescription}
          </p>
        </div>

        <div className="mt-7 flex flex-wrap gap-2">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg border border-dashed border-(--pill-border) bg-bg-card px-3.5 py-1.5 text-sm font-medium text-foreground transition hover:border-(--border-strong)"
          >
            All projects
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-foreground px-3.5 py-1.5 text-sm font-medium text-background transition hover:bg-foreground/90"
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
              className="inline-flex items-center gap-2 rounded-lg border border-dashed border-(--pill-border) bg-bg-card px-3.5 py-1.5 text-sm font-medium text-foreground transition hover:border-(--border-strong)"
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
              className="inline-flex items-center gap-2 rounded-lg border border-dashed border-(--pill-border) bg-bg-card px-3.5 py-1.5 text-sm font-medium text-foreground transition hover:border-(--border-strong)"
            >
              <Play className="h-4 w-4" />
              Watch demo
            </a>
          )}
        </div>

        {/* Metrics row */}
        <div className="mt-7 grid gap-2 sm:grid-cols-3">
          {project.metrics.slice(0, 3).map((metric, i) => (
            <Reveal
              key={`${project.id}-${metric.label}`}
              delay={80 + i * 60}
              className="rounded-lg border border-dashed border-(--pill-border) bg-bg-card px-4 py-3"
            >
              <p className="text-lg font-semibold text-foreground">{metric.value}</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-subtle-foreground">
                {metric.label}
              </p>
            </Reveal>
          ))}
        </div>
      </Reveal>

      <DashedDivider className="my-14" />

      {/* ── Media + Challenge/Results ── */}
      <div className="grid gap-4 lg:grid-cols-[1.02fr_0.98fr]">
        <Reveal className="bento-cell overflow-hidden p-0">
          {preview?.src ? (
            <div className="relative aspect-[16/11] overflow-hidden">
              <Image
                src={preview.src}
                alt={preview.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
              {preview.caption && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/85">
                    {preview.label}
                  </p>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-white/90">{preview.caption}</p>
                </div>
              )}
            </div>
          ) : embedUrl ? (
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
          ) : (
            <div className="relative flex aspect-[16/11] flex-col justify-between p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {project.repoName ?? project.title}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {project.status}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.slice(0, 4).map((tech) => (
                  <span
                    key={`${project.id}-${tech}-visual`}
                    className="rounded border border-dashed border-(--pill-border) bg-bg-card-muted px-2 py-0.5 text-[11px] font-mono text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Reveal>

        <div className="grid gap-4">
          <Reveal delay={80} className="bento-cell p-5 sm:p-6">
            <span className="section-label">Challenge</span>
            <p className="mt-3 text-sm leading-7 text-foreground">{project.challenge}</p>
          </Reveal>

          <Reveal delay={160} className="bento-cell p-5 sm:p-6">
            <span className="section-label">Results</span>
            <div className="mt-3 space-y-2.5">
              {project.outcomes.map((outcome) => (
                <div
                  key={outcome}
                  className="rounded-md border border-dashed border-(--pill-border) bg-bg-card-muted px-4 py-2.5"
                >
                  <p className="text-sm leading-6 text-foreground">{outcome}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {project.links && project.links.length > 0 && (
            <Reveal delay={240} className="bento-cell p-5 sm:p-6">
              <span className="section-label">References</span>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-dashed border-(--pill-border) bg-bg-card-muted px-3 py-1.5 text-sm text-foreground transition hover:border-(--border-strong)"
                  >
                    {link.label}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </div>

      <DashedDivider className="my-14" />

      {/* ── Approach + Stack ── */}
      <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal className="bento-cell p-5 sm:p-6">
          <span className="section-label">Approach</span>
          <div className="mt-3 space-y-2.5">
            {project.decisions.map((decision) => (
              <div
                key={decision}
                className="rounded-md border border-dashed border-(--pill-border) bg-bg-card-muted px-4 py-2.5"
              >
                <p className="text-sm leading-6 text-foreground">{decision}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={80} className="bento-cell p-5 sm:p-6">
          <span className="section-label">Stack</span>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={`${project.id}-${tech}`}
                className="rounded border border-dashed border-(--pill-border) bg-bg-card-muted px-2 py-0.5 text-[11px] font-mono text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <div className="rounded-md border border-dashed border-(--pill-border) bg-bg-card-muted px-4 py-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle-foreground">Role</p>
              <p className="mt-1 text-sm text-foreground">{project.role}</p>
            </div>
            <div className="rounded-md border border-dashed border-(--pill-border) bg-bg-card-muted px-4 py-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle-foreground">
                Timeline
              </p>
              <p className="mt-1 text-sm text-foreground">{project.timeline}</p>
            </div>
          </div>
          {project.storeLinks && project.storeLinks.length > 0 && (
            <div className="mt-3 rounded-md border border-dashed border-(--pill-border) bg-bg-card-muted px-4 py-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle-foreground">
                Release path
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {project.storeLinks.map((store) => (
                  <span
                    key={`${project.id}-${store.label}`}
                    className="rounded border border-dashed border-(--pill-border) bg-bg-card px-2 py-0.5 text-[11px] font-mono text-muted-foreground"
                  >
                    {store.label}
                    {store.status ? ` · ${store.status}` : ''}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Reveal>
      </div>

      <DashedDivider className="my-14" />

      {/* ── Related ── */}
      <Reveal>
        <span className="section-label">Related</span>
        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-[2.1rem]">
          Other <span className="font-serif-italic text-accent">flagship</span> work.
        </h2>
      </Reveal>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {relatedProjects.map((relatedProject, i) => (
          <Reveal key={relatedProject.id} delay={i * 80}>
            <Link href={`/projects/${relatedProject.id}`} className="bento-cell group flex h-full flex-col gap-3 p-5">
              <span className="section-label">{relatedProject.category}</span>
              <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground sm:text-xl">
                {relatedProject.title}
              </h3>
              <p className="text-sm leading-6 text-muted-foreground">{relatedProject.recruiterAngle}</p>
              <div className="mt-auto flex items-center gap-2 text-sm font-medium text-foreground">
                Open case study
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:text-accent" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
