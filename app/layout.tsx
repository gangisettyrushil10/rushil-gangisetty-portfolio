import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
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
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
