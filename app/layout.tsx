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
  description: 'Product-minded software engineer building full-stack applications, backend services, data products, and AI systems. Open to software engineering roles.',
  keywords: ['Software Engineer', 'Full Stack Developer', 'React', 'TypeScript', 'Python', 'AI', 'Backend', 'Data Engineering'],
  authors: [{ name: 'Rushil Gangisetty' }],
  creator: 'Rushil Gangisetty',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Rushil Gangisetty | Software Engineer',
    description: 'Product-minded software engineer building full-stack applications, backend services, data products, and AI systems.',
    siteName: 'Rushil Gangisetty Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rushil Gangisetty | Software Engineer',
    description: 'Product-minded software engineer building full-stack applications, backend services, data products, and AI systems.',
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
