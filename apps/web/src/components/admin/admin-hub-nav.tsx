'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { THP_ACCESS_BASE, THP_ACCESS_ROUTES } from '@/components/admin/thp-access-hub-links'
import { useAccessInstalled } from '@/hooks/use-access-installed'

export function AdminHubNav() {
  const pathname = usePathname() ?? ''
  const installed = useAccessInstalled()

  const onApplications = pathname.startsWith('/review')
  const onAccess = pathname.startsWith(THP_ACCESS_BASE)
  const onAdminHome = pathname === '/admin'

  return (
    <nav className="mb-8 flex flex-wrap gap-3 border border-white/10 bg-white/5 p-2 text-sm" aria-label="Website admin">
      <Link
        href="/admin"
        className={onAdminHome ? 'rounded px-3 py-2 font-semibold bg-white/10 text-secondary' : 'rounded px-3 py-2 text-white/70 hover:text-secondary'}
      >
        Overview
      </Link>
      <Link
        href="/review"
        className={onApplications ? 'rounded px-3 py-2 font-semibold bg-white/10 text-secondary' : 'rounded px-3 py-2 text-white/70 hover:text-secondary'}
      >
        Applications
      </Link>
      {installed ? (
        <Link
          href={THP_ACCESS_ROUTES.staffConsole}
          className={onAccess ? 'rounded px-3 py-2 font-semibold bg-white/10 text-accent' : 'rounded px-3 py-2 text-white/70 hover:text-accent'}
        >
          THP Access
        </Link>
      ) : null}
      {installed ? (
        <Link href="/thp/catalog" className="rounded px-3 py-2 text-white/70 hover:text-accent">
          Public catalog
        </Link>
      ) : null}
    </nav>
  )
}
