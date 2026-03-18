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

export function ProjectCard({ project, index = 0, featured = false }: ProjectCardProps) {
  const preview = getPreview(project)
  const style = {
    '--project-primary': project.theme?.primary ?? '#43d7ff',
    '--project-secondary': project.theme?.secondary ?? '#ff6cab',
    '--project-glow': project.theme?.glow ?? 'rgba(67, 215, 255, 0.34)',
  } as CSSProperties

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.48, delay: index * 0.08 }}
      style={style}
      className="project-shell soft-spotlight rounded-[30px] p-5 sm:p-6"
    >
      <div className="grid gap-5">
        <div className="project-visual rounded-[24px] border border-white/8">
          {preview?.src ? (
            <div className="relative aspect-[16/10] overflow-hidden rounded-[24px]">
              <Image
                src={preview.src}
                alt={preview.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover transition-transform duration-500 hover:scale-[1.02]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent p-5">
                <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-white/75">
                  {project.gallery?.[0]?.label}
                </p>
                <p className="mt-2 max-w-md text-sm leading-6 text-white/88">
                  {project.gallery?.[0]?.caption}
                </p>
              </div>
            </div>
          ) : (
            <div className="relative flex aspect-[16/10] flex-col justify-between p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[0.66rem] font-mono uppercase tracking-[0.18em] text-white/75">
                  {project.repoName ?? project.title}
                </span>
                <span className="rounded-full bg-white/8 px-3 py-1 text-[0.66rem] font-mono uppercase tracking-[0.18em] text-white/75">
                  {project.category}
                </span>
              </div>

              <div>
                <p className="text-[0.68rem] font-mono uppercase tracking-[0.2em] text-white/70">
                  {project.previewTitle ?? project.category}
                </p>
                <h3 className="mt-3 max-w-md text-2xl font-semibold leading-tight text-white sm:text-[2rem]">
                  {project.title}
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-7 text-white/78">
                  {project.previewNote ?? project.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {project.metrics.slice(0, 2).map((metric) => (
                  <div
                    key={`${project.id}-${metric.label}`}
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

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="section-label">{project.category}</span>
              <span className="rounded-full border border-white/10 px-3 py-1 text-[0.68rem] font-mono uppercase tracking-[0.16em] text-muted-foreground">
                {project.timeline}
              </span>
            </div>
            <h3 className="mt-5 text-2xl font-semibold leading-tight text-foreground sm:text-[2.25rem]">
              {project.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-[0.98rem]">
              {project.description}
            </p>
          </div>

          <Link
            href={`/projects/${project.id}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition hover:border-white/20 hover:bg-white/8"
          >
            View case study
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="glass-panel rounded-[24px] p-4 sm:p-5">
          <p className="text-[0.68rem] font-mono uppercase tracking-[0.2em] text-primary/90">
            Why it made the cut
          </p>
          <p className="mt-3 text-sm leading-7 text-foreground/90">
            {project.recruiterAngle ?? project.proofLine ?? project.longDescription}
          </p>
        </div>

        <div className={`grid gap-3 ${featured ? 'sm:grid-cols-4' : 'sm:grid-cols-2'}`}>
          {project.metrics.slice(0, featured ? 4 : 2).map((metric) => (
            <div key={`${project.id}-${metric.label}-detail`} className="metric-pill rounded-2xl px-4 py-4">
              <p className="text-xl font-semibold text-foreground">{metric.value}</p>
              <p className="mt-1 text-[0.68rem] font-mono uppercase tracking-[0.16em] text-muted-foreground">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {project.stack.slice(0, featured ? 7 : 5).map((tech) => (
            <span
              key={`${project.id}-${tech}`}
              className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-secondary-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href={`/projects/${project.id}`}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:brightness-110"
          >
            Read the story
            <ArrowUpRight className="h-4 w-4" />
          </Link>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-white/20 hover:bg-white/8"
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
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-white/20 hover:bg-white/8"
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
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-white/20 hover:bg-white/8"
            >
              <Play className="h-4 w-4" />
              Watch demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
