import { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ProjectsContent } from './projects-content'

export const metadata: Metadata = {
  title: 'Projects | Rushil Gangisetty',
  description: 'Explore my flagship projects spanning full-stack applications, AI systems, data products, and backend services.',
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <ProjectsContent />
      <Footer />
    </main>
  )
}
