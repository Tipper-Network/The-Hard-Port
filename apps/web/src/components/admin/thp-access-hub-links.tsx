import Link from 'next/link'

/** Staff platform console only — partners use `/partner`, not `/admin`. */
export const THP_ACCESS_BASE = '/admin/thp'

export const THP_ACCESS_ROUTES = {
  staffLogin: `${THP_ACCESS_BASE}/login`,
  staffConsole: `${THP_ACCESS_BASE}/content`,
  managePartners: `${THP_ACCESS_BASE}/partners`,
  connection: `${THP_ACCESS_BASE}/connection`,
} as const

type Props = {
  className?: string
}

/** Links for website operators into the THP staff console (private, not partner portal). */
export function ThpAccessHubLinks({ className }: Props) {
  return (
    <div className={`border border-white/10 bg-white/5 px-4 py-4 text-sm ${className ?? ''}`}>
      <h2 className="font-heading text-base uppercase text-secondary">THP platform (staff)</h2>
      <p className="mt-1 text-white/60">
        Manage catalog products and keywords on the Access service. Sign in with your platform email — not Google review login.
        Partner creators use <Link href="/partner" className="text-accent underline">/partner</Link> separately.
      </p>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
        <Link href={THP_ACCESS_ROUTES.staffLogin} className="font-semibold text-accent underline">
          Staff sign-in
        </Link>
        <Link href={THP_ACCESS_ROUTES.staffConsole} className="font-semibold text-white/80 underline hover:text-accent">
          Content / products
        </Link>
        <Link href={THP_ACCESS_ROUTES.managePartners} className="font-semibold text-white/80 underline hover:text-accent">
          Partners (setup)
        </Link>
        <Link href={THP_ACCESS_ROUTES.connection} className="font-semibold text-white/80 underline hover:text-accent">
          Connection
        </Link>
      </div>
    </div>
  )
}
