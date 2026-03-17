import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/home/hero'
import { SignalRail } from '@/components/home/signal-rail'
import { FocusAreas } from '@/components/home/focus-areas'
import { FeaturedProjects } from '@/components/home/featured-projects'
import { Skills } from '@/components/home/skills'
import { Experience } from '@/components/home/experience'
import { RecruiterCTA } from '@/components/home/recruiter-cta'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <SignalRail />
      <FocusAreas />
      <FeaturedProjects />
      <Skills />
      <Experience />
      <RecruiterCTA />
      <Footer />
    </main>
  )
}
