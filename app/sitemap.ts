import type { MetadataRoute } from 'next'
import { projects } from '@/lib/data'

const baseUrl = 'https://rushil-gangisetty-portfolio.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/projects', '/resume', '/contact'].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date('2026-07-21'),
    changeFrequency: path === '' ? 'monthly' as const : 'yearly' as const,
    priority: path === '' ? 1 : 0.7,
  }))

  return [
    ...staticRoutes,
    ...projects.map((project) => ({
      url: `${baseUrl}/projects/${project.id}`,
      lastModified: new Date('2026-07-21'),
      changeFrequency: 'monthly' as const,
      priority: project.featured ? 0.8 : 0.6,
    })),
  ]
}
