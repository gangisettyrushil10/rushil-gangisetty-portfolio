'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Rocket,
  Sparkles,
  SquareTerminal,
} from 'lucide-react'
import { Footer } from '@/components/organisms/footer'
import { Navbar } from '@/components/organisms/navbar'
import { aboutSection, featuredProjectOrder, personalInfo, projects, type Project } from '@/lib/data'

const featuredProjects = projects
  .filter((project) => project.featured)
  .sort((a, b) => featuredProjectOrder.indexOf(a.id) - featuredProjectOrder.indexOf(b.id))

const spotlightProject = featuredProjects[0]
const satelliteProjects = featuredProjects.slice(1, 3)

const launchDeck = [
  {
    href: '/projects/fuzzy',
    label: 'Desktop AI',
    title: 'Open Fuzzy',
    note: 'Mac-first study IDE for PDFs with OpenAI-powered tutor flows.',
  },
  {
    href: '/projects/pixeldraw',
    label: 'Apple Product',
    title: 'See PixelDraw',
    note: 'SwiftUI + Metal coloring app still actively being shaped.',
  },
  {
    href: '/projects',
    label: 'Portfolio Map',
    title: 'Browse everything',
    note: 'The rest of the backend, analytics, and full-stack systems work.',
  },
]

function getProjectPreview(project: Project) {
  return project.gallery?.find((item) => item.src)
}

function getSecondaryAction(project: Project) {
  if (project.liveUrl) {
    return { href: project.liveUrl, label: 'Open live', external: true }
  }

  if (project.githubUrl) {
    return { href: project.githubUrl, label: 'View repo', external: true }
  }

  return null
}

function ProjectVisual({
  project,
  aspectClassName,
}: {
  project: Project
  aspectClassName: string
}) {
  const preview = getProjectPreview(project)
  const primary = project.theme?.primary ?? '#7df9ff'
  const secondary = project.theme?.secondary ?? '#6ee7b7'

  return (
    <div className={`relative overflow-hidden border-b border-white/10 bg-black ${aspectClassName}`}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at 20% 16%, ${primary}28, transparent 30%), radial-gradient(circle at 84% 12%, ${secondary}24, transparent 22%), linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))`,
        }}
      />
      {preview?.src ? (
        <>
          <Image
            src={preview.src}
            alt={preview.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/14 to-transparent" />
        </>
      ) : (
        <div className="project-preview-fallback absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <span className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[0.68rem] font-mono uppercase tracking-[0.18em] text-white/72">
              In progress
            </span>
            <span
              className="rounded-full px-3 py-1 text-[0.68rem] font-mono uppercase tracking-[0.18em]"
              style={{ backgroundColor: `${primary}26`, color: primary }}
            >
              {project.category}
            </span>
          </div>
          <div>
            <p className="text-[0.7rem] font-mono uppercase tracking-[0.24em] text-white/52">
              Launch preview
            </p>
            <h3 className="mt-3 max-w-md text-2xl font-semibold leading-tight text-foreground">
              {project.previewTitle ?? project.title}
            </h3>
            <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
              {project.previewNote ?? project.description}
            </p>
          </div>
        </div>
      )}
      <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/45 px-3 py-1 text-[0.68rem] font-mono uppercase tracking-[0.18em] text-white/80 backdrop-blur">
        {project.category}
      </div>
      <div
        className="absolute bottom-4 right-4 rounded-full px-3 py-1 text-[0.68rem] font-mono uppercase tracking-[0.18em] backdrop-blur"
        style={{ backgroundColor: `${primary}22`, color: primary }}
      >
        {project.status}
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <main className="page-shell min-h-screen bg-background">
      <Navbar />

      <section className="relative px-4 pb-10 pt-28 sm:px-6 sm:pb-14 sm:pt-32 lg:px-8 lg:pt-36">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="orbit-panel relative overflow-hidden rounded-[40px] px-6 py-10 sm:px-10 lg:px-14 lg:py-16"
          >
            <div className="signal-dots absolute inset-0 opacity-40" />
            <div className="pointer-events-none absolute inset-x-[10%] top-10 h-44 rounded-full bg-[radial-gradient(circle,rgba(111,197,255,0.36),rgba(111,197,255,0.08)_46%,transparent_74%)] blur-3xl" />

            <div className="relative z-10 mx-auto max-w-5xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-4 py-2 text-[0.72rem] font-mono uppercase tracking-[0.22em] text-muted-foreground"
              >
                <span className="status-pulse inline-flex h-2 w-2 rounded-full bg-primary" />
                Open to software engineering roles
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.62, delay: 0.1 }}
                className="mt-8 font-display text-[4.2rem] leading-[0.9] tracking-[-0.06em] text-foreground sm:text-[5.6rem] lg:text-[7.5rem]"
              >
                Rushil
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.62, delay: 0.16 }}
                className="mt-3 text-[0.74rem] font-mono uppercase tracking-[0.34em] text-white/48 sm:text-[0.8rem]"
              >
                Software Engineer / Desktop / Mobile / Applied AI
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.62, delay: 0.22 }}
                className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-foreground/82 sm:text-[1.2rem]"
              >
                I build products that feel calm on the surface and serious underneath:
                local-first tools, Apple-platform apps, and backend systems that stay
                understandable after the demo glow wears off.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.62, delay: 0.28 }}
                className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-[0.97rem]"
              >
                Right now that story starts with{' '}
                <Link
                  href="/projects/fuzzy"
                  className="text-primary transition-colors hover:text-white"
                >
                  Fuzzy
                </Link>
                , a Mac-first study IDE for PDFs with OpenAI-powered tutor workflows, and{' '}
                <Link
                  href="/projects/pixeldraw"
                  className="text-primary transition-colors hover:text-white"
                >
                  PixelDraw
                </Link>
                , a native Apple coloring app I&apos;m still shaping into something calmer and
                more tactile.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.62, delay: 0.34 }}
                className="mt-10 rounded-[30px] border border-white/10 bg-black/38 p-4 shadow-[0_28px_90px_-68px_rgba(109,197,255,0.4)] backdrop-blur-xl"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="text-left">
                    <p className="text-[0.68rem] font-mono uppercase tracking-[0.26em] text-primary/80">
                      Launch Sequence
                    </p>
                    <p className="mt-2 text-sm text-foreground/88">
                      Start with the project story that matches the role you care about.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/projects"
                      className="hud-button inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm text-foreground transition hover:text-white"
                    >
                      Browse case studies
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <a
                      href={personalInfo.resumePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:brightness-110"
                    >
                      <Download className="h-4 w-4" />
                      Resume
                    </a>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 lg:grid-cols-3">
                  {launchDeck.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.06 }}
                    >
                      <Link
                        href={item.href}
                        className="case-frame block rounded-[26px] p-4 text-left transition-transform hover:-translate-y-1"
                      >
                        <p className="text-[0.68rem] font-mono uppercase tracking-[0.24em] text-primary/78">
                          {item.label}
                        </p>
                        <div className="mt-5 flex items-start justify-between gap-4">
                          <div>
                            <p className="text-lg font-semibold text-foreground">{item.title}</p>
                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                              {item.note}
                            </p>
                          </div>
                          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-white/52" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.62, delay: 0.46 }}
                className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm text-muted-foreground"
              >
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  {personalInfo.location}
                </span>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="work" className="px-4 pb-8 pt-4 sm:px-6 sm:pb-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="text-[0.72rem] font-mono uppercase tracking-[0.28em] text-primary/78">
                Selected Work
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-[3.2rem]">
                The strongest proof lives in the case studies.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[0.97rem]">
                Fuzzy and PixelDraw are the newest product story. Buzzr shows the broader
                full-stack range and what sustained iteration looks like when a real product
                keeps expanding.
              </p>
            </div>

            <Link
              href="/projects"
              className="hud-button inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm text-foreground transition hover:text-white"
            >
              Full portfolio
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="case-frame overflow-hidden rounded-[34px]">
              <ProjectVisual project={spotlightProject} aspectClassName="aspect-[1.22/0.88]" />

              <div className="grid gap-6 p-6 lg:grid-cols-[minmax(0,1fr)_220px] lg:p-7">
                <div>
                  <p className="text-[0.68rem] font-mono uppercase tracking-[0.24em] text-primary/82">
                    {spotlightProject.role}
                  </p>
                  <h3 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-[3.2rem]">
                    {spotlightProject.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[0.98rem]">
                    {spotlightProject.description}
                  </p>
                  {spotlightProject.recruiterAngle && (
                    <p className="mt-5 max-w-2xl text-sm leading-7 text-foreground/84">
                      {spotlightProject.recruiterAngle}
                    </p>
                  )}

                  <div className="mt-6 flex flex-wrap gap-2">
                    {spotlightProject.stack.slice(0, 6).map((item) => (
                      <span
                        key={`${spotlightProject.id}-${item}`}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[0.68rem] font-mono uppercase tracking-[0.14em] text-muted-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <Link
                      href={`/projects/${spotlightProject.id}`}
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:brightness-110"
                    >
                      Read case study
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    {getSecondaryAction(spotlightProject) && (
                      <a
                        href={getSecondaryAction(spotlightProject)?.href}
                        target={getSecondaryAction(spotlightProject)?.external ? '_blank' : undefined}
                        rel={getSecondaryAction(spotlightProject)?.external ? 'noopener noreferrer' : undefined}
                        className="hud-button inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm text-foreground transition hover:text-white"
                      >
                        {getSecondaryAction(spotlightProject)?.label}
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="grid gap-3 self-start">
                  {spotlightProject.metrics.slice(0, 4).map((metric) => (
                    <div
                      key={`${spotlightProject.id}-${metric.label}`}
                      className="rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-4"
                    >
                      <p className="text-[1.15rem] font-semibold text-foreground">{metric.value}</p>
                      <p className="mt-1 text-[0.68rem] font-mono uppercase tracking-[0.16em] text-muted-foreground">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              {satelliteProjects.map((project) => {
                const action = getSecondaryAction(project)

                return (
                  <div key={project.id} className="case-frame overflow-hidden rounded-[30px]">
                    <ProjectVisual project={project} aspectClassName="aspect-[1.25/0.84]" />

                    <div className="p-5">
                      <p className="text-[0.68rem] font-mono uppercase tracking-[0.22em] text-primary/80">
                        {project.timeline}
                      </p>
                      <div className="mt-3 flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-2xl font-semibold tracking-[-0.05em] text-foreground">
                            {project.title}
                          </h3>
                          <p className="mt-3 text-sm leading-7 text-muted-foreground">
                            {project.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 grid gap-2 sm:grid-cols-2">
                        {project.metrics.slice(0, 2).map((metric) => (
                          <div
                            key={`${project.id}-${metric.label}`}
                            className="rounded-[20px] border border-white/10 bg-white/[0.03] px-3 py-3"
                          >
                            <p className="text-sm font-semibold text-foreground">{metric.value}</p>
                            <p className="mt-1 text-[0.64rem] font-mono uppercase tracking-[0.16em] text-muted-foreground">
                              {metric.label}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-5 flex flex-wrap gap-3">
                        <Link
                          href={`/projects/${project.id}`}
                          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:brightness-110"
                        >
                          Open story
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                        {action && (
                          <a
                            href={action.href}
                            target={action.external ? '_blank' : undefined}
                            rel={action.external ? 'noopener noreferrer' : undefined}
                            className="hud-button inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-foreground transition hover:text-white"
                          >
                            {action.label}
                            <ArrowUpRight className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="px-4 pb-8 pt-4 sm:px-6 sm:pb-12 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="case-frame rounded-[34px] p-6 sm:p-7">
            <p className="text-[0.72rem] font-mono uppercase tracking-[0.28em] text-primary/78">
              Orbit Notes
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-[3rem]">
              I like products where the interface feels calm even when the systems underneath are not.
            </h2>

            <div className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground sm:text-[0.97rem]">
              {aboutSection.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {aboutSection.highlights.map((highlight) => (
                <div
                  key={highlight.label}
                  className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4"
                >
                  <p
                    className="text-[0.68rem] font-mono uppercase tracking-[0.18em]"
                    style={{ color: highlight.color }}
                  >
                    {highlight.label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-foreground/84">{highlight.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="case-frame rounded-[30px] p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.72rem] font-mono uppercase tracking-[0.24em] text-primary/78">
                    Current Signals
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-foreground">
                    What I want more of.
                  </h3>
                </div>
                <Sparkles className="h-5 w-5 text-primary/70" />
              </div>

              <div className="mt-5 grid gap-3">
                <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-[0.68rem] font-mono uppercase tracking-[0.16em] text-primary/78">
                    Desktop products
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Local-first tools, Electron workflows, persistence layers, and product details
                    that make AI feel useful instead of bolted on.
                  </p>
                </div>
                <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-[0.68rem] font-mono uppercase tracking-[0.16em] text-primary/78">
                    Apple-native work
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    SwiftUI, tactile interaction design, and products that have to earn their feel
                    through performance and restraint.
                  </p>
                </div>
                <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-[0.68rem] font-mono uppercase tracking-[0.16em] text-primary/78">
                    Backend clarity
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Real APIs, messy data, and model workflows that stay readable to the next
                    engineer, not just the person who shipped version one.
                  </p>
                </div>
              </div>
            </div>

            <div className="case-frame rounded-[30px] p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.72rem] font-mono uppercase tracking-[0.24em] text-primary/78">
                    Personality
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-foreground">
                    A few real details.
                  </h3>
                </div>
                <SquareTerminal className="h-5 w-5 text-primary/70" />
              </div>

              <div className="mt-5 flex flex-wrap gap-2.5">
                {aboutSection.personality.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[0.72rem] font-mono uppercase tracking-[0.12em] text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-6 rounded-[24px] border border-white/10 bg-black/35 p-4">
                <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-primary/78">
                  Next checkpoint
                </p>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Starting M.S. in Computer Science at UT Dallas in August 2026 while continuing to
                  build product software that spans desktop, backend, and applied AI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-14 pt-4 sm:px-6 sm:pb-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="orbit-panel rounded-[34px] px-6 py-6 sm:px-8">
            <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-[0.72rem] font-mono uppercase tracking-[0.28em] text-primary/78">
                  Transmission Open
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-foreground sm:text-[2.6rem]">
                  If you want the product judgment, backend decisions, and AI workflow story, I can
                  walk through it.
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-[0.97rem]">
                  {personalInfo.status}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:brightness-110"
                >
                  <Rocket className="h-4 w-4" />
                  Contact
                </Link>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="hud-button inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm text-foreground transition hover:text-white"
                >
                  <Mail className="h-4 w-4" />
                  {personalInfo.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
