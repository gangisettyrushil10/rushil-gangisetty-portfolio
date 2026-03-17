import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Clapperboard,
  Github,
  Image as ImageIcon,
  Radar,
} from "lucide-react";

import { Reveal } from "@/components/reveal";
import { StructuredData } from "@/components/structured-data";
import { getProjectBySlug, projects } from "@/lib/content";
import { siteName, siteUrl } from "@/lib/site-config";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.longSummary,
    openGraph: {
      title: `${project.title} | ${siteName}`,
      description: project.longSummary,
      url: `${siteUrl}/projects/${project.slug}`,
      images: project.image ? [project.image] : ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | ${siteName}`,
      description: project.longSummary,
      images: project.image ? [project.image] : ["/opengraph-image"],
    },
    alternates: {
      canonical: `${siteUrl}/projects/${project.slug}`,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = projects
    .filter((entry) => entry.slug !== project.slug && entry.featured)
    .slice(0, 2);

  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareSourceCode",
          name: project.title,
          description: project.longSummary,
          ...(project.githubUrl ? { codeRepository: project.githubUrl } : {}),
          programmingLanguage: project.stack,
          creator: {
            "@type": "Person",
            name: siteName,
          },
          url: `${siteUrl}/projects/${project.slug}`,
        }}
      />

      <section className="hero-shell">
        <div className="hero-panel border-b-0">
          <div className="hero-grid-lines" />
          <div className="hero-orb hero-orb-a" />
          <div className="hero-orb hero-orb-b" />

          <div className="relative z-10 mx-auto flex w-[92%] max-w-7xl flex-col gap-10 pb-20 pt-24 md:pb-24 md:pt-28">
            <Reveal>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-[rgb(var(--muted-ink))]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to projects
              </Link>
            </Reveal>

            <div className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr]">
              <Reveal>
                <div className="max-w-4xl">
                  <span className="arcade-chip">{project.category} case study</span>
                  <h1 className="mt-6 text-balance text-5xl font-semibold tracking-[-0.08em] text-[rgb(var(--surface))] md:text-7xl">
                    {project.title}
                  </h1>
                  <p className="mt-6 max-w-3xl text-xl leading-9 text-[rgba(214,236,255,0.76)]">
                    {project.longSummary}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <span className="pill">{project.role}</span>
                    <span className="pill">{project.timeline}</span>
                    <span className="pill">{project.status}</span>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {project.githubUrl ? (
                      <Link href={project.githubUrl} className="button-secondary">
                        <Github className="h-4 w-4" />
                        GitHub repo
                      </Link>
                    ) : null}
                    {project.liveUrl ? (
                      <Link href={project.liveUrl} className="button-primary">
                        <ArrowUpRight className="h-4 w-4" />
                        Live project
                      </Link>
                    ) : null}
                  </div>

                  {project.links?.length ? (
                    <div className="mt-4 flex flex-wrap gap-3">
                      {project.links.map((link) => (
                        <Link key={`${project.slug}-${link.href}`} href={link.href} className="button-secondary">
                          <ArrowUpRight className="h-4 w-4" />
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <aside className="terminal-panel sticky top-28 h-fit">
                  <div className="terminal-header">
                    <div className="text-sm uppercase tracking-[0.18em] text-[rgb(var(--signal-blue))]">
                      Quick view
                    </div>
                    <span className="terminal-pill">deep dive</span>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                    {project.metrics.map((metric) => (
                      <div key={`${project.slug}-${metric.label}`} className="terminal-card">
                        <p className="text-3xl font-semibold tracking-[-0.05em] text-[rgb(var(--signal-blue))]">
                          {metric.value}
                        </p>
                        <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[rgba(214,236,255,0.6)]">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 rounded-[1.4rem] border border-[rgba(84,222,255,0.16)] bg-[rgba(7,11,24,0.9)] p-5">
                    <p className="terminal-label">Core stack</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <span key={`${project.slug}-${item}`} className="pill">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </aside>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pt-6">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div className="surface-card">
              <p className="eyebrow">Challenge</p>
              <p className="mt-5 text-lg leading-8 text-[rgb(var(--muted-ink))]">{project.challenge}</p>

              <h2 className="mt-10 text-3xl font-semibold tracking-[-0.05em] text-[rgb(var(--surface))]">
                Decisions that shaped the build
              </h2>
              <div className="mt-5 grid gap-4">
                {project.decisions.map((decision) => (
                  <div
                    key={`${project.slug}-${decision}`}
                    className="rounded-[1.4rem] border border-[rgba(84,222,255,0.12)] bg-[rgba(7,11,24,0.72)] p-5"
                  >
                    <p className="text-base leading-7 text-[rgb(var(--ink))]">{decision}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="surface-card-alt h-full">
              <p className="eyebrow text-[rgba(214,236,255,0.68)]">Why it matters</p>
              <p className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-[rgb(var(--surface))]">
                {project.spotlight}
              </p>
              <div className="mt-8 grid gap-4">
                {project.outcomes.map((outcome) => (
                  <div
                    key={`${project.slug}-${outcome}`}
                    className="rounded-[1.4rem] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] p-5"
                  >
                    <p className="text-base leading-7 text-[rgba(214,236,255,0.78)]">{outcome}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div className="surface-card">
              <div className="flex items-center gap-3">
                <div className="rounded-full border border-[rgba(84,222,255,0.2)] bg-[rgba(84,222,255,0.08)] p-3 text-[rgb(var(--signal-blue))]">
                  <ImageIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="eyebrow">Screenshots</p>
                  <h2 className="mt-1 text-3xl font-semibold tracking-[-0.05em] text-[rgb(var(--surface))]">
                    Visual proof and capture slots
                  </h2>
                </div>
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                {(project.gallery ?? []).map((item, index) => (
                  <Reveal key={`${project.slug}-${item.caption}`} delay={0.05 * index}>
                    <figure className="terminal-card overflow-hidden p-0">
                      <div className="project-visual min-h-[17rem]">
                        {item.src ? (
                          <Image
                            src={item.src}
                            alt={item.alt}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                          />
                        ) : (
                          <div className="abstract-project-fill">
                            <div>
                              <p className="text-xs uppercase tracking-[0.22em] text-[rgba(214,236,255,0.58)]">
                                {item.label ?? "Placeholder"}
                              </p>
                              <p className="mt-3 max-w-xs text-base leading-7 text-[rgb(var(--surface))]">
                                {item.caption}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      <figcaption className="p-5 text-sm leading-7 text-[rgb(var(--muted-ink))]">
                        <span className="block text-xs uppercase tracking-[0.18em] text-[rgba(214,236,255,0.58)]">
                          {item.label ?? `Screen ${index + 1}`}
                        </span>
                        <span className="mt-2 block">{item.caption}</span>
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="terminal-panel h-full">
              <div className="terminal-header">
                <div className="flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-[rgb(var(--signal-blue))]">
                  <Clapperboard className="h-4 w-4" />
                  Demo recording
                </div>
                <span className="terminal-pill">media slot</span>
              </div>

              <div className="mt-6 terminal-card">
                <p className="text-2xl font-semibold text-[rgb(var(--surface))]">
                  {project.recording?.title ?? "Screen recording"}
                </p>
                <p className="mt-4 text-base leading-8 text-[rgba(214,236,255,0.72)]">
                  {project.recording?.caption ??
                    "Add a short walkthrough here so recruiters can see the system in motion instead of relying only on text."}
                </p>
                {project.recording?.href ? (
                  <div className="mt-6">
                    <Link href={project.recording.href} className="button-primary">
                      <ArrowUpRight className="h-4 w-4" />
                      {project.recording.ctaLabel ?? "Watch demo"}
                    </Link>
                  </div>
                ) : (
                  <div className="mt-6 inline-flex rounded-full border border-[rgba(255,126,169,0.2)] bg-[rgba(255,126,169,0.08)] px-4 py-2 text-xs uppercase tracking-[0.16em] text-[rgb(var(--signal-coral))]">
                    {project.recording?.ctaLabel ?? "Demo slot ready"}
                  </div>
                )}
              </div>

              <div className="mt-6 rounded-[1.4rem] border border-[rgba(84,222,255,0.16)] bg-[rgba(7,11,24,0.9)] p-5">
                <div className="flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-[rgb(var(--signal-blue))]">
                  <Radar className="h-4 w-4" />
                  Asset checklist
                </div>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-[rgba(214,236,255,0.72)]">
                  {(project.assetChecklist ?? []).map((item) => (
                    <li key={`${project.slug}-${item}`} className="flex gap-3">
                      <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[rgb(var(--signal-blue))]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="surface-card">
              <p className="eyebrow">What I learned</p>
              <div className="mt-5 grid gap-4">
                {project.learnings.map((learning) => (
                  <div
                    key={`${project.slug}-${learning}`}
                    className="rounded-[1.4rem] border border-[rgba(84,222,255,0.12)] bg-[rgba(7,11,24,0.72)] p-5"
                  >
                    <p className="text-base leading-7 text-[rgb(var(--ink))]">{learning}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="surface-card">
              <p className="eyebrow">Related work</p>
              <div className="mt-5 grid gap-4">
                {relatedProjects.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/projects/${related.slug}`}
                    className="rounded-[1.4rem] border border-[rgba(84,222,255,0.12)] bg-[rgba(7,11,24,0.72)] p-5"
                  >
                    <p className="text-2xl font-semibold tracking-[-0.05em] text-[rgb(var(--surface))]">
                      {related.title}
                    </p>
                    <p className="mt-3 text-base leading-7 text-[rgb(var(--muted-ink))]">
                      {related.oneLine}
                    </p>
                  </Link>
                ))}
              </div>

              <div className="mt-8 rounded-[1.5rem] border border-[rgba(84,222,255,0.16)] bg-[rgba(7,11,24,0.92)] p-5">
                <p className="terminal-label">Recruiter path</p>
                <p className="mt-3 text-base leading-7 text-[rgba(214,236,255,0.72)]">
                  Use the resume for the quick scan, then use these case studies and media sections when someone wants proof instead of buzzwords.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href="/resume" className="button-primary">
                    Open resume
                  </Link>
                  <Link href="/contact" className="button-secondary">
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
