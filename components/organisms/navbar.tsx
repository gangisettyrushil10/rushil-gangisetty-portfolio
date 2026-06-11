'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { personalInfo } from '@/lib/data'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/resume', label: 'Resume' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            'rounded-full border px-4 py-3 transition-all duration-300 sm:px-5',
            scrolled
              ? 'border-white/12 bg-[rgba(3,4,7,0.9)] shadow-[0_24px_70px_-42px_rgba(0,0,0,0.96)] backdrop-blur-xl'
              : 'border-white/8 bg-[rgba(2,3,6,0.62)] backdrop-blur-md'
          )}
        >
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="min-w-0">
              <div className="flex items-center gap-3">
                <span className="status-pulse inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold tracking-[-0.03em] text-foreground sm:text-[0.95rem]">
                    Rushil
                  </p>
                  <p className="truncate text-[0.58rem] font-mono uppercase tracking-[0.22em] text-white/42">
                    Orbit Portfolio
                  </p>
                </div>
              </div>
            </Link>

            <div className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => {
                const active = pathname === link.href

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'rounded-full px-4 py-2 text-[0.68rem] font-mono uppercase tracking-[0.2em] transition-colors',
                      active
                        ? 'bg-white/10 text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>

            <div className="hidden items-center gap-2 md:flex">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/8 bg-white/5 text-muted-foreground transition hover:border-white/16 hover:bg-white/10 hover:text-foreground"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/8 bg-white/5 text-muted-foreground transition hover:border-white/16 hover:bg-white/10 hover:text-foreground"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/5 px-4 py-2 text-[0.68rem] font-mono uppercase tracking-[0.2em] text-foreground transition hover:border-white/16 hover:bg-white/10"
              >
                <Mail className="h-4 w-4" />
                Contact
              </a>
              <a
                href={personalInfo.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-primary px-4 py-2 text-[0.68rem] font-mono uppercase tracking-[0.2em] text-primary-foreground transition hover:brightness-110"
              >
                Resume
              </a>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground md:hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.24 }}
                className="overflow-hidden md:hidden"
              >
                <div className="mt-4 border-t border-white/8 pt-4">
                  <div className="grid gap-2">
                    {navLinks.map((link) => {
                      const active = pathname === link.href

                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={cn(
                            'rounded-2xl px-4 py-3 text-[0.72rem] font-mono uppercase tracking-[0.18em] transition-colors',
                            active
                              ? 'bg-white/10 text-foreground'
                              : 'text-muted-foreground hover:bg-white/6 hover:text-foreground'
                          )}
                        >
                          {link.label}
                        </Link>
                      )
                    })}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <a
                      href={personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.68rem] font-mono uppercase tracking-[0.18em] text-foreground"
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                    <a
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.68rem] font-mono uppercase tracking-[0.18em] text-foreground"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </a>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.68rem] font-mono uppercase tracking-[0.18em] text-foreground"
                    >
                      <Mail className="h-4 w-4" />
                      Email
                    </a>
                    <a
                      href={personalInfo.resumePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-[0.68rem] font-mono uppercase tracking-[0.18em] text-primary-foreground"
                    >
                      Resume
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  )
}
