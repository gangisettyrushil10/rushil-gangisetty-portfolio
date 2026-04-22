'use client'

import { useEffect, useRef } from 'react'
import { toast } from 'sonner'

const SPELLS = ['lumos', 'nox', 'accio'] as const
const MAX_BUFFER = 8

export function SpellSystem() {
  const buffer = useRef<string>('')
  const wandTimerRef = useRef<number | null>(null)

  useEffect(() => {
    function castLumos() {
      const html = document.documentElement
      html.classList.add('lumos')
      toast('✨ Lumos. Type "nox" to revert.', { duration: 3500 })
      startWandTrail()
    }

    function castNox() {
      const html = document.documentElement
      if (!html.classList.contains('lumos')) return
      html.classList.remove('lumos')
      toast('🌑 Nox.', { duration: 2000 })
      stopWandTrail()
    }

    function castAccio() {
      const el = document.querySelector('#projects, [data-accio="projects"]')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        toast('📜 Accio projects!', { duration: 2000 })
      } else {
        window.location.href = '/projects'
      }
    }

    function startWandTrail() {
      stopWandTrail()
      const listener = (e: MouseEvent) => spawnWandDot(e.clientX, e.clientY)
      window.addEventListener('mousemove', listener)
      wandTimerRef.current = window.setTimeout(() => {
        window.removeEventListener('mousemove', listener)
        wandTimerRef.current = null
      }, 4500)
    }

    function stopWandTrail() {
      if (wandTimerRef.current != null) {
        window.clearTimeout(wandTimerRef.current)
        wandTimerRef.current = null
      }
    }

    function spawnWandDot(x: number, y: number) {
      const dot = document.createElement('span')
      dot.className = 'wand-dot'
      dot.style.left = `${x}px`
      dot.style.top = `${y}px`
      document.body.appendChild(dot)
      window.setTimeout(() => dot.remove(), 700)
    }

    function onKeyDown(e: KeyboardEvent) {
      // Don't hijack real typing in form fields
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.getAttribute('contenteditable') === 'true')
      ) {
        // Exception: let spells still cast from the command palette input (cmdk uses input)
        const cmdkInput = target.closest('[cmdk-input]')
        if (!cmdkInput) return
      }

      if (e.key.length !== 1 || e.metaKey || e.ctrlKey || e.altKey) {
        // Handle special: Escape clears buffer
        if (e.key === 'Escape') buffer.current = ''
        return
      }

      buffer.current = (buffer.current + e.key.toLowerCase()).slice(-MAX_BUFFER)

      for (const spell of SPELLS) {
        if (buffer.current.endsWith(spell)) {
          buffer.current = ''
          if (spell === 'lumos') castLumos()
          else if (spell === 'nox') castNox()
          else if (spell === 'accio') castAccio()
          break
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      stopWandTrail()
    }
  }, [])

  return null
}
