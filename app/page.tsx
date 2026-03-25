'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Download, Mail, MapPin, Github, Linkedin } from 'lucide-react'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { ProjectCard } from '@/components/project-card'
import { Section, SectionHeader } from '@/components/section'
import { PhoneMockup } from '@/components/home/phone-mockup'
import { LiveStats } from '@/components/home/live-stats'
import { BuzzrShowcase } from '@/components/home/buzzr-showcase'
import { CurrentlyBuilding } from '@/components/home/currently-building'
import { aboutSection, personalInfo, projects } from '@/lib/data'

const otherFeatured = projects.filter((p) => p.featured && p.id !== 'buzzr')

// Terminal lines for stack display
const terminalLines = [
  { prompt: '$ rushil --stack', output: 'TypeScript, Python, React Native, Next.js, Supabase, scikit-learn' },
  { prompt: '$ rushil --status', output: 'Building Buzzr v2 · recommendation engine in progress' },
]

export default function HomePage() {
  return (
    <main className="page-shell min-h-screen bg-background">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-4 pb-12 pt-24 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8">
        <div className="absolute inset-0 aurora-backdrop opacity-80" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="ambient-orb absolute left-[-8rem] top-24 h-52 w-52 rounded-full bg-[#43d7ff]/16" />
        <div className="ambient-orb absolute right-[-6rem] top-14 h-48 w-48 rounded-full bg-[#12b981]/16 [animation-delay:1.1s]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            {/* Left — Text */}
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-[#43d7ff]/25 bg-[#43d7ff]/8 px-4 py-2 text-[0.72rem] font-mono uppercase tracking-[0.18em] text-[#43d7ff] backdrop-blur"
              >
                <span className="h-2 w-2 rounded-full bg-[#12b981] shadow-[0_0_12px_rgba(18,185,129,0.6)]" />
                Building Buzzr — live on TestFlight
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.58, delay: 0.06 }}
                className="mt-6 text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-[3.2rem] lg:text-[3.6rem]"
              >
                I built a sports platform with{' '}
                <span className="text-shimmer">20 weekly active users</span>{' '}
                and an ML model that predicts game entertainment.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.58, delay: 0.14 }}
                className="mt-5 text-lg text-muted-foreground"
              >
                Here&apos;s everything else.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.58, delay: 0.22 }}
                className="mt-7 flex flex-wrap gap-3"
              >
                <Link
                  href="#buzzr"
                  className="inline-flex items-center gap-2 rounded-full bg-[#43d7ff] px-5 py-2.5 text-sm font-medium text-black transition hover:brightness-110"
                >
                  See Buzzr
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-white/[0.08]"
                >
                  All projects
                </Link>
                <a
                  href={personalInfo.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-white/[0.08]"
                >
                  <Download className="h-4 w-4" />
                  Resume
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.58, delay: 0.3 }}
                className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground"
              >
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-[#43d7ff]" />
                  {personalInfo.location}
                </span>
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
                  <Github className="h-3.5 w-3.5" />
                  GitHub
                </a>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
                  <Linkedin className="h-3.5 w-3.5" />
                  LinkedIn
                </a>
                <a href={`mailto:${personalInfo.email}`} className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
                  <Mail className="h-3.5 w-3.5" />
                  Email
                </a>
              </motion.div>

              {/* Terminal stack display */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.58, delay: 0.4 }}
                className="mt-7 rounded-2xl border border-white/8 bg-black/40 p-4 font-mono text-xs backdrop-blur"
              >
                {terminalLines.map((line) => (
                  <div key={line.prompt} className="mt-1 first:mt-0">
                    <span className="text-muted-foreground">{line.prompt}</span>
                    <div className="text-[#43d7ff]/80">→ {line.output}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — Phone mockup */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative flex justify-center lg:justify-end"
            >
              <PhoneMockup />
            </motion.div>
          </div>

          {/* Stats strip */}
          <div className="mt-12">
            <LiveStats />
          </div>
        </div>
      </section>

      {/* ── Buzzr Showcase ── */}
      <Section id="buzzr">
        <BuzzrShowcase />
      </Section>

      {/* ── About / Founder Memo ── */}
      <Section id="about" className="pt-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div className="glass-panel-strong rounded-[28px] p-4 sm:p-5">
              <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-black/60">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={aboutSection.portraitSrc}
                    alt={aboutSection.portraitAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 38vw"
                    className="object-cover grayscale-[12%] contrast-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/18 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <p className="text-base font-semibold text-white">{personalInfo.name}</p>
                    <p className="mt-1 text-sm text-white/76">{personalInfo.title}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <SectionHeader
                badge="About"
                title={aboutSection.title}
                description="Not a bio — a note on why I build what I build."
              />

              <div className="glass-panel rounded-[24px] p-5">
                {aboutSection.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-3 first:mt-0 text-sm leading-7 text-foreground/90">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {aboutSection.highlights.map((highlight) => (
                  <div key={highlight.label} className="glass-panel rounded-[24px] p-4">
                    <p className="text-[0.68rem] font-mono uppercase tracking-[0.16em] text-primary/90">{highlight.label}</p>
                    <p className="mt-2.5 text-sm leading-6 text-foreground/90">{highlight.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Other Projects ── */}
      <Section id="projects" className="pt-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              badge="Projects"
              title="Other projects."
              description="More things I've built — backend APIs, data workflows, applied AI, and ML depth."
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
            {otherFeatured.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </Section>

      {/* ── Currently Building ── */}
      <Section>
        <CurrentlyBuilding />
      </Section>

      {/* ── CTA ── */}
      <Section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[24px] border border-white/10 bg-white/[0.04] px-5 py-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Resume, education, and internship experience live on the resume page.</p>
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
