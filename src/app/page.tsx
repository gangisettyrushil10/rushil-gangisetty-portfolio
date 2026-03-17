import Link from "next/link";
import { ArrowUpRight, FileDown, Github, Mail, Sparkles } from "lucide-react";

import { BlogCard } from "@/components/blog-card";
import { ExperienceCard } from "@/components/experience-card";
import { PortfolioCopilot } from "@/components/portfolio-copilot";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { RoleFitStrip } from "@/components/role-fit-strip";
import { SectionHeading } from "@/components/section-heading";
import { StructuredData } from "@/components/structured-data";
import { getAllPosts } from "@/lib/blog";
import { experiences, getFeaturedProjects, skillGroups } from "@/lib/content";
import {
  homeStats,
  profile,
  siteDescription,
  siteName,
  siteUrl,
} from "@/lib/site-config";

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              name: profile.name,
              url: siteUrl,
              email: profile.email,
              jobTitle: profile.title,
              sameAs: profile.socialLinks.map((link) => link.href),
            },
            {
              "@type": "WebSite",
              name: siteName,
              url: siteUrl,
              description: siteDescription,
            },
          ],
        }}
      />

      <section className="hero-shell">
        <div className="hero-panel">
          <div className="hero-grid-lines" />
          <div className="hero-orb hero-orb-a" />
          <div className="hero-orb hero-orb-b" />
          <div className="hero-orb hero-orb-c" />

          <div className="relative z-10 mx-auto grid w-[92%] max-w-7xl gap-10 pb-20 pt-24 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:pb-28 lg:pt-32">
            <Reveal>
              <div className="max-w-4xl">
                <div className="status-chip">
                  <span className="status-dot" />
                  {profile.availability}
                </div>
                <p className="eyebrow mt-8 text-[rgb(var(--signal-blue))]">Rushil Gangisetty</p>
                <h1 className="mt-5 max-w-5xl text-balance text-5xl font-semibold tracking-[-0.08em] text-[rgb(var(--surface))] md:text-7xl">
                  Dark-mode product taste,
                  {" "}
                  <span className="arcade-gradient-text">backend discipline,</span>
                  {" "}
                  and AI systems that can defend themselves.
                </h1>
                <p className="mt-6 max-w-3xl text-xl leading-9 text-[rgba(214,236,255,0.76)]">
                  {profile.summary}
                </p>
                <p className="mt-4 max-w-3xl text-sm uppercase tracking-[0.22em] text-[rgba(153,177,214,0.88)]">
                  {profile.location} · software, data, and systems-focused builds
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/projects" className="button-primary">
                    <ArrowUpRight className="h-4 w-4" />
                    View case studies
                  </Link>
                  <Link href={profile.resumePath} className="button-secondary">
                    <FileDown className="h-4 w-4" />
                    Download resume
                  </Link>
                  <Link href="/contact" className="button-secondary">
                    <Mail className="h-4 w-4" />
                    Contact
                  </Link>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="terminal-panel min-h-full">
                <div className="terminal-header">
                  <div className="flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-[rgb(var(--signal-blue))]">
                    <Sparkles className="h-4 w-4" />
                    Selected Systems
                  </div>
                  <span className="terminal-pill">4 flagship builds</span>
                </div>

                <div className="mt-6 grid gap-3">
                  {featuredProjects.slice(0, 4).map((project) => (
                    <Link key={project.slug} href={`/projects/${project.slug}`} className="terminal-card">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-lg font-semibold text-[rgb(var(--surface))]">{project.title}</p>
                          <p className="mt-2 text-sm leading-6 text-[rgba(214,236,255,0.72)]">
                            {project.oneLine}
                          </p>
                        </div>
                        <span className="arcade-chip shrink-0">{project.category}</span>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {homeStats.map((stat) => (
                    <div key={stat.label} className="terminal-card">
                      <p className="text-3xl font-semibold tracking-[-0.06em] text-[rgb(var(--signal-blue))]">
                        {stat.value}
                      </p>
                      <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[rgba(214,236,255,0.64)]">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <RoleFitStrip />

      <section className="section-shell pt-6">
        <SectionHeading
          eyebrow="Featured work"
          title="Case studies with enough detail to actually get you hired."
          description="I am deliberately selective. Each flagship project earns its place by showing product judgment, technical execution, measurable proof, and a system story that maps cleanly to real jobs."
        />
        <div className="mt-12 grid gap-6 xl:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.slug} delay={0.07 * index}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>

      <PortfolioCopilot />

      <section className="section-shell">
        <SectionHeading
          eyebrow="Working range"
          title="A stack shaped by products, pipelines, and model-backed systems."
          description="The tools below are not resume filler. They come from projects and internships that had real workflows, sharp constraints, and enough complexity to be worth discussing in an interview."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={0.07 * index}>
              <div className="surface-card">
                <p className="eyebrow">{group.title}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={`${group.title}-${item}`} className="pill">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="experience" className="section-shell">
        <SectionHeading
          eyebrow="Experience"
          title="Internship work that backs up the projects."
          description="The internship story matters because it shows production support, validation-heavy workflows, and an execution style that holds up outside personal projects."
        />
        <div className="mt-12 grid gap-6">
          {experiences.map((experience, index) => (
            <Reveal key={experience.company} delay={0.08 * index}>
              <ExperienceCard experience={experience} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <Reveal>
          <div className="resume-banner">
            <div className="max-w-3xl">
              <p className="eyebrow text-[rgba(214,236,255,0.68)]">Resume</p>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.06em] text-[rgb(var(--surface))] md:text-5xl">
                One-page recruiter version up front, deep-dive proof behind it.
              </h2>
              <p className="mt-4 text-lg leading-8 text-[rgba(214,236,255,0.72)]">
                Use the PDF for speed. Use the portfolio when someone wants to understand the system design, the tradeoffs, and the media proof behind the bullets.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/resume" className="button-light">
                <FileDown className="h-4 w-4" />
                Open resume page
              </Link>
              <Link href={profile.resumePath} className="button-outline-light">
                <ArrowUpRight className="h-4 w-4" />
                Download PDF
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section-shell">
        <SectionHeading
          eyebrow="Writing"
          title="Short essays on shipping, architecture, and lessons learned."
          description="The blog stays practical. It exists to explain how the work was built and where the tradeoffs were, not to publish generic career advice."
        />
        <div className="mt-12 grid gap-6 xl:grid-cols-3">
          {latestPosts.map((post, index) => (
            <Reveal key={post.slug} delay={0.08 * index}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto mb-24 mt-10 w-[92%] max-w-7xl">
        <Reveal>
          <div className="surface-card flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">Contact</p>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.06em] text-[rgb(var(--ink))]">
                If the role needs someone who can ship, explain, and iterate, let’s talk.
              </h2>
              <p className="mt-4 text-lg leading-8 text-[rgb(var(--muted-ink))]">
                Best fit: software engineering, product engineering, backend, data, and applied AI roles where execution quality matters.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="button-primary">
                <Mail className="h-4 w-4" />
                Start a conversation
              </Link>
              <Link href="https://github.com/gangisettyrushil10" className="button-secondary">
                <Github className="h-4 w-4" />
                GitHub
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
