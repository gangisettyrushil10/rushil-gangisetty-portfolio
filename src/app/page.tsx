import Link from "next/link";
import { ArrowUpRight, FileDown, Github, Mail } from "lucide-react";

import { BlogCard } from "@/components/blog-card";
import { ExperienceCard } from "@/components/experience-card";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { StatCard } from "@/components/stat-card";
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

      <section className="mx-auto flex w-[92%] max-w-7xl flex-col gap-12 pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <Reveal>
            <div className="max-w-4xl">
              <p className="eyebrow">Rushil Gangisetty</p>
              <h1 className="mt-5 max-w-5xl text-balance text-5xl font-semibold tracking-[-0.08em] text-[rgb(var(--ink))] md:text-7xl">
                Engineer the product,
                {" "}
                <span className="font-accent text-[rgb(var(--accent-strong))]">
                  not just the demo.
                </span>
              </h1>
              <p className="mt-6 max-w-3xl text-xl leading-9 text-[rgb(var(--muted-ink))]">
                {profile.summary}
              </p>
              <p className="mt-4 max-w-2xl text-sm uppercase tracking-[0.22em] text-[rgb(var(--muted-ink))]">
                {profile.location} · {profile.availability}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/projects" className="button-primary">
                  <ArrowUpRight className="h-4 w-4" />
                  View projects
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

          <Reveal delay={0.1}>
            <div className="surface-card-alt space-y-4">
              <p className="eyebrow">Selected builds</p>
              {featuredProjects.slice(0, 3).map((project) => (
                <div key={project.slug} className="rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <Link
                        href={`/projects/${project.slug}`}
                        className="text-lg font-semibold text-[rgb(var(--surface))]"
                      >
                        {project.title}
                      </Link>
                      <p className="mt-2 text-sm leading-6 text-[rgba(244,237,226,0.72)]">
                        {project.oneLine}
                      </p>
                    </div>
                    <span className="rounded-full border border-[rgba(244,237,226,0.16)] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[rgba(244,237,226,0.7)]">
                      {project.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {homeStats.map((stat, index) => (
            <Reveal key={stat.label} delay={0.08 * index}>
              <StatCard value={stat.value} label={stat.label} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <SectionHeading
          eyebrow="Featured work"
          title="Projects with clear engineering proof, not filler."
          description="I curate a small set of projects that show range across product engineering, data systems, and ML. Each one exists because it demonstrates a real decision, a real system, or a real measurable result."
        />
        <div className="mt-12 grid gap-6 xl:grid-cols-2">
          {featuredProjects.slice(0, 4).map((project, index) => (
            <Reveal key={project.slug} delay={0.08 * index}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <SectionHeading
          eyebrow="Working range"
          title="A stack shaped by shipped work."
          description="I am strongest where product, data, and implementation quality overlap. The stack below reflects tools I have already used in projects or internships that shipped something real."
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

      <section className="section-shell">
        <SectionHeading
          eyebrow="Experience"
          title="Internship work anchored in reliability and delivery."
          description="My internship experience trends toward product support, validation-heavy systems, and operational execution. That combination is why I care about both user-facing polish and defensible backend behavior."
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
              <p className="eyebrow">Resume</p>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.06em] text-[rgb(var(--surface))] md:text-5xl">
                Recruiter-ready resume, portfolio context, and direct project proof.
              </h2>
              <p className="mt-4 text-lg leading-8 text-[rgba(244,237,226,0.74)]">
                The resume is optimized for quick review. The portfolio adds the missing context: why the work mattered, what was built, and what scale or quality bar it hit.
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
          title="Short essays on building, shipping, and learning."
          description="The blog is deliberately practical. It captures the design and engineering choices behind the work, not generic productivity advice."
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
                If the role needs someone who can build and explain the system, let’s talk.
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
              <Link
                href="https://github.com/gangisettyrushil10"
                className="button-secondary"
              >
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
