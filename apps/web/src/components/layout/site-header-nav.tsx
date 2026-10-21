'use client'

import LinkButton from '@/components/link-button'

import { THPLogo } from '@/components/layout/logo-mark'
import { useCurrentUser } from '@/hooks/api/use-auth'
import { useAccessStaffSession } from '@/hooks/use-access-staff-session'
import { trackNavClick } from '@/lib/tracking'

const NAV_LINKS = [
  { text: 'How it works', href: '/work-with-us' },
  { text: 'The ladder', href: '/business-levels' },
  { text: 'Catalog', href: '/catalog' },
  { text: 'Who we are', href: '/about' },
] as const

export function SiteHeaderNav() {
  const accessStaff = useAccessStaffSession()
  const { data: websiteUser } = useCurrentUser()

  const showThpAccess = accessStaff != null
  const showWebsiteAdmin = websiteUser != null

  return (
    <>
      <LinkButton href="/" variant="unstyled" aria-label="The Hard Port home" noMargin>
        <THPLogo />
      </LinkButton>
      <nav className="hidden items-center gap-5 text-sm text-secondary md:flex lg:gap-6">
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
        {showWebsiteAdmin ? (
          <LinkButton
            text="Applications"
            href="/review"
            variant="nav"
            noMargin
            className="font-semibold text-secondary"
            onClick={() => trackNavClick('Applications', '/review')}
          />
        ) : null}
        {showThpAccess ? (
          <LinkButton
            text="THP Access"
            href="/thp/content"
            variant="nav"
            noMargin
            className="font-semibold text-accent"
            onClick={() => trackNavClick('THP Access', '/thp/content')}
          />
        ) : null}
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
        <LinkButton
          text="Catalog"
          href="/catalog"
          variant="outline"
          noMargin
          className="px-2 py-1.5 text-[10px]"
          onClick={() => trackNavClick('Catalog', '/catalog')}
        />
        {showWebsiteAdmin ? (
          <LinkButton
            text="Review"
            href="/review"
            variant="outline"
            noMargin
            className="px-2 py-1.5 text-[10px]"
            onClick={() => trackNavClick('Applications', '/review')}
          />
        ) : null}
        {showThpAccess ? (
          <LinkButton
            text="Access"
            href="/thp/content"
            variant="outline"
            noMargin
            className="px-2 py-1.5 text-[10px]"
            onClick={() => trackNavClick('THP Access', '/thp/content')}
          />
        ) : null}
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
