'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'

interface AuroraBackgroundProps {
  children: ReactNode
  className?: string
}

interface WaveConfig {
  color: string
  top: string
  height: string
  mouseInfluence: number
  opacity: number
  hueShift: number
  speedMult: number
}

const waves: WaveConfig[] = [
  { color: 'rgba(67, 215, 255, 0.15)', top: '10%', height: '45%', mouseInfluence: 30, opacity: 0.8, hueShift: 0, speedMult: 1.0 },
  { color: 'rgba(157, 140, 255, 0.12)', top: '25%', height: '40%', mouseInfluence: -20, opacity: 0.7, hueShift: 40, speedMult: 0.85 },
  { color: 'rgba(255, 108, 171, 0.10)', top: '15%', height: '50%', mouseInfluence: 25, opacity: 0.6, hueShift: 80, speedMult: 1.15 },
  { color: 'rgba(104, 247, 196, 0.08)', top: '30%', height: '35%', mouseInfluence: -15, opacity: 0.5, hueShift: 120, speedMult: 0.7 },
]

function generateWavePath(offset: number): string {
  const points: string[] = []
  const steps = 40

  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * 100
    const y = 30 + Math.sin((i / steps) * Math.PI * 3 + offset) * 18
      + Math.sin((i / steps) * Math.PI * 1.5 + offset * 0.7) * 10
    points.push(`${x}% ${y}%`)
  }

  for (let i = steps; i >= 0; i--) {
    const x = (i / steps) * 100
    const y = 70 + Math.sin((i / steps) * Math.PI * 2.5 + offset + 1) * 15
      + Math.sin((i / steps) * Math.PI * 1.8 + offset * 0.5) * 8
    points.push(`${x}% ${y}%`)
  }

  return `polygon(${points.join(', ')})`
}

export function AuroraBackground({ children, className }: AuroraBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mouseX, setMouseX] = useState(0.5)
  const rafRef = useRef<number>(0)
  const [wavePaths, setWavePaths] = useState(() =>
    waves.map((_, i) => generateWavePath(i * 0.9))
  )

  // Animate wave paths at ~20fps
  useEffect(() => {
    let t = 0
    const interval = setInterval(() => {
      t += 0.012
      setWavePaths(
        waves.map((w, i) =>
          generateWavePath(t * w.speedMult + i * 0.9)
        )
      )
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (rect) {
        setMouseX((e.clientX - rect.left) / rect.width)
      }
      rafRef.current = 0
    })
  }, [])

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden ${className ?? ''}`}
    >
      {/* Aurora wave bands */}
      {waves.map((wave, i) => {
        const mouseOffset = (mouseX - 0.5) * wave.mouseInfluence
        return (
          <div
            key={i}
            className="pointer-events-none absolute"
            style={{
              top: wave.top,
              left: '-20%',
              width: '140%',
              height: wave.height,
              background: `linear-gradient(90deg, transparent 0%, ${wave.color} 20%, ${wave.color} 50%, ${wave.color} 80%, transparent 100%)`,
              clipPath: wavePaths[i],
              transform: `translateX(${mouseOffset}px)`,
              transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              opacity: wave.opacity,
              filter: `blur(40px) hue-rotate(${wave.hueShift + (mouseX - 0.5) * 30}deg)`,
              mixBlendMode: 'screen' as const,
            }}
          />
        )
      })}

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 grid-pattern opacity-12 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
