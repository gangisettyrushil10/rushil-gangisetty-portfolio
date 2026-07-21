import { Metadata } from 'next'
import { SiteFooter } from '@/components/observatory/site-footer'
import { ProjectsContent } from './projects-content'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'A curated set of GitHub-backed projects across product software, data workflows, applied AI, and machine-learning depth.',
  alternates: { canonical: '/projects' },
  openGraph: {
    title: 'Projects | Rushil Gangisetty',
    description: 'Evidence-led case studies across applied AI, product software, data, and fintech systems.',
    url: '/projects',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Rushil Gangisetty — software engineer and systems builder' }],
  },
  twitter: { card: 'summary_large_image', title: 'Projects | Rushil Gangisetty', description: 'Evidence-led case studies across applied AI, product software, data, and fintech systems.', images: ['/og.png'] },
}

export default function ProjectsPage() {
  return (
    <main id="main-content" className="observatory-page min-h-screen bg-background pt-20">
      <ProjectsContent />
      <SiteFooter />
    </main>
  )
}
