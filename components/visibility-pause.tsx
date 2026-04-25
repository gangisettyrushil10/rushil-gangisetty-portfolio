'use client'

import { useEffect } from 'react'

/**
 * Toggles a `tab-hidden` class on <html> while the document is in the
 * background, which CSS uses to pause aurora + starfield animations.
 * Frees background CPU on multi-tab users.
 */
export function VisibilityPause() {
  useEffect(() => {
    function sync() {
      if (typeof document === 'undefined') return
      const hidden = document.visibilityState === 'hidden'
      document.documentElement.classList.toggle('tab-hidden', hidden)
    }
    sync()
    document.addEventListener('visibilitychange', sync)
    return () => document.removeEventListener('visibilitychange', sync)
  }, [])
  return null
}
