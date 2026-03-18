import { ArrowUpRight, Download, Github, Linkedin, Mail, MapPin } from 'lucide-react'
import { personalInfo } from '@/lib/data'

const talkingPoints = [
  'Role title and team',
  'What the product or problem space is',
  'Timeline and interview process',
]

export function ContactContent() {
  return (
    <section className="relative overflow-hidden px-4 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8">
      <div className="absolute inset-0 aurora-backdrop opacity-80" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <span className="section-label">Contact</span>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[0.94] tracking-[-0.06em] text-foreground sm:text-[4rem]">
              Email me directly.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              I am open to software engineering, backend, and product-focused full-stack conversations.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a
                href={`mailto:${personalInfo.email}`}
                className="glass-panel block rounded-[24px] p-4 sm:p-5 transition hover:border-white/18"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/18 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <p className="mt-3 text-sm font-medium text-foreground">Email</p>
                <p className="mt-1.5 text-sm text-muted-foreground">{personalInfo.email}</p>
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel block rounded-[24px] p-4 sm:p-5 transition hover:border-white/18"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/8 text-foreground">
                  <Linkedin className="h-5 w-5" />
                </div>
                <p className="mt-3 text-sm font-medium text-foreground">LinkedIn</p>
                <p className="mt-1.5 inline-flex items-center gap-2 text-sm text-muted-foreground">
                  Connect here
                  <ArrowUpRight className="h-4 w-4" />
                </p>
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel block rounded-[24px] p-4 sm:p-5 transition hover:border-white/18"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/8 text-foreground">
                  <Github className="h-5 w-5" />
                </div>
                <p className="mt-3 text-sm font-medium text-foreground">GitHub</p>
                <p className="mt-1.5 inline-flex items-center gap-2 text-sm text-muted-foreground">
                  Review public work
                  <ArrowUpRight className="h-4 w-4" />
                </p>
              </a>

              <div className="glass-panel rounded-[24px] p-4 sm:p-5">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/8 text-foreground">
                  <MapPin className="h-5 w-5" />
                </div>
                <p className="mt-3 text-sm font-medium text-foreground">Location</p>
                <p className="mt-1.5 text-sm text-muted-foreground">{personalInfo.location}</p>
              </div>
            </div>
          </div>

          <div className="glass-panel-strong rounded-[28px] p-5 sm:p-6">
            <p className="text-[0.68rem] font-mono uppercase tracking-[0.2em] text-primary/90">Best way to reach me</p>
            <a
              href={`mailto:${personalInfo.email}`}
              className="mt-4 inline-flex text-2xl font-semibold text-foreground transition hover:text-primary sm:text-[2rem]"
            >
              {personalInfo.email}
            </a>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
              If you are reaching out about a role, a short note with the team, title, and product area is perfect.
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:brightness-110"
              >
                <Mail className="h-4 w-4" />
                Send email
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-white/18 hover:bg-white/9"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href={personalInfo.resumePath}
                download
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-white/18 hover:bg-white/9"
              >
                <Download className="h-4 w-4" />
                Resume
              </a>
            </div>

            <div className="mt-6 grid gap-3">
              <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                <p className="text-[0.68rem] font-mono uppercase tracking-[0.16em] text-muted-foreground">Helpful to include</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {talkingPoints.map((point) => (
                    <span
                      key={point}
                      className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1.5 text-xs text-foreground/88"
                    >
                      {point}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                <p className="text-[0.68rem] font-mono uppercase tracking-[0.16em] text-muted-foreground">Response style</p>
                <p className="mt-2 text-sm leading-6 text-foreground/90">
                  Direct, friendly, and happy to discuss team fit, project details, or next steps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
