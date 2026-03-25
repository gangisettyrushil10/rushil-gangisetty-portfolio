'use client'

import { useCallback, useRef, useState, type ReactNode } from 'react'

interface AuroraBackgroundProps {
  children: ReactNode
  className?: string
}

const blobs = [
  { color: 'rgba(67, 215, 255, 0.18)', size: 400, offsetFactor: 0.06 },
  { color: 'rgba(157, 140, 255, 0.14)', size: 350, offsetFactor: -0.04 },
  { color: 'rgba(255, 108, 171, 0.12)', size: 380, offsetFactor: 0.05 },
]

export function AuroraBackground({ children, className }: AuroraBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })
  const rafRef = useRef<number>(0)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (rafRef.current) return

    rafRef.current = requestAnimationFrame(() => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) { rafRef.current = 0; return }

      setMouse({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      })
      rafRef.current = 0
    })
  }, [])

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden ${className ?? ''}`}
    >
      {/* Aurora blobs */}
      {blobs.map((blob, i) => {
        const translateX = (mouse.x - 0.5) * blob.size * blob.offsetFactor * 10
        const translateY = (mouse.y - 0.5) * blob.size * blob.offsetFactor * 10
        const baseX = i === 0 ? '20%' : i === 1 ? '70%' : '45%'
        const baseY = i === 0 ? '30%' : i === 1 ? '20%' : '65%'

        return (
          <div
            key={i}
            className="pointer-events-none absolute rounded-full"
            style={{
              width: blob.size,
              height: blob.size,
              left: baseX,
              top: baseY,
              background: `radial-gradient(circle, ${blob.color}, transparent 70%)`,
              transform: `translate(-50%, -50%) translate(${translateX}px, ${translateY}px)`,
              transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              filter: 'blur(60px)',
            }}
          />
        )
      })}

      {/* Existing grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
