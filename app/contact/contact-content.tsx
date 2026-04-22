import { ArrowUpRight, Download, Github, Linkedin, Mail, MapPin } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { DashedDivider } from '@/components/ui/dashed-divider'
import { LiveTimePill, LocationPill } from '@/components/organisms/live-pills'
import { personalInfo } from '@/lib/data'

const talkingPoints = [
  'Role title and team',
  'Product or problem space',
  'Timeline and interview process',
]

export function ContactContent() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <span className="section-label">Contact</span>
          <h1 className="mt-5 max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-[3.25rem]">
            <span className="font-serif-italic text-accent">say hello</span> —
            email me directly.
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-7 text-muted-foreground">
            Open to software engineering, backend, and product-focused full-stack roles.
          </p>

          <div className="mt-6 flex flex-col gap-2">
            <LiveTimePill />
            <LocationPill />
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <Reveal
              delay={80}
              as="a"
              className="bento-cell group flex flex-col gap-3 p-5"
              style={{ display: 'flex' }}
            >
              <a href={`mailto:${personalInfo.email}`} className="flex flex-col gap-3">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-accent/15 text-accent">
                  <Mail className="h-4 w-4" />
                </div>
                <p className="text-sm font-medium text-foreground">Email</p>
                <p className="text-sm text-muted-foreground">{personalInfo.email}</p>
              </a>
            </Reveal>

            <Reveal delay={140} className="bento-cell p-5">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-3"
              >
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-bg-card-muted text-foreground">
                  <Linkedin className="h-4 w-4" />
                </div>
                <p className="text-sm font-medium text-foreground">LinkedIn</p>
                <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  Connect here
                  <ArrowUpRight className="h-4 w-4" />
                </p>
              </a>
            </Reveal>

            <Reveal delay={200} className="bento-cell p-5">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-3"
              >
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-bg-card-muted text-foreground">
                  <Github className="h-4 w-4" />
                </div>
                <p className="text-sm font-medium text-foreground">GitHub</p>
                <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  Review public work
                  <ArrowUpRight className="h-4 w-4" />
                </p>
              </a>
            </Reveal>

            <Reveal delay={260} className="bento-cell p-5">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-bg-card-muted text-foreground">
                <MapPin className="h-4 w-4" />
              </div>
              <p className="mt-3 text-sm font-medium text-foreground">Location</p>
              <p className="mt-1 text-sm text-muted-foreground">{personalInfo.location}</p>
              <p className="mt-1 text-xs text-subtle-foreground">
                Remote, hybrid, relocation — all open
              </p>
            </Reveal>
          </div>
        </Reveal>

        <Reveal delay={80} className="bento-cell p-6 sm:p-7">
          <span className="section-label">Best way to reach me</span>
          <a
            href={`mailto:${personalInfo.email}`}
            className="mt-4 inline-flex text-xl font-semibold text-foreground transition hover:text-accent sm:text-[1.6rem]"
          >
            {personalInfo.email}
          </a>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
            A short note with the team, role, and product area is perfect.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2 rounded-lg bg-foreground px-3.5 py-1.5 text-sm font-medium text-background transition hover:bg-foreground/90"
            >
              <Mail className="h-4 w-4" />
              Send email
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-dashed border-(--pill-border) bg-bg-card px-3.5 py-1.5 text-sm font-medium text-foreground transition hover:border-(--border-strong)"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href={personalInfo.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-dashed border-(--pill-border) bg-bg-card px-3.5 py-1.5 text-sm font-medium text-foreground transition hover:border-(--border-strong)"
            >
              <Download className="h-4 w-4" />
              Resume
            </a>
          </div>

          <DashedDivider className="my-7" />

          <div className="space-y-3">
            <div className="rounded-md border border-dashed border-(--pill-border) bg-bg-card-muted px-4 py-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle-foreground">
                Helpful to include
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {talkingPoints.map((point) => (
                  <span
                    key={point}
                    className="rounded border border-dashed border-(--pill-border) bg-bg-card px-2 py-0.5 text-[11px] font-mono text-muted-foreground"
                  >
                    {point}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-md border border-dashed border-(--pill-border) bg-bg-card-muted px-4 py-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle-foreground">
                Response style
              </p>
              <p className="mt-2 text-sm leading-6 text-foreground">
                Direct, friendly, happy to discuss team fit, project details, or next steps.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
