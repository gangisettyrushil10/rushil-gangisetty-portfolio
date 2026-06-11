import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import { EasterEgg } from '@/components/easter-egg'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rushil Gangisetty | Software Engineer',
  description: 'Product-minded software engineer building polished full-stack apps, dependable backend workflows, data-heavy tools, and thoughtful AI features.',
  keywords: ['Software Engineer', 'Full Stack Developer', 'Backend Engineer', 'React', 'Next.js', 'TypeScript', 'Python', 'SQL', 'Data Workflows', 'Applied AI'],
  authors: [{ name: 'Rushil Gangisetty' }],
  creator: 'Rushil Gangisetty',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Rushil Gangisetty | Software Engineer',
    description: 'Product-minded software engineer building polished full-stack apps, dependable backend workflows, data-heavy tools, and thoughtful AI features.',
    siteName: 'Rushil Gangisetty Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rushil Gangisetty | Software Engineer',
    description: 'Product-minded software engineer building polished full-stack apps, dependable backend workflows, data-heavy tools, and thoughtful AI features.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#020202',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        {children}
        <EasterEgg />
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
