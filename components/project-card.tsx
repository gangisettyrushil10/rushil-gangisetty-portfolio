'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight, Github, Layers } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Project } from '@/lib/data'

interface ProjectCardProps {
  project: Project
  index?: number
  featured?: boolean
}

export function ProjectCard({ project, index = 0, featured = false }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        'soft-spotlight card-tilt group relative overflow-hidden rounded-2xl bg-card border border-border transition-all duration-300',
        'hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5',
        featured && 'md:col-span-2'
      )}
    >
      <Link href={`/projects/${project.id}`} className="block p-6 sm:p-8">
        {/* Category Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
            <Layers className="w-3 h-3" />
            {project.category}
          </span>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="p-2 rounded-full bg-secondary text-secondary-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          >
            <ArrowUpRight className="w-4 h-4" />
          </motion.div>
        </div>

        {/* Title & Description */}
        <h3 className="font-display text-xl sm:text-[1.65rem] font-semibold text-foreground group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="mt-2 text-sm font-mono uppercase tracking-wide text-primary/80">
          {project.role}
        </p>
        <p className="mt-3 text-muted-foreground leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mt-6">
          {project.stack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-mono bg-muted text-muted-foreground rounded"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 5 && (
            <span className="px-2 py-1 text-xs font-mono bg-muted text-muted-foreground rounded">
              +{project.stack.length - 5}
            </span>
          )}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
          {project.metrics.slice(0, 4).map((metric) => (
            <div key={metric.label}>
              <div className="text-lg font-bold text-primary">{metric.value}</div>
              <div className="text-xs text-muted-foreground">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* GitHub Link */}
        {project.githubUrl && (
          <div className="flex items-center gap-2 mt-6 text-sm text-muted-foreground">
            <Github className="w-4 h-4" />
            <span>View on GitHub</span>
          </div>
        )}
        {!project.githubUrl && (
          <div className="flex items-center gap-2 mt-6 text-sm text-muted-foreground">
            <span>Case study available on request</span>
          </div>
        )}
      </Link>

      {/* Hover Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      </div>
    </motion.article>
  )
}
