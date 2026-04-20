import { Metadata } from 'next'
import { Navbar } from '@/components/organisms/navbar'
import { Footer } from '@/components/organisms/footer'
import { ContactContent } from './contact-content'

export const metadata: Metadata = {
  title: 'Contact | Rushil Gangisetty',
  description: 'Get in touch with Rushil Gangisetty about software engineering roles, product-minded full-stack work, backend systems, and data-heavy applications.',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <ContactContent />
      <Footer />
    </main>
  )
}
