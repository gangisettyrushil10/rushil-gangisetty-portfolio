import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { targetRoles } from "@/lib/site-config";

export function RoleFitStrip() {
  return (
    <section className="section-shell pt-0">
      <div className="surface-card">
        <p className="eyebrow">Recruiter fit</p>
        <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.06em] text-[rgb(var(--surface))] md:text-5xl">
          The clearest roles this portfolio supports.
        </h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[rgb(var(--muted-ink))]">
          If a recruiter scans only one section, this should reduce confusion. The strongest story is early-career software engineering with full-stack, backend, and product execution depth plus applied AI exposure.
        </p>

        <div className="mt-10 grid gap-4 xl:grid-cols-2">
          {targetRoles.map((role, index) => (
            <Reveal key={role.title} delay={0.06 * index}>
              <Link href={role.href} className="terminal-card block">
                <p className="terminal-label">Best proof: {role.proof}</p>
                <p className="mt-2 text-2xl font-semibold text-[rgb(var(--surface))]">{role.title}</p>
                <p className="mt-3 text-base leading-7 text-[rgba(214,236,255,0.72)]">{role.summary}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm text-[rgb(var(--signal-blue))]">
                  Review proof
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
