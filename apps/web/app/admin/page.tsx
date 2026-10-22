import type { Metadata } from 'next'
import Link from 'next/link'

import { AdminHubNav } from '@/components/admin/admin-hub-nav'
import { ThpAccessHubLinks } from '@/components/admin/thp-access-hub-links'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { isAccessInstalled } from '@psyferblock/access/server/config'

export const metadata: Metadata = {
  title: 'Admin — The Hard Port',
  robots: { index: false, follow: false },
}

export default function AdminHubPage() {
  const access = isAccessInstalled()

  return (
    <>
      <SiteHeader />
      <main className="bg-depth-9 px-6 py-16 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold tracking-[0.18em] text-accent uppercase">Website admin</p>
          <h1 className="mt-3 font-heading text-3xl font-normal uppercase text-secondary">Operator hub</h1>
          <p className="mt-4 text-white/70">
            Application review (intake OAuth) and THP Access (products, catalog) are separate logins; this page connects both.
          </p>
          <div className="mt-8">
            <AdminHubNav />
          </div>
          <ul className="mt-6 space-y-4 text-sm">
            <li className="border border-white/10 bg-white/5 px-4 py-4">
              <h2 className="font-heading text-base uppercase text-secondary">Applications</h2>
              <p className="mt-1 text-white/60">Review Engagement Readiness submissions. Sign in with Google via /sign-in.</p>
              <Link href="/review" className="mt-2 inline-block font-semibold text-accent underline">
                Open applications
              </Link>
            </li>
            {access ? (
              <li className="list-none p-0">
                <ThpAccessHubLinks />
              </li>
            ) : (
              <li className="border border-dashed border-white/15 px-4 py-4 text-white/50">
                THP Access is not installed on this deploy (missing HP_ACCESS_URL / keys). Catalog and /admin/thp are hidden.
              </li>
            )}
          </ul>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
