import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Rushil Gangisetty — Personal Observatory',
    short_name: 'Rushil G.',
    description: 'Software engineering portfolio across applied AI, full-stack products, data, and fintech.',
    start_url: '/',
    display: 'standalone',
    background_color: '#02070d',
    theme_color: '#02070d',
    icons: [
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
      { src: '/icon-dark-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
  }
}
