import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://rushil-gangisetty-portfolio.vercel.app/sitemap.xml',
    host: 'https://rushil-gangisetty-portfolio.vercel.app',
  }
}
