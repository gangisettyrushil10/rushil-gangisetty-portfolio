'use client'

import type { CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Download, Github, Linkedin, Mail } from 'lucide-react'
import { Footer } from '@/components/organisms/footer'
import { Navbar } from '@/components/organisms/navbar'
import { GithubActivity } from '@/components/organisms/github-activity'
import {
  HoopsPill,
  HotTakePill,
  LatestCommitPill,
  LiveTimePill,
  LocationPill,
  MoonPhasePill,
  NowBuildingPill,
  ReadingPill,
} from '@/components/organisms/live-pills'
import { SpellsLegend } from '@/components/organisms/spells-legend'
import { Reveal } from '@/components/ui/reveal'
import { RevealGroup } from '@/components/ui/reveal-group'
import { TiltCard } from '@/components/ui/tilt-card'
import { Parallax } from '@/components/ui/parallax'
import { ScrollPinBand } from '@/components/ui/scroll-pin-band'
import { SectionHeader } from '@/components/ui/section-header'
import { DashedDivider } from '@/components/ui/dashed-divider'
import { TextCycle } from '@/components/ui/text-cycle'
import { Marquee } from '@/components/ui/marquee'
import { SpaceInvadersBand } from '@/components/ui/space-invaders'
import { aboutSection, personalInfo, projects } from '@/lib/data'
import { bentoSpan, bentoRowSpan, bentoQuirk } from '@/lib/bento'

const cyclingVerbs = ['ship things', 'build products', 'solve problems', 'design systems', 'train models']

const tickerItems = [
  'TypeScript',
  'Next.js',
  'React Native',
  'Python',
  'FastAPI',
  'Postgres',
  'Supabase',
  'LLM pipelines',
  'PyTorch',
  'scikit-learn',
  'Dallas, TX',
  'M.S. CS @ UT Dallas · Fall 2026',
  'Buzzr · 18 beta testers',
  'Seam.ai · LLM + Chrome ext',
  'open to roles',
]

const featured = projects.filter((p) => p.featured).slice(0, 5)

// Asymmetric layout for the featured grid — varied col + row spans break the rigid bento feel.
const featuredLayout: Record<number, [number, 1 | 2]> = {
  0: [7, 2], // hero project — wide and tall
  1: [5, 1], // top-right
  2: [5, 1], // mid-right (under #1)
  3: [6, 1], // bottom-left
  4: [6, 1], // bottom-right
}

export default function HomePage() {
  return (
    <main className="page-shell min-h-screen">
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32">
        {/* ── Hero intro + portrait ─────────────────── */}
        <section className="bento-grid">
          <Reveal className={`${bentoSpan(8)} bento-cell bento-no-scale flex flex-col justify-between gap-6 p-6 sm:p-8`}>
            <div>
              <span className="term-prompt">
                <span>rushil@dallas</span>
                <span className="text-subtle-foreground">:~/portfolio</span>
                <span className="caret">&nbsp;</span>
              </span>
              <span className="section-label ml-3">Software Engineer · Dallas</span>
              <h1 className="mt-5 text-4xl leading-[1.05] tracking-normal text-foreground sm:text-[3.25rem]">
                I&apos;m Rushil. I{' '}
                <TextCycle
                  words={cyclingVerbs}
                  className="text-phosphor"
                />{' '}
                — product software, data workflows, and applied AI.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
                I built{' '}
                <Link href="/projects/buzzr" className="accent-link">
                  Buzzr
                </Link>
                , a cross-platform sports app on Apple TestFlight with 18 beta testers, 7 live-league
                integrations, and real-time watch parties. LLM pipelines and Chrome extensions at Seam.ai.
                Starting MS CS at UT Dallas in August.
              </p>
              <p className="mt-4 font-mono text-[12px] leading-5 text-subtle-foreground">
                tip:{' '}
                <kbd className="kbd mx-0.5">⇧B</kbd> shoots hoops ·{' '}
                <kbd className="kbd mx-0.5">⌘K</kbd> opens search ·{' '}
                type{' '}
                <span style={{ color: 'var(--crt-amber)' }}>lumos</span>,{' '}
                <span style={{ color: 'var(--crt-amber)' }}>nox</span>, or{' '}
                <span style={{ color: 'var(--crt-amber)' }}>accio</span> for spells
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/projects"
                className="btn-glow inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold"
              >
                View projects
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a
                href={personalInfo.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-dashed border-(--pill-border) bg-bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:border-(--border-strong)"
              >
                <Download className="h-4 w-4" />
                Resume
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-2 rounded-lg border border-dashed border-(--pill-border) bg-bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:border-(--border-strong)"
              >
                <Mail className="h-4 w-4" />
                Email
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-dashed border-(--pill-border) bg-bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:border-(--border-strong)"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-dashed border-(--pill-border) bg-bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:border-(--border-strong)"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </Reveal>

          <Reveal delay={80} spring="bouncy" className={`${bentoSpan(4)} bento-cell bento-sunken flex flex-col gap-5 p-5 sm:p-6`}>
            <Parallax speed={0.35}>
              <TiltCard maxTilt={4} scale={1} className="relative aspect-[4/5] overflow-hidden rounded-lg border border-dashed border-(--pill-border)">
                <Image
                  src={aboutSection.portraitSrc}
                  alt={aboutSection.portraitAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover"
                />
              </TiltCard>
            </Parallax>
            <div className="flex flex-col gap-2">
              <LiveTimePill />
              <LocationPill />
              <MoonPhasePill />
              <HoopsPill />
              <ReadingPill />
            </div>
          </Reveal>
        </section>

        {/* ── Space Invaders ambient band ────────────── */}
        <Reveal className="mt-6">
          <SpaceInvadersBand />
        </Reveal>

        {/* ── Live status row ────────────────────────── */}
        <RevealGroup className="bento-grid mt-4" stagger={0.07}>
          <Reveal className={`${bentoSpan(4)} bento-cell ${bentoQuirk('status-now', { breathe: false })} flex items-center justify-between gap-3 p-4 sm:p-5`}>
            <div className="min-w-0">
              <p className="section-label">Now</p>
              <p className="mt-2 text-sm leading-6 text-foreground">
                Building a collaborative-filtering{' '}
                <span className="font-serif-italic">recommendation engine</span> for Buzzr.
              </p>
            </div>
            <NowBuildingPill />
          </Reveal>

          <Reveal className={`${bentoSpan(4)} bento-cell ${bentoQuirk('status-latest', { breathe: false })} flex flex-col justify-between gap-3 p-4 sm:p-5`}>
            <p className="section-label">Latest commit</p>
            <LatestCommitPill />
          </Reveal>

          <Reveal className={`${bentoSpan(4)} bento-cell ${bentoQuirk('status-next', { breathe: false })} flex flex-col justify-between gap-3 p-4 sm:p-5`}>
            <p className="section-label">Next</p>
            <p className="text-sm leading-6 text-foreground">
              <span className="font-serif-italic text-muted-foreground">M.S. Computer Science</span> at
              UT Dallas · Fall 2026
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover"
            >
              Say hello
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </RevealGroup>

        {/* ── Spells & cheats + Hot take ─────────────── */}
        <section className="bento-grid mt-6">
          <Reveal className={`${bentoSpan(7)} bento-cell p-5 sm:p-6`}>
            <SpellsLegend />
          </Reveal>
          <Reveal delay={80} className={`${bentoSpan(5)} bento-cell flex flex-col justify-between gap-4 p-5 sm:p-6`}>
            <div>
              <p className="section-label">Unsolicited takes</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Rotating opinion, because basketball obsession has to live somewhere.
              </p>
            </div>
            <HotTakePill />
          </Reveal>
        </section>

        {/* ── Marquee ticker ─────────────────────────── */}
        <div className="mt-10 border-y border-dashed border-(--pill-border)">
          <Marquee items={tickerItems} />
        </div>

        {/* ── Featured projects ─────────────────────── */}
        <DashedDivider className="my-14" />
        <SectionHeader
          label="Selected work"
          title="Projects I keep thinking about."
          cta={{ href: '/projects', text: 'All projects' }}
        />

        <ScrollPinBand height="160vh">
        <RevealGroup className="bento-grid bento-grid--featured" stagger={0.08}>
          {featured.map((project, index) => {
            const [colSpan, rowSpan] = featuredLayout[index] ?? [6, 1]
            const preview = project.gallery?.find((g) => g.src)
            const theme = {
              '--project-primary': project.theme?.primary ?? '#b347ff',
            } as CSSProperties

            return (
              <Reveal
                key={project.id}
                className={`${bentoSpan(colSpan)} ${bentoRowSpan(rowSpan)} bento-cell ${bentoQuirk(project.id)} group p-0`}
                style={theme}
              >
                <TiltCard maxTilt={6} className="h-full">
                <Link href={`/projects/${project.id}`} className="flex h-full flex-col">
                  {preview?.src ? (
                    <div className="relative aspect-[16/10] overflow-hidden rounded-t-[13px] border-b border-dashed border-(--pill-border) bg-bg-card-muted">
                      <Image
                        src={preview.src}
                        alt={preview.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-(--duration-slow) ease-(--ease-out) group-hover:scale-[1.02]"
                      />
                    </div>
                  ) : (
                    <div className="relative flex aspect-[16/10] items-end justify-between gap-3 rounded-t-[13px] border-b border-dashed border-(--pill-border) bg-bg-card-muted p-5">
                      <p className="font-mono text-xs text-subtle-foreground">
                        {project.repoName ?? project.title}
                      </p>
                      <p className="font-mono text-xs text-subtle-foreground">{project.timeline}</p>
                    </div>
                  )}

                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <div className="flex items-center gap-2">
                      <span className="section-label">{project.category}</span>
                      <span className="font-mono text-[11px] text-subtle-foreground">{project.timeline}</span>
                    </div>
                    <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground sm:text-xl">
                      {project.title}
                    </h3>
                    <p className="text-sm leading-6 text-muted-foreground">{project.description}</p>

                    <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                      {project.stack.slice(0, 4).map((tech) => (
                        <span
                          key={`${project.id}-${tech}`}
                          className="rounded border border-dashed border-(--pill-border) bg-bg-card-muted px-2 py-0.5 text-[11px] font-mono text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 text-sm">
                      <span className="font-medium text-foreground">Case study</span>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-(--duration-base) ease-(--ease-out) group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                    </div>
                  </div>
                </Link>
                </TiltCard>
              </Reveal>
            )
          })}
        </RevealGroup>
        </ScrollPinBand>

        {/* ── About + heatmap ───────────────────────── */}
        <DashedDivider className="my-14" />
        <section className="bento-grid">
          <Reveal className={`${bentoSpan(7)} bento-cell bento-no-scale p-6 sm:p-8`}>
            <span className="section-label">About</span>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
              Why I build.
            </h2>
            <div className="mt-5 space-y-4 text-[15px] leading-7 text-muted-foreground">
              {aboutSection.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {aboutSection.highlights.map((h) => (
                <div
                  key={h.label}
                  className="rounded-md border border-dashed border-(--pill-border) bg-bg-card p-3"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle-foreground">
                    {h.label}
                  </p>
                  <p className="mt-1.5 text-sm leading-6 text-foreground">{h.value}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={80} className={`${bentoSpan(5)} bento-cell p-6 sm:p-7`}>
            <GithubActivity />
          </Reveal>
        </section>

        {/* ── Signature CTA ─────────────────────────── */}
        <DashedDivider className="my-14" />
        <Reveal className="bento-cell bento-no-scale flex flex-col items-start justify-between gap-5 p-8 sm:flex-row sm:items-center">
          <div>
            <p className="font-serif-italic text-4xl leading-none text-accent sm:text-5xl">say hello,</p>
            <p className="mt-2 max-w-xl text-base leading-7 text-muted-foreground">
              Open to software engineering, backend, and product-focused full-stack roles. A short note
              about the team and problem area is perfect.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href={`mailto:${personalInfo.email}`}
              className="btn-glow inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold"
            >
              <Mail className="h-4 w-4" />
              {personalInfo.email}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-dashed border-(--pill-border) bg-bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:border-(--border-strong)"
            >
              Contact page
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>

      <Footer />
    </main>
  )
}
