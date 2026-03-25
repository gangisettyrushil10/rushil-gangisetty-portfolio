'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, ChevronDown, Smartphone, Globe, Brain, Database, Layers } from 'lucide-react'

const screenshots = [
  { src: '/projects/buzzr-home.png', alt: 'Buzzr home feed with live games and ratings', label: 'Home feed' },
  { src: '/projects/buzzr-games.png', alt: 'Buzzr game detail with entertainment scores', label: 'Game detail' },
  { src: '/projects/buzzr-party.png', alt: 'Buzzr watch party and social features', label: 'Watch parties' },
]

const metrics = [
  { value: '20', label: 'Weekly active users' },
  { value: '100%', label: 'Week-1 retention' },
  { value: '10,838', label: 'Live games' },
  { value: '8', label: 'Leagues' },
]

const archLayers = [
  {
    icon: Smartphone,
    title: 'Mobile app',
    detail: 'Expo + React Native — iOS via TestFlight',
    color: '#43d7ff',
  },
  {
    icon: Globe,
    title: 'Web companion',
    detail: 'Next.js + Tailwind CSS on Vercel',
    color: '#43d7ff',
  },
  {
    icon: Database,
    title: 'Shared backend',
    detail: 'Supabase (Auth, Realtime, PostgreSQL) — 38 migrations',
    color: '#12b981',
  },
  {
    icon: Brain,
    title: 'ML pipeline',
    detail: 'Python + scikit-learn entertainment scoring model',
    color: '#ff8a5b',
  },
  {
    icon: Layers,
    title: 'In progress',
    detail: 'Collaborative filtering recommendation engine on user ratings',
    color: '#9d8cff',
  },
]

export function BuzzrShowcase() {
  const [archOpen, setArchOpen] = useState(false)
  const [activeScreenshot, setActiveScreenshot] = useState(0)

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-[28px] border border-[#43d7ff]/20 bg-gradient-to-br from-[#43d7ff]/[0.04] via-transparent to-[#12b981]/[0.04] p-5 sm:p-8">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#43d7ff]/30 bg-[#43d7ff]/10 px-3 py-1.5 text-[0.68rem] font-mono uppercase tracking-[0.2em] text-[#43d7ff]">
            <span className="h-2 w-2 rounded-full bg-[#12b981] shadow-[0_0_10px_rgba(18,185,129,0.6)]" />
            Flagship product
          </span>
        </div>

        {/* One-liner */}
        <h3 className="mt-5 max-w-3xl text-2xl font-semibold leading-tight text-foreground sm:text-[2rem]">
          Buzzr is Letterboxd for sports.
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
          Rate how entertaining games are, post hot takes, host watch parties, and compete in bracket predictions — across 8 leagues and 10,838 live games.
        </p>

        {/* ML explanation */}
        <div className="mt-5 max-w-2xl rounded-2xl border border-white/8 bg-black/30 px-4 py-3">
          <p className="text-[0.68rem] font-mono uppercase tracking-[0.2em] text-[#ff8a5b]">The ML model</p>
          <p className="mt-2 text-sm leading-7 text-foreground/85">
            A scikit-learn model scores every game&apos;s entertainment value using tempo, lead changes, and scoring runs — then predicts which upcoming games will be the most exciting to watch.
          </p>
        </div>

        {/* Metrics */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <p className="font-display text-2xl font-semibold text-foreground">{m.value}</p>
              <p className="mt-1 text-[0.68rem] font-mono uppercase tracking-[0.16em] text-muted-foreground">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Screenshots */}
        <div className="mt-6">
          <div className="flex gap-2 mb-3">
            {screenshots.map((s, i) => (
              <button
                key={s.label}
                type="button"
                onClick={() => setActiveScreenshot(i)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                  i === activeScreenshot
                    ? 'bg-[#43d7ff]/15 text-[#43d7ff] border border-[#43d7ff]/30'
                    : 'text-muted-foreground border border-white/8 hover:border-white/16'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeScreenshot}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="relative aspect-[16/10]"
              >
                <Image
                  src={screenshots[activeScreenshot].src}
                  alt={screenshots[activeScreenshot].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Links */}
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="https://buzzr-desktop.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#43d7ff] px-4 py-2.5 text-sm font-medium text-black transition hover:brightness-110"
          >
            <ExternalLink className="h-4 w-4" />
            Live web demo
          </a>
          <a
            href="https://github.com/gangisettyrushil10/Buzzr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-white/[0.08]"
          >
            <Github className="h-4 w-4" />
            Mobile repo
          </a>
          <a
            href="https://github.com/gangisettyrushil10/buzzr_desktop"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-white/[0.08]"
          >
            <Github className="h-4 w-4" />
            Web repo
          </a>
        </div>

        {/* Architecture collapsible */}
        <div className="mt-6 border-t border-white/8 pt-5">
          <button
            type="button"
            onClick={() => setArchOpen(!archOpen)}
            className="group flex w-full items-center justify-between text-left"
          >
            <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
              How it works — architecture
            </span>
            <motion.span
              animate={{ rotate: archOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </motion.span>
          </button>

          <AnimatePresence>
            {archOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {archLayers.map((layer) => {
                    const Icon = layer.icon
                    return (
                      <div
                        key={layer.title}
                        className="rounded-2xl border border-white/8 bg-black/20 px-4 py-3"
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" style={{ color: layer.color }} />
                          <span className="text-sm font-medium text-foreground">{layer.title}</span>
                        </div>
                        <p className="mt-1.5 text-xs leading-5 text-muted-foreground">{layer.detail}</p>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
