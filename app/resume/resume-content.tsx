import Link from 'next/link'
import { ArrowUpRight, Download, Linkedin, Mail } from 'lucide-react'
import { Section, SectionHeader } from '@/components/section'
import { education, educationHighlights, experiences, personalInfo, projects, recruiterSummary, skillGroups } from '@/lib/data'

const featuredProjects = projects.filter((project) => project.featured).slice(0, 3)

export function ResumeContent() {
  return (
    <>
      <section className="relative overflow-hidden px-4 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8">
        <div className="absolute inset-0 aurora-backdrop opacity-80" />
        <div className="absolute inset-0 grid-pattern opacity-30" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <span className="section-label">Resume</span>
              <h1 className="mt-5 text-4xl font-semibold leading-[0.94] tracking-[-0.06em] text-foreground sm:text-[4.1rem]">
                {personalInfo.name}
              </h1>
              <p className="mt-3 text-base font-medium text-primary">{personalInfo.title}</p>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                {recruiterSummary.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                <a
                  href={personalInfo.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:brightness-110"
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-white/18 hover:bg-white/9"
                >
                  <Mail className="h-4 w-4" />
                  Contact
                </Link>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-white/18 hover:bg-white/9"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </div>
            </div>

            <div className="glass-panel-strong rounded-[28px] p-5 sm:p-6">
              <p className="text-[0.68rem] font-mono uppercase tracking-[0.2em] text-primary/90">Quick read</p>
              <div className="mt-4 grid gap-3">
                <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-[0.68rem] font-mono uppercase tracking-[0.16em] text-muted-foreground">Location</p>
                  <p className="mt-2 text-sm text-foreground">{personalInfo.location}</p>
                </div>
                <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-[0.68rem] font-mono uppercase tracking-[0.16em] text-muted-foreground">Education</p>
                  <p className="mt-2 text-sm leading-6 text-foreground">Austin College graduate. UT Dallas M.S. in Computer Science starting Aug 2026.</p>
                </div>
                <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-[0.68rem] font-mono uppercase tracking-[0.16em] text-muted-foreground">Email</p>
                  <a href={`mailto:${personalInfo.email}`} className="mt-2 inline-flex text-sm text-foreground hover:text-primary">
                    {personalInfo.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section className="pt-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Education"
            title="Academic background"
            description="Degree history, current graduate plans, and supporting academic context."
          />

          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="grid gap-4">
              {education.map((entry) => (
                <div key={entry.school} className="glass-panel rounded-[24px] p-5">
                  <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-primary/90">{entry.period}</p>
                  <h2 className="mt-3 text-xl font-semibold text-foreground">{entry.school}</h2>
                  <p className="mt-1.5 text-sm text-muted-foreground">{entry.degree}</p>
                  <p className="mt-3 text-sm text-foreground/90">{entry.location}</p>
                  {entry.note && (
                    <p className="mt-2 text-sm leading-6 text-foreground/90">{entry.note}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="grid gap-4">
              {educationHighlights.map((group) => (
                <div key={group.title} className="glass-panel rounded-[24px] p-5">
                  <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-accent">{group.title}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={`${group.title}-${item}`} className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1.5 text-xs text-foreground/88">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Experience"
            title="Professional experience"
            description="Internship work across production data workflows, forecasting, and SaaS product systems."
          />

          <div className="grid gap-4 lg:grid-cols-3">
            {experiences.map((experience) => (
              <div key={experience.company} className="glass-panel rounded-[24px] p-5">
                <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-primary/90">{experience.period}</p>
                <h2 className="mt-3 text-xl font-semibold text-foreground">{experience.company}</h2>
                <p className="mt-1.5 text-sm text-muted-foreground">{experience.role}</p>

                <div className="mt-4 space-y-2.5">
                  {experience.bullets.map((bullet) => (
                    <div key={bullet} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                      <p className="text-sm leading-6 text-foreground/90">{bullet}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-[rgba(4,4,5,0.68)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Skills"
            title="A compact technical toolkit."
            description="Grouped around the work I do most often."
          />

          <div className="grid gap-4 md:grid-cols-3">
            {skillGroups.slice(0, 3).map((group) => (
              <div key={group.title} className="glass-panel rounded-[24px] p-4 sm:p-5">
                <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-accent">{group.title}</p>
                <p className="mt-2.5 text-sm leading-6 text-muted-foreground">{group.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.slice(0, 5).map((item) => (
                    <span key={`${group.title}-${item}`} className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1.5 text-xs text-foreground/88">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              badge="Selected Work"
              title="Projects that reinforce the resume."
              description="A compact rail of the project work most relevant to interviews."
              className="mb-0"
            />
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-medium text-foreground transition hover:border-white/18 hover:bg-white/9"
            >
              View all projects
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {featuredProjects.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`} className="glass-panel block rounded-[24px] p-5 transition hover:border-white/18">
                <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-primary/90">{project.category}</p>
                <h3 className="mt-3 text-xl font-semibold text-foreground">{project.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.recruiterAngle}</p>
                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-foreground">
                  Open case study
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </>
  )
}
