'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Download, Github, Linkedin, Mail, MapPin, Sparkles } from 'lucide-react'
import { personalInfo, recruiterSummary } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { ProjectCommandCenter } from '@/components/home/project-command-center'

const heroHighlights = [
  'Product software with real user feel',
  'Backend APIs and business rules that stay readable',
  'Data-heavy workflows that handle messy input honestly',
  'Applied AI when it strengthens the product instead of distracting from it',
]

const heroStats = [
  { value: '4', label: 'flagship case studies' },
  { value: '50K+', label: 'records/day supported in production' },
  { value: '3', label: 'internships across product, data, and systems' },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-32 lg:min-h-screen lg:pt-36">
      <div className="absolute inset-0 animated-gradient" />
      <div className="absolute inset-0 hero-noise opacity-90" />
      <div className="absolute inset-0 grid-pattern opacity-45" />
      <div className="absolute inset-0 arcade-scanlines opacity-20" />
      <div className="absolute left-[-12rem] top-[14%] h-[28rem] w-[28rem] rounded-full bg-primary/18 blur-3xl" />
      <div className="absolute bottom-[-10rem] right-[-8rem] h-[26rem] w-[26rem] rounded-full bg-accent/18 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[0.96fr_1.04fr] lg:gap-14">
          <div className="max-w-2xl pt-6 lg:pt-10">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-[0.72rem] font-mono uppercase tracking-[0.22em] text-white/78 backdrop-blur"
            >
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Software engineer in Dallas
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="font-display mt-7 max-w-4xl text-[2.9rem] font-semibold leading-[0.9] tracking-[-0.05em] text-foreground sm:text-[4.35rem] lg:text-[5.6rem]"
            >
              I build software that feels sharp and <span className="gradient-text">holds up</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mt-6 max-w-xl text-lg leading-8 text-foreground/88 sm:text-[1.12rem]"
            >
              {recruiterSummary.description}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="mt-5 max-w-xl text-[0.98rem] leading-7 text-muted-foreground"
            >
              I care about the whole shape of the thing: the product surface, the backend decisions behind it, and the messy workflows that show up once real people start using it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/projects">
                  View projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/15 bg-white/[0.03] hover:bg-white/[0.06]">
                <a href="/resume.pdf" download>
                  <Download className="mr-2 h-4 w-4" />
                  Download resume
                </a>
              </Button>
              <Button asChild size="lg" variant="ghost" className="text-foreground hover:bg-white/[0.05]">
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Get in touch
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38 }}
              className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted-foreground"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
                <MapPin className="h-4 w-4 text-primary" />
                {personalInfo.location}
              </span>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
              <a href={`mailto:${personalInfo.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
                <Mail className="h-4 w-4" />
                Email
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.46 }}
              className="mt-10 grid gap-3 sm:grid-cols-2"
            >
              {heroHighlights.map((highlight) => (
                <div key={highlight} className="rounded-2xl border border-white/10 bg-black/25 px-4 py-4 backdrop-blur">
                  <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/14 text-primary">
                    <span className="h-2 w-2 rounded-full bg-current" />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-foreground/86">{highlight}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.54 }}
              className="mt-10 grid gap-3 sm:grid-cols-3"
            >
              {heroStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 backdrop-blur">
                  <p className="font-display text-2xl font-semibold text-foreground">{stat.value}</p>
                  <p className="mt-1 text-[0.72rem] font-mono uppercase tracking-[0.16em] text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="relative lg:pt-6"
          >
            <ProjectCommandCenter />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
