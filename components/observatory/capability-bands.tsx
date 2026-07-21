import Link from 'next/link'
import { ArrowUpRight, CircleDot } from 'lucide-react'
import { capabilities } from '@/lib/portfolio-content'

export function CapabilityBands() {
  return (
    <section className="capability-section section-pad" aria-labelledby="capabilities-title">
      <div className="shell-width">
        <header className="section-heading compact-heading">
          <div>
            <p className="section-eyebrow">Capability map / proof attached</p>
            <h2 id="capabilities-title">What I can help a team ship.</h2>
          </div>
        </header>

        <div className="capability-bands">
          {capabilities.map((capability, index) => (
            <article key={capability.title}>
              <div className="capability-number">0{index + 1}</div>
              <div className="capability-copy">
                <p className="capability-depth"><CircleDot size={12} aria-hidden="true" />{capability.depth}</p>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </div>
              <ul className="tool-cluster" aria-label={`${capability.title} tools`}>
                {capability.tools.map((tool) => <li key={tool}>{tool}</li>)}
              </ul>
              <div className="proof-links" aria-label={`${capability.title} proof`}>
                {capability.proof.map((proof) => (
                  <Link key={proof.href} href={proof.href}>
                    {proof.label}<ArrowUpRight size={13} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
