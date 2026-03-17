'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Section, SectionHeader } from '@/components/section'
import { ProjectCard } from '@/components/project-card'
import { Button } from '@/components/ui/button'
import { projects } from '@/lib/data'

export function FeaturedProjects() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 4)

  return (
    <Section className="bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <SectionHeader
            badge="Featured Work"
            title="Flagship case studies"
            description="If someone only looks at a few things on this site, I want them to start here. These projects do the best job of showing how I think, build, and ship."
            className="mb-0"
          />
          <Button asChild variant="outline" className="shrink-0">
            <Link href="/projects">
              View All
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              featured={index === 0}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}
