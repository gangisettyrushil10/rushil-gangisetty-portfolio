import Link from 'next/link'
import { ArrowUp } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell-width">
        <p>Rushil Gangisetty <span>·</span> Software engineer <span>·</span> Dallas, Texas</p>
        <nav aria-label="Footer navigation">
          <Link href="/projects">Projects</Link>
          <Link href="/resume">Résumé</Link>
          <a href="#top">Return to orbit <ArrowUp size={13} aria-hidden="true" /></a>
        </nav>
      </div>
    </footer>
  )
}
