'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Download, Mail, MapPin, Github, Linkedin } from 'lucide-react'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { ProjectCard } from '@/components/project-card'
import { Section, SectionHeader } from '@/components/section'
import { Terminal } from '@/components/home/terminal'
import { CurrentlyBuilding } from '@/components/home/currently-building'
import { aboutSection, personalInfo, projects } from '@/lib/data'

const featuredProjects = projects.filter((p) => p.featured)

export default function HomePage() {
  return (
    <main className="page-shell min-h-screen bg-background">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-4 pb-8 pt-28 sm:px-6 sm:pb-12 sm:pt-36 lg:px-8">
        <div className="absolute inset-0 aurora-backdrop opacity-60" />
        <div className="absolute inset-0 grid-pattern opacity-20" />

        <div className="relative mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-sm text-muted-foreground"
          >
            {personalInfo.name} · {personalInfo.location}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.06 }}
            className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-[-0.04em] text-foreground sm:text-[3.8rem]"
          >
            I build products people use — and the{' '}
            <span className="text-shimmer">systems behind them</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.14 }}
            className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg"
          >
            Full-stack engineer. Currently building{' '}
            <Link href="/projects/buzzr" className="text-foreground underline decoration-white/20 underline-offset-4 hover:decoration-white/50 transition-colors">
              Buzzr
            </Link>
            , a sports ML platform with 20 weekly active users.
            Starting MS CS at UT Dallas in August.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22 }}
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
          </motion.div>
        </div>
      </section>

      {/* ── Projects ── */}
      <Section id="projects" className="pt-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              badge="Projects"
              title="Selected work."
              description="The projects I'd share first with a recruiter or hiring manager."
              className="mb-0"
            />
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-medium text-foreground transition hover:border-white/18 hover:bg-white/9"
            >
              View all projects
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
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
            <div className="shrink-0">
              <div className="relative h-20 w-20 overflow-hidden rounded-full border border-white/10 sm:h-24 sm:w-24">
                <Image
                  src={aboutSection.portraitSrc}
                  alt={aboutSection.portraitAlt}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="max-w-2xl">
              <SectionHeader
                badge="About"
                title={aboutSection.title}
                className="mb-0"
              />
              <div className="mt-4 space-y-3 text-sm leading-7 text-foreground/85 sm:text-base">
                {aboutSection.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Terminal ── */}
      <Section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Interactive"
            title="rushil.sh"
            description="Type a command to learn more. Try &quot;help&quot; to start."
          />
          <div className="max-w-2xl">
            <Terminal />
          </div>
        </div>
      </Section>

      {/* ── Currently Building ── */}
      <Section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CurrentlyBuilding />
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
