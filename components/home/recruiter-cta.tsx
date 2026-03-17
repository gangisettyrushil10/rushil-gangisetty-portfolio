'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Mail, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { personalInfo } from '@/lib/data'

export function RecruiterCTA() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Gradient Orbs */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.4 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-xs font-mono tracking-wider text-primary uppercase mb-4">
            Open to Opportunities
          </span>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground text-balance">
            Looking for a software engineer who ships?
          </h2>
          
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            I bring product judgment, technical depth, and a track record of building real systems. 
            Let's talk about how I can contribute to your team.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Button asChild size="lg" className="min-w-[180px] bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/contact">
                <Mail className="mr-2 w-4 h-4" />
                Get in Touch
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="min-w-[180px]">
              <Link href="/resume">
                <FileText className="mr-2 w-4 h-4" />
                View Resume
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="min-w-[180px]">
              <Link href="/projects">
                See My Work
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Based in {personalInfo.location} • Open to remote and hybrid roles
          </p>
        </motion.div>
      </div>
    </section>
  )
}
