import Link from 'next/link'
import { ArrowRight, Download, Mail } from 'lucide-react'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { ProjectCard } from '@/components/project-card'
import { Section, SectionHeader } from '@/components/section'
import { experiences, personalInfo, projects, skillGroups } from '@/lib/data'

const featuredProjects = projects.filter((project) => project.featured)
const homeFeaturedProjects = featuredProjects.slice(0, 3)
const coreStrengths = skillGroups.slice(0, 3)
const proofChips = ['Product software', 'Backend workflows', 'Data + AI']

export default function HomePage() {
  return (
    <main className="page-shell min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden px-4 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8">
        <div className="absolute inset-0 aurora-backdrop opacity-80" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="ambient-orb absolute left-[-8rem] top-24 h-52 w-52 rounded-full bg-cyan-400/16" />
        <div className="ambient-orb absolute right-[-6rem] top-14 h-48 w-48 rounded-full bg-pink-500/16 [animation-delay:1.1s]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <span className="section-label">Software Engineer • Selected public work</span>
            <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-[0.94] tracking-[-0.06em] text-foreground sm:text-[4.2rem]">
              Software engineer focused on <span className="text-shimmer">product quality</span>, reliable systems, and practical execution.
            </h1>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
              I build polished applications, backend workflows, and data-intensive tools. This portfolio highlights the public GitHub work that best represents my current level.
            </p>
            <p className="mt-3 text-sm font-medium text-foreground/90">
              {personalInfo.status}
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <Link
                href="#selected-work"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:brightness-110"
              >
                View selected work
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={personalInfo.resumePath}
                download
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-white/18 hover:bg-white/9"
              >
                <Download className="h-4 w-4" />
                Download resume
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {proofChips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1.5 text-xs sm:text-sm text-foreground/90"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section id="selected-work" className="pt-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              badge="Selected Work"
              title="Three projects to start with."
              description="These are the projects I would share first with a recruiter or hiring manager."
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
            {homeFeaturedProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-[rgba(4,4,5,0.68)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Experience"
            title="Experience in product, data, and operational software."
            description="A snapshot of the roles that reinforced the same strengths shown in the project work."
          />

          <div className="grid gap-4 lg:grid-cols-3">
            {experiences.map((experience) => (
              <div key={experience.company} className="glass-panel rounded-[24px] p-5">
                <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-accent">{experience.period}</p>
                <h2 className="mt-3 text-xl font-semibold text-foreground">{experience.company}</h2>
                <p className="mt-1.5 text-sm text-muted-foreground">{experience.role}</p>

                <div className="mt-4 space-y-2.5">
                  {experience.bullets.slice(0, 2).map((bullet) => (
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

      <Section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Core Strengths"
            title="Where I add the most value."
            description="A concise view of the skills and workflows that show up most often in my work."
          />

          <div className="grid gap-4 lg:grid-cols-3">
            {coreStrengths.map((group) => (
              <div key={group.title} className="glass-panel rounded-[24px] p-5">
                <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-primary/90">{group.title}</p>
                <p className="mt-2.5 text-sm leading-6 text-muted-foreground">{group.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.slice(0, 5).map((item) => (
                    <span
                      key={`${group.title}-${item}`}
                      className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1.5 text-xs text-foreground/88"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[24px] border border-white/10 bg-white/[0.04] px-5 py-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Interested in connecting?</p>
                <p className="mt-1 text-sm text-muted-foreground">{personalInfo.email}</p>
              </div>
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
      </Section>

      <Footer />
    </main>
  )
}
