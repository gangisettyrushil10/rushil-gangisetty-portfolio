'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { DashedDivider } from '@/components/ui/dashed-divider'
import { IMessageThread } from '@/components/ui/imessage-thread'
import type { Project } from '@/lib/data'
import { projects } from '@/lib/data'

interface BuzzrContentProps {
  project: Project
}

export function BuzzrContent({ project }: BuzzrContentProps) {
  const relatedProjects = projects.filter((p) => p.id !== project.id && p.featured).slice(0, 3)

  return (
    <div className="mx-auto max-w-5xl px-4 pb-20 pt-28 sm:px-6 md:px-12 sm:pt-32">
      {/* ── Back-link ── */}
      <Reveal>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to projects
          <kbd className="kbd ml-1">⇧P</kbd>
        </Link>
      </Reveal>

      {/* § 1 — HERO ─────────────────────────────────── */}
      <section className="pt-10 sm:pt-16 pb-16 sm:pb-24">
        <Reveal>
          <span className="section-label">{project.category}</span>
          <h1 className="mt-5 text-5xl font-semibold leading-[1.02] tracking-[-0.03em] text-foreground sm:text-[4.5rem]">
            {project.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
            {project.longDescription}
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-10">
          <div className="grid grid-cols-3 gap-3 sm:gap-5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="relative aspect-[9/19] rounded-[22px] border border-dashed border-(--pill-border) bg-bg-card-muted"
                style={{ transform: `translateY(${i === 1 ? '0' : i === 0 ? '24px' : '12px'})` }}
              >
                <div className="absolute inset-0 flex items-end justify-center p-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle-foreground">
                    {project.gallery?.[i]?.label ?? `Mockup ${i + 1}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <DashedDivider />

      {/* § 2 — OVERVIEW ─────────────────────────────── */}
      <section className="py-16 sm:py-24">
        <Reveal>
          <span className="section-label">Overview</span>
        </Reveal>
        {/* TODO agent-Section-2: paste Sarvesh § 2 text → run Template A to replace this comment */}
        <Reveal delay={80} className="mt-8 bento-grid">
          <div className="col-span-12 md:col-span-3 bento-cell bento-sunken">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle-foreground">Role</p>
            <p className="mt-2 text-sm leading-6 text-foreground">{project.role}</p>
          </div>
          <div className="col-span-12 md:col-span-3 bento-cell bento-sunken">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle-foreground">Timeline</p>
            <p className="mt-2 text-sm leading-6 text-foreground">{project.timeline}</p>
          </div>
          <div className="col-span-12 md:col-span-3 bento-cell bento-sunken">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle-foreground">Status</p>
            <p className="mt-2 text-sm leading-6 text-foreground">{project.status}</p>
          </div>
          <div className="col-span-12 md:col-span-3 bento-cell bento-sunken">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle-foreground">Category</p>
            <p className="mt-2 text-sm leading-6 text-foreground">{project.category}</p>
          </div>
          <div className="col-span-12 bento-cell">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle-foreground">Stack</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-dashed border-(--pill-border) bg-bg-card-muted px-2 py-0.5 text-[11px] font-mono text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <DashedDivider />

      {/* § 3 — ORIGIN (iMessage thread) ─────────────── */}
      <section className="py-16 sm:py-24">
        <Reveal>
          <span className="section-label">Origin</span>
          <h2 className="mt-4 text-3xl font-light leading-tight text-foreground sm:text-4xl">
            How it <span className="font-serif-italic text-accent">started</span>
          </h2>
        </Reveal>
        {/* TODO agent-Section-3: Rushil pastes the actual iMessage bubble content →
            run Template A to generate the IMessageThread invocation with real messages.
            Placeholder sample thread below so the page renders until then. */}
        <Reveal delay={120} className="mt-10 flex justify-center">
          <IMessageThread
            header="Sample thread"
            live
            participants={[
              { id: 'r', name: 'Rushil', side: 'right' },
              { id: 's', name: 'Sarvesh', side: 'left' },
              { id: 'm', name: 'Mike', side: 'left' },
            ]}
            messages={[
              { fromId: 'r', text: '(waiting for the real thread — paste into chat)', readReceipt: true },
              { fromId: 's', text: 'placeholder reply' },
              { fromId: 'r', timestamp: '— agent fills this in —' },
            ]}
          />
        </Reveal>
      </section>

      <DashedDivider />

      {/* § 4 — PROBLEM ──────────────────────────────── */}
      <section className="py-16 sm:py-24">
        <Reveal>
          <span className="section-label">Problem</span>
        </Reveal>
        {/* TODO agent-Section-4: paste Sarvesh § 4 → run Template A (stat cards + narrative) */}
        <Reveal delay={80} className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {project.metrics.map((m) => (
            <div key={m.label} className="bento-cell bento-sunken">
              <p className="text-3xl font-semibold tracking-tight text-foreground">{m.value}</p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-subtle-foreground">
                {m.label}
              </p>
            </div>
          ))}
        </Reveal>
        <Reveal delay={160} className="mt-8 max-w-2xl">
          <p className="text-lg leading-relaxed text-muted-foreground">{project.challenge}</p>
        </Reveal>
      </section>

      <DashedDivider />

      {/* § 5 — COMPETITIVE LANDSCAPE ─────────────────── */}
      <section className="py-16 sm:py-24">
        <Reveal>
          <span className="section-label">Approach</span>
          <h2 className="mt-4 text-3xl font-light leading-tight text-foreground sm:text-4xl">
            Decisions that <span className="font-serif-italic text-accent">held the product together</span>
          </h2>
        </Reveal>
        {/* TODO agent-Section-5: paste Sarvesh § 5 → run Template A (comparison table style) */}
        <Reveal delay={80} className="mt-8 grid gap-3 sm:grid-cols-2">
          {project.decisions.map((d, i) => (
            <Reveal key={d} delay={80 + i * 60} className="bento-cell p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle-foreground">
                Decision · 0{i + 1}
              </p>
              <p className="mt-3 text-sm leading-6 text-foreground">{d}</p>
            </Reveal>
          ))}
        </Reveal>
      </section>

      <DashedDivider />

      {/* § 6 — USER TESTING / ROLLOUT ─────────────────── */}
      <section className="py-16 sm:py-24">
        <Reveal>
          <span className="section-label">Rollout</span>
        </Reveal>
        {/* TODO agent-Section-6: paste Sarvesh § 6 → run Template A (2-col metrics + screenshot) */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 items-center">
          <Reveal>
            <div className="grid grid-cols-2 gap-3">
              {project.metrics.slice(0, 4).map((m) => (
                <div key={m.label} className="bento-cell bento-sunken">
                  <p className="text-2xl font-semibold tracking-tight text-foreground">{m.value}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-subtle-foreground">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="aspect-[9/19] max-h-[520px] rounded-[22px] border border-dashed border-(--pill-border) bg-bg-card-muted" />
          </Reveal>
        </div>
      </section>

      <DashedDivider />

      {/* § 7 — OPPORTUNITY ────────────────────────────── */}
      <section className="py-16 sm:py-24">
        <Reveal>
          <span className="section-label">Opportunity</span>
        </Reveal>
        {/* TODO agent-Section-7: paste Sarvesh § 7 → run Template A (3 actor/persona cards) */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {['Client', 'Realtime publisher', 'Edge function'].map((actor, i) => (
            <Reveal key={actor} delay={i * 80} className="bento-cell p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle-foreground">
                Actor · 0{i + 1}
              </p>
              <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-foreground">{actor}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                (placeholder — agent will flesh out from Sarvesh § 7 and fact pack)
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <DashedDivider />

      {/* § 8 — FEATURES & PROCESS ─────────────────────── */}
      <section className="py-16 sm:py-24">
        <Reveal>
          <span className="section-label">Build</span>
          <h2 className="mt-4 text-3xl font-light leading-tight text-foreground sm:text-4xl">
            Features &amp; <span className="font-serif-italic text-accent">process</span>
          </h2>
        </Reveal>
        {/* TODO agent-Section-8: paste Sarvesh § 8 → run Template A (alternating 2-col process blocks) */}
        <Reveal delay={120} className="mt-8">
          <div className="bento-cell bento-sunken p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle-foreground">
              Placeholder — waiting for § 8 content
            </p>
            <p className="mt-4 font-serif-italic text-muted-foreground">
              Architecture walkthroughs land here: auth, realtime subscriptions, data model, watch party fan-out.
            </p>
          </div>
        </Reveal>
      </section>

      <DashedDivider />

      {/* § 9 — REFLECTION ─────────────────────────────── */}
      <section className="py-16 sm:py-24">
        <Reveal>
          <span className="section-label">Reflection</span>
          <h2 className="mt-4 text-3xl font-light leading-tight text-foreground sm:text-4xl">
            What I <span className="font-serif-italic text-accent">took away</span>
          </h2>
        </Reveal>
        {/* TODO agent-Section-9: paste Sarvesh § 9 → run Template A (3 subsections). Learnings fact-packed below for now. */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {project.learnings.map((l, i) => (
            <Reveal key={l} delay={i * 80} className="bento-cell p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle-foreground">
                0{i + 1}
              </p>
              <p className="mt-3 text-sm leading-6 text-foreground">{l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <DashedDivider />

      {/* ── More work carousel ───────────────────────── */}
      <section className="py-16 sm:py-24">
        <Reveal>
          <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-subtle-foreground">
            More work
          </p>
        </Reveal>
        <div className="mt-6 border-t border-dashed border-(--pill-border)">
          {relatedProjects.map((rel, i) => {
            const shortcut = ['⇧1', '⇧2', '⇧3'][i] ?? '⇧•'
            return (
              <Reveal key={rel.id} delay={i * 60}>
                <Link
                  href={`/projects/${rel.id}`}
                  className="group flex items-center justify-between gap-5 border-b border-dashed border-(--pill-border) py-5 transition-colors hover:bg-bg-card/50"
                >
                  <div className="flex flex-1 items-baseline gap-5 min-w-0">
                    <span className="font-mono text-[12px] tabular-nums text-subtle-foreground shrink-0">
                      0{i + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xl font-semibold tracking-[-0.02em] text-foreground group-hover:text-accent transition-colors truncate">
                        {rel.title}
                      </p>
                      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-subtle-foreground truncate">
                        {rel.category} · {rel.timeline}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <kbd className="kbd">{shortcut}</kbd>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </section>
    </div>
  )
}
