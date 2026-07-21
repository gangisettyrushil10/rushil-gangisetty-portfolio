'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react'
import { Telescope } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ObservationMode = 'adrian' | 'petrova'

type ObservationContextValue = {
  mode: ObservationMode
  isPetrova: boolean
  isReady: boolean
  explorationCount: number
  signalRevealed: boolean
  lumosActive: boolean
  setMode: (mode: ObservationMode) => void
  toggleMode: () => void
  activateLumos: () => void
}

const MODE_STORAGE_KEY = 'rushil.observation-mode'
const EXPLORATION_STORAGE_KEY = 'rushil.observation-explorations'
const SIGNAL_THRESHOLD = 4
const LUMOS_SEQUENCE = 'lumos'
const LUMOS_DURATION_MS = 6_000

const ObservationContext = createContext<ObservationContextValue | null>(null)

function isObservationMode(value: string | null | undefined): value is ObservationMode {
  return value === 'adrian' || value === 'petrova'
}

function readExplorationCount(value: string | null) {
  const parsed = Number.parseInt(value ?? '', 10)

  if (!Number.isFinite(parsed) || parsed < 0) {
    return 0
  }

  return Math.min(parsed, Number.MAX_SAFE_INTEGER)
}

function modeAnnouncement(mode: ObservationMode) {
  return mode === 'petrova'
    ? 'Petrova line mode active. Spectral instruments are tracing the signal.'
    : 'Planet Adrian mode active. Fluid atmospheric view restored.'
}

function applyModeToRoot(mode: ObservationMode) {
  document.documentElement.dataset.observation = mode
}

export function ObservationProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ObservationMode>('adrian')
  const [explorationCount, setExplorationCount] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const [lumosActive, setLumosActive] = useState(false)
  const [announcement, setAnnouncement] = useState('')

  const modeRef = useRef<ObservationMode>('adrian')
  const explorationCountRef = useRef(0)
  const typedSequenceRef = useRef('')
  const lumosTimeoutRef = useRef<number | null>(null)

  const activateLumos = useCallback(() => {
    const root = document.documentElement

    if (lumosTimeoutRef.current) {
      window.clearTimeout(lumosTimeoutRef.current)
    }

    root.dataset.lumos = 'true'
    setLumosActive(true)
    setAnnouncement('Lumos signal found. Observatory light amplified temporarily.')

    lumosTimeoutRef.current = window.setTimeout(() => {
      delete root.dataset.lumos
      setLumosActive(false)
      setAnnouncement('Observatory light returned to normal.')
      lumosTimeoutRef.current = null
    }, LUMOS_DURATION_MS)
  }, [])

  const setMode = useCallback((nextMode: ObservationMode) => {
    if (nextMode === modeRef.current) {
      return
    }

    const previousCount = explorationCountRef.current
    const nextCount = Math.min(previousCount + 1, Number.MAX_SAFE_INTEGER)
    const foundSignal = previousCount < SIGNAL_THRESHOLD && nextCount >= SIGNAL_THRESHOLD

    modeRef.current = nextMode
    explorationCountRef.current = nextCount
    applyModeToRoot(nextMode)
    setModeState(nextMode)
    setExplorationCount(nextCount)
    setAnnouncement(
      foundSignal
        ? `${modeAnnouncement(nextMode)} Curiosity acknowledged. Signal zero four acquired.`
        : modeAnnouncement(nextMode)
    )

    try {
      window.localStorage.setItem(MODE_STORAGE_KEY, nextMode)
      window.localStorage.setItem(EXPLORATION_STORAGE_KEY, String(nextCount))
    } catch {
      // The selection and exploration count still work for the current visit.
    }
  }, [])

  const toggleMode = useCallback(() => {
    const nextMode: ObservationMode = modeRef.current === 'adrian' ? 'petrova' : 'adrian'
    setMode(nextMode)
  }, [setMode])

  useLayoutEffect(() => {
    const bootMode = document.documentElement.dataset.observation
    let storedMode: ObservationMode = isObservationMode(bootMode) ? bootMode : 'adrian'
    let storedExplorationCount = 0

    try {
      const candidateMode = window.localStorage.getItem(MODE_STORAGE_KEY)
      storedMode = isObservationMode(candidateMode) ? candidateMode : 'adrian'
      storedExplorationCount = readExplorationCount(
        window.localStorage.getItem(EXPLORATION_STORAGE_KEY)
      )
    } catch {
      // Browser privacy settings can make localStorage unavailable. The in-memory mode still works.
    }

    modeRef.current = storedMode
    explorationCountRef.current = storedExplorationCount
    applyModeToRoot(storedMode)
    setModeState(storedMode)
    setExplorationCount(storedExplorationCount)
    setIsReady(true)

    return () => {
      if (lumosTimeoutRef.current) {
        window.clearTimeout(lumosTimeoutRef.current)
      }

      delete document.documentElement.dataset.observation
      delete document.documentElement.dataset.lumos
    }
  }, [])

  useEffect(() => {
    if (!isReady) {
      return
    }

    try {
      window.localStorage.setItem(MODE_STORAGE_KEY, mode)
    } catch {
      // Keep the preference in memory if localStorage is unavailable.
    }
  }, [isReady, mode])

  useEffect(() => {
    if (!isReady) {
      return
    }

    try {
      window.localStorage.setItem(EXPLORATION_STORAGE_KEY, String(explorationCount))
    } catch {
      // The exploration still unlocks for this visit when storage is unavailable.
    }
  }, [explorationCount, isReady])

  useEffect(() => {
    const syncStoredState = (event: StorageEvent) => {
      if (event.key === MODE_STORAGE_KEY) {
        const nextMode: ObservationMode = isObservationMode(event.newValue)
          ? event.newValue
          : 'adrian'

        modeRef.current = nextMode
        applyModeToRoot(nextMode)
        setModeState(nextMode)
      }

      if (event.key === EXPLORATION_STORAGE_KEY) {
        const nextCount = readExplorationCount(event.newValue)
        explorationCountRef.current = nextCount
        setExplorationCount(nextCount)
      }
    }

    window.addEventListener('storage', syncStoredState)
    return () => window.removeEventListener('storage', syncStoredState)
  }, [])

  useEffect(() => {
    const detectLumos = (event: KeyboardEvent) => {
      const target = event.target
      const isEditable =
        target instanceof HTMLElement &&
        (target.isContentEditable || target.matches('input, textarea, select'))

      if (
        event.defaultPrevented ||
        event.repeat ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        isEditable
      ) {
        typedSequenceRef.current = ''
        return
      }

      if (!/^[a-z]$/i.test(event.key)) {
        typedSequenceRef.current = ''
        return
      }

      typedSequenceRef.current = `${typedSequenceRef.current}${event.key.toLowerCase()}`.slice(
        -LUMOS_SEQUENCE.length
      )

      if (typedSequenceRef.current === LUMOS_SEQUENCE) {
        typedSequenceRef.current = ''
        activateLumos()
      }
    }

    window.addEventListener('keydown', detectLumos)
    return () => window.removeEventListener('keydown', detectLumos)
  }, [activateLumos])

  const value = useMemo<ObservationContextValue>(
    () => ({
      mode,
      isPetrova: mode === 'petrova',
      isReady,
      explorationCount,
      signalRevealed: explorationCount >= SIGNAL_THRESHOLD,
      lumosActive,
      setMode,
      toggleMode,
      activateLumos,
    }),
    [activateLumos, explorationCount, isReady, lumosActive, mode, setMode, toggleMode]
  )

  return (
    <ObservationContext.Provider value={value}>
      {children}
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>
    </ObservationContext.Provider>
  )
}

export function useObservation() {
  const context = useContext(ObservationContext)

  if (!context) {
    throw new Error('useObservation must be used inside an ObservationProvider.')
  }

  return context
}

export type ObservationToggleProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'aria-label' | 'aria-pressed' | 'children' | 'onClick' | 'type'
> & {
  onToggle?: () => void
}

export function ObservationToggle({ className, onToggle, ...props }: ObservationToggleProps) {
  const { isPetrova, signalRevealed, toggleMode } = useObservation()

  return (
    <button
      {...props}
      type="button"
      aria-pressed={isPetrova}
      onClick={() => {
        toggleMode()
        onToggle?.()
      }}
      className={cn(
        'group inline-flex min-h-11 items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.045] px-3 text-left text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors hover:border-cyan-200/25 hover:bg-white/[0.075] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#02070d]',
        className
      )}
    >
      <Telescope className="h-4 w-4 shrink-0 text-cyan-100/75" aria-hidden="true" />
      <span className="min-w-0 leading-none">
        <span className="block text-[0.6rem] font-mono uppercase tracking-[0.18em] text-white/45">
          Background instrument
        </span>
        <span className="mt-1 block truncate text-[0.72rem] font-medium tracking-wide text-white/88">
          Petrova line mode
          {signalRevealed && (
            <span className="ml-1.5 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-cyan-100/50">
              · Signal 04
            </span>
          )}
        </span>
      </span>
      <span
        aria-hidden="true"
        className={cn(
          'relative ml-auto h-5 w-9 shrink-0 rounded-full border transition-colors',
          isPetrova
            ? 'border-cyan-100/35 bg-cyan-100/15'
            : 'border-white/15 bg-black/35'
        )}
      >
        <span
          className={cn(
            'absolute left-0.5 top-0.5 h-3.5 w-3.5 rounded-full bg-white/80 transition-transform',
            isPetrova && 'translate-x-4 bg-cyan-100'
          )}
        />
      </span>
    </button>
  )
}
