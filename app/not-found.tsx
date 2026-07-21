import Link from 'next/link'
import { Home } from 'lucide-react'
import { SiteFooter } from '@/components/observatory/site-footer'

export default function NotFound() {
  return (
    <main id="main-content" className="observatory-page min-h-screen bg-background pt-20">
      <section className="relative min-h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0 animated-gradient opacity-20" />
        <div className="absolute inset-0 grid-pattern opacity-20" />

        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
          <div className="route-enter">
            <h1 className="text-8xl sm:text-9xl font-bold text-primary mb-4">
              404
            </h1>

            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Page Not Found
            </h2>

            <p className="text-lg text-muted-foreground mb-8">
              Sorry, the page you're looking for doesn't exist or has been moved.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link className="button button-primary" href="/">
                <Home className="w-4 h-4" aria-hidden="true" />
                Go Home
              </Link>
              <Link className="button button-secondary" href="/projects">
                View Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
