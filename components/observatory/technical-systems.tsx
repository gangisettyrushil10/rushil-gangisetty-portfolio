import { ArrowRight, ArrowUpRight, Box, Braces, Cpu, Database, LockKeyhole } from 'lucide-react'
import { systemDossiers } from '@/lib/portfolio-content'

const icons = [Box, LockKeyhole, Database]

export function TechnicalSystems() {
  return (
    <section id="systems" className="systems-section section-pad" aria-labelledby="systems-title">
      <div className="shell-width">
        <header className="section-heading">
          <div>
            <p className="section-eyebrow">Technical dossiers / decisions over decoration</p>
            <h2 id="systems-title">How the machinery is arranged.</h2>
          </div>
          <p>Three compact diagrams trace the boundary or write path that matters most. The public source is linked beside every claim.</p>
        </header>

        <div className="dossier-stack">
          {systemDossiers.map((dossier, dossierIndex) => (
            <article className="system-dossier" key={dossier.id}>
              <div className="dossier-copy">
                <p className="section-eyebrow">{dossier.eyebrow}</p>
                <h3>{dossier.title}</h3>
                <p>{dossier.description}</p>
                <blockquote>{dossier.decision}</blockquote>
                <a className="text-link" href={dossier.evidenceHref} target="_blank" rel="noreferrer">
                  {dossier.evidenceLabel}
                  <ArrowUpRight size={15} aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
              <div className="system-map" role="img" aria-label={`${dossier.title} Architecture flow`}>
                <span className="map-scanline" aria-hidden="true" />
                {dossier.nodes.map((node, index) => {
                  const Icon = icons[(index + dossierIndex) % icons.length] ?? Cpu
                  return (
                    <div className="system-map-segment" key={node.label}>
                      <div className="system-map-node">
                        <span><Icon aria-hidden="true" /></span>
                        <strong>{node.label}</strong>
                        <p>{node.detail}</p>
                      </div>
                      {index < dossier.nodes.length - 1 && (
                        <ArrowRight className="system-map-arrow" aria-hidden="true" />
                      )}
                    </div>
                  )
                })}
                <div className="map-status"><Braces aria-hidden="true" /><span>Inspectable path · explicit boundary</span></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
