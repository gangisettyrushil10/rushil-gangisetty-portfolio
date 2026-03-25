'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

interface TerminalLine {
  type: 'input' | 'output'
  text: string
}

const commands: Record<string, string> = {
  help: `Available commands: about, buzzr, stack, experience, contact, clear`,
  about: `Rushil Gangisetty — full-stack engineer based in Dallas, TX.
I build products I'd want to use myself and the systems behind them.
B.S. in CS & Math from Austin College. MS CS at UT Dallas starting Aug 2026.`,
  buzzr: `Buzzr — Letterboxd for sports.
20 weekly active users · 8 leagues · 10,838 live games · 100% week-1 retention
ML model scores game entertainment using tempo, lead changes, and scoring runs.
Live on TestFlight → buzzr-desktop.vercel.app`,
  stack: `TypeScript · Python · C# · Java · SQL
React · Next.js · React Native · Tailwind · Framer Motion
FastAPI · Flask · ASP.NET Core · Supabase · PostgreSQL
scikit-learn · PyTorch · Docker · Git`,
  experience: `Seam.ai — SWE Intern → email pipeline processing 50K+ records/day
Aeyesafe — QA Intern → automated ETL testing for IoT sensor streams
Austin College — SWE Intern → forecasting software for 100+ faculty`,
  contact: `Email: gangisettyrushil@gmail.com
GitHub: github.com/gangisettyrushil10
LinkedIn: linkedin.com/in/rushilgangisetty10`,
}

const INITIAL_LINES: TerminalLine[] = [
  { type: 'output', text: 'Welcome to rushil.sh — type "help" to get started.' },
]

export function Terminal() {
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
      newLines.push({ type: 'output', text: response })
    } else {
      newLines.push({ type: 'output', text: `command not found: ${cmd}. Type "help" for available commands.` })
    }

    setLines(newLines)
    setInput('')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45 }}
      className="terminal-window overflow-hidden rounded-2xl border border-white/10 bg-black/60 backdrop-blur"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/8 px-4 py-2.5">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <div className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <div className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>
        <span className="ml-2 text-[0.65rem] font-mono text-muted-foreground/60">rushil.sh</span>
      </div>

      {/* Terminal body */}
      <div
        ref={scrollRef}
        className="max-h-[280px] min-h-[180px] overflow-y-auto p-4 font-mono text-sm"
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
  )
}
