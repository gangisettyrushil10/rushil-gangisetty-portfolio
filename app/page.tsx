'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Download, Mail, MapPin, Github, Linkedin } from 'lucide-react'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { ProjectCard } from '@/components/project-card'
import { Section } from '@/components/section'
import { Terminal } from '@/components/home/terminal'
import { CurrentlyBuilding } from '@/components/home/currently-building'
import { GithubActivity } from '@/components/home/github-activity'
import { LiquidSurface } from '@/components/aurora-background'
import { aboutSection, personalInfo, projects } from '@/lib/data'

const featuredProjects = projects.filter((p) => p.featured)

export default function HomePage() {
  return (
    <main className="page-shell min-h-screen bg-background">
      <LiquidSurface />
      <Navbar />
      <Terminal />

      {/* ── Hero ── */}
      <section className="relative px-4 pb-8 pt-28 sm:px-6 sm:pb-12 sm:pt-36 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-4xl text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-[3.8rem]"
          >
            I&apos;m Rushil. I <span className="text-shimmer">ship things</span>.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mt-5 max-w-2xl space-y-3 text-base leading-7 text-muted-foreground sm:text-lg"
          >
            <p>
              I built{' '}
              <Link href="/projects/buzzr" className="text-[#43d7ff] underline decoration-[#43d7ff]/30 underline-offset-4 hover:decoration-[#43d7ff]/60 transition-colors">
                Buzzr
              </Link>
              , a cross-platform sports app shipped to Apple TestFlight with 18 beta testers,
              7 live league integrations, and real-time watch parties.
            </p>
            <p>
              I like working across the stack — product, backend, data, AI.
              Built LLM pipelines and Chrome extensions at Seam.ai.
              Five shipped projects. Starting MS CS at UT Dallas in August.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="mt-7 flex flex-wrap items-center gap-4 text-sm"
          >
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href={personalInfo.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Download className="h-4 w-4" />
              Resume
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
              Email
            </a>
            <span className="text-muted-foreground/50">·</span>
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              Dallas, TX
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── Projects ── */}
      <Section id="projects" className="pt-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground sm:text-[2.2rem]">
                <span className="heading-accent">What I&apos;ve built.</span>
              </h2>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                Products, APIs, data pipelines, ML models. Click into any for the full story.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-medium text-foreground transition hover:border-white/18 hover:bg-white/9"
            >
              All projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 grid gap-4">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </Section>

      {/* ── About ── */}
      <Section id="about">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:items-start">
            {/* Portrait with glow */}
            <div className="relative mx-auto w-[200px] sm:w-[240px] lg:mx-0 lg:w-[280px]">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[#43d7ff]/20 via-[#9d8cff]/15 to-[#12b981]/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-[1.5rem] border border-white/12 shadow-[0_0_40px_-12px_rgba(67,215,255,0.2)]">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={aboutSection.portraitSrc}
                    alt={aboutSection.portraitAlt}
                    fill
                    sizes="(max-width: 1024px) 240px, 280px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="text-base font-semibold text-white">{personalInfo.name}</p>
                    <p className="mt-0.5 text-sm text-white/70">{personalInfo.title} · Dallas, TX</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Story content */}
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground sm:text-[2rem]">
                Why I build.
              </h2>

              {/* Narrative paragraphs */}
              <div className="mt-4 space-y-4 text-sm leading-7 text-foreground/85 sm:text-[0.95rem]">
                {aboutSection.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>

              {/* Highlights grid */}
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {aboutSection.highlights.map((h) => (
                  <div
                    key={h.label}
                    className="rounded-xl border border-white/8 bg-white/[0.02] p-4"
                    style={{ borderLeftColor: h.color, borderLeftWidth: '3px' }}
                  >
                    <p className="text-[0.65rem] font-mono uppercase tracking-[0.2em]" style={{ color: h.color }}>
                      {h.label}
                    </p>
                    <p className="mt-1.5 text-sm leading-6 text-foreground/85">{h.value}</p>
                  </div>
                ))}
              </div>

              {/* Personality strip */}
              <div className="mt-5 flex flex-wrap gap-2">
                {aboutSection.personality.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-xs text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Currently Building ── */}
      <Section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CurrentlyBuilding />
        </div>
      </Section>

      {/* ── GitHub Activity ── */}
      <Section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <GithubActivity />
        </div>
      </Section>

      {/* ── CTA ── */}
      <Section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[24px] border border-white/10 bg-white/[0.04] px-5 py-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Resume, education, and internship details live on the resume page.</p>
                <p className="mt-1 text-sm text-muted-foreground">{personalInfo.email}</p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <Link
                  href="/resume"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-medium text-foreground transition hover:border-white/18 hover:bg-white/9"
                >
                  View resume
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:brightness-110"
                >
                  <Mail className="h-4 w-4" />
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  )
}
