import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono, Press_Start_2P, Space_Grotesk, VT323 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Toaster } from 'sonner'
import { EasterEgg } from '@/components/easter-egg'
import { CommandPalette } from '@/components/organisms/command-palette'
import { AuroraBackdrop } from '@/components/organisms/aurora-backdrop'
import { StarfieldBackdrop } from '@/components/organisms/starfield-backdrop'
import { BootSequence } from '@/components/organisms/boot-sequence'
import { FreeThrowGame } from '@/components/organisms/free-throw-game'
import { SpellSystem } from '@/components/organisms/spell-system'
import './globals.css'

// Body — modern terminal mono
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-sans-family',
  display: 'swap',
  weight: ['400', '500', '600'],
})

// Secondary terminal mono (alias for compatibility with existing .font-mono users)
const plexMono2 = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono-family',
  display: 'swap',
  weight: ['400', '500'],
})

// Display — chunky pixel
const vt323 = VT323({
  subsets: ['latin'],
  variable: '--font-display-family',
  display: 'swap',
  weight: ['400'],
})

// Tiny pixel accents
const pressStart = Press_Start_2P({
  subsets: ['latin'],
  variable: '--font-pixel-family',
  display: 'swap',
  weight: ['400'],
})

// Long-form prose
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-prose-family',
  display: 'swap',
  weight: ['400', '500'],
})

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
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#05060a',
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
      <body
        className={`${plexMono.variable} ${plexMono2.variable} ${vt323.variable} ${pressStart.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <StarfieldBackdrop />
        <AuroraBackdrop />
        <BootSequence />
        <SpellSystem />
        {children}
        <CommandPalette />
        <FreeThrowGame />
        <EasterEgg />
        <Toaster theme="dark" toastOptions={{ style: { zIndex: 100 } }} />
        <Analytics beforeSend={(event) => {
          if (typeof window !== 'undefined' && window.localStorage.getItem('rushil:exclude-self') === '1') {
            return null
          }
          return event
        }} />
        <SpeedInsights />
      </body>
    </html>
  )
}
