import Image from 'next/image'
import { BookOpen, Compass, MapPin, Telescope } from 'lucide-react'
import { aboutSection } from '@/lib/data'
import { personalSignals } from '@/lib/portfolio-content'

const signalIcons = [BookOpen, Compass, Telescope, BookOpen]

export function AboutObservatory() {
  return (
    <section id="about" className="about-section section-pad" aria-labelledby="about-title">
      <div className="shell-width about-grid">
        <div className="portrait-column">
          <figure className="portrait-frame">
            <Image
              src={aboutSection.portraitSrc}
              alt={aboutSection.portraitAlt}
              fill
              sizes="(max-width: 780px) 86vw, 35vw"
              className="portrait-image"
            />
            <span className="portrait-coordinate"><MapPin size={13} aria-hidden="true" />Dallas, Texas</span>
          </figure>
          <div className="portrait-note">
            <span>Operator profile</span>
            <p>Computer science + mathematics. Product curiosity with a backend habit.</p>
          </div>
        </div>

        <div className="about-copy">
          <p className="section-eyebrow">About the operator</p>
          <h2 id="about-title">{aboutSection.title}</h2>
          <div className="about-prose">
            {aboutSection.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <dl className="about-highlights">
            {aboutSection.highlights.map((highlight) => (
              <div key={highlight.label}>
                <dt>{highlight.label}</dt>
                <dd>{highlight.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="shell-width signal-grid" aria-label="Personal interests">
        {personalSignals.map((signal, index) => {
          const Icon = signalIcons[index] ?? Compass
          return (
            <article key={signal.label}>
              <span className="signal-icon"><Icon aria-hidden="true" /></span>
              <p>{signal.label}</p>
              <h3>{signal.title}</h3>
              <span>{signal.note}</span>
            </article>
          )
        })}
      </div>
    </section>
  )
}
