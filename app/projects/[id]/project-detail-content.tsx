'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Github, ExternalLink, Calendar, User, Layers, CheckCircle2, Lightbulb, Target, BookOpen, Image as ImageIcon, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Section, SectionHeader } from '@/components/section'
import { ProjectCard } from '@/components/project-card'
import type { Project } from '@/lib/data'
import { projects } from '@/lib/data'

interface ProjectDetailContentProps {
  project: Project
}

export function ProjectDetailContent({ project }: ProjectDetailContentProps) {
  const relatedProjects = projects
    .filter((p) => p.id !== project.id && p.featured)
    .slice(0, 2)

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
            className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground"
          >
            {project.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed"
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
            {!project.githubUrl && !project.liveUrl && (
              <div className="rounded-full border border-border bg-secondary px-4 py-2 text-sm text-muted-foreground">
                Local case study. Code walkthrough available on request.
              </div>
            )}
          </motion.div>

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
            description="Visual documentation of the project interface and features."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="aspect-video rounded-xl bg-secondary border border-border flex items-center justify-center"
              >
                <div className="text-center text-muted-foreground">
                  <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">Screenshot {i}</p>
                  <p className="text-xs mt-1 opacity-70">Add your image here</p>
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
            description="A comprehensive demonstration of the project in action."
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="aspect-video rounded-xl bg-card border border-border flex items-center justify-center"
          >
            <div className="text-center text-muted-foreground">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Play className="w-8 h-8 text-primary" />
              </div>
              <p className="text-lg font-medium text-foreground">Demo Video</p>
              <p className="text-sm mt-1 opacity-70">Add your screen recording here</p>
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
                <h2 className="text-2xl font-bold text-foreground">The Challenge</h2>
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
                <h2 className="text-2xl font-bold text-foreground">Engineering Decisions</h2>
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
                <h2 className="text-2xl font-bold text-foreground">Outcomes</h2>
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
                <h2 className="text-2xl font-bold text-foreground">What I Learned</h2>
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
