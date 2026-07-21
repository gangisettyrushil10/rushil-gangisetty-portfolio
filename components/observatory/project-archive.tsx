import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Database, FileCheck2, Fingerprint, GitBranch, ShieldCheck } from 'lucide-react'
import { featuredProjectIds, supportingProjectIds } from '@/lib/portfolio-content'
import { projects, type Project } from '@/lib/data'

const featuredProjects = featuredProjectIds
  .map((id) => projects.find((project) => project.id === id))
  .filter((project): project is Project => Boolean(project))

const supportingProjects = supportingProjectIds
  .map((id) => projects.find((project) => project.id === id))
  .filter((project): project is Project => Boolean(project))

function ProjectFacts({ project }: { project: Project }) {
  return (
    <dl className="project-facts">
      {project.metrics.slice(0, 4).map((metric) => (
        <div key={metric.label}>
          <dt>{metric.label}</dt>
          <dd>{metric.value}</dd>
        </div>
      ))}
    </dl>
  )
}

function ProjectLinks({ project }: { project: Project }) {
  const evidence = project.links?.[0]

  return (
    <div className="project-actions">
      <Link className="text-link" href={`/projects/${project.id}`}>
        Read the case study
        <ArrowUpRight size={15} aria-hidden="true" />
      </Link>
      {evidence && (
        <a className="text-link text-link-muted" href={evidence.href} target="_blank" rel="noreferrer">
          {evidence.label}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      )}
    </div>
  )
}

function ProjectCopy({ project, index }: { project: Project; index: number }) {
  return (
    <div className="project-copy">
      <p className="section-index">0{index + 1} / field record</p>
      <p className="project-category">{project.category}</p>
      <h3>{project.title}</h3>
      <p className="project-lede">{project.description}</p>
      <p className="project-proof">{project.proofLine}</p>
      <ProjectFacts project={project} />
      <ul className="decision-list" aria-label={`${project.title} engineering decisions`}>
        {project.decisions.slice(0, 2).map((decision) => (
          <li key={decision}>{decision}</li>
        ))}
      </ul>
      <ProjectLinks project={project} />
    </div>
  )
}

function LedgerArchitecture() {
  return (
    <figure className="ledger-diagram" aria-labelledby="ledger-diagram-caption">
      <div className="ledger-node ledger-input"><FileCheck2 aria-hidden="true" /><span>Validate request</span></div>
      <span className="ledger-arrow" aria-hidden="true">→</span>
      <div className="ledger-node"><Fingerprint aria-hidden="true" /><span>Resolve idempotency key</span></div>
      <span className="ledger-arrow" aria-hidden="true">→</span>
      <div className="ledger-node"><ShieldCheck aria-hidden="true" /><span>Apply balance rule</span></div>
      <span className="ledger-arrow" aria-hidden="true">→</span>
      <div className="ledger-node"><Database aria-hidden="true" /><span>Persist + audit</span></div>
      <div className="ledger-branch"><GitBranch aria-hidden="true" /><span>Replay returns the original transaction; rejected operations remain visible.</span></div>
      <figcaption id="ledger-diagram-caption">
        Request-path diagram derived from the public service and repository flow — explanatory architecture, not a fabricated interface.
      </figcaption>
    </figure>
  )
}

function FuzzyVisual({ project }: { project: Project }) {
  const [cover, workflow] = project.gallery ?? []

  return (
    <div className="fuzzy-visual project-visual-frame">
      {cover?.src && (
        <figure className="fuzzy-main-shot">
          <Image src={cover.src} alt={cover.alt} fill sizes="(max-width: 900px) 94vw, 58vw" priority className="project-image" />
          <figcaption>{cover.caption}</figcaption>
        </figure>
      )}
      {workflow?.src && (
        <figure className="fuzzy-inset-shot">
          <Image src={workflow.src} alt={workflow.alt} fill sizes="(max-width: 700px) 44vw, 22vw" className="project-image" />
          <figcaption className="sr-only">{workflow.caption}</figcaption>
        </figure>
      )}
      {project.video?.src && (
        <details className="recording-drawer">
          <summary>Play real local workflow <span>00:12</span></summary>
          <video controls muted playsInline preload="none" poster={project.video.poster} aria-label={project.video.title}>
            <source src={project.video.src} type="video/mp4" />
            Your browser does not support embedded video. The screenshots above show the same workflow.
          </video>
          <p>{project.video.caption}</p>
        </details>
      )}
    </div>
  )
}

function BuzzrVisual({ project }: { project: Project }) {
  return (
    <div className="buzzr-visual" aria-label="Genuine Buzzr mobile captures">
      {(project.gallery ?? []).map((item, index) => item.src && (
        <figure className={`phone-frame phone-frame-${index + 1}`} key={item.src}>
          <Image src={item.src} alt={item.alt} fill sizes="(max-width: 700px) 43vw, 21vw" className="phone-image" />
          <figcaption className="sr-only">{item.caption}</figcaption>
        </figure>
      ))}
      <div className="buzzr-caption">
        <span>Realtime product surface</span>
        <strong>Live state stays inspectable.</strong>
        <p>Direct captures from the current mobile workflow; no invented launch metrics or fake App Store chrome.</p>
      </div>
    </div>
  )
}

function AnalyticsVisual({ project }: { project: Project }) {
  const image = project.gallery?.[0]
  if (!image?.src) return null

  return (
    <figure className="analytics-visual project-visual-frame">
      <div className="analytics-window-bar" aria-hidden="true"><i /><i /><i /><span>validation / transform preview</span></div>
      <div className="analytics-image-wrap">
        <Image src={image.src} alt={image.alt} fill sizes="(max-width: 900px) 94vw, 54vw" className="project-image project-image-contain" />
      </div>
      <figcaption>{image.caption}</figcaption>
    </figure>
  )
}

function ProjectVisual({ project }: { project: Project }) {
  if (project.id === 'fuzzy') return <FuzzyVisual project={project} />
  if (project.id === 'buzzr') return <BuzzrVisual project={project} />
  if (project.id === 'credit-union-ledger-api') return <LedgerArchitecture />
  return <AnalyticsVisual project={project} />
}

export function ProjectArchive() {
  return (
    <section id="work" className="archive-section section-pad" aria-labelledby="work-title">
      <div className="shell-width">
        <header className="section-heading archive-heading">
          <div>
            <p className="section-eyebrow">Selected work / four primary records</p>
            <h2 id="work-title">Systems with the seams left visible.</h2>
          </div>
          <p>
            Each record starts with the product problem, then opens the architecture, evidence, limitations, and next move.
          </p>
        </header>

        <div className="project-chapters">
          {featuredProjects.map((project, index) => (
            <article key={project.id} className={`project-chapter project-chapter-${project.id}`}>
              <ProjectCopy project={project} index={index} />
              <ProjectVisual project={project} />
            </article>
          ))}
        </div>

        <div className="supporting-work">
          <div className="supporting-intro">
            <p className="section-eyebrow">Supporting transmissions</p>
            <h3>Smaller experiments, useful edges.</h3>
          </div>
          <div className="supporting-grid">
            {supportingProjects.map((project, index) => (
              <article key={project.id}>
                <span>0{index + 5}</span>
                <p>{project.category}</p>
                <h4>{project.title}</h4>
                <p>{project.description}</p>
                <ul aria-label={`${project.title} stack`}>
                  {project.stack.slice(0, 4).map((item) => <li key={item}>{item}</li>)}
                </ul>
                <Link className="text-link" href={`/projects/${project.id}`}>
                  Open record <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
          <Link className="button button-secondary archive-all-link" href="/projects">
            Browse every project <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
