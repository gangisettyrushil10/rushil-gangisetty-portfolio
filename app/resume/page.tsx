import { Metadata } from 'next'
import { SiteFooter } from '@/components/observatory/site-footer'
import { ResumeContent } from './resume-content'

export const metadata: Metadata = {
  title: 'Résumé',
  description: 'Resume snapshot for a product-minded software engineer with experience in full-stack development, backend workflows, data systems, and applied AI.',
  alternates: { canonical: '/resume' },
  openGraph: {
    title: 'Résumé | Rushil Gangisetty',
    description: 'Experience, education, capabilities, and selected software engineering work.',
    url: '/resume',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Rushil Gangisetty — software engineer and systems builder' }],
  },
  twitter: { card: 'summary_large_image', title: 'Résumé | Rushil Gangisetty', description: 'Experience, education, capabilities, and selected software engineering work.', images: ['/og.png'] },
}

export default function ResumePage() {
  return (
    <main id="main-content" className="observatory-page min-h-screen bg-background pt-20">
      <ResumeContent />
      <SiteFooter />
    </main>
  )
}
