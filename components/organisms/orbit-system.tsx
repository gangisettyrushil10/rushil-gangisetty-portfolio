'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, type CSSProperties } from 'react'
import { ArrowUpRight, Pause, Play } from 'lucide-react'
import { projects, type Project } from '@/lib/data'

const featured = projects.filter((p) => p.featured).slice(0, 5)

interface OrbitConfig {
  radius: number
  duration: number
  size: number
  startDeg: number
}

const orbits: OrbitConfig[] = [
  { radius: 110, duration: 26, size: 56, startDeg: 0 },
  { radius: 170, duration: 42, size: 64, startDeg: 72 },
  { radius: 230, duration: 60, size: 58, startDeg: 144 },
  { radius: 280, duration: 78, size: 68, startDeg: 216 },
  { radius: 330, duration: 96, size: 60, startDeg: 288 },
]

export function OrbitSystem() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [allPaused, setAllPaused] = useState(false)

  return (
    <div className="orbit-wrap">
      {/* Pause/play control */}
      <button
        type="button"
        onClick={() => setAllPaused((p) => !p)}
        className="orbit-control"
        aria-label={allPaused ? 'Resume orbits' : 'Pause orbits'}
      >
        {allPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
        <span>{allPaused ? 'Resume' : 'Pause'} orbits</span>
      </button>

      <div className="orbit-stage">
        {/* Orbital ring guides */}
        {orbits.map((o, i) => (
          <div
            key={`ring-${i}`}
            className="orbit-ring"
            style={{ width: o.radius * 2, height: o.radius * 2 }}
          />
        ))}

        {/* Sun */}
        <div className="orbit-sun-wrap">
          <div className="orbit-sun-glow" />
          <div className="orbit-sun-core">
            <span className="orbit-sun-label">RG</span>
            <span className="orbit-sun-os">.OS</span>
          </div>
        </div>

        {/* Planets */}
        {featured.map((project, i) => (
          <Planet
            key={project.id}
            project={project}
            orbit={orbits[i]}
            paused={allPaused || hoveredId === project.id}
            onHover={() => setHoveredId(project.id)}
            onLeave={() => setHoveredId(null)}
            isHovered={hoveredId === project.id}
          />
        ))}
      </div>

      {/* Hovered project meta — bottom legend */}
      <div className="orbit-legend">
        {hoveredId ? (
          <HoveredMeta project={featured.find((p) => p.id === hoveredId)!} />
        ) : (
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-subtle-foreground">
            hover a planet to inspect · click to land
          </p>
        )}
      </div>

      {/* Mobile fallback */}
      <ul className="orbit-mobile-list">
        {featured.map((project) => (
          <li key={`m-${project.id}`}>
            <Link
              href={`/projects/${project.id}`}
              className="orbit-mobile-card"
              style={
                {
                  '--project-primary': project.theme?.primary ?? '#b347ff',
                } as CSSProperties
              }
            >
              <div className="orbit-mobile-disc">
                {project.gallery?.[0]?.src ? (
                  <Image
                    src={project.gallery[0].src}
                    alt={project.gallery[0].alt}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                ) : (
                  <span className="text-xs font-mono text-subtle-foreground">{project.title.slice(0, 2)}</span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="section-label">{project.category}</p>
                <p className="mt-1 truncate text-sm font-semibold text-foreground">{project.title}</p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">{project.description}</p>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

interface PlanetProps {
  project: Project
  orbit: OrbitConfig
  paused: boolean
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}

function Planet({ project, orbit, paused, isHovered, onHover, onLeave }: PlanetProps) {
  const preview = project.gallery?.find((g) => g.src)
  const animationDelay = -(orbit.startDeg / 360) * orbit.duration

  const trackStyle: CSSProperties = {
    animation: `orbit-spin ${orbit.duration}s linear infinite`,
    animationDelay: `${animationDelay}s`,
    animationPlayState: paused ? 'paused' : 'running',
  }

  const counterStyle: CSSProperties = {
    animation: `orbit-counter ${orbit.duration}s linear infinite`,
    animationDelay: `${animationDelay}s`,
    animationPlayState: paused ? 'paused' : 'running',
    width: orbit.size,
    height: orbit.size,
    marginTop: -orbit.size / 2,
    marginLeft: -orbit.size / 2,
  }

  const planetStyle: CSSProperties = {
    '--project-primary': project.theme?.primary ?? '#b347ff',
  } as CSSProperties

  return (
    <div className="orbit-track" style={trackStyle}>
      <div
        className="orbit-planet-anchor"
        style={{
          left: orbit.radius,
        }}
      >
        <div className="orbit-planet-counter" style={counterStyle}>
          <Link
            href={`/projects/${project.id}`}
            className={`orbit-planet${isHovered ? ' is-hovered' : ''}`}
            style={planetStyle}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            onFocus={onHover}
            onBlur={onLeave}
            aria-label={`${project.title} — ${project.category}`}
          >
            {preview?.src ? (
              <Image
                src={preview.src}
                alt={preview.alt}
                fill
                sizes="80px"
                className="orbit-planet-img object-cover"
              />
            ) : (
              <span className="orbit-planet-fallback">{project.title.slice(0, 2)}</span>
            )}
            <span className="orbit-planet-pulse" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  )
}

function HoveredMeta({ project }: { project: Project }) {
  return (
    <div className="orbit-meta">
      <div className="flex items-center gap-2">
        <span className="section-label">{project.category}</span>
        <span className="font-mono text-[11px] text-subtle-foreground">{project.timeline}</span>
      </div>
      <p className="mt-1 text-base font-semibold text-foreground sm:text-lg">{project.title}</p>
      <p className="mt-1 text-sm leading-6 text-muted-foreground">{project.description}</p>
    </div>
  )
}
