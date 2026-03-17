import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { targetRoles } from "@/lib/site-config";

export function RoleFitStrip() {
  return (
    <section className="section-shell pt-0">
      <div className="surface-card">
        <p className="eyebrow">Focus areas</p>
        <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.06em] text-[rgb(var(--surface))] md:text-5xl">
          The engineering lanes this work actually supports.
        </h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[rgb(var(--muted-ink))]">
          This section is organized around real proof, not title-shopping. The strongest pattern is software and backend work with real data workflows, a credible .NET API project, and applied AI experience that stays product-grounded.
        </p>

        <div className="mt-10 grid gap-4 xl:grid-cols-2">
          {targetRoles.map((role, index) => (
            <Reveal key={role.title} delay={0.06 * index}>
              <Link href={role.href} className="terminal-card block">
                <p className="terminal-label">Primary proof: {role.proof}</p>
                <p className="mt-2 text-2xl font-semibold text-[rgb(var(--surface))]">{role.title}</p>
                <p className="mt-3 text-base leading-7 text-[rgba(214,236,255,0.72)]">{role.summary}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm text-[rgb(var(--signal-blue))]">
                  Review case study
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
