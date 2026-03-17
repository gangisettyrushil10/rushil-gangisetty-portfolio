import type { Metadata } from "next";

import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { additionalWork, projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Curated engineering work across product, data, and machine learning.",
};

export default function ProjectsPage() {
  const featured = projects.filter((project) => project.featured);
  const nonFeatured = projects.filter((project) => !project.featured);

  return (
    <section className="section-shell">
      <SectionHeading
        eyebrow="Projects"
        title="Curated proof across product, data, and AI."
        description="This page stays intentionally selective. The goal is not to list every repo I have ever touched, but to show the projects that best represent my engineering range and decision quality."
      />

      <div className="mt-12 grid gap-6 xl:grid-cols-2">
        {featured.map((project, index) => (
          <Reveal key={project.slug} delay={0.07 * index}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      {nonFeatured.length ? (
        <div className="mt-16 grid gap-6 xl:grid-cols-2">
          {nonFeatured.map((project, index) => (
            <Reveal key={project.slug} delay={0.06 * index}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      ) : null}

      <div className="mt-20">
        <SectionHeading
          eyebrow="More work"
          title="Additional repos worth scanning."
          description="These are useful supporting examples, but not the center of the portfolio."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {additionalWork.map((item, index) => (
            <Reveal key={item.title} delay={0.06 * index}>
              <a href={item.githubUrl} className="surface-card block">
                <p className="text-2xl font-semibold tracking-[-0.05em] text-[rgb(var(--ink))]">
                  {item.title}
                </p>
                <p className="mt-4 text-base leading-7 text-[rgb(var(--muted-ink))]">
                  {item.summary}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
