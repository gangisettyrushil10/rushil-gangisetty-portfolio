'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'rushil:booted'

const ascii = `
 ____  _   _ ____  _   _ ___ _       ___  ____
|  _ \\| | | / ___|| | | |_ _| |     / _ \\/ ___|
| |_) | | | \\___ \\| |_| || || |    | | | \\___ \\
|  _ <| |_| |___) |  _  || || |___ | |_| |___) |
|_| \\_ \\___/|____/|_| |_|___|_____(_)___/|____/
`

const lines = [
  '[  OK  ] Mounting /home/rushil',
  '[  OK  ] Starting phosphor display driver',
  '[  OK  ] Loading basketball.sys',
  '[  OK  ] Calibrating telescope',
  '[  OK  ] Summoning patronus',
  '[  OK  ] Connecting to Dallas, TX',
  '[  OK  ] Portfolio.OS v1.0 ready',
  '',
  'Press ⌘K to search anywhere.',
  'Press ⇧B for the free-throw game.',
  'Type "lumos" in the palette for a surprise.',
]

export function BootSequence() {
  const [visible, setVisible] = useState<boolean | null>(null)
  const [typed, setTyped] = useState<string[]>([])

  useEffect(() => {
    const booted = typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY) === '1'
    if (booted) {
      setVisible(false)
      return
    }
    setVisible(true)

    let lineIdx = 0
    const interval = setInterval(() => {
      setTyped((prev) => [...prev, lines[lineIdx]])
      lineIdx += 1
      if (lineIdx >= lines.length) {
        clearInterval(interval)
        setTimeout(() => {
          setVisible(false)
          localStorage.setItem(STORAGE_KEY, '1')
        }, 900)
      }
    }, 160)

    // Allow skip on any key or click
    const skip = () => {
      clearInterval(interval)
      setVisible(false)
      localStorage.setItem(STORAGE_KEY, '1')
    }
    window.addEventListener('keydown', skip, { once: true })
    window.addEventListener('mousedown', skip, { once: true })

    return () => {
      clearInterval(interval)
      window.removeEventListener('keydown', skip)
      window.removeEventListener('mousedown', skip)
    }
  }, [])

  if (visible !== true) return null

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-background"
      style={{
        animation: 'boot-fadeout 500ms ease 3.5s forwards',
      }}
    >
      <div className="max-w-2xl w-full px-6 font-mono text-[13px] leading-6 text-phosphor">
        <pre className="whitespace-pre text-[10px] sm:text-[13px] leading-[1.1] text-phosphor mb-6 phosphor">
          {ascii}
        </pre>
        <div className="space-y-0.5">
          {typed.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
          {typed.length < lines.length && (
            <div className="text-phosphor-dim caret">&nbsp;</div>
          )}
        </div>
        <p className="mt-6 text-[10px] uppercase tracking-[0.22em] text-subtle-foreground">
          Press any key to skip
        </p>
      </div>

      <style>{`
        @keyframes boot-fadeout {
          to { opacity: 0; visibility: hidden; }
        }
      `}</style>
    </div>
  )
}
