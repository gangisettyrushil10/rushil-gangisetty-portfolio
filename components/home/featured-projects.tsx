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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            badge="Featured Projects"
            title="The strongest proof on the site"
            description="The hero gives the quick read. These cards are the calmer follow-through: what the project was, why it mattered, and where to click next."
            className="mb-0 max-w-3xl"
          />
          <Button asChild variant="outline" className="border-white/12 bg-white/[0.03] hover:bg-white/[0.06]">
            <Link href="/projects">
              View all projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}
