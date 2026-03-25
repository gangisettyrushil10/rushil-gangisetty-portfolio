'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

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
03  IBM Medscribe AI              Clinical AI workflow (team hackathon)
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
      // Small delay to let animation start before focusing
      const t = setTimeout(() => inputRef.current?.focus(), 150)
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
    <div className="fixed inset-x-0 top-[72px] z-40 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className={`terminal-sticky overflow-hidden rounded-2xl border bg-black/80 backdrop-blur-xl ${isOpen ? 'terminal-expanded border-[#43d7ff]/25' : 'border-white/15'}`}>
          {/* Collapsed bar — always visible */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex w-full items-center justify-between px-4 py-3 font-mono text-xs transition-colors hover:bg-white/[0.04]"
          >
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <span className="ml-1.5 text-muted-foreground">
                <span className="text-[#43d7ff]">$</span> rushil.sh
                {!isOpen && <span className="ml-2 text-muted-foreground/60">— click to explore</span>}
              </span>
            </div>
            {isOpen ? (
              <ChevronUp className="h-3.5 w-3.5 text-muted-foreground/50" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground/50" />
            )}
          </button>

          {/* Expanded terminal body */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="overflow-hidden border-t border-white/8"
              >
                <div
                  ref={scrollRef}
                  className="max-h-[260px] overflow-y-auto p-4 font-mono text-sm"
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

                  {/* Input line */}
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
        </div>
      </div>
    </div>
  )
}
