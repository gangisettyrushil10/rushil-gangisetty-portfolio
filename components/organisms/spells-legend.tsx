'use client'

import { useState } from 'react'
import { Sparkles } from 'lucide-react'

interface Spell {
  trigger: string
  label: string
  desc: string
  kind: 'key' | 'spell'
}

const SPELLS: Spell[] = [
  { trigger: '⌘K', label: 'search', desc: 'open the command palette', kind: 'key' },
  { trigger: '⇧B', label: '🏀 free throw', desc: 'shoot hoops mini-game', kind: 'key' },
  { trigger: '⇧H', label: 'home', desc: 'jump to /', kind: 'key' },
  { trigger: '⇧P', label: 'projects', desc: 'jump to /projects', kind: 'key' },
  { trigger: '⇧R', label: 'resume', desc: 'jump to /resume', kind: 'key' },
  { trigger: '⇧C', label: 'contact', desc: 'jump to /contact', kind: 'key' },
  { trigger: 'lumos', label: '⚡ light the wand', desc: 'flip to parchment theme', kind: 'spell' },
  { trigger: 'nox', label: '🌑 put it out', desc: 'revert to dark', kind: 'spell' },
  { trigger: 'accio', label: '📜 summon projects', desc: 'scroll to project rail', kind: 'spell' },
]

function openFreeThrow() {
  if (typeof window === 'undefined') return
  const event = new KeyboardEvent('keydown', { key: 'B', shiftKey: true, bubbles: true })
  window.dispatchEvent(event)
}

export function SpellsLegend() {
  const [highlighted, setHighlighted] = useState<string | null>(null)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-baseline justify-between">
        <p className="font-display text-[22px] text-phosphor">SPELLS &amp; CHEATS</p>
        <button
          type="button"
          onClick={openFreeThrow}
          className="btn-glow inline-flex items-center gap-2 rounded-md px-3 py-1 text-[11px] font-semibold"
        >
          <Sparkles className="h-3 w-3" />
          PLAY
        </button>
      </div>
      <p className="font-mono text-[11px] text-subtle-foreground">
        Type the spells anywhere on the site. No need to focus a field — they just work.
      </p>

      <ul className="mt-1 grid gap-1.5">
        {SPELLS.map((s) => (
          <li
            key={s.trigger}
            onMouseEnter={() => setHighlighted(s.trigger)}
            onMouseLeave={() => setHighlighted(null)}
            className="flex items-center gap-3 rounded-sm border border-dashed border-(--pill-border) bg-bg-card-muted px-3 py-1.5 transition-colors"
            style={{
              borderColor:
                highlighted === s.trigger
                  ? s.kind === 'spell'
                    ? 'var(--crt-amber)'
                    : 'var(--phosphor)'
                  : undefined,
            }}
          >
            <kbd
              className={
                s.kind === 'spell'
                  ? 'kbd min-w-[56px] px-2 text-[color:var(--crt-amber)]'
                  : 'kbd min-w-[32px] px-2'
              }
              style={s.kind === 'spell' ? { color: 'var(--crt-amber)' } : undefined}
            >
              {s.trigger}
            </kbd>
            <span className="flex-1 font-mono text-[12px] text-foreground">{s.label}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle-foreground">
              {s.desc}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
