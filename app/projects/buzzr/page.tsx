import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/organisms/navbar'
import { Footer } from '@/components/organisms/footer'
import { BuzzrContent } from './buzzr-content'
import { projects } from '@/lib/data'

const project = projects.find((p) => p.id === 'buzzr')

export const metadata: Metadata = {
  title: 'Buzzr — Case Study | Rushil Gangisetty',
  description:
    project?.longDescription ??
    'Cross-platform sports social app shipped to TestFlight — React Native, Next.js, Supabase, Edge Functions, Postgres.',
}

export default function BuzzrCaseStudyPage() {
  if (!project) {
    notFound()
  }

  return (
    <main className="page-shell min-h-screen">
      <Navbar />
      <BuzzrContent project={project} />
      <Footer />
    </main>
  )
}
