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
              background: 'rgba(0, 0, 0, 0.9)',
              border: '1px solid rgba(67, 215, 255, 0.3)',
              color: '#fff',
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
