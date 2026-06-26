import { Link } from '@tanstack/react-router'

import { THPLogo } from './logo-mark'

const navLinks = [
  { to: '/' as const, hash: 'boosting' as const, label: 'The Truth' },
  { to: '/' as const, hash: 'gap' as const, label: 'The Gap' },
  { to: '/' as const, hash: 'packages' as const, label: 'Pricing' },
  { to: '/about' as const, label: 'Who We Are' },
] as const

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-secondary/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-hero items-center justify-between px-6 py-4 lg:px-12">
        <Link to="/" aria-label="The Hard Port home">
          <THPLogo />
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-semibold text-primary md:flex">
          {navLinks.map((link) =>
            'hash' in link ? (
              <Link
                key={link.label}
                to={link.to}
                hash={link.hash}
                className="transition-opacity hover:opacity-60"
              >
                {link.label}
              </Link>
            ) : (
              <Link
                key={link.label}
                to={link.to}
                className="transition-opacity hover:opacity-60"
              >
                {link.label}
              </Link>
            ),
          )}
          <Link
            to="/"
            hash="apply"
            className="rounded-button bg-accent px-4 py-2 font-bold text-white transition-opacity hover:opacity-90"
          >
            Apply free
          </Link>
        </nav>

        <Link
          to="/"
          hash="apply"
          className="rounded-button bg-accent px-3 py-2 text-xs font-bold text-white md:hidden"
        >
          Apply free
        </Link>
      </div>
    </header>
  )
}
