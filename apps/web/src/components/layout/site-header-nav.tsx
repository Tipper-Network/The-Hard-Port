'use client'

import LinkButton from '@/components/link-button'

import { THPLogo } from '@/components/layout/logo-mark'
import { useCurrentUser } from '@/hooks/api/use-auth'
import { useAccessInstalled } from '@/hooks/use-access-installed'
import { THP_CATALOG_PATH } from '@/lib/access-public-paths'
import { trackNavClick } from '@/lib/tracking'

/** Service funnel links — primary story is THP diagnostic / intervention, not digital catalog. */
const NAV_LINKS = [
  { text: 'How it works', href: '/work-with-us' },
  { text: 'The ladder', href: '/business-levels' },
  { text: 'Who we are', href: '/about' },
] as const

export function SiteHeaderNav() {
  const accessInstalled = useAccessInstalled()
  const { data: websiteUser } = useCurrentUser()
  const showCatalog = accessInstalled !== false

  return (
    <>
      <LinkButton href="/" variant="unstyled" aria-label="The Hard Port home" noMargin>
        <THPLogo />
      </LinkButton>
      <nav className="hidden items-center gap-5 text-sm text-secondary md:flex lg:gap-6">
        {showCatalog ? (
          <LinkButton
            text="Catalog"
            href={THP_CATALOG_PATH}
            variant="nav"
            noMargin
            className="text-secondary/55"
            onClick={() => trackNavClick('Catalog', THP_CATALOG_PATH)}
          />
        ) : null}
        {NAV_LINKS.map((link) => (
          <LinkButton
            key={link.href}
            text={link.text}
            href={link.href}
            variant="nav"
            noMargin
            onClick={() => trackNavClick(link.text, link.href)}
          />
        ))}
        <LinkButton
          text="Admin"
          href="/admin"
          variant="nav"
          noMargin
          className={websiteUser ? 'font-semibold text-accent' : 'font-semibold text-secondary'}
          onClick={() => trackNavClick('Admin', '/admin')}
        />
        <LinkButton
          text="Apply"
          href="/apply"
          variant="header"
          noMargin
          className="px-4 py-2 text-sm"
          onClick={() => trackNavClick('Apply', '/apply')}
        />
      </nav>

      <div className="flex items-center gap-2 md:hidden">
        {showCatalog ? (
          <LinkButton
            text="Catalog"
            href={THP_CATALOG_PATH}
            variant="outline"
            noMargin
            className="px-2 py-1.5 text-[10px]"
            onClick={() => trackNavClick('Catalog', THP_CATALOG_PATH)}
          />
        ) : null}
        <LinkButton
          text="Admin"
          href="/admin"
          variant="outline"
          noMargin
          className="px-2 py-1.5 text-[10px]"
          onClick={() => trackNavClick('Admin', '/admin')}
        />
        <LinkButton
          text="Apply"
          href="/apply"
          variant="header"
          noMargin
          className="px-3 py-2 text-xs"
          onClick={() => trackNavClick('Apply', '/apply')}
        />
      </div>
    </>
  )
}
