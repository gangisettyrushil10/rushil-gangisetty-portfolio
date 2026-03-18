'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight, Github, Play } from 'lucide-react'
import { cn } from '@/lib/utils'
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
  const hasDemo = Boolean(project.liveUrl || project.video?.url)

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={cn(
        'soft-spotlight group relative overflow-hidden rounded-[28px] border border-white/10 bg-card/85 transition-all duration-300',
        'hover:border-primary/45 hover:shadow-[0_30px_100px_-70px_rgba(21,161,255,0.85)]',
        featured && 'md:col-span-2',
      )}
    >
      <Link href={`/projects/${project.id}`} className="block h-full">
        <div className="relative overflow-hidden border-b border-white/10">
          <div className="window-grid absolute inset-0 opacity-35" />
          {preview?.src ? (
            <div className={cn('relative aspect-[16/11]', featured && 'md:aspect-[18/9]')}>
              <Image
                src={preview.src}
                alt={preview.alt}
                fill
                sizes={featured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 42vw'}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
          ) : (
            <div className={cn('project-preview-fallback relative flex aspect-[16/11] flex-col justify-between p-5', featured && 'md:aspect-[18/9] md:p-6')}>
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[0.68rem] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                  {project.category}
                </span>
                <span className="rounded-full bg-accent/15 px-3 py-1 text-[0.68rem] font-mono uppercase tracking-[0.18em] text-accent">
                  {hasDemo ? 'Demo ready' : 'Media slot ready'}
                </span>
              </div>
              <div>
                <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-primary/85">Suggested visual</p>
                <h3 className="mt-3 max-w-md font-display text-2xl font-semibold leading-tight text-foreground">
                  {project.gallery?.[0]?.label ?? project.video?.title ?? project.title}
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
                  {project.gallery?.[0]?.caption ?? project.video?.caption ?? project.description}
                </p>
              </div>
            </div>
          )}

          <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/45 px-3 py-1 text-[0.68rem] font-mono uppercase tracking-[0.18em] text-white/85 backdrop-blur">
            {project.category}
          </div>
          <div className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white/85 backdrop-blur transition-transform duration-300 group-hover:scale-105 group-hover:text-primary">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>

        <div className="space-y-5 p-6 sm:p-7">
          <div>
            <p className="text-[0.68rem] font-mono uppercase tracking-[0.22em] text-accent">{project.role}</p>
            <h3 className="mt-3 font-display text-2xl font-semibold text-foreground transition-colors group-hover:text-primary sm:text-[2rem]">
              {project.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-[0.97rem]">
              {project.description}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {project.metrics.slice(0, 4).map((metric) => (
              <div key={`${project.id}-${metric.label}`} className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-3">
                <p className="text-lg font-semibold text-foreground">{metric.value}</p>
                <p className="mt-1 text-[0.68rem] font-mono uppercase tracking-[0.14em] text-muted-foreground">{metric.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {project.stack.slice(0, 6).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-transparent px-3 py-1.5 text-[0.68rem] font-mono uppercase tracking-[0.14em] text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {project.liveUrl && <span className="inline-flex items-center gap-2"><Play className="h-4 w-4 text-accent" />Live demo available</span>}
            {!project.liveUrl && project.video?.url && <span className="inline-flex items-center gap-2"><Play className="h-4 w-4 text-accent" />Video walkthrough available</span>}
            {project.githubUrl && <span className="inline-flex items-center gap-2"><Github className="h-4 w-4" />GitHub</span>}
            {project.storeLinks?.length ? <span>Mobile release planned</span> : null}
            {!project.githubUrl && !project.liveUrl && !project.video?.url ? <span>Case study available on request</span> : null}
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
