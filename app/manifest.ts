import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FinWise',
    short_name: 'FinWise',
    description: 'Make Smarter Money Decisions with accurate financial calculators and market data',
    start_url: '/',
    display: 'standalone',
    background_color: '#f7faf8',
    theme_color: '#0e1513',
    icons: [
      {
        src: '/icon-light-32x32.png',
        sizes: '32x32',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icon-dark-32x32.png',
        sizes: '32x32',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'apple touch icon',
      },
    ],
    categories: ['finance', 'education', 'tools'],
  }
}
