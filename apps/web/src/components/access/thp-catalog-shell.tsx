import Link from 'next/link'

import { THP_CATALOG_PATH } from '@/lib/access-public-paths'

type Props = {
  children: React.ReactNode
  /** When on a product page, show back link. */
  backHref?: string
  backLabel?: string
}

export function ThpCatalogShell({ children, backHref, backLabel }: Props) {
  return (
    <div className="thp-catalog-zone min-h-screen bg-[oklch(0.14_0.03_250)] text-[oklch(0.97_0.01_250)]">
      <header className="border-b border-[oklch(0.32_0.05_250)] px-6 py-4 lg:px-12">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-[oklch(0.72_0.03_250)] hover:text-[oklch(0.8_0.14_85)]">
              The Hard Port
            </Link>
            <span className="text-[oklch(0.32_0.05_250)]">/</span>
            <Link
              href={THP_CATALOG_PATH}
              className="font-medium uppercase tracking-wide text-[oklch(0.97_0.01_250)] hover:text-[oklch(0.8_0.14_85)]"
            >
              Catalog
            </Link>
          </div>
          {backHref ? (
            <Link href={backHref} className="text-sm text-[oklch(0.72_0.03_250)] hover:text-[oklch(0.8_0.14_85)]">
              {backLabel ?? 'Back'}
            </Link>
          ) : null}
        </div>
      </header>
      <main className="px-6 py-12 lg:px-12 lg:py-16">{children}</main>
    </div>
  )
}
