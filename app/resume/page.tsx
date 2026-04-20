import { Metadata } from 'next'
import { Navbar } from '@/components/organisms/navbar'
import { Footer } from '@/components/organisms/footer'
import { ResumeContent } from './resume-content'

export const metadata: Metadata = {
  title: 'Resume | Rushil Gangisetty',
  description: 'Resume snapshot for a product-minded software engineer with experience in full-stack development, backend workflows, data systems, and applied AI.',
}

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <ResumeContent />
      <Footer />
    </main>
  )
}
