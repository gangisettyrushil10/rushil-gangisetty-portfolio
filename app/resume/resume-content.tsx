import Link from 'next/link'
import { ArrowUpRight, Download, Linkedin, Mail } from 'lucide-react'
import { Section, SectionHeader } from '@/components/templates/section'
import { Reveal } from '@/components/ui/reveal'
import { DashedDivider } from '@/components/ui/dashed-divider'
import { LiveTimePill, LocationPill } from '@/components/organisms/live-pills'
import {
  education,
  educationHighlights,
  experiences,
  personalInfo,
  projects,
  recruiterSummary,
  skillGroups,
} from '@/lib/data'

const featuredProjects = projects.filter((project) => project.featured).slice(0, 3)

export function ResumeContent() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32">
      {/* ── Header ── */}
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <span className="section-label">Resume</span>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-[3.5rem]">
            {personalInfo.name}
          </h1>
          <p className="mt-2 text-base font-medium text-accent">{personalInfo.title}</p>
          <p className="mt-5 max-w-2xl text-[15px] leading-7 text-muted-foreground">
            {recruiterSummary.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href={personalInfo.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-foreground px-3.5 py-1.5 text-sm font-medium text-background transition hover:bg-foreground/90"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-dashed border-(--pill-border) bg-bg-card px-3.5 py-1.5 text-sm font-medium text-foreground transition hover:border-(--border-strong)"
            >
              <Mail className="h-4 w-4" />
              Contact
            </Link>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-dashed border-(--pill-border) bg-bg-card px-3.5 py-1.5 text-sm font-medium text-foreground transition hover:border-(--border-strong)"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </Reveal>

        <Reveal delay={80} className="bento-cell p-5 sm:p-6">
          <span className="section-label">Quick read</span>
          <div className="mt-4 flex flex-col gap-2">
            <LiveTimePill />
            <LocationPill />
          </div>
          <div className="mt-4 space-y-3">
            <div className="rounded-md border border-dashed border-(--pill-border) bg-bg-card-muted p-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle-foreground">
                Education
              </p>
              <p className="mt-1 text-sm leading-6 text-foreground">
                Austin College grad. <span className="font-serif-italic">M.S. CS</span> at UT Dallas
                starting Aug 2026.
              </p>
            </div>
            <div className="rounded-md border border-dashed border-(--pill-border) bg-bg-card-muted p-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle-foreground">
                Email
              </p>
              <a
                href={`mailto:${personalInfo.email}`}
                className="mt-1 inline-flex text-sm text-foreground hover:text-accent"
              >
                {personalInfo.email}
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <DashedDivider className="my-14" />

      {/* ── Education ── */}
      <Section className="py-0">
        <SectionHeader
          badge="Education"
          title="Academic background"
          description="Degree history, graduate plans, and supporting academic context."
        />

        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-4">
            {education.map((entry, i) => (
              <Reveal key={entry.school} delay={i * 60} className="bento-cell p-5">
                <span className="section-label">{entry.period}</span>
                <h2 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-foreground">
                  {entry.school}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">{entry.degree}</p>
                <p className="mt-2 text-sm text-foreground">{entry.location}</p>
                {entry.note && (
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{entry.note}</p>
                )}
              </Reveal>
            ))}
          </div>

          <div className="grid gap-4">
            {educationHighlights.map((group, i) => (
              <Reveal key={group.title} delay={80 + i * 60} className="bento-cell p-5">
                <span className="section-label">{group.title}</span>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={`${group.title}-${item}`}
                      className="rounded border border-dashed border-(--pill-border) bg-bg-card-muted px-2 py-0.5 text-[11px] font-mono text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Experience ── */}
      <Section>
        <SectionHeader
          badge="Experience"
          title="Professional experience"
          description="Internship work across production data workflows, forecasting, and SaaS product systems."
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {experiences.map((experience, i) => (
            <Reveal key={experience.company} delay={i * 60} className="bento-cell p-5">
              <span className="section-label">{experience.period}</span>
              <h2 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-foreground">
                {experience.company}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{experience.role}</p>
              <div className="mt-4 space-y-2">
                {experience.bullets.map((bullet) => (
                  <div
                    key={bullet}
                    className="rounded-md border border-dashed border-(--pill-border) bg-bg-card-muted px-3 py-2"
                  >
                    <p className="text-sm leading-6 text-foreground">{bullet}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Skills ── */}
      <Section className="py-0">
        <SectionHeader
          badge="Skills"
          title="A compact technical toolkit."
          description="Grouped around the work I do most often."
        />

        <div className="grid gap-4 md:grid-cols-3">
          {skillGroups.slice(0, 3).map((group, i) => (
            <Reveal key={group.title} delay={i * 60} className="bento-cell p-5">
              <span className="section-label">{group.title}</span>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{group.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {group.items.slice(0, 6).map((item) => (
                  <span
                    key={`${group.title}-${item}`}
                    className="rounded border border-dashed border-(--pill-border) bg-bg-card-muted px-2 py-0.5 text-[11px] font-mono text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Selected Work ── */}
      <Section className="pb-0">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            badge="Selected work"
            title="Projects that reinforce the resume."
            description="A compact rail of project work most relevant to interviews."
            className="mb-0"
          />
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg border border-dashed border-(--pill-border) bg-bg-card px-3 py-1.5 text-sm font-medium text-foreground transition hover:border-(--border-strong)"
          >
            View all projects
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.id} delay={i * 70}>
              <Link
                href={`/projects/${project.id}`}
                className="bento-cell group flex h-full flex-col gap-3 p-5"
              >
                <span className="section-label">{project.category}</span>
                <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground">
                  {project.title}
                </h3>
                <p className="text-sm leading-6 text-muted-foreground">{project.recruiterAngle}</p>
                <div className="mt-auto flex items-center gap-2 text-sm font-medium text-foreground">
                  Case study
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:text-accent" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  )
}
