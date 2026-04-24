'use client'

import { useEffect, useState } from 'react'
import { BookOpen, Flame, GitCommit, MapPin, Sparkles, Telescope } from 'lucide-react'

function formatDallasTime(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'America/Chicago',
    hour12: true,
  }).format(date)
}

export function LiveTimePill() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="pill">
      <span className="pill-dot" />
      <span className="text-subtle-foreground">Dallas</span>
      <span className="tabular-nums text-foreground">{now ? formatDallasTime(now) : '—'}</span>
    </span>
  )
}

export function LocationPill() {
  return (
    <span className="pill">
      <MapPin className="h-3.5 w-3.5 text-accent" />
      Dallas, TX
      <span className="text-subtle-foreground">· open to relocation</span>
    </span>
  )
}

export function NowBuildingPill() {
  return (
    <span className="pill">
      <Sparkles className="h-3.5 w-3.5 text-accent" />
      <span className="text-subtle-foreground">now:</span>
      <span>Buzzr rec engine</span>
    </span>
  )
}

// ── Hot take pill — cycles through sports takes ──────────────

const HOT_TAKES = [
  '🏀 Regular-season NBA has the worst entertainment-to-hype ratio in sports.',
  '🏈 Thursday Night Football is a war crime against entertainment.',
  '⚽ MLS is the most underrated league in American sports.',
  '🏒 NHL playoffs are statistically the most entertaining American postseason.',
  '⚾ Baseball is only boring if you don\'t track lead changes.',
  '🏀 The Warriors-era three-point shot broke the league\'s geometry.',
  '🏀 KAT to NY doesn\'t solve their defense — Buzzr data backs me up.',
  '🏈 NFL officiating is the real main character most Sundays.',
]

export function HotTakePill() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % HOT_TAKES.length), 9000)
    return () => clearInterval(id)
  }, [])

  return (
    <span
      className="pill max-w-full items-start gap-2 py-2"
      style={{ borderColor: 'var(--crt-magenta)', boxShadow: '0 0 10px rgba(255, 51, 102, 0.25)' }}
    >
      <Flame className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--crt-magenta)' }} />
      <span className="text-subtle-foreground">hot take</span>
      <span className="line-clamp-2 text-left text-foreground">{HOT_TAKES[idx]}</span>
    </span>
  )
}

// ── Reading pill — currently rereading the HP series ─────────

const HP_BOOKS = [
  "Sorcerer's Stone",
  'Chamber of Secrets',
  'Prisoner of Azkaban',
  'Goblet of Fire',
  'Order of the Phoenix',
  'Half-Blood Prince',
  'Deathly Hallows',
]

function bookForToday(d: Date): string {
  // Rotate one book per ~2 weeks so it feels alive
  const fortnight = Math.floor(d.getTime() / (14 * 86400000))
  return HP_BOOKS[fortnight % HP_BOOKS.length]
}

export function ReadingPill() {
  const [book, setBook] = useState<string | null>(null)

  useEffect(() => {
    setBook(bookForToday(new Date()))
  }, [])

  return (
    <span
      className="pill"
      style={{ borderColor: 'var(--crt-amber)', boxShadow: '0 0 10px rgba(255, 204, 51, 0.22)' }}
    >
      <BookOpen className="h-3.5 w-3.5" style={{ color: 'var(--crt-amber)' }} />
      <span className="text-subtle-foreground">rereading</span>
      <span className="text-foreground">{book ?? HP_BOOKS[0]}</span>
      <span className="text-subtle-foreground">·</span>
      <span style={{ color: 'var(--crt-amber)' }}>⚡ Gryffindor</span>
    </span>
  )
}

// ── Hoops pill — current basketball stance ────────────────────

export function HoopsPill() {
  return (
    <span className="pill" style={{ borderColor: 'var(--crt-magenta)' }}>
      <span className="text-base leading-none">🏀</span>
      <span className="text-subtle-foreground">watching:</span>
      <span className="text-foreground">NBA playoffs</span>
      <span className="text-subtle-foreground">·</span>
      <span style={{ color: 'var(--crt-magenta)' }}>Warriors</span>
    </span>
  )
}

// ── Moon phase + constellation (pure JS, no API) ──────────────

const MOON_PHASES = [
  { max: 0.03, name: 'New moon', glyph: '\u{1F311}' },
  { max: 0.22, name: 'Waxing crescent', glyph: '\u{1F312}' },
  { max: 0.28, name: 'First quarter', glyph: '\u{1F313}' },
  { max: 0.47, name: 'Waxing gibbous', glyph: '\u{1F314}' },
  { max: 0.53, name: 'Full moon', glyph: '\u{1F315}' },
  { max: 0.72, name: 'Waning gibbous', glyph: '\u{1F316}' },
  { max: 0.78, name: 'Last quarter', glyph: '\u{1F317}' },
  { max: 1.01, name: 'Waning crescent', glyph: '\u{1F318}' },
]

function computeMoonPhase(date: Date): { name: string; glyph: string; illum: number } {
  const synodicMonth = 29.53058770576
  const knownNew = Date.UTC(2000, 0, 6, 18, 14, 0)
  const daysSince = (date.getTime() - knownNew) / 86400000
  const age = ((daysSince % synodicMonth) + synodicMonth) % synodicMonth
  const phase = age / synodicMonth
  const illum = Math.round((1 - Math.cos(phase * 2 * Math.PI)) * 50)
  const match = MOON_PHASES.find((p) => phase < p.max) ?? MOON_PHASES[0]
  return { name: match.name, glyph: match.glyph, illum }
}

// Prominent evening constellation by month from mid-northern latitudes
const CONSTELLATIONS_BY_MONTH: string[] = [
  'Orion', // Jan
  'Taurus', // Feb
  'Gemini', // Mar
  'Leo', // Apr
  'Virgo', // May
  'Boötes', // Jun
  'Scorpius', // Jul
  'Sagittarius', // Aug
  'Cygnus', // Sep
  'Pegasus', // Oct
  'Andromeda', // Nov
  'Cassiopeia', // Dec
]

export function MoonPhasePill() {
  const [state, setState] = useState<{ name: string; glyph: string; illum: number } | null>(null)
  const [constellation, setConstellation] = useState<string>('')

  useEffect(() => {
    const now = new Date()
    setState(computeMoonPhase(now))
    setConstellation(CONSTELLATIONS_BY_MONTH[now.getMonth()])
    const id = setInterval(() => {
      const n = new Date()
      setState(computeMoonPhase(n))
      setConstellation(CONSTELLATIONS_BY_MONTH[n.getMonth()])
    }, 60 * 60 * 1000)
    return () => clearInterval(id)
  }, [])

  if (!state) {
    return (
      <span className="pill">
        <Telescope className="h-3.5 w-3.5 text-accent" />
        <span className="text-subtle-foreground">sky:</span>
        <span>—</span>
      </span>
    )
  }

  return (
    <span className="pill" title={`${state.name} · ${state.illum}% illuminated · ${constellation} prominent overhead`}>
      <span className="text-base leading-none">{state.glyph}</span>
      <span className="text-subtle-foreground">{state.name.toLowerCase()}</span>
      <span className="tabular-nums text-foreground">{state.illum}%</span>
      <span className="text-subtle-foreground">·</span>
      <Telescope className="h-3 w-3 text-accent" />
      <span className="font-mono">{constellation}</span>
    </span>
  )
}

interface Commit {
  repo: string
  message: string
  pushedAt: string
  url: string
}

function timeAgo(date: Date): string {
  const diff = Date.now() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  return `${months}mo ago`
}

export function LatestCommitPill() {
  const [commit, setCommit] = useState<Commit | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchLatest() {
      try {
        const res = await fetch('https://api.github.com/users/gangisettyrushil10/events/public?per_page=30')
        if (!res.ok) return
        const events = await res.json()
        if (!Array.isArray(events)) return

        const push = events.find((e: { type: string; payload?: { commits?: { message: string }[] }; repo?: { name: string }; created_at: string }) => e.type === 'PushEvent' && e.payload?.commits?.length)
        if (!push) return

        const commits = push.payload?.commits ?? []
        const last = commits[commits.length - 1]
        if (!last || !push.repo) return

        const repoShort = push.repo.name.split('/').pop() ?? push.repo.name
        if (!cancelled) {
          setCommit({
            repo: repoShort,
            message: last.message.split('\n')[0].slice(0, 60),
            pushedAt: push.created_at,
            url: `https://github.com/${push.repo.name}`,
          })
        }
      } catch {
        // silent — pill just doesn't render
      }
    }

    fetchLatest()
    return () => {
      cancelled = true
    }
  }, [])

  if (!commit) return null

  return (
    <a
      href={commit.url}
      target="_blank"
      rel="noopener noreferrer"
      className="pill max-w-full"
      title={commit.message}
    >
      <GitCommit className="h-3.5 w-3.5 text-accent" />
      <span className="truncate">
        <span className="text-subtle-foreground">{commit.repo} · </span>
        {commit.message}
      </span>
      <span className="shrink-0 text-subtle-foreground">{timeAgo(new Date(commit.pushedAt))}</span>
    </a>
  )
}
