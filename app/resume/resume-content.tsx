import Link from 'next/link'
import { ArrowUpRight, Download, Mail } from 'lucide-react'
import { Section, SectionHeader } from '@/components/section'
import { experiences, personalInfo, projects, recruiterSummary, skillGroups } from '@/lib/data'

const featuredProjects = projects.filter((project) => project.featured)

export function ResumeContent() {
  return (
    <>
      <section className="relative overflow-hidden px-4 pb-18 pt-32 sm:px-6 sm:pb-22 sm:pt-40 lg:px-8">
        <div className="absolute inset-0 aurora-backdrop opacity-80" />
        <div className="absolute inset-0 grid-pattern opacity-30" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <span className="section-label">Resume snapshot</span>
              <h1 className="mt-6 text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-foreground sm:text-[5rem]">
                {personalInfo.name}
              </h1>
              <p className="mt-4 text-lg font-medium text-primary">{personalInfo.title}</p>
              <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground sm:text-[1.06rem]">
                {recruiterSummary.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={personalInfo.resumePath}
                  download
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:brightness-110"
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-5 py-3 text-sm font-medium text-foreground transition hover:border-white/18 hover:bg-white/9"
                >
                  <Mail className="h-4 w-4" />
                  Contact
                </Link>
              </div>
            </div>

            <div className="glass-panel-strong rounded-[32px] p-6 sm:p-7">
              <p className="text-[0.68rem] font-mono uppercase tracking-[0.2em] text-primary/90">Quick read</p>
              <div className="mt-5 grid gap-4">
                <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-[0.68rem] font-mono uppercase tracking-[0.16em] text-muted-foreground">Location</p>
                  <p className="mt-2 text-sm text-foreground">{personalInfo.location}</p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-[0.68rem] font-mono uppercase tracking-[0.16em] text-muted-foreground">Current focus</p>
                  <p className="mt-2 text-sm leading-6 text-foreground">{personalInfo.status}</p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-[0.68rem] font-mono uppercase tracking-[0.16em] text-muted-foreground">Reach me at</p>
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
            badge="Experience"
            title="Professional experience"
            description="Internship work across production data pipelines, stakeholder-facing forecasting, and SaaS product workflows."
          />

          <div className="grid gap-5 lg:grid-cols-3">
            {experiences.map((experience) => (
              <div key={experience.company} className="glass-panel rounded-[28px] p-6">
                <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-primary/90">{experience.period}</p>
                <h2 className="mt-4 text-2xl font-semibold text-foreground">{experience.company}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{experience.role}</p>

                <div className="mt-5 space-y-3">
                  {experience.bullets.map((bullet) => (
                    <div key={bullet} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                      <p className="text-sm leading-6 text-foreground/90">{bullet}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {experience.stack?.map((item) => (
                    <span
                      key={`${experience.company}-${item}`}
                      className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1.5 text-xs text-secondary-foreground"
                    >
                      {item}
                    </span>
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
            title="A focused technical toolkit."
            description="Organized around the work I do most often rather than every technology I have used."
          />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {skillGroups.map((group) => (
              <div key={group.title} className="glass-panel rounded-[28px] p-5">
                <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-accent">{group.title}</p>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{group.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
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
      </Section>

      <Section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              badge="Selected Work"
              title="Projects that reinforce the resume."
              description="A hiring manager can move from this summary directly into concrete technical proof."
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

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredProjects.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`} className="glass-panel block rounded-[28px] p-6 transition hover:border-white/18">
                <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-primary/90">{project.category}</p>
                <h3 className="mt-4 text-2xl font-semibold text-foreground">{project.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{project.recruiterAngle}</p>
                <div className="mt-5 flex items-center gap-2 text-sm font-medium text-foreground">
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
