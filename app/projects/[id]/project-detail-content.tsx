'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Github, ExternalLink, Calendar, User, Layers, CheckCircle2, Lightbulb, Target, BookOpen, Image as ImageIcon, Play, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Section, SectionHeader } from '@/components/section'
import { ProjectCard } from '@/components/project-card'
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

      if (parsed.pathname.startsWith('/embed/')) {
        return url
      }
    }
  } catch {
    return null
  }

  return null
}

export function ProjectDetailContent({ project }: ProjectDetailContentProps) {
  const relatedProjects = projects
    .filter((p) => p.id !== project.id && p.featured)
    .slice(0, 2)
  const embedUrl = getYouTubeEmbedUrl(project.video?.url)
  const preview = project.gallery?.find((item) => item.src)

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden">
        <div className="absolute inset-0 animated-gradient opacity-30" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        
        {/* Gradient Orbs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1 }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute bottom-0 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              href="/projects"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>
          </motion.div>

          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border text-sm">
              <Layers className="w-4 h-4 text-primary" />
              {project.category}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-display mt-6 text-3xl sm:text-4xl md:text-[3.6rem] font-semibold leading-[0.96] text-foreground"
          >
            {project.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-5 text-base sm:text-lg text-muted-foreground max-w-3xl leading-8"
          >
            {project.longDescription}
          </motion.p>

          {/* Meta Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-6 mt-8 text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {project.role}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {project.timeline}
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              {project.status}
            </span>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4 mt-8"
          >
            {project.githubUrl && (
              <Button asChild variant="outline">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 w-4 h-4" />
                  View Code
                </a>
              </Button>
            )}
            {project.liveUrl && (
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 w-4 h-4" />
                  Live Demo
                </a>
              </Button>
            )}
            {project.video?.url && (
              <Button asChild variant="outline">
                <a href={project.video.url} target="_blank" rel="noopener noreferrer">
                  <Play className="mr-2 w-4 h-4" />
                  Watch Demo
                </a>
              </Button>
            )}
            {!project.githubUrl && !project.liveUrl && (
              <div className="rounded-full border border-border bg-secondary px-4 py-2 text-sm text-muted-foreground">
                Local case study. Code walkthrough available on request.
              </div>
            )}
          </motion.div>

          {project.links && project.links.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="flex flex-wrap items-center gap-3 mt-4"
            >
              {project.links.map((link) => (
                <Button key={link.href} asChild variant="ghost">
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                </Button>
              ))}
            </motion.div>
          )}

          {project.storeLinks && project.storeLinks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.58 }}
              className="mt-6"
            >
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Smartphone className="w-4 h-4" />
                <span>Mobile release</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-3">
                {project.storeLinks.map((store) => (
                  store.href ? (
                    <Button key={`${project.id}-${store.label}`} asChild variant="outline">
                      <a href={store.href} target="_blank" rel="noopener noreferrer">
                        {store.label}
                      </a>
                    </Button>
                  ) : (
                    <div
                      key={`${project.id}-${store.label}`}
                      className="rounded-full border border-border bg-secondary px-4 py-2 text-sm text-muted-foreground"
                    >
                      <span className="font-medium text-foreground">{store.label}</span>
                      {store.status ? ` · ${store.status}` : ''}
                    </div>
                  )
                ))}
              </div>
            </motion.div>
          )}

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap gap-2 mt-8"
          >
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-sm font-mono bg-secondary text-secondary-foreground rounded-lg"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      <Section className="bg-background pt-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="case-study-shell rounded-[28px]"
            >
              <div className="relative overflow-hidden">
                <div className="window-grid absolute inset-0 opacity-30" />
                {preview?.src ? (
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={preview.src}
                      alt={preview.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="project-preview-fallback relative flex aspect-[16/10] flex-col justify-between p-6 sm:p-7">
                    <div className="flex items-center justify-between gap-4">
                      <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[0.68rem] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                        Visual proof
                      </span>
                      <span className="rounded-full bg-accent/15 px-3 py-1 text-[0.68rem] font-mono uppercase tracking-[0.18em] text-accent">
                        Add screenshot next
                      </span>
                    </div>
                    <div>
                      <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-primary/85">
                        Best first capture
                      </p>
                      <h2 className="mt-3 max-w-md font-display text-2xl font-semibold text-foreground sm:text-[2.1rem]">
                        {project.gallery?.[0]?.label ?? project.video?.title ?? project.title}
                      </h2>
                      <p className="mt-3 max-w-lg text-sm leading-7 text-muted-foreground">
                        {project.gallery?.[0]?.caption ?? project.video?.caption ?? 'Show the moment that makes the project legible in under ten seconds.'}
                      </p>
                    </div>
                  </div>
                )}

                <div className="border-t border-white/10 bg-black/35 px-5 py-4 backdrop-blur">
                  <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-muted-foreground">Deep-dive angle</p>
                  <p className="mt-2 text-sm leading-6 text-foreground/90">{project.challenge}</p>
                </div>
              </div>
            </motion.div>

            <div className="grid gap-6">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="case-study-shell rounded-[28px] p-6"
              >
                <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-primary/85">Why it stands out</p>
                <div className="mt-4 space-y-4">
                  {project.outcomes.slice(0, 3).map((outcome) => (
                    <div key={outcome} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
                      <p className="text-sm leading-6 text-foreground/90">{outcome}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.14 }}
                className="case-study-shell rounded-[28px] p-6"
              >
                <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-accent">Media and links</p>
                <div className="mt-4 grid gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
                    <p className="text-[0.68rem] font-mono uppercase tracking-[0.16em] text-muted-foreground">Best demo moment</p>
                    <p className="mt-2 text-sm leading-6 text-foreground/90">
                      {project.video?.caption ?? project.gallery?.[0]?.caption ?? 'A short walkthrough would make this project even easier to grasp quickly.'}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
                    <p className="text-[0.68rem] font-mono uppercase tracking-[0.16em] text-muted-foreground">Current state</p>
                    <p className="mt-2 text-sm leading-6 text-foreground/90">
                      {project.liveUrl
                        ? 'Live demo is available.'
                        : project.video?.url
                          ? 'Video walkthrough is available.'
                          : project.storeLinks?.length
                            ? 'Store release is planned.'
                            : 'Code and case study are available.'}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
                    <p className="text-[0.68rem] font-mono uppercase tracking-[0.16em] text-muted-foreground">Stack snapshot</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.stack.slice(0, 5).map((item) => (
                        <span
                          key={`${project.id}-snapshot-${item}`}
                          className="rounded-full border border-white/10 bg-transparent px-3 py-1.5 text-[0.68rem] font-mono uppercase tracking-[0.14em] text-muted-foreground"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Section>

      {/* Metrics Section */}
      <Section className="bg-secondary/30 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {project.metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-card border border-border"
              >
                <div className="text-3xl sm:text-4xl font-bold text-primary">{metric.value}</div>
                <div className="mt-2 text-sm text-muted-foreground">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Screenshot Gallery Placeholder */}
      <Section className="bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Gallery"
            title="Screenshots"
            description="A few visual anchors that help the project feel concrete."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(project.gallery ?? []).map((item, i) => (
              <motion.div
                key={`${project.id}-${item.label}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="overflow-hidden rounded-xl border border-border bg-card"
              >
                <div className="relative aspect-video bg-secondary">
                  {item.src ? (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-center text-muted-foreground px-6">
                      <div>
                        <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p className="text-sm font-medium text-foreground">{item.label}</p>
                        <p className="text-xs mt-1 opacity-70">{item.caption}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{item.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Demo Video Placeholder */}
      <Section className="bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Demo"
            title="Video Walkthrough"
            description="The quickest way to understand how the project feels in motion."
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-xl border border-border bg-card"
          >
            {embedUrl ? (
              <div className="aspect-video">
                <iframe
                  src={embedUrl}
                  title={project.video?.title ?? `${project.title} demo`}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="aspect-video flex items-center justify-center text-center text-muted-foreground px-6">
                <div>
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Play className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-lg font-medium text-foreground">{project.video?.title ?? 'Demo walkthrough'}</p>
                  <p className="text-sm mt-2 max-w-xl">{project.video?.caption ?? 'A walkthrough can be shared on request.'}</p>
                </div>
              </div>
            )}
            <div className="border-t border-border px-6 py-4 text-sm text-muted-foreground">
              {project.video?.caption ?? 'A walkthrough can be shared on request.'}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Challenge Section */}
      <Section className="bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Challenge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-accent/10 text-accent">
                  <Target className="w-5 h-5" />
                </div>
                <h2 className="font-display text-[1.65rem] font-semibold text-foreground">The Challenge</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {project.challenge}
              </p>
            </motion.div>

            {/* Engineering Decisions */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <h2 className="font-display text-[1.65rem] font-semibold text-foreground">Engineering Decisions</h2>
              </div>
              <ul className="flex flex-col gap-4">
                {project.decisions.map((decision, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{decision}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Outcomes & Learnings */}
      <Section className="bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Outcomes */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-2xl bg-card border border-border"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-green-500/10 text-green-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h2 className="font-display text-[1.65rem] font-semibold text-foreground">Outcomes</h2>
              </div>
              <ul className="flex flex-col gap-4">
                {project.outcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 shrink-0" />
                    <span className="text-muted-foreground">{outcome}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Learnings */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-8 rounded-2xl bg-card border border-border"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h2 className="font-display text-[1.65rem] font-semibold text-foreground">What I Learned</h2>
              </div>
              <ul className="flex flex-col gap-4">
                {project.learnings.map((learning, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                    <span className="text-muted-foreground">{learning}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <Section className="bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              badge="More Work"
              title="Related Projects"
              description="Explore more of my engineering work."
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProjects.map((relatedProject, index) => (
                <ProjectCard
                  key={relatedProject.id}
                  project={relatedProject}
                  index={index}
                />
              ))}
            </div>
          </div>
        </Section>
      )}
    </>
  )
}
