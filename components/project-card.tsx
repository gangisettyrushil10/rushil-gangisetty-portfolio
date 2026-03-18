'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight, Github, Play } from 'lucide-react'
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
  const hasLive = Boolean(project.liveUrl)
  const hasVideo = Boolean(project.video?.url)

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="group overflow-hidden rounded-[28px] border border-white/10 bg-card/88 transition-all duration-300 hover:border-white/18 hover:shadow-[0_24px_80px_-60px_rgba(21,161,255,0.65)]"
    >
      <Link href={`/projects/${project.id}`} className="block h-full">
        <div className="relative overflow-hidden border-b border-white/10">
          {preview?.src ? (
            <div className="relative aspect-[16/10]">
              <Image
                src={preview.src}
                alt={preview.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
          ) : (
            <div className="project-preview-fallback relative flex aspect-[16/10] flex-col justify-between p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[0.68rem] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                  {project.category}
                </span>
                <span className="rounded-full bg-accent/12 px-3 py-1 text-[0.68rem] font-mono uppercase tracking-[0.18em] text-accent">
                  {hasLive ? 'Live' : hasVideo ? 'Demo' : 'Case study'}
                </span>
              </div>
              <div>
                <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-primary/85">Recommended visual</p>
                <h3 className="mt-3 font-display text-2xl font-semibold text-foreground">
                  {project.gallery?.[0]?.label ?? project.video?.title ?? project.title}
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
                  {project.gallery?.[0]?.caption ?? project.video?.caption ?? project.description}
                </p>
              </div>
            </div>
          )}

          <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[0.68rem] font-mono uppercase tracking-[0.18em] text-white/85 backdrop-blur">
            {project.category}
          </div>
          <div className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/35 text-white/85 backdrop-blur transition-colors duration-300 group-hover:text-primary">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>

        <div className="space-y-5 p-6">
          <div>
            <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-accent">{project.role}</p>
            <h3 className="mt-3 font-display text-[1.8rem] font-semibold leading-tight text-foreground transition-colors group-hover:text-primary">
              {project.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              {project.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {project.metrics.slice(0, 2).map((metric) => (
              <div key={`${project.id}-${metric.label}`} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <p className="text-lg font-semibold text-foreground">{metric.value}</p>
                <p className="mt-1 text-[0.68rem] font-mono uppercase tracking-[0.14em] text-muted-foreground">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {hasLive && (
              <span className="inline-flex items-center gap-2">
                <Play className="h-4 w-4 text-accent" />
                Live demo
              </span>
            )}
            {!hasLive && hasVideo && (
              <span className="inline-flex items-center gap-2">
                <Play className="h-4 w-4 text-accent" />
                Video walkthrough
              </span>
            )}
            {project.githubUrl && (
              <span className="inline-flex items-center gap-2">
                <Github className="h-4 w-4" />
                GitHub
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
