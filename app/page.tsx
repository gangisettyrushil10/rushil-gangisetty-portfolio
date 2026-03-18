import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Download, Mail } from 'lucide-react'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { ProjectCard } from '@/components/project-card'
import { Section, SectionHeader } from '@/components/section'
import { aboutSection, personalInfo, projects } from '@/lib/data'

const featuredProjects = projects.filter((project) => project.featured)
const homeFeaturedProjects = featuredProjects.slice(0, 3)

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
            <span className="section-label">{personalInfo.name} • {personalInfo.title}</span>
            <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-[0.94] tracking-[-0.06em] text-foreground sm:text-[4.2rem]">
              Software engineer building <span className="text-shimmer">product-focused applications</span>, backend systems, and data workflows.
            </h1>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
              I care about software that feels clear to users and dependable to teams. Start with the selected projects below for the fastest view of how I build.
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
          </div>
        </div>
      </section>

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
                description="A short introduction and the context behind the work."
              />

              <div className="glass-panel rounded-[24px] p-5">
                {aboutSection.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-7 text-foreground/90">
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

      <Section id="selected-work" className="pt-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              badge="Projects"
              title="Selected projects."
              description="The three projects I would share first with a recruiter or hiring manager."
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
