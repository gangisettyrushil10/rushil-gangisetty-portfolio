import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/home/hero'
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
      <FeaturedProjects />
      <FocusAreas />
      <Experience />
      <Skills />
      <RecruiterCTA />
      <Footer />
    </main>
  )
}
