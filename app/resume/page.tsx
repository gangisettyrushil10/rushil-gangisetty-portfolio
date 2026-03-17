import { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ResumeContent } from './resume-content'

export const metadata: Metadata = {
  title: 'Resume | Rushil Gangisetty',
  description: 'Software engineer with experience in full-stack development, backend systems, data engineering, and applied AI. View my qualifications and work history.',
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
