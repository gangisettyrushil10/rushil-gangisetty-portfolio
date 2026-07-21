'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FileText, Github, Menu, Orbit, X } from 'lucide-react'
import { ObservationToggle } from '@/components/observatory/observation-provider'
import { cn } from '@/lib/utils'
import { personalInfo } from '@/lib/data'

const homeLinks = [
  { hash: '#work', label: 'Work' },
  { hash: '#systems', label: 'Systems' },
  { hash: '#about', label: 'About' },
  { hash: '#contact', label: 'Contact' },
] as const

const routeLinks = [
  { href: '/projects', label: 'Projects' },
  { href: '/resume', label: 'Resume' },
] as const

function homeHref(pathname: string, hash: (typeof homeLinks)[number]['hash']) {
  return pathname === '/' ? hash : `/${hash}`
}

export function SiteNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const restoreMenuFocusRef = useRef(false)

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') {
        return
      }

      restoreMenuFocusRef.current = true
      setIsOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isOpen])

  useEffect(() => {
    if (isOpen || !restoreMenuFocusRef.current) {
      return
    }

    restoreMenuFocusRef.current = false
    menuButtonRef.current?.focus()
  }, [isOpen])

  function closeMenuAndRestoreFocus() {
    restoreMenuFocusRef.current = true
    setIsOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 h-0 w-full pointer-events-none">
      <div className="mx-auto w-full max-w-[1440px] px-3 pt-3 sm:px-5 sm:pt-4">
        <nav
          aria-label="Primary navigation"
          className="site-nav-shell pointer-events-auto relative rounded-[1.15rem] border border-white/10 bg-[rgba(3,9,17,0.9)] shadow-[0_18px_60px_-28px_rgba(0,0,0,0.92),inset_0_1px_0_rgba(255,255,255,0.06)]"
        >
          <div className="flex min-h-[3.5rem] items-center gap-2 px-2 sm:px-3">
            <Link
              href="/"
              className="group inline-flex min-h-11 shrink-0 items-center gap-2.5 rounded-xl px-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
            >
              <span className="sr-only">Rushil Gangisetty — home. </span>
              <span className="grid h-8 w-8 place-items-center rounded-full border border-primary/20 bg-primary/[0.07] shadow-[inset_0_0_16px_rgba(255,255,255,0.05)]">
                <Orbit
                  className="h-[1.05rem] w-[1.05rem] text-primary/80 transition-transform group-hover:rotate-12"
                  aria-hidden="true"
                />
              </span>
              <span className="hidden leading-none sm:block">
                <span className="block text-[0.71rem] font-semibold tracking-[0.08em] text-white/90">
                  RUSHIL G.
                </span>
                <span className="mt-1 block text-[0.54rem] font-mono uppercase tracking-[0.19em] text-primary/42">
                  Personal observatory
                </span>
              </span>
            </Link>

            <div className="ml-1 hidden items-center gap-0.5 xl:flex">
              {homeLinks.map((link) => (
                <Link
                  key={link.hash}
                  href={homeHref(pathname, link.hash)}
                  className="inline-flex min-h-11 items-center rounded-full px-3 text-[0.66rem] font-mono uppercase tracking-[0.15em] text-white/54 transition-colors hover:bg-white/[0.05] hover:text-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="ml-auto hidden items-center gap-1 xl:flex">
              {routeLinks.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'inline-flex min-h-11 items-center rounded-full px-3 text-[0.66rem] font-mono uppercase tracking-[0.15em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70',
                      isActive
                        ? 'bg-white/[0.08] text-white'
                        : 'text-white/54 hover:bg-white/[0.05] hover:text-white/90'
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Rushil Gangisetty on GitHub (opens in a new tab)"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white/55 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
              </a>

              <ObservationToggle className="ml-1 w-[13.25rem]" />
            </div>

            <button
              ref={menuButtonRef}
              type="button"
              aria-expanded={isOpen}
              aria-controls="observatory-mobile-navigation"
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setIsOpen((open) => !open)}
              className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/80 transition-colors hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 xl:hidden"
            >
              {isOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>

          {isOpen && (
            <div
              id="observatory-mobile-navigation"
              className="site-nav-menu absolute inset-x-0 top-[calc(100%+0.5rem)] overflow-hidden rounded-[1.15rem] border border-white/10 p-2 shadow-[0_24px_70px_-28px_rgba(0,0,0,0.95)] xl:hidden"
            >
              <div className="grid grid-cols-2 gap-1">
                {homeLinks.map((link) => (
                  <Link
                    key={link.hash}
                    href={homeHref(pathname, link.hash)}
                    onClick={() => setIsOpen(false)}
                    className="inline-flex min-h-11 items-center rounded-xl px-3 text-[0.7rem] font-mono uppercase tracking-[0.14em] text-white/66 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="my-2 h-px bg-white/[0.08]" aria-hidden="true" />

              <div className="grid gap-1 sm:grid-cols-3">
                <Link
                  href="/projects"
                  onClick={() => setIsOpen(false)}
                  aria-current={pathname.startsWith('/projects') ? 'page' : undefined}
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm text-white/78 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
                >
                  <Orbit className="h-4 w-4 text-primary/65" aria-hidden="true" />
                  Projects
                </Link>
                <Link
                  href="/resume"
                  onClick={() => setIsOpen(false)}
                  aria-current={pathname.startsWith('/resume') ? 'page' : undefined}
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm text-white/78 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
                >
                  <FileText className="h-4 w-4 text-primary/65" aria-hidden="true" />
                  Resume
                </Link>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm text-white/78 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
                >
                  <Github className="h-4 w-4 text-primary/65" aria-hidden="true" />
                  GitHub
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>

              <ObservationToggle
                className="mt-2 w-full justify-start rounded-xl px-3"
                onToggle={closeMenuAndRestoreFocus}
              />
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
