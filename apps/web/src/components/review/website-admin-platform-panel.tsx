'use client'

import Link from 'next/link'

import { useAccessInstalled } from '@/hooks/use-access-installed'

/** Legacy block; prefer AdminHubNav. Kept as short copy under applications list. */
export function WebsiteAdminPlatformPanel() {
  const installed = useAccessInstalled()

  if (installed === undefined || !installed) return null

  return (
    <p className="text-sm text-white/60">
      Products and catalog:{' '}
      <Link href="/admin/thp/content" className="font-semibold text-accent underline">
        THP Access console
      </Link>
      {' · '}
      <Link href="/thp/catalog" className="text-accent underline">
        public catalog
      </Link>
    </p>
  )
}
