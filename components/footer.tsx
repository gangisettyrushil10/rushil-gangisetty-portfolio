'use client'

import Link from 'next/link'
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react'
import { personalInfo } from '@/lib/data'

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="text-xl font-bold tracking-tight">
              <span className="text-foreground">rushil</span>
              <span className="text-primary">.</span>
            </Link>
            <p className="mt-4 text-muted-foreground max-w-sm">
              Software engineer building product, backend, data, and AI systems. 
              Open to opportunities.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="p-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Navigation</h3>
            <ul className="flex flex-col gap-3">
              {['Home', 'Projects', 'Resume', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Get in Touch</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center gap-1"
                >
                  Email <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center gap-1"
                >
                  LinkedIn <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center gap-1"
                >
                  GitHub <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} Rushil Gangisetty. Built with Next.js.
          </p>
          <p className="text-sm text-muted-foreground">
            {personalInfo.location}
          </p>
        </div>
      </div>
    </footer>
  )
}
