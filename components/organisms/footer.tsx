'use client'

import Link from 'next/link'
import { Github, Linkedin, Mail } from 'lucide-react'
import { personalInfo } from '@/lib/data'

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/resume', label: 'Resume' },
  { href: '/contact', label: 'Contact' },
]

export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-[rgba(1,2,4,0.9)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[0.68rem] font-mono uppercase tracking-[0.22em] text-primary/78">
              Rushil // Orbit
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-foreground sm:text-[2.4rem]">
              Product-minded engineering across desktop, backend, and applied AI.
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {personalInfo.status}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-[0.68rem] font-mono uppercase tracking-[0.2em] text-white/44">
                Navigation
              </p>
              <div className="mt-3 grid gap-2">
                {footerLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[0.68rem] font-mono uppercase tracking-[0.2em] text-white/44">
                Contact
              </p>
              <div className="mt-3 grid gap-2">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mail className="h-4 w-4" />
                  {personalInfo.email}
                </a>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/8 pt-4 text-[0.72rem] font-mono uppercase tracking-[0.14em] text-white/36 sm:flex-row sm:items-center sm:justify-between">
          <p>{new Date().getFullYear()} Rushil Gangisetty</p>
          <p>Built with Next.js and Framer Motion</p>
        </div>
      </div>
    </footer>
  )
}
