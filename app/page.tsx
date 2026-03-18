import Link from 'next/link'
import { ArrowRight, ArrowUpRight, BriefcaseBusiness, Download, Github, Mail, Sparkles } from 'lucide-react'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { ProjectCard } from '@/components/project-card'
import { Section, SectionHeader } from '@/components/section'
import { experiences, focusAreas, homeStats, personalInfo, projects, recruiterSummary, skillGroups, workPrinciples } from '@/lib/data'

const featuredProjects = projects.filter((project) => project.featured)

export default function HomePage() {
  return (
    <main className="page-shell min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden px-4 pb-18 pt-32 sm:px-6 sm:pb-24 sm:pt-40 lg:px-8">
        <div className="absolute inset-0 aurora-backdrop opacity-80" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="ambient-orb absolute left-[-8rem] top-28 h-56 w-56 rounded-full bg-cyan-400/18" />
        <div className="ambient-orb absolute right-[-6rem] top-14 h-52 w-52 rounded-full bg-pink-500/18 [animation-delay:1.1s]" />
        <div className="ambient-orb absolute bottom-[-5rem] left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-emerald-400/14 [animation-delay:2.2s]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-start gap-10 lg:grid-cols-[1.12fr_0.88fr]">
            <div>
              <span className="section-label">Software engineer • curated from GitHub</span>
              <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-foreground sm:text-[5.6rem]">
                I build software that is <span className="text-shimmer">well-crafted for users</span> and maintainable for teams.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-[1.08rem]">
                I&apos;m Rushil, a software engineer with experience across full-stack applications, backend workflows, data-intensive systems,
                and applied AI. This portfolio highlights the public GitHub work that best represents my current level.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="#selected-work"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:brightness-110"
                >
                  View selected work
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={personalInfo.resumePath}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-5 py-3 text-sm font-medium text-foreground transition hover:border-white/18 hover:bg-white/9"
                >
                  <Download className="h-4 w-4" />
                  Download resume
                </a>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-5 py-3 text-sm font-medium text-foreground transition hover:border-white/18 hover:bg-white/9"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="glass-panel rounded-[28px] p-5 sm:p-6">
                  <p className="text-[0.68rem] font-mono uppercase tracking-[0.2em] text-primary/90">Current search</p>
                  <p className="mt-3 text-lg font-medium text-foreground">{personalInfo.status}</p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    I am especially interested in roles where product quality, backend structure, and real-world workflows all matter.
                  </p>
                </div>
                <div className="glass-panel rounded-[28px] p-5 sm:p-6">
                  <p className="text-[0.68rem] font-mono uppercase tracking-[0.2em] text-accent">Professional profile</p>
                  <p className="mt-3 text-lg font-medium text-foreground">{recruiterSummary.title}</p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{recruiterSummary.description}</p>
                </div>
              </div>
            </div>

            <div className="glass-panel-strong rounded-[32px] p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/18 text-primary">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">Recommended starting points</p>
                  <p className="text-sm text-muted-foreground">A concise path through the portfolio.</p>
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                {featuredProjects.map((project, index) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className="group block rounded-[24px] border border-white/10 bg-white/[0.04] p-4 transition hover:border-white/18 hover:bg-white/[0.07]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-primary/90">
                          0{index + 1} • {project.category}
                        </p>
                        <h2 className="mt-2 text-lg font-semibold text-foreground">{project.title}</h2>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">{project.recruiterAngle}</p>
                      </div>
                      <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition group-hover:text-foreground" />
                    </div>
                  </Link>
                ))}
              </div>

              <div className="surface-line mt-6 pt-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[22px] border border-white/10 bg-black/18 p-4">
                    <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-accent">Location</p>
                    <p className="mt-2 text-sm text-foreground">{personalInfo.location}</p>
                  </div>
                  <div className="rounded-[22px] border border-white/10 bg-black/18 p-4">
                    <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-primary/90">Reach out</p>
                    <a href={`mailto:${personalInfo.email}`} className="mt-2 inline-flex text-sm text-foreground hover:text-primary">
                      {personalInfo.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {homeStats.map((stat) => (
              <div key={stat.label} className="glass-panel rounded-[26px] p-5">
                <p className="text-3xl font-semibold text-foreground">{stat.value}</p>
                <p className="mt-2 text-sm font-medium text-foreground">{stat.label}</p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{stat.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section id="selected-work" className="pt-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Best Work"
            title="Four public GitHub projects that best represent my current work."
            description="This section is intentionally selective. These projects provide the clearest view of my work across product software, backend workflows, data-intensive applications, and applied AI."
          />

          <div className="grid gap-6">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} featured />
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-[rgba(4,4,5,0.68)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="How I Work"
            title="How I approach engineering work."
            description="The strongest portfolios are usually clear about both execution and judgment. These principles reflect how I try to contribute on a team."
          />

          <div className="grid gap-5 lg:grid-cols-3">
            {workPrinciples.map((principle) => (
              <div key={principle.title} className="glass-panel rounded-[28px] p-6">
                <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-primary/90">Principle</p>
                <h3 className="mt-4 text-2xl font-semibold text-foreground">{principle.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Experience"
            title="Experience that reinforces the project work."
            description="These roles strengthened the same themes shown in the portfolio: product thinking, reliable systems, and data that has to work in production."
          />

          <div className="grid gap-5 lg:grid-cols-3">
            {experiences.map((experience) => (
              <div key={experience.company} className="glass-panel rounded-[28px] p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-accent">{experience.period}</p>
                    <h3 className="mt-3 text-2xl font-semibold text-foreground">{experience.company}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{experience.role}</p>
                  </div>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/6 text-primary">
                    <BriefcaseBusiness className="h-5 w-5" />
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  {experience.bullets.map((bullet) => (
                    <div key={bullet} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                      <p className="text-sm leading-6 text-foreground/88">{bullet}</p>
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
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionHeader
                badge="Where I’m Strong"
                title="A concise view of where I can contribute most effectively."
                description="This section is designed to make the portfolio easier to scan before anyone needs to read detailed project notes."
                className="mb-0"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {focusAreas.map((area) => (
                <Link key={area.title} href={area.href} className="glass-panel block rounded-[26px] p-5 transition hover:border-white/18">
                  <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-primary/90">{area.proof}</p>
                  <h3 className="mt-3 text-xl font-semibold text-foreground">{area.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{area.description}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-4">
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
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="glass-panel-strong rounded-[34px] p-8 text-center sm:p-10">
            <span className="section-label">Let&apos;s talk</span>
            <h2 className="mt-6 text-4xl font-semibold leading-tight text-foreground sm:text-[3.5rem]">
              Looking for an early-career engineer who can deliver, learn quickly, and communicate well?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
              That is the profile I aim to present here: thoughtful about the product, dependable in implementation, and effective to work with.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:brightness-110"
              >
                <Mail className="h-4 w-4" />
                Contact me
              </Link>
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-5 py-3 text-sm font-medium text-foreground transition hover:border-white/18 hover:bg-white/9"
              >
                {personalInfo.email}
              </a>
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  )
}
