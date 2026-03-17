import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";

import type { ProjectEntry } from "@/types/content";

type ProjectCardProps = {
  project: ProjectEntry;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="surface-card overflow-hidden">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">{project.category}</p>
          <Link
            href={`/projects/${project.slug}`}
            className="mt-3 inline-block text-2xl font-semibold tracking-[-0.05em] text-[rgb(var(--ink))]"
          >
            {project.title}
          </Link>
        </div>
        <div className="rounded-full border border-[rgb(var(--line))] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[rgb(var(--muted-ink))]">
          {project.featured ? "featured" : "project"}
        </div>
      </div>

      <p className="mt-4 text-base leading-7 text-[rgb(var(--muted-ink))]">{project.oneLine}</p>

      <div className="project-visual mt-6">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.imageAlt || project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        ) : (
          <div className="abstract-project-fill">
            <p className="max-w-xs text-sm uppercase tracking-[0.24em] text-[rgb(var(--surface))]">
              {project.spotlight}
            </p>
          </div>
        )}
      </div>

      <p className="mt-6 text-sm leading-7 text-[rgb(var(--muted-ink))]">{project.longSummary}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <span key={item} className="pill">
            {item}
          </span>
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {project.metrics.map((metric) => (
          <div key={`${project.slug}-${metric.label}`} className="rounded-2xl border border-[rgb(var(--line))] bg-[rgb(var(--surface-muted))] p-4">
            <p className="text-2xl font-semibold tracking-[-0.05em] text-[rgb(var(--ink))]">
              {metric.value}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[rgb(var(--muted-ink))]">
              {metric.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href={`/projects/${project.slug}`} className="button-primary">
          <ArrowUpRight className="h-4 w-4" />
          Case study
        </Link>
        <Link href={project.githubUrl} className="button-secondary">
          <Github className="h-4 w-4" />
          GitHub
        </Link>
        {project.liveUrl ? (
          <Link href={project.liveUrl} className="button-secondary">
            <ArrowUpRight className="h-4 w-4" />
            Live link
          </Link>
        ) : null}
      </div>
    </article>
  );
}
