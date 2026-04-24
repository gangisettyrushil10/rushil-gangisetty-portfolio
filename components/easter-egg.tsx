'use client'

import { useEffect, useRef } from 'react'
import { toast } from 'sonner'

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
]

export function EasterEgg() {
  const index = useRef(0)

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === KONAMI[index.current]) {
        index.current++
        if (index.current === KONAMI.length) {
          index.current = 0
          toast('🏈 Hot take: the NFL is more entertaining than the NBA — and Buzzr\'s data proves it.', {
            duration: 5000,
            style: {
              background: 'rgba(5, 6, 10, 0.95)',
              border: '1px solid rgba(179, 71, 255, 0.35)',
              color: '#e8fff4',
              boxShadow: '0 0 18px rgba(179, 71, 255, 0.3)',
            },
          })
        }
      } else {
        index.current = e.key === KONAMI[0] ? 1 : 0
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return null
}
