import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, FileDown, Github, Linkedin, Mail } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { profile, targetRoles } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Resume",
  description: "Recruiter-ready resume, summary, and quick access to contact links and project proof.",
};

export default function ResumePage() {
  return (
    <section className="section-shell">
      <SectionHeading
        eyebrow="Resume"
        title="The fast recruiter version, with portfolio context around it."
        description="Use the PDF when you need a clean one-page file. Use the rest of this site when you want the project depth, engineering context, and measurable proof behind it."
      />

      <div className="mt-12 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <div className="surface-card sticky top-28 h-fit">
            <p className="eyebrow">Quick summary</p>
            <p className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-[rgb(var(--ink))]">
              Early-career software engineer strongest in full-stack, backend, product, and applied AI work.
            </p>
            <p className="mt-4 text-base leading-7 text-[rgb(var(--muted-ink))]">
              If the recruiter only remembers one thing, it should be this: the cleanest fit is Software Engineer I, Full-Stack Engineer, Backend Engineer, or product-oriented applied AI roles.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {targetRoles.map((role) => (
                <span key={role.title} className="pill">
                  {role.title}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <Link href={profile.resumePath} className="button-primary">
                <FileDown className="h-4 w-4" />
                Download resume PDF
              </Link>
              <Link href="https://github.com/gangisettyrushil10" className="button-secondary">
                <Github className="h-4 w-4" />
                GitHub
              </Link>
              <Link
                href="https://www.linkedin.com/in/rushilgangisetty10"
                className="button-secondary"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Link>
              <Link href="mailto:gangisettyrushil@gmail.com" className="button-secondary">
                <Mail className="h-4 w-4" />
                Email
              </Link>
            </div>

            <div className="mt-8 rounded-3xl border border-[rgb(var(--line))] bg-[rgb(var(--surface-muted))] p-5">
              <p className="text-sm uppercase tracking-[0.18em] text-[rgb(var(--muted-ink))]">
                Current status
              </p>
              <p className="mt-2 text-lg leading-7 text-[rgb(var(--ink))]">
                Based in Dallas, open to relocation, incoming M.S. Computer Science at ASU.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="surface-card overflow-hidden p-0">
            <div className="flex items-center justify-between border-b border-[rgb(var(--line))] px-6 py-4">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-[rgb(var(--muted-ink))]">
                  Resume preview
                </p>
                <p className="mt-1 text-lg font-medium text-[rgb(var(--ink))]">
                  Software Engineer resume
                </p>
              </div>
              <Link href={profile.resumePath} className="button-secondary">
                <ArrowUpRight className="h-4 w-4" />
                Open PDF
              </Link>
            </div>

            <iframe
              title="Rushil Gangisetty resume"
              src={`${profile.resumePath}#view=FitH`}
              className="hidden h-[960px] w-full bg-white md:block"
            />
            <div className="px-6 py-8 md:hidden">
              <p className="text-base leading-7 text-[rgb(var(--muted-ink))]">
                Resume preview is shown on larger screens. Use the download button above on mobile.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
