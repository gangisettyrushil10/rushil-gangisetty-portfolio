'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { personalInfo } from '@/lib/data'

export function useKeyboardShortcuts() {
  const router = useRouter()

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (!e.shiftKey) return

      const key = e.key.toUpperCase()

      switch (key) {
        case 'H':
          e.preventDefault()
          router.push('/')
          break
        case 'P':
          e.preventDefault()
          router.push('/projects')
          break
        case 'R':
          e.preventDefault()
          router.push('/resume')
          break
        case 'C':
          e.preventDefault()
          router.push('/contact')
          break
        case 'L':
          e.preventDefault()
          window.open(personalInfo.linkedin, '_blank', 'noopener,noreferrer')
          break
        case 'G':
          e.preventDefault()
          window.open(personalInfo.github, '_blank', 'noopener,noreferrer')
          break
        case 'M':
          e.preventDefault()
          window.location.href = `mailto:${personalInfo.email}`
          break
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [router])
}
