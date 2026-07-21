import { Metadata } from 'next'
import { SiteFooter } from '@/components/observatory/site-footer'
import { ContactContent } from './contact-content'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Rushil Gangisetty about software engineering roles, product-minded full-stack work, backend systems, and data-heavy applications.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact | Rushil Gangisetty',
    description: 'Start a conversation about software engineering, applied AI, data, fintech, or intelligent systems.',
    url: '/contact',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Rushil Gangisetty — software engineer and systems builder' }],
  },
  twitter: { card: 'summary_large_image', title: 'Contact | Rushil Gangisetty', description: 'Start a conversation about software engineering, applied AI, data, fintech, or intelligent systems.', images: ['/og.png'] },
}

export default function ContactPage() {
  return (
    <main id="main-content" className="observatory-page min-h-screen bg-background pt-20">
      <ContactContent />
      <SiteFooter />
    </main>
  )
}
