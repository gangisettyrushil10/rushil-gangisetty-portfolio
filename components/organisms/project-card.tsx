'use client'

import type { CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink, Github, Play } from 'lucide-react'
import type { Project } from '@/lib/data'

interface ProjectCardProps {
  project: Project
  index?: number
  featured?: boolean
}

function getPreview(project: Project) {
  return project.gallery?.find((item) => item.src)
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const preview = getPreview(project)
  const style = {
    '--project-primary': 'var(--scene-accent)',
    '--project-secondary': 'var(--scene-hot)',
    '--project-glow': 'var(--page-glow)',
  } as CSSProperties
  const fallbackPreviewStyle = {
    background:
      'radial-gradient(circle at 18% 18%, var(--project-glow), transparent 42%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0)), var(--page-base-soft)',
  } as CSSProperties

  return (
    <motion.article
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, delay: index * 0.08 }}
      style={style}
      className="project-shell soft-spotlight rounded-[28px] p-4 sm:p-5"
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start">
        <div className="project-visual rounded-[22px] border border-white/8">
          {preview?.src ? (
            <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] lg:aspect-[16/11]">
              <Image
                src={preview.src}
                alt={preview.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover transition-transform duration-500 hover:scale-[1.02]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/72 via-black/16 to-transparent p-4">
                <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-white/75">
                  {preview.label}
                </p>
              </div>
            </div>
          ) : (
            <div
              className="project-preview-fallback relative flex aspect-[16/10] flex-col justify-between p-4 sm:p-5 lg:aspect-[16/11]"
              style={fallbackPreviewStyle}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[0.66rem] font-mono uppercase tracking-[0.18em] text-white/75">
                  {project.status}
                </span>
                <span className="rounded-full bg-white/8 px-3 py-1 text-[0.66rem] font-mono uppercase tracking-[0.18em] text-white/75">
                  {project.timeline}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-lg font-semibold tracking-[-0.03em] text-foreground">
                    {project.previewTitle ?? project.title}
                  </p>
                  <p className="mt-2 max-w-md text-sm leading-6 text-white/72">
                    {project.previewNote ?? project.description}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {project.stack.slice(0, 3).map((tech) => (
                    <div
                      key={`${project.id}-${tech}-fallback`}
                      className="rounded-2xl border border-white/10 bg-black/18 px-3 py-3"
                    >
                      <p className="text-[0.62rem] font-mono uppercase tracking-[0.16em] text-white/55">
                        stack
                      </p>
                      <p className="mt-1 text-sm text-white/82">{tech}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid gap-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="section-label">{project.category}</span>
            <span className="rounded-full border border-white/10 px-3 py-1 text-[0.68rem] font-mono uppercase tracking-[0.16em] text-muted-foreground">
              {project.timeline}
            </span>
          </div>

          <div className="max-w-3xl">
            <h3 className="text-xl font-semibold leading-tight text-foreground sm:text-[1.8rem]">
              {project.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {project.description}
            </p>
            <p className="mt-2.5 text-sm font-medium text-foreground/92">
              {project.proofLine}
            </p>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2">
            {project.metrics.slice(0, 2).map((metric) => (
              <div key={`${project.id}-${metric.label}-detail`} className="metric-pill rounded-2xl px-4 py-3">
                <p className="text-lg font-semibold text-foreground">{metric.value}</p>
                <p className="mt-1 text-[0.68rem] font-mono uppercase tracking-[0.16em] text-muted-foreground">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {project.stack.slice(0, 5).map((tech) => (
              <span
                key={`${project.id}-${tech}`}
                className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-secondary-foreground"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Link
              href={`/projects/${project.id}`}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:brightness-110"
            >
              Open case study
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition hover:border-white/20 hover:bg-white/8"
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
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition hover:border-white/20 hover:bg-white/8"
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
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition hover:border-white/20 hover:bg-white/8"
              >
                <Play className="h-4 w-4" />
                Watch demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}
