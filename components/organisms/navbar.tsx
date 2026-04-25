'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { personalInfo } from '@/lib/data'

const navLinks = [
  { href: '/', label: 'Home', shortcut: 'H' },
  { href: '/projects', label: 'Projects', shortcut: 'P' },
  { href: '/orbit', label: 'Orbit', shortcut: 'O' },
  { href: '/resume', label: 'Resume', shortcut: 'R' },
  { href: '/contact', label: 'Contact', shortcut: 'C' },
]

function openPalette() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent('rushil:command-palette'))
}

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isMac, setIsMac] = useState(false)

  useEffect(() => {
    setIsMac(typeof navigator !== 'undefined' && /Mac|iPhone|iPod|iPad/.test(navigator.platform))
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6">
        <div className="glass-nav rounded-xl px-3 py-2 sm:px-4">
          <div className="flex items-center gap-3">
            {/* Brand */}
            <Link href="/" className="flex shrink-0 items-center gap-2 pl-1.5 pr-2">
              <span className="pill-dot" />
              <span className="hidden text-sm font-semibold tracking-tight text-foreground sm:inline">
                Rushil Gangisetty
              </span>
              <span className="text-sm font-semibold tracking-tight text-foreground sm:hidden">RG</span>
            </Link>

            {/* Nav links (desktop) */}
            <nav className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => {
                const active = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'group relative flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors',
                      active
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:bg-bg-card-muted hover:text-foreground'
                    )}
                  >
                    {link.label}
                    <kbd className="kbd hidden lg:inline-flex">⇧{link.shortcut}</kbd>
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-lg bg-bg-card-muted"
                        transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
                      />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Command palette trigger */}
            <button
              type="button"
              onClick={openPalette}
              className="ml-auto flex min-w-[180px] items-center gap-2 rounded-lg border border-dashed border-(--pill-border) bg-[var(--search-bg)] px-3 py-1.5 text-sm text-muted-foreground transition hover:border-(--border-strong)"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="flex-1 text-left">Search…</span>
              <kbd className="kbd">{isMac ? '⌘' : 'Ctrl'} K</kbd>
            </button>

            {/* Resume CTA (desktop) */}
            <a
              href={personalInfo.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-lg border border-dashed border-(--pill-border) bg-bg-card px-3 py-1.5 text-sm font-medium text-foreground transition hover:border-(--border-strong) md:inline-flex"
            >
              Resume
            </a>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-dashed border-(--pill-border) text-foreground md:hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
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
                <div className="mt-3 grid gap-1 border-t border-dashed border-(--pill-border) pt-3">
                  {navLinks.map((link) => {
                    const active = pathname === link.href
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          'flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors',
                          active
                            ? 'bg-bg-card-muted text-foreground'
                            : 'text-muted-foreground hover:bg-bg-card-muted hover:text-foreground'
                        )}
                      >
                        {link.label}
                        <kbd className="kbd">⇧{link.shortcut}</kbd>
                      </Link>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  )
}
