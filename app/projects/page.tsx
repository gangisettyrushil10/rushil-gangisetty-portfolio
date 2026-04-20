import { Metadata } from 'next'
import { Navbar } from '@/components/organisms/navbar'
import { Footer } from '@/components/organisms/footer'
import { ProjectsContent } from './projects-content'

export const metadata: Metadata = {
  title: 'Projects | Rushil Gangisetty',
  description: 'A curated set of GitHub-backed projects across product software, data workflows, applied AI, and machine-learning depth.',
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
