'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Footer } from '@/components/organisms/footer'
import { Navbar } from '@/components/organisms/navbar'
import { OrbitSystem } from '@/components/organisms/orbit-system'
import { Reveal } from '@/components/ui/reveal'

export default function OrbitPage() {
  return (
    <main className="page-shell min-h-screen">
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32">
        <Reveal as="header" className="flex flex-col gap-4 pb-10 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="section-label">Orbit view</span>
            <span className="font-mono text-[11px] text-subtle-foreground">/ experimental</span>
          </div>
          <h1 className="font-serif-italic text-4xl leading-[1.05] text-foreground sm:text-[3rem]">
            A different way to see the work.
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            Five featured projects, gravitating around a small phosphor sun. Hover a planet to pause its orbit and read more.
            Click to land on the case study.
          </p>
          <div className="flex items-center justify-center gap-2 pt-2 text-xs text-subtle-foreground">
            <Link
              href="/"
              className="inline-flex items-center gap-1 font-mono uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground"
            >
              ← Back to grid view
            </Link>
            <span aria-hidden>·</span>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1 font-mono uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground"
            >
              All projects
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        </Reveal>

        <Reveal>
          <OrbitSystem />
        </Reveal>
      </div>

      <Footer />
    </main>
  )
}
