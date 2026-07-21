'use client'

import { useState } from 'react'
import { ExternalLink, Headphones, Play } from 'lucide-react'
import { focusPlaylist } from '@/lib/portfolio-content'

export function SoundtrackCapsule() {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <aside className="soundtrack-capsule" aria-labelledby="soundtrack-title">
      <div className="vinyl-orbit" aria-hidden="true"><span /></div>
      <div className="soundtrack-copy">
        <p><Headphones size={14} aria-hidden="true" />Current focus frequency</p>
        <h2 id="soundtrack-title">{focusPlaylist.title}</h2>
        <span>Curated by {focusPlaylist.curator}</span>
        <small>{focusPlaylist.note}</small>
      </div>
      {!isLoaded ? (
        <button type="button" className="button button-primary" onClick={() => setIsLoaded(true)}>
          <Play size={16} fill="currentColor" aria-hidden="true" />Tune in
        </button>
      ) : (
        <iframe
          className="spotify-frame"
          src={focusPlaylist.embedUrl}
          title={`${focusPlaylist.title} playlist on Spotify`}
          width="100%"
          height="152"
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        />
      )}
      <a href={focusPlaylist.url} target="_blank" rel="noreferrer" className="soundtrack-link">
        Open in Spotify <ExternalLink size={13} aria-hidden="true" />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </aside>
  )
}
