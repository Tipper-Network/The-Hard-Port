import LinkButton from '#/components/link_button'

import { THPLogo } from '../components/logo-mark'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-secondary/10 bg-primary/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-hero items-center justify-between px-6 py-4 lg:px-12">
        <LinkButton href="/" variant="unstyled" aria-label="The Hard Port home" noMargin>
          <THPLogo />
        </LinkButton>
        <nav className="hidden items-center gap-8 text-sm text-secondary md:flex">
          <LinkButton
            text="The Truth"
            href="/"
            hash="boosting"
            variant="nav"
            noMargin
          />
          <LinkButton text="The Gap" href="/" hash="gap" variant="nav" noMargin />
          <LinkButton
            text="The Packages"
            href="/"
            hash="packages"
            variant="nav"
            noMargin
          />
          <LinkButton
            text="The who we are"
            href="/"
            hash="about"
            variant="nav"
            noMargin
          />
          <LinkButton
            text="Apply free"
            href="/"
            hash="apply"
            variant="header"
            noMargin
            className="px-4 py-2 text-sm"
          />
        </nav>

        <LinkButton
          text="Apply free"
          href="/"
          hash="apply"
          variant="header"
          noMargin
          className="px-3 py-2 text-xs md:hidden"
        />
      </div>
    </header>
  )
}
