'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Download, Github, Linkedin, Mail, MapPin } from 'lucide-react'
import { personalInfo, recruiterSummary } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { ProjectCommandCenter } from '@/components/home/project-command-center'

const proofPoints = [
  'Product software with real user-facing polish',
  'Backend APIs and business logic that stay understandable',
  'Data-heavy workflows built for real, messy input',
]

const heroStats = [
  { value: '5', label: 'flagship projects' },
  { value: '50K+', label: 'records/day supported' },
  { value: '3', label: 'internships' },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-32 lg:pt-36">
      <div className="absolute inset-0 animated-gradient opacity-85" />
      <div className="absolute inset-0 hero-noise opacity-55" />
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute left-[-14rem] top-[8%] h-[24rem] w-[24rem] rounded-full bg-primary/14 blur-3xl" />
      <div className="absolute bottom-[-10rem] right-[-6rem] h-[22rem] w-[22rem] rounded-full bg-accent/14 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <div className="max-w-2xl pt-4 lg:pt-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-[0.72rem] font-mono uppercase tracking-[0.18em] text-muted-foreground backdrop-blur"
            >
              <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_18px_theme(colors.primary.DEFAULT)]" />
              Open to software engineering roles
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.58, delay: 0.06 }}
              className="mt-7 max-w-4xl font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.05em] text-foreground sm:text-[4.5rem] lg:text-[5.1rem]"
            >
              I build
              {' '}
              <span className="gradient-text">products people enjoy using</span>
              {' '}
              and systems teams can rely on.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.58, delay: 0.14 }}
              className="mt-6 max-w-xl text-[1.02rem] leading-8 text-foreground/86"
            >
              {recruiterSummary.description}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.58, delay: 0.2 }}
              className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-[0.96rem]"
            >
              The easiest way to get a read on me is through a few good case studies. That is where the product judgment,
              backend decisions, and data workflow work are most visible.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.58, delay: 0.28 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/projects">
                  View projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/12 bg-white/[0.03] hover:bg-white/[0.06]">
                <a href={personalInfo.resumePath} target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" />
                  Download resume
                </a>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Get in touch
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.58, delay: 0.36 }}
              className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted-foreground"
            >
              <span className="inline-flex items-center gap-2">
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
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.58, delay: 0.44 }}
              className="mt-10 rounded-[28px] border border-white/10 bg-black/18 p-5 backdrop-blur"
            >
              <div className="grid gap-5 sm:grid-cols-[1.15fr_0.85fr]">
                <div>
                  <p className="text-[0.7rem] font-mono uppercase tracking-[0.2em] text-primary/85">Best fit when the work needs</p>
                  <div className="mt-4 space-y-3">
                    {proofPoints.map((point) => (
                      <div key={point} className="flex items-start gap-3 text-sm leading-6 text-foreground/88">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 sm:pl-2">
                  {heroStats.map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
                      <p className="font-display text-2xl font-semibold text-foreground">{stat.value}</p>
                      <p className="mt-1 text-[0.68rem] font-mono uppercase tracking-[0.16em] text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.66, delay: 0.18 }}
            className="relative lg:pt-4"
          >
            <ProjectCommandCenter />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
