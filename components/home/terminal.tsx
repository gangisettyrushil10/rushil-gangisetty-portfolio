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
  buzzr: `Buzzr — cross-platform sports social app.
18 beta testers on TestFlight · 7 live leagues · 20+ REST endpoints · 38 SQL migrations
9 Edge Functions · 70+ reusable UI components · real-time watch parties
Live on TestFlight → buzzr-desktop.vercel.app

Try: "stack" to see what it's built with`,
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
  projects: `01  Buzzr                        Sports app · 18 beta testers on TestFlight
02  Business Analytics Dashboard  Data workflow for messy CSVs
03  IBM Medscribe AI              Clinical AI workflow (IBM AI Lab)
04  Graph Link Prediction         GNN on Facebook social graph
05  Credit Union Ledger API       Banking backend with idempotency

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
  now: `→ Building collaborative filtering recommendation engine for Buzzr
→ Using user rating patterns to surface personally entertaining games
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
→ This terminal was built in one afternoon with Claude

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
            className="mb-3 w-[340px] sm:w-[380px] overflow-hidden rounded-2xl border border-[#43d7ff]/20 bg-black/90 shadow-[0_16px_60px_-16px_rgba(67,215,255,0.15)] backdrop-blur-xl"
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
                      <span className="text-[#43d7ff]">$</span> {line.text}
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap text-foreground/80">{line.text}</div>
                  )}
                </div>
              ))}

              <form onSubmit={handleSubmit} className="mt-1.5 flex items-center">
                <span className="text-[#43d7ff]">$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="ml-1 flex-1 bg-transparent text-foreground outline-none caret-[#43d7ff] placeholder:text-muted-foreground/40"
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
        className={`flex items-center gap-2.5 rounded-2xl border px-4 py-3 font-mono text-xs shadow-lg backdrop-blur-xl transition-all hover:scale-[1.02] ${
          isOpen
            ? 'border-[#43d7ff]/30 bg-[#43d7ff]/10 text-[#43d7ff]'
            : 'border-white/15 bg-black/80 text-muted-foreground hover:border-white/25 hover:bg-black/90'
        }`}
      >
        {isOpen ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <TerminalSquare className="h-4 w-4 text-[#43d7ff]" />
        )}
        <span>
          <span className="text-[#43d7ff]">$</span> rushil.sh
        </span>
      </button>
    </div>
  )
}
