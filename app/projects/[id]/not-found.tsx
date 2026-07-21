import Link from 'next/link'
import { ArrowLeft, Search } from 'lucide-react'
import { SiteFooter } from '@/components/observatory/site-footer'

export default function ProjectNotFound() {
  return (
    <main id="main-content" className="observatory-page min-h-screen bg-background pt-20">
      
      <section className="relative min-h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0 animated-gradient opacity-20" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        
        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
          <div className="route-enter">
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-secondary flex items-center justify-center">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Project Not Found
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              Sorry, the project you're looking for doesn't exist or may have been moved.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link className="button button-primary" href="/projects">
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                Back to Projects
              </Link>
              <Link className="button button-secondary" href="/">
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <SiteFooter />
    </main>
  )
}
