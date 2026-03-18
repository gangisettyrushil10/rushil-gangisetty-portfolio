'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Mail, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { personalInfo } from '@/lib/data'

export function RecruiterCTA() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <div className="absolute inset-0 animated-gradient opacity-70" />
      <div className="absolute inset-0 grid-pattern opacity-25" />
      <div className="absolute inset-0 arcade-scanlines opacity-15" />
      <div className="absolute left-[12%] top-0 h-72 w-72 rounded-full bg-primary/16 blur-3xl" />
      <div className="absolute bottom-0 right-[10%] h-72 w-72 rounded-full bg-accent/16 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="case-study-shell rounded-[30px] px-6 py-8 text-center sm:px-10 sm:py-10"
        >
          <span className="inline-block rounded-full border border-white/10 bg-black/20 px-4 py-2 text-[0.72rem] font-mono uppercase tracking-[0.22em] text-primary/90">
            Open to opportunities
          </span>

          <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight text-foreground sm:text-[3.4rem]">
            If you think there is a fit, I&apos;d be glad to talk.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-[1.04rem]">
            The cleanest read of me is early-career software engineer with strength in product software, backend APIs, business systems, and data-heavy workflows. If that helps your team, the rest of the site should give you a pretty honest sense of how I work.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/contact">
                <Mail className="mr-2 h-4 w-4" />
                Reach out
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/12 bg-white/[0.03] hover:bg-white/[0.06]">
              <Link href="/resume">
                <FileText className="mr-2 h-4 w-4" />
                View resume
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="/projects">
                Browse projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <p className="mt-7 text-sm text-muted-foreground">
            Based in {personalInfo.location} • Open to remote, hybrid, and relocation opportunities
          </p>
        </motion.div>
      </div>
    </section>
  )
}
