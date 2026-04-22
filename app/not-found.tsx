'use client'

import Link from 'next/link'
import { Home } from 'lucide-react'
import { Navbar } from '@/components/organisms/navbar'
import { Footer } from '@/components/organisms/footer'
import { Reveal } from '@/components/ui/reveal'

export default function NotFound() {
  return (
    <main className="page-shell min-h-screen">
      <Navbar />

      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-4">
        <Reveal className="max-w-xl text-center">
          <p className="font-serif-italic text-4xl text-accent">hmm,</p>
          <h1 className="mt-4 text-7xl font-semibold tracking-[-0.03em] text-foreground sm:text-8xl">
            404
          </h1>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
            Page not found
          </h2>
          <p className="mt-5 text-[15px] leading-7 text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Try{' '}
            <kbd className="kbd">⌘K</kbd> to search.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:bg-foreground/90"
            >
              <Home className="h-4 w-4" />
              Go home
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-lg border border-dashed border-(--pill-border) bg-bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:border-(--border-strong)"
            >
              View projects
            </Link>
          </div>
        </Reveal>
      </section>

      <Footer />
    </main>
  )
}
