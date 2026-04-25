'use client'

import { useEffect, useRef } from 'react'

/**
 * @deprecated Use the `<Reveal>` / `<RevealGroup>` components from
 * components/ui/reveal.tsx instead. Those are now built on framer-motion
 * springs. This hook is kept only for the dashed-divider entrance.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('in-view')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '-10% 0px -10% 0px', threshold: 0.05, ...options }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [options])

  return ref
}
