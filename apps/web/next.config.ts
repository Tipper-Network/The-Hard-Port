import path from 'node:path'
import { fileURLToPath } from 'node:url'

import type { NextConfig } from 'next'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingRoot: path.join(__dirname, '../../'),
  transpilePackages: ['@psyferblock/access'],
  async redirects() {
    const staffToAdmin = (source: string, destination: string) => ({
      source,
      destination,
      permanent: false as const,
    })
    return [
      { source: '/catalog', destination: '/thp/catalog', permanent: false },
      { source: '/p/:slug', destination: '/thp/catalog/:slug', permanent: false },
      { source: '/thp', destination: '/admin/thp', permanent: false },
      staffToAdmin('/thp/login', '/admin/thp/login'),
      staffToAdmin('/thp/login/:path*', '/admin/thp/login/:path*'),
      staffToAdmin('/thp/connection', '/admin/thp/connection'),
      staffToAdmin('/thp/partners', '/admin/thp/partners'),
      staffToAdmin('/thp/content', '/admin/thp/content'),
      staffToAdmin('/thp/content/:path*', '/admin/thp/content/:path*'),
      staffToAdmin('/thp/billing', '/admin/thp/billing'),
      { source: '/admin/thp/partner', destination: '/partner', permanent: false },
      { source: '/admin/thp/partner/:path*', destination: '/partner/:path*', permanent: false },
      { source: '/thp/partner', destination: '/partner', permanent: false },
      { source: '/thp/partner/:path*', destination: '/partner/:path*', permanent: false },
      staffToAdmin('/thp/api/:path*', '/admin/thp/api/:path*'),
    ]
  },
}

export default nextConfig
