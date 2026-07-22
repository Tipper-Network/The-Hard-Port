import type { Metadata, Viewport } from 'next'

import { brand, site } from '@/lib/brand'
import '@/styles.css'

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  icons: {
    icon: site.logo,
    apple: site.logo,
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    title: site.title,
    description: site.description,
    images: [site.logo],
  },
  twitter: {
    card: 'summary',
    title: site.title,
    description: site.description,
    images: [site.logo],
  },
  other: {
    'msapplication-TileColor': brand.deepest,
  },
}

export const viewport: Viewport = {
  themeColor: brand.deepest,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
