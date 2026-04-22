'use client'

import Link from 'next/link'
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react'
import { personalInfo } from '@/lib/data'

const footerLinks = [
  { href: '/', label: 'Home', shortcut: 'H' },
  { href: '/projects', label: 'Projects', shortcut: 'P' },
  { href: '/resume', label: 'Resume', shortcut: 'R' },
  { href: '/contact', label: 'Contact', shortcut: 'C' },
]

export function Footer() {
  return (
    <footer className="border-t border-dashed border-(--pill-border) bg-bg-card-muted">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <span className="section-label">Rushil Gangisetty</span>
            <h2 className="mt-4 text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
              Software engineer based in{' '}
              <span className="font-serif-italic text-accent">Dallas, Texas</span>.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
              {personalInfo.status}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:bg-foreground/90"
              >
                <Mail className="h-4 w-4" />
                {personalInfo.email}
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-dashed border-(--pill-border) bg-bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:border-(--border-strong)"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-dashed border-(--pill-border) bg-bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:border-(--border-strong)"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-subtle-foreground">
              Navigate
            </p>
            <div className="mt-4 grid gap-1.5">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group inline-flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition hover:bg-bg-card hover:text-foreground"
                >
                  {link.label}
                  <kbd className="kbd opacity-60 group-hover:opacity-100">⇧{link.shortcut}</kbd>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-subtle-foreground">
              Details
            </p>
            <div className="mt-4 space-y-3">
              <div className="rounded-md border border-dashed border-(--pill-border) bg-bg-card p-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle-foreground">
                  Location
                </p>
                <p className="mt-1 text-sm text-foreground">{personalInfo.location}</p>
              </div>
              <a
                href={personalInfo.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-md border border-dashed border-(--pill-border) bg-bg-card p-3 transition hover:border-(--border-strong)"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle-foreground">
                  Resume
                </p>
                <p className="mt-1 inline-flex items-center gap-2 text-sm text-foreground">
                  Download PDF
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition group-hover:text-accent" />
                </p>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-dashed border-(--pill-border) pt-5 text-xs text-subtle-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Rushil Gangisetty · Built with Next.js + Memoire</p>
          <p className="font-mono">Press ⌘K for anything</p>
        </div>
      </div>
    </footer>
  )
}
