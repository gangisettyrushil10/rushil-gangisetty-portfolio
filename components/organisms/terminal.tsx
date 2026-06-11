'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, X, TerminalSquare } from 'lucide-react'

interface TerminalLine {
  type: 'input' | 'output'
  text: string
}

const commands: Record<string, string | (() => string)> = {
  help: `Commands:
  about       → who I am
  fuzzy       → my desktop AI study product
  pixeldraw   → my in-progress Apple-platform app
  buzzr       → my flagship product
  stack       → technologies I use
  experience  → internships & work
  projects    → all featured projects
  contact     → how to reach me
  hottake     → a random sports hot take
  now         → what I'm working on right now
  philosophy  → how I think about building
  fun         → some things outside of code
  secret      → ???
  clear       → reset terminal`,
  about: `Rushil Gangisetty — full-stack engineer based in Dallas, TX.
I build products I'd want to use myself and the systems behind them.
B.S. in CS & Math from Austin College. MS CS at UT Dallas starting Aug 2026.`,
  fuzzy: `Fuzzy — Mac-first study IDE for PDFs.
OpenAI-powered tutor flows · local-first Electron workspace · SQLite persistence
Study packs · reading plans · anchored notes · three-process desktop architecture

Built to make serious reading feel more like working in an IDE than chatting with a PDF.`,
  pixeldraw: `PixelDraw — AI pixel-by-number coloring app in progress.
Built for iPhone, iPad, and macOS with SwiftUI, Metal, local persistence, and Supabase.
Turns photos, moods, songs, and rituals into calmer creative experiences.`,
  buzzr: `Buzzr — cross-platform sports social app.
18 beta testers on TestFlight · 7 live leagues · 20+ REST endpoints · 38 SQL migrations
9 Edge Functions · 70+ reusable UI components · real-time watch parties
Live on TestFlight → buzzr-desktop.vercel.app

Try: "fuzzy" or "pixeldraw" to see what I'm building now, too.`,
  stack: `Languages:    Java · C# · Python · JavaScript · TypeScript · SQL · Bash
Frameworks:   ASP.NET Core · EF Core · React · React Native · Expo · Node.js · Next.js · Flask · FastAPI
Databases:    PostgreSQL · MySQL · SQL Server · Supabase · SQLite
AI/ML:        OpenAI API · scikit-learn · Prophet · IBM watsonx · LLM pipelines · DeepInfra
Product:      REST APIs · MVC · Unit Testing · CI/CD · ETL · JWT Auth · Stripe · Clerk
Tools:        Git · Docker · Postman · Linux · Figma · Chrome DevTools`,
  experience: `→ Seam.ai — SWE Intern (Aug 2024 – May 2025)
  Full-stack SaaS (Next.js + Clerk + Stripe), LLM pipelines (Llama 3.1 70B), Chrome extension

→ Aeyesafe — SWE Intern (Jun 2025 – Aug 2025)
  IoT integration testing across thermal, radar, sleep sensors; debugging runbooks

→ Austin College — TA, Intro Programming (Aug 2024 – Dec 2024)
  Designed final lab project, office hours, one-on-one debugging`,
  projects: `01  Fuzzy                        Desktop study IDE · OpenAI + local-first workflows
02  PixelDraw                    Apple-platform creative app in progress
03  Buzzr                        Sports app · 18 beta testers on TestFlight
04  Credit Union Ledger API      Banking backend with idempotency
05  Business Analytics Dashboard Data workflow for messy CSVs

Visit /projects for full case studies.`,
  contact: `Email:     gangisettyrushil@gmail.com
GitHub:    github.com/gangisettyrushil10
LinkedIn:  linkedin.com/in/rushilgangisetty10

Open to backend, full-stack, and data engineering roles.`,
  hottake: () => {
    const takes = [
      '🏈 The NFL is more entertaining than the NBA and Buzzr\'s data proves it.',
      '⚽ MLS is the most underrated league in American sports. The entertainment scores are quietly elite.',
      '🏀 Regular season NBA games have the worst entertainment-to-hype ratio in sports.',
      '⚾ Baseball is only boring if you\'re not tracking lead changes. The data says otherwise.',
      '🏒 NHL playoffs are statistically the most entertaining postseason in American sports.',
      '🏈 Thursday Night Football is a war crime against entertainment value.',
    ]
    return takes[Math.floor(Math.random() * takes.length)]
  },
  now: `→ Expanding Fuzzy's study workflows and document intelligence
→ Polishing PixelDraw's generation loop across Apple platforms
→ Still pushing Buzzr's recommendation and entertainment ranking systems
→ Starting MS CS at UT Dallas in August 2026
→ Open to SWE roles (backend, full-stack, data engineering)`,
  philosophy: `→ Build things you'd want to use yourself
→ Ship, get feedback, iterate — theory without users is just speculation
→ Care about the product as much as the code
→ Handle real-world messiness instead of pretending data is clean
→ Keep systems understandable to the next person who reads them`,
  fun: `Outside of code:
→ Sports obsessive (hence Buzzr)
→ Building prediction models for fun
→ Exploring Dallas food scene
→ Lifelong learner — currently deep in recommendation systems`,
  secret: `You found it. Here's what's not on the resume:
→ I once debugged a Supabase RLS policy for 6 hours straight
→ My first "app" was a TI-84 calculator game in high school
→ I have strong opinions about database indexing at parties
→ I like product UX problems as much as backend ones

Try the Konami code (↑↑↓↓←→←→BA) for another easter egg.`,
}

const INITIAL_LINES: TerminalLine[] = [
  { type: 'output', text: 'Welcome to rushil.sh — type "help" to get started.' },
]

export function Terminal() {
  const [isOpen, setIsOpen] = useState(false)
  const [lines, setLines] = useState<TerminalLine[]>(INITIAL_LINES)
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [lines, scrollToBottom])

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 200)
      return () => clearTimeout(t)
    }
  }, [isOpen])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const cmd = input.trim().toLowerCase()
    if (!cmd) return

    const newLines: TerminalLine[] = [
      ...lines,
      { type: 'input', text: cmd },
    ]

    if (cmd === 'clear') {
      setLines(INITIAL_LINES)
      setInput('')
      return
    }

    const response = commands[cmd]
    if (response) {
      const text = typeof response === 'function' ? response() : response
      newLines.push({ type: 'output', text })
    } else {
      newLines.push({ type: 'output', text: `command not found: ${cmd}. Type "help" for available commands.` })
    }

    setLines(newLines)
    setInput('')
  }

  return (
    <div className="fixed bottom-6 right-4 z-50 sm:right-6">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="mb-3 w-[340px] sm:w-[380px] overflow-hidden rounded-2xl border border-[#7df9ff]/20 bg-black/90 shadow-[0_16px_60px_-16px_rgba(125,249,255,0.15)] backdrop-blur-xl"
          >
            {/* Title bar */}
            <div className="flex items-center justify-between border-b border-white/8 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </div>
                <span className="ml-1 text-[0.65rem] font-mono text-muted-foreground/60">rushil.sh</span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-md p-1 text-muted-foreground/50 transition-colors hover:bg-white/8 hover:text-muted-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Terminal body */}
            <div
              ref={scrollRef}
              className="h-[320px] overflow-y-auto p-4 font-mono text-[0.8rem] leading-5"
              onClick={() => inputRef.current?.focus()}
            >
              {lines.map((line, i) => (
                <div key={i} className={`${i > 0 ? 'mt-1.5' : ''}`}>
                  {line.type === 'input' ? (
                    <div className="text-muted-foreground">
                      <span className="text-[#7df9ff]">$</span> {line.text}
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap text-foreground/80">{line.text}</div>
                  )}
                </div>
              ))}

              <form onSubmit={handleSubmit} className="mt-1.5 flex items-center">
                <span className="text-[#7df9ff]">$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="ml-1 flex-1 bg-transparent text-foreground outline-none caret-[#7df9ff] placeholder:text-muted-foreground/40"
                  placeholder='type "help"'
                  spellCheck={false}
                  autoComplete="off"
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2.5 rounded-2xl border px-5 py-3.5 font-mono text-xs backdrop-blur-xl transition-all hover:scale-[1.03] active:scale-[0.98] ${
          isOpen
            ? 'border-[#7df9ff]/30 bg-[#7df9ff]/10 text-[#7df9ff] shadow-[0_0_20px_-4px_rgba(125,249,255,0.3)]'
            : 'border-white/20 bg-black/85 text-foreground/80 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.8),0_0_15px_-3px_rgba(125,249,255,0.15)] hover:border-[#7df9ff]/25 hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.8),0_0_20px_-3px_rgba(125,249,255,0.25)]'
        }`}
      >
        {isOpen ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <TerminalSquare className="h-4 w-4 text-[#7df9ff]" />
        )}
        <span>
          <span className="text-[#7df9ff]">$</span> rushil.sh
        </span>
      </button>
    </div>
  )
}
