'use client'

import { ArrowDown, ArrowUpRight, Mail, Radio, Sparkles } from 'lucide-react'
import { heroContent } from '@/lib/portfolio-content'
import { personalInfo } from '@/lib/data'
import { useObservation } from '@/components/observatory/observation-provider'
import { PlanetaryField } from '@/components/observatory/planetary-field'

export function PlanetaryHero() {
  const { isPetrova, signalRevealed, lumosActive, setMode } = useObservation()

  return (
    <section
      className="planetary-hero"
      aria-labelledby="hero-title"
    >
      <PlanetaryField className="planetary-field-canvas" />

      <div className="hero-vignette" aria-hidden="true" />

      <div className="petrova-hud" aria-hidden="true">
        <div className="petrova-hud-heading">
          <span>Petrova line</span>
          <span>Live spectral trace</span>
        </div>
        <div className="petrova-hud-ruler">
          {Array.from({ length: 11 }, (_, index) => (
            <span key={index} />
          ))}
        </div>
        <div className="petrova-hud-coordinates">
          <span>Δ FIELD / ACTIVE</span>
          <span>VECTOR LOCK / STABLE</span>
        </div>
      </div>

      <div className="hero-content shell-width">
        <div className="hero-signal-row">
          <span className="eyebrow-chip">
            <Radio size={13} aria-hidden="true" />
            {heroContent.eyebrow}
          </span>
          <div className="hero-mode-console">
            <span className="hero-mode-label">Live visual instrument</span>
            <div className="hero-mode-switch" role="group" aria-label="Choose background visualization">
              <button
                type="button"
                aria-pressed={!isPetrova}
                className={!isPetrova ? 'is-active' : undefined}
                onClick={() => setMode('adrian')}
              >
                Adrian atmosphere
              </button>
              <button
                type="button"
                aria-pressed={isPetrova}
                className={isPetrova ? 'is-active' : undefined}
                onClick={() => setMode('petrova')}
              >
                Petrova line
              </button>
            </div>
            <span className="hero-mode-readout" aria-live="polite">
              {isPetrova ? 'Spectral trace acquired' : 'Fluid atmosphere live'}
            </span>
          </div>
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

        <p className="hero-motion-note">
          {isPetrova
            ? 'Move through the field. The line instrument responds in real time.'
            : 'Move through the atmosphere. Adrian’s aurora curtains bend around you.'}
        </p>

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
