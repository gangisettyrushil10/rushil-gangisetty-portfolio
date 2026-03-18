'use client'

import Link from 'next/link'
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react'
import { personalInfo } from '@/lib/data'

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/resume', label: 'Resume' },
  { href: '/contact', label: 'Contact' },
]

export function Footer() {
  return (
    <footer className="page-shell border-t border-white/8 bg-[rgba(2,2,2,0.82)]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="glass-panel-strong rounded-[32px] p-6 sm:p-8">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_0.7fr_0.9fr]">
            <div>
              <span className="section-label">Built for recruiters and builders</span>
              <h2 className="mt-5 text-3xl font-semibold leading-tight text-foreground sm:text-[2.7rem]">
                Product quality, backend reliability, and practical engineering judgment.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[0.98rem]">
                This site is intentionally curated around the work that best represents how I build today. If there is a potential fit, I would be glad to connect.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:brightness-110"
                >
                  <Mail className="h-4 w-4" />
                  {personalInfo.email}
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-white/18 hover:bg-white/8"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-white/18 hover:bg-white/8"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-foreground">Navigate</p>
              <div className="mt-4 grid gap-2">
                {footerLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm text-muted-foreground transition hover:bg-white/6 hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-foreground">Quick read</p>
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-primary/90">Based in</p>
                  <p className="mt-2 text-sm text-foreground">{personalInfo.location}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-accent">Currently open</p>
                  <p className="mt-2 text-sm leading-6 text-foreground">{personalInfo.status}</p>
                </div>
                <a
                  href={personalInfo.resumePath}
                  download
                  className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition hover:text-primary"
                >
                  Download resume
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-2 border-t border-white/8 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>{new Date().getFullYear()} Rushil Gangisetty. Built with Next.js and Framer Motion.</p>
            <p>Black-first design with high-contrast accent color.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
