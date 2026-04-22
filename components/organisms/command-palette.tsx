'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowRight,
  Briefcase,
  Cpu,
  Download,
  FileText,
  Flame,
  Github,
  GraduationCap,
  Home,
  Layers,
  Linkedin,
  Mail,
  MessageCircle,
  Mountain,
  Quote,
  Sparkles,
  Terminal as TerminalIcon,
  Zap,
} from 'lucide-react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts'
import { personalInfo } from '@/lib/data'
import { toast } from 'sonner'

type Action =
  | { kind: 'route'; href: string }
  | { kind: 'external'; href: string }
  | { kind: 'mailto'; email: string }
  | { kind: 'info'; message: string }
  | { kind: 'download'; href: string }

const hotTakes = [
  '🏈 The NFL is more entertaining than the NBA and Buzzr\'s data proves it.',
  '⚽ MLS is the most underrated league in American sports.',
  '🏀 Regular-season NBA games have the worst entertainment-to-hype ratio.',
  '⚾ Baseball is only boring if you\'re not tracking lead changes.',
  '🏒 NHL playoffs are statistically the most entertaining American postseason.',
  '🏈 Thursday Night Football is a war crime against entertainment value.',
]

function pickHotTake(): string {
  return hotTakes[Math.floor(Math.random() * hotTakes.length)]
}

export function CommandPalette() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  useKeyboardShortcuts()

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    function onOpen() {
      setOpen(true)
    }
    window.addEventListener('rushil:command-palette', onOpen)
    return () => window.removeEventListener('rushil:command-palette', onOpen)
  }, [])

  const run = useCallback(
    (action: Action) => {
      setOpen(false)
      if (action.kind === 'route') router.push(action.href)
      else if (action.kind === 'external') window.open(action.href, '_blank', 'noopener,noreferrer')
      else if (action.kind === 'mailto') window.location.href = `mailto:${action.email}`
      else if (action.kind === 'download') window.open(action.href, '_blank', 'noopener,noreferrer')
      else if (action.kind === 'info') toast(action.message, { duration: 6000 })
    },
    [router]
  )

  return (
    <CommandDialog open={open} onOpenChange={setOpen} title="Command palette" description="Jump anywhere on the site.">
      <CommandInput placeholder="Search pages, projects, or type a command…" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>

        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => run({ kind: 'route', href: '/' })}>
            <Home className="h-4 w-4" />
            Home
            <CommandShortcut>⇧H</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => run({ kind: 'route', href: '/projects' })}>
            <Layers className="h-4 w-4" />
            Projects
            <CommandShortcut>⇧P</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => run({ kind: 'route', href: '/resume' })}>
            <FileText className="h-4 w-4" />
            Resume
            <CommandShortcut>⇧R</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => run({ kind: 'route', href: '/contact' })}>
            <MessageCircle className="h-4 w-4" />
            Contact
            <CommandShortcut>⇧C</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Projects">
          <CommandItem onSelect={() => run({ kind: 'route', href: '/projects/buzzr' })}>
            <Zap className="h-4 w-4" />
            Buzzr — sports app on TestFlight
          </CommandItem>
          <CommandItem onSelect={() => run({ kind: 'route', href: '/projects/business-analytics-dashboard' })}>
            <Briefcase className="h-4 w-4" />
            Business Analytics Dashboard
          </CommandItem>
          <CommandItem onSelect={() => run({ kind: 'route', href: '/projects/ibm-medscribe-ai' })}>
            <Cpu className="h-4 w-4" />
            IBM Medscribe AI
          </CommandItem>
          <CommandItem onSelect={() => run({ kind: 'route', href: '/projects/graph-link-prediction' })}>
            <Sparkles className="h-4 w-4" />
            Graph Link Prediction
          </CommandItem>
          <CommandItem onSelect={() => run({ kind: 'route', href: '/projects/credit-union-ledger-api' })}>
            <TerminalIcon className="h-4 w-4" />
            Credit Union Ledger API
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Reach out">
          <CommandItem onSelect={() => run({ kind: 'mailto', email: personalInfo.email })}>
            <Mail className="h-4 w-4" />
            Email {personalInfo.email}
            <CommandShortcut>⇧M</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => run({ kind: 'external', href: personalInfo.linkedin })}>
            <Linkedin className="h-4 w-4" />
            LinkedIn
            <CommandShortcut>⇧L</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => run({ kind: 'external', href: personalInfo.github })}>
            <Github className="h-4 w-4" />
            GitHub
            <CommandShortcut>⇧G</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => run({ kind: 'download', href: personalInfo.resumePath })}>
            <Download className="h-4 w-4" />
            Download resume
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="About Rushil">
          <CommandItem
            onSelect={() =>
              run({
                kind: 'info',
                message:
                  'Full-stack engineer in Dallas. B.S. CS & Math from Austin College. MS CS at UT Dallas starting Aug 2026.',
              })
            }
          >
            <GraduationCap className="h-4 w-4" />
            Bio
          </CommandItem>
          <CommandItem
            onSelect={() =>
              run({
                kind: 'info',
                message:
                  'TS / Python / Go / Swift — Next.js, React Native, FastAPI, Supabase, Postgres, PyTorch, scikit-learn.',
              })
            }
          >
            <Layers className="h-4 w-4" />
            Stack
          </CommandItem>
          <CommandItem
            onSelect={() =>
              run({
                kind: 'info',
                message: 'Currently building a collaborative-filtering recommendation engine for Buzzr.',
              })
            }
          >
            <Sparkles className="h-4 w-4" />
            Now
          </CommandItem>
          <CommandItem
            onSelect={() =>
              run({
                kind: 'info',
                message:
                  'Build things you\'d want to use yourself. Ship, get feedback, iterate. Handle real-world messiness instead of pretending data is clean.',
              })
            }
          >
            <Quote className="h-4 w-4" />
            Philosophy
          </CommandItem>
          <CommandItem onSelect={() => run({ kind: 'info', message: pickHotTake() })}>
            <Flame className="h-4 w-4" />
            Random hot take
          </CommandItem>
          <CommandItem
            onSelect={() =>
              run({
                kind: 'info',
                message: 'Dallas, TX — open to remote, hybrid, and relocation.',
              })
            }
          >
            <Mountain className="h-4 w-4" />
            Location
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Shortcuts">
          <CommandItem disabled className="text-muted-foreground">
            <ArrowRight className="h-4 w-4" />
            Press ⇧ + letter anywhere for quick nav
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
