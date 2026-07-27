'use client'

import LinkButton from '@/components/link-button'

import { THPLogo } from '@/components/layout/logo-mark'
import { trackNavClick } from '@/lib/tracking'

const NAV_LINKS = [
  { text: 'How it works', href: '/work-with-us' },
  { text: 'The ladder', href: '/business-levels' },
  { text: 'Who we are', href: '/about' },
] as const

export function SiteHeaderNav() {
  return (
    <>
      <LinkButton href="/" variant="unstyled" aria-label="The Hard Port home" noMargin>
        <THPLogo />
      </LinkButton>
      <nav className="hidden items-center gap-8 text-sm text-secondary md:flex">
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
          text="Apply"
          href="/apply"
          variant="header"
          noMargin
          className="px-4 py-2 text-sm"
          onClick={() => trackNavClick('Apply', '/apply')}
        />
      </nav>

      <LinkButton
        text="Apply"
        href="/apply"
        variant="header"
        noMargin
        className="px-3 py-2 text-xs md:hidden"
        onClick={() => trackNavClick('Apply', '/apply')}
      />
    </>
  )
}
