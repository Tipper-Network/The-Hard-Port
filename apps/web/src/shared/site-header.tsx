import { Link } from '@tanstack/react-router'

import { THPLogo } from '../components/logo-mark'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-secondary/10 bg-primary/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-hero items-center justify-between px-6 py-4 lg:px-12">
        <Link to="/" aria-label="The Hard Port home">
          <THPLogo />
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-semibold text-secondary md:flex">
          <Link
            to="/"
            hash="boosting"
            className="transition-opacity hover:opacity-60"
          >
            The Truth
          </Link>
          <Link
            to="/"
            hash="gap"
            className="transition-opacity hover:opacity-60"
          >
            The Gap
          </Link>
          <Link
            to="/"
            hash="packages"
            className="transition-opacity hover:opacity-60"
          >
            The Packages
          </Link>
          <Link
            to="/"
            hash="about"
            className="transition-opacity hover:opacity-60"
          >
            The who we are
          </Link>  

          <Link
            to="/"
            hash="apply"
            className="rounded-button bg-accent px-4 py-2 font-bold text-background transition-opacity hover:opacity-90"
          >
            Apply free
          </Link>
        </nav>

        <Link
          to="/"
          hash="apply"
          className="rounded-button bg-accent px-3 py-2 text-xs font-bold text-background md:hidden"
        >
          Apply free
        </Link>
      </div>
    </header>
  )
}
