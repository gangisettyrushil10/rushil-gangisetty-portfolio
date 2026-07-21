import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SiteFooter } from '@/components/observatory/site-footer'
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
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: {
      title: `${project.title} | Rushil Gangisetty`,
      description: project.description,
      url: `/projects/${project.id}`,
      images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Rushil Gangisetty — software engineer and systems builder' }],
    },
    twitter: { card: 'summary_large_image', title: `${project.title} | Rushil Gangisetty`, description: project.description, images: ['/og.png'] },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params
  const project = projects.find((p) => p.id === resolvedParams.id)

  if (!project) {
    notFound()
  }

  return (
    <main id="main-content" className="observatory-page min-h-screen bg-background pt-20">
      <ProjectDetailContent project={project} />
      <SiteFooter />
    </main>
  )
}
