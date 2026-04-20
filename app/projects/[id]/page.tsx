import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/organisms/navbar'
import { Footer } from '@/components/organisms/footer'
import { ProjectDetailContent } from './project-detail-content'
import { projects } from '@/lib/data'

interface ProjectPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const project = projects.find((p) => p.id === resolvedParams.id)
  
  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.title} | Rushil Gangisetty`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params
  const project = projects.find((p) => p.id === resolvedParams.id)

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <ProjectDetailContent project={project} />
      <Footer />
    </main>
  )
}
