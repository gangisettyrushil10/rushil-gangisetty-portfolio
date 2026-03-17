import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";

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
    .filter((entry) => entry.slug !== project.slug && entry.category === project.category)
    .slice(0, 2);

  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareSourceCode",
          name: project.title,
          description: project.longSummary,
          codeRepository: project.githubUrl,
          programmingLanguage: project.stack,
          creator: {
            "@type": "Person",
            name: siteName,
          },
          url: `${siteUrl}/projects/${project.slug}`,
        }}
      />

      <section className="mx-auto flex w-[92%] max-w-7xl flex-col gap-10 pb-16 pt-14 md:pb-24 md:pt-18">
        <Reveal>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-[rgb(var(--muted-ink))]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </Link>
        </Reveal>

        <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <div className="max-w-4xl">
              <p className="eyebrow">{project.category} case study</p>
              <h1 className="mt-5 text-balance text-5xl font-semibold tracking-[-0.08em] text-[rgb(var(--ink))] md:text-7xl">
                {project.title}
              </h1>
              <p className="mt-6 max-w-3xl text-xl leading-9 text-[rgb(var(--muted-ink))]">
                {project.oneLine}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="pill">{project.role}</span>
                <span className="pill">{project.timeline}</span>
                <span className="pill">{project.status}</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <aside className="surface-card sticky top-28 h-fit">
              <p className="eyebrow">Quick view</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                {project.metrics.map((metric) => (
                  <div
                    key={`${project.slug}-${metric.label}`}
                    className="rounded-3xl border border-[rgb(var(--line))] bg-[rgb(var(--surface-muted))] p-4"
                  >
                    <p className="text-3xl font-semibold tracking-[-0.05em] text-[rgb(var(--ink))]">
                      {metric.value}
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[rgb(var(--muted-ink))]">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={project.githubUrl} className="button-secondary">
                  <Github className="h-4 w-4" />
                  GitHub repo
                </Link>
                {project.liveUrl ? (
                  <Link href={project.liveUrl} className="button-primary">
                    <ArrowUpRight className="h-4 w-4" />
                    Live project
                  </Link>
                ) : null}
              </div>

              <div className="mt-8 rounded-3xl border border-[rgb(var(--line))] bg-[rgb(var(--surface-muted))] p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-[rgb(var(--muted-ink))]">
                  Core stack
                </p>
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
      </section>

      <section className="section-shell pt-0">
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="surface-card">
              <p className="eyebrow">Project overview</p>
              <p className="mt-5 text-lg leading-8 text-[rgb(var(--muted-ink))]">
                {project.longSummary}
              </p>

              <h2 className="mt-10 text-3xl font-semibold tracking-[-0.05em] text-[rgb(var(--ink))]">
                Challenge
              </h2>
              <p className="mt-4 text-base leading-8 text-[rgb(var(--muted-ink))]">
                {project.challenge}
              </p>

              <h2 className="mt-10 text-3xl font-semibold tracking-[-0.05em] text-[rgb(var(--ink))]">
                Decisions that shaped the build
              </h2>
              <div className="mt-5 grid gap-4">
                {project.decisions.map((decision) => (
                  <div
                    key={`${project.slug}-${decision}`}
                    className="rounded-3xl border border-[rgb(var(--line))] bg-[rgb(var(--surface-muted))] p-5"
                  >
                    <p className="text-base leading-7 text-[rgb(var(--ink))]">{decision}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="surface-card-alt h-full">
              <p className="eyebrow text-[rgba(244,237,226,0.64)]">Why it matters</p>
              <p className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-[rgb(var(--surface))]">
                {project.spotlight}
              </p>

              <div className="mt-8 grid gap-4">
                {project.outcomes.map((outcome) => (
                  <div
                    key={`${project.slug}-${outcome}`}
                    className="rounded-3xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] p-5"
                  >
                    <p className="text-base leading-7 text-[rgba(244,237,226,0.82)]">
                      {outcome}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {project.gallery?.length ? (
          <div className="mt-14">
            <Reveal>
              <div className="max-w-3xl">
                <p className="eyebrow">Screens</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[rgb(var(--ink))]">
                  Visual proof from the build.
                </h2>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {project.gallery.map((item, index) => (
                <Reveal key={`${project.slug}-${item.src}`} delay={0.06 * index}>
                  <figure className="surface-card overflow-hidden p-0">
                    <div className="project-visual min-h-[18rem]">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="p-5 text-sm leading-7 text-[rgb(var(--muted-ink))]">
                      {item.caption}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="surface-card">
              <p className="eyebrow">What I learned</p>
              <div className="mt-5 grid gap-4">
                {project.learnings.map((learning) => (
                  <div
                    key={`${project.slug}-${learning}`}
                    className="rounded-3xl border border-[rgb(var(--line))] bg-[rgb(var(--surface-muted))] p-5"
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
                {relatedProjects.length ? (
                  relatedProjects.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/projects/${related.slug}`}
                      className="rounded-3xl border border-[rgb(var(--line))] bg-[rgb(var(--surface-muted))] p-5"
                    >
                      <p className="text-2xl font-semibold tracking-[-0.05em] text-[rgb(var(--ink))]">
                        {related.title}
                      </p>
                      <p className="mt-3 text-base leading-7 text-[rgb(var(--muted-ink))]">
                        {related.oneLine}
                      </p>
                    </Link>
                  ))
                ) : (
                  <p className="text-base leading-7 text-[rgb(var(--muted-ink))]">
                    This project sits at the edge of my portfolio focus, so there is no close sibling project in the same category.
                  </p>
                )}
              </div>

              <div className="mt-8 rounded-3xl border border-[rgb(var(--line))] bg-[rgb(var(--surface-muted))] p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-[rgb(var(--muted-ink))]">
                  Want the recruiter version?
                </p>
                <p className="mt-3 text-base leading-7 text-[rgb(var(--muted-ink))]">
                  Use the resume for the quick scan, then use these case studies when someone wants the engineering depth behind the bullet points.
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
