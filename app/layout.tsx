import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono, Public_Sans, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const publicSans = Public_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'Rushil Gangisetty | Software Engineer',
  description: 'Software engineer building product software, backend APIs, business systems, data workflows, and applied AI features. Open to software, backend, data, and systems roles.',
  keywords: ['Software Engineer', 'Backend Engineer', 'Full Stack Developer', 'ASP.NET Core', 'C#', 'React', 'TypeScript', 'Python', 'SQL', 'Data Workflows'],
  authors: [{ name: 'Rushil Gangisetty' }],
  creator: 'Rushil Gangisetty',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Rushil Gangisetty | Software Engineer',
    description: 'Software engineer building product software, backend APIs, business systems, data workflows, and applied AI features.',
    siteName: 'Rushil Gangisetty Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rushil Gangisetty | Software Engineer',
    description: 'Software engineer building product software, backend APIs, business systems, data workflows, and applied AI features.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
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
      <body className={`${publicSans.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
