'use client'

import { useRef, type CSSProperties, type PointerEvent } from 'react'
import { ArrowDown, ArrowUpRight, Mail, Radio, Sparkles } from 'lucide-react'
import { heroContent } from '@/lib/portfolio-content'
import { personalInfo } from '@/lib/data'
import { useObservation } from '@/components/observatory/observation-provider'

type HeroStyle = CSSProperties & {
  '--hero-x': string
  '--hero-y': string
}

export function PlanetaryHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { isPetrova, signalRevealed, lumosActive } = useObservation()

  function trackPointer(event: PointerEvent<HTMLElement>) {
    const bounds = sectionRef.current?.getBoundingClientRect()
    if (!bounds || event.pointerType === 'touch') return

    const x = ((event.clientX - bounds.left) / bounds.width - 0.5).toFixed(3)
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5).toFixed(3)
    sectionRef.current?.style.setProperty('--hero-x', x)
    sectionRef.current?.style.setProperty('--hero-y', y)
  }

  function resetPointer() {
    sectionRef.current?.style.setProperty('--hero-x', '0')
    sectionRef.current?.style.setProperty('--hero-y', '0')
  }

  return (
    <section
      ref={sectionRef}
      className="planetary-hero"
      style={{ '--hero-x': '0', '--hero-y': '0' } as HeroStyle}
      onPointerMove={trackPointer}
      onPointerLeave={resetPointer}
      aria-labelledby="hero-title"
    >
      <div className="hero-sky" aria-hidden="true">
        <span className="aurora aurora-one" />
        <span className="aurora aurora-two" />
        <span className="distant-moon" />
        <span className="petrova-orbit petrova-orbit-one" />
        <span className="petrova-orbit petrova-orbit-two" />
        <span className="petrova-reticle" />
      </div>

      <div className="hero-planet" aria-hidden="true">
        <span className="planet-cloud planet-cloud-one" />
        <span className="planet-cloud planet-cloud-two" />
        <span className="planet-glow" />
      </div>

      <div className="hero-content shell-width">
        <div className="hero-signal-row">
          <span className="eyebrow-chip">
            <Radio size={13} aria-hidden="true" />
            {heroContent.eyebrow}
          </span>
          <span className="hero-mode-readout" aria-live="polite">
            {isPetrova ? 'Petrova instruments online' : 'Planet Adrian atmosphere'}
          </span>
        </div>

        <p className="hero-kicker">{heroContent.role}</p>
        <h1 id="hero-title" className="hero-title">
          <span>Rushil</span>
          <span>Gangisetty</span>
        </h1>
        <p className="hero-proposition">{heroContent.proposition}</p>

        <div className="hero-actions" aria-label="Primary actions">
          <a className="button button-primary" href="#work">
            Enter the archive
            <ArrowDown size={17} aria-hidden="true" />
          </a>
          <a className="button button-secondary" href={personalInfo.resumePath}>
            Read résumé
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <a className="button button-quiet" href={`mailto:${personalInfo.email}`}>
            <Mail size={16} aria-hidden="true" />
            Start a transmission
          </a>
        </div>

        <div className="hero-availability">
          <span className="availability-pulse" aria-hidden="true" />
          <span>{heroContent.availability}</span>
        </div>

        {(signalRevealed || lumosActive) && (
          <p className="hero-secret" role="status">
            <Sparkles size={14} aria-hidden="true" />
            {lumosActive
              ? 'Lumos received. A little more light for the path ahead.'
              : 'Signal 04: curiosity is an engineering instrument.'}
          </p>
        )}
      </div>

      <a className="hero-scroll-cue" href="#work">
        <span>Scroll to descend</span>
        <ArrowDown size={14} aria-hidden="true" />
      </a>
    </section>
  )
}
