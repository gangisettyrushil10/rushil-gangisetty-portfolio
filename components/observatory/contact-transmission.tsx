import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react'
import { personalInfo } from '@/lib/data'

export function ContactTransmission() {
  return (
    <section id="contact" className="contact-section section-pad" aria-labelledby="contact-title">
      <div className="shell-width contact-panel">
        <div className="contact-copy">
          <p className="section-eyebrow">Open channel / Dallas, Texas</p>
          <h2 id="contact-title">Building something that needs product judgment and technical depth?</h2>
          <p>I’m looking for software engineering, applied AI, data, fintech, and intelligent-systems internship work. Send the problem, the team context, or simply a hello.</p>
        </div>
        <a className="contact-email" href={`mailto:${personalInfo.email}`}>
          <span>Transmit to</span>
          {personalInfo.email}
          <Mail aria-hidden="true" />
        </a>
        <div className="contact-links">
          <a href={personalInfo.github} target="_blank" rel="noreferrer"><Github aria-hidden="true" />GitHub<ArrowUpRight aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
          <a href={personalInfo.linkedin} target="_blank" rel="noreferrer"><Linkedin aria-hidden="true" />LinkedIn<ArrowUpRight aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
          <a href={personalInfo.resumePath}><span aria-hidden="true">CV</span>Résumé<ArrowUpRight aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  )
}
