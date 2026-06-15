import { Link } from '@tanstack/react-router'

import { THPLogo } from './logo-mark'

const navLinks = [
  { to: '/' as const, hash: 'services' as const, label: 'Services' },
  { to: '/' as const, hash: 'work' as const, label: 'Work' },
  { to: '/about' as const, label: 'About' },
] as const

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-navy/5 bg-ice/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-hero items-center justify-between px-6 py-4 lg:px-12">
        <Link to="/" aria-label="The Hard Port home">
          <THPLogo />
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-navy md:flex">
          {navLinks.map((link) =>
            'hash' in link ? (
              <Link
                key={link.label}
                to={link.to}
                hash={link.hash}
                className="transition-opacity hover:opacity-70"
              >
                {link.label}
              </Link>
            ) : (
              <Link
                key={link.label}
                to={link.to}
                className="transition-opacity hover:opacity-70"
              >
                {link.label}
              </Link>
            ),
          )}
          <Link
            to="/"
            hash="contact"
            className="rounded-button border border-navy px-4 py-2 transition-colors hover:bg-navy hover:text-white"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  )
}
