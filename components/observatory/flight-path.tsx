import { education, educationHighlights, experiences } from '@/lib/data'

export function FlightPath() {
  return (
    <section className="flight-section section-pad" aria-labelledby="flight-title">
      <div className="shell-width flight-grid">
        <header className="flight-heading">
          <p className="section-eyebrow">Flight path / work + education</p>
          <h2 id="flight-title">A trajectory built through shipping, debugging, and teaching.</h2>
          <p>From SaaS and model-output repair to IoT integration testing, then into graduate computer science work beginning August 2026.</p>
        </header>

        <div className="timeline" aria-label="Experience timeline">
          {experiences.map((experience, index) => (
            <article key={`${experience.company}-${experience.role}`}>
              <div className="timeline-marker" aria-hidden="true"><span>0{index + 1}</span></div>
              <div className="timeline-meta"><span>{experience.period}</span><p>{experience.company}</p></div>
              <div className="timeline-body">
                <h3>{experience.role}</h3>
                <ul>{experience.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                {experience.stack && <p className="timeline-stack">{experience.stack.join(' · ')}</p>}
              </div>
            </article>
          ))}
        </div>

        <div className="education-panel">
          <p className="section-eyebrow">Academic vector</p>
          {education.map((entry) => (
            <article key={entry.school}>
              <span>{entry.period}</span>
              <h3>{entry.school}</h3>
              <p>{entry.degree}</p>
              {entry.note && <small>{entry.note}</small>}
            </article>
          ))}
          <div className="education-details">
            {educationHighlights.map((highlight) => (
              <div key={highlight.title}><span>{highlight.title}</span><p>{highlight.items.join(' · ')}</p></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
