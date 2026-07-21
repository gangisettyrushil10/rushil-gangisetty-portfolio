import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { ObservationProvider } from '@/components/observatory/observation-provider'
import { SiteNav } from '@/components/observatory/site-nav'
import './globals.css'

const siteUrl = 'https://rushil-gangisetty-portfolio.vercel.app'
const observationBootScript = `(function(){try{var mode=window.localStorage.getItem('rushil.observation-mode');document.documentElement.dataset.observation=mode==='petrova'?'petrova':'adrian'}catch(error){document.documentElement.dataset.observation='adrian'}})()`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Rushil Gangisetty | Software Engineer',
    template: '%s | Rushil Gangisetty',
  },
  description: 'Software engineer building useful systems across applied AI, full-stack products, data, and fintech — with calm interfaces and inspectable decisions.',
  keywords: ['Software Engineer', 'Full Stack Developer', 'Backend Engineer', 'React', 'Next.js', 'TypeScript', 'Python', 'SQL', 'Data Workflows', 'Applied AI'],
  authors: [{ name: 'Rushil Gangisetty' }],
  creator: 'Rushil Gangisetty',
  alternates: { canonical: '/' },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }, { url: '/icon-dark-32x32.png', sizes: '32x32', media: '(prefers-color-scheme: dark)' }],
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Rushil Gangisetty | Software Engineer',
    description: 'Useful systems across applied AI, full-stack products, data, and fintech.',
    siteName: 'Rushil Gangisetty Portfolio',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Rushil Gangisetty — software engineer and systems builder' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rushil Gangisetty | Software Engineer',
    description: 'Useful systems across applied AI, full-stack products, data, and fintech.',
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#030303',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: observationBootScript }} />
      </head>
      <body className="font-sans antialiased">
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <ObservationProvider>
          <SiteNav />
          {children}
        </ObservationProvider>
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  )
}
