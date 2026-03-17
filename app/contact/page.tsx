import { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ContactContent } from './contact-content'

export const metadata: Metadata = {
  title: 'Contact | Rushil Gangisetty',
  description: 'Get in touch with Rushil Gangisetty. Open to software engineering opportunities, collaborations, and conversations about technology.',
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
