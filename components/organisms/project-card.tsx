'use client'

import type { CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ExternalLink, Github, Play } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import type { Project } from '@/lib/data'

interface ProjectCardProps {
  project: Project
  index?: number
}

function getPreview(project: Project) {
  return project.gallery?.find((item) => item.src)
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const preview = getPreview(project)
  const style = {
    '--project-primary': project.theme?.primary ?? '#b347ff',
  } as CSSProperties

  return (
    <Reveal delay={index * 60} style={style} className="bento-cell group p-0">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        {/* Visual */}
        <div className="relative overflow-hidden rounded-t-md border-b border-(--pill-border) bg-bg-card-muted lg:rounded-l-md lg:rounded-tr-none lg:border-b-0 lg:border-r">
          {preview?.src ? (
            <div className="relative aspect-[16/10] overflow-hidden lg:aspect-[16/11]">
              <Image
                src={preview.src}
                alt={preview.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover transition-transform duration-(--duration-slow) ease-(--ease-out) group-hover:scale-[1.02]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/40 via-transparent to-transparent p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/85">
                  {preview.label}
                </p>
              </div>
            </div>
          ) : (
            <div className="relative flex aspect-[16/10] flex-col justify-between p-5 lg:aspect-[16/11]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {project.repoName ?? project.title}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {project.timeline}
                </span>
              </div>
              <div className="space-y-3">
                <div className="h-2 w-24 rounded-full bg-subtle-foreground/40" />
                <div className="h-2 w-40 rounded-full bg-subtle-foreground/25" />
                <div className="grid grid-cols-3 gap-3">
                  <div className="h-14 rounded-md border border-dashed border-(--pill-border) bg-bg-card" />
                  <div className="h-14 rounded-md border border-dashed border-(--pill-border) bg-bg-card" />
                  <div className="h-14 rounded-md border border-dashed border-(--pill-border) bg-bg-card" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="section-label">{project.category}</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-subtle-foreground">
              {project.timeline}
            </span>
          </div>

          <div>
            <h3 className="text-xl font-semibold tracking-[-0.02em] text-foreground sm:text-2xl">
              {project.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.description}</p>
            {project.recruiterAngle && (
              <p className="mt-2 text-sm font-medium text-foreground">{project.recruiterAngle}</p>
            )}
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {project.metrics.slice(0, 2).map((metric) => (
              <div
                key={`${project.id}-${metric.label}`}
                className="rounded-md border border-dashed border-(--pill-border) bg-bg-card-muted px-3 py-2"
              >
                <p className="text-lg font-semibold text-foreground">{metric.value}</p>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-subtle-foreground">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 5).map((tech) => (
              <span
                key={`${project.id}-${tech}`}
                className="rounded border border-dashed border-(--pill-border) bg-bg-card-muted px-2 py-0.5 text-[11px] font-mono text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap gap-2">
            <Link
              href={`/projects/${project.id}`}
              className="inline-flex items-center gap-2 rounded-lg bg-foreground px-3 py-1.5 text-sm font-medium text-background transition hover:bg-foreground/90"
            >
              Case study
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-dashed border-(--pill-border) bg-bg-card px-3 py-1.5 text-sm font-medium text-foreground transition hover:border-(--border-strong)"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-dashed border-(--pill-border) bg-bg-card px-3 py-1.5 text-sm font-medium text-foreground transition hover:border-(--border-strong)"
              >
                <ExternalLink className="h-4 w-4" />
                Live
              </a>
            )}
            {!project.liveUrl && project.video?.url && (
              <a
                href={project.video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-dashed border-(--pill-border) bg-bg-card px-3 py-1.5 text-sm font-medium text-foreground transition hover:border-(--border-strong)"
              >
                <Play className="h-4 w-4" />
                Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  )
}
