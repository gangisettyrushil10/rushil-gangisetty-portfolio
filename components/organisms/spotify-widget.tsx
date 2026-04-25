'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Music, X } from 'lucide-react'
import { useEffect, useState } from 'react'

// Swap in your own playlist — the ID is the segment after `/playlist/`
// in any Spotify URL: https://open.spotify.com/playlist/{ID}
// Default is Spotify's official "Synthwave" radio because it fits the
// CRT / phosphor aesthetic.
const SPOTIFY_PLAYLIST_ID = '37i9dQZF1DX5Q27plkaOQ3'

const STORAGE_KEY = 'rushil:spotify-open'

export function SpotifyWidget() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      if (localStorage.getItem(STORAGE_KEY) === '1') setOpen(true)
    } catch {
      /* ignore */
    }
  }, [])

  function toggle() {
    setOpen((prev) => {
      const next = !prev
      try {
        localStorage.setItem(STORAGE_KEY, next ? '1' : '0')
      } catch {
        /* ignore */
      }
      return next
    })
  }

  if (!mounted) return null

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-2">
      <AnimatePresence>
        {open && (
          <motion.div
            key="spotify-embed"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="overflow-hidden rounded-xl border border-(--pill-border) bg-bg-card shadow-[0_0_30px_rgba(179,71,255,0.25)]"
          >
            <iframe
              title="Rushil's vibe"
              src={`https://open.spotify.com/embed/playlist/${SPOTIFY_PLAYLIST_ID}?utm_source=generator&theme=0`}
              width="320"
              height="152"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style={{ display: 'block', border: 0 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={toggle}
        className="flex items-center gap-2 rounded-full border border-(--pill-border) bg-bg-card px-3 py-2 text-foreground shadow-[0_0_18px_rgba(179,71,255,0.18)] transition hover:border-(--phosphor)"
        aria-label={open ? 'Close player' : 'Open music player'}
      >
        {open ? (
          <X className="h-4 w-4 text-phosphor" />
        ) : (
          <Music className="h-4 w-4 text-phosphor" />
        )}
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {open ? 'Close' : 'Vibe'}
        </span>
        {!open && <SpotifyEqualizer />}
      </button>
    </div>
  )
}

function SpotifyEqualizer() {
  return (
    <span className="ml-0.5 inline-flex items-end gap-[2px]" aria-hidden>
      <span className="eq-bar eq-1" />
      <span className="eq-bar eq-2" />
      <span className="eq-bar eq-3" />
    </span>
  )
}
