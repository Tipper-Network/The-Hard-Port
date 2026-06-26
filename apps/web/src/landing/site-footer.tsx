import { Link } from '@tanstack/react-router'

import { THPLogo } from './logo-mark'

const footerLinks = [
  { to: '/' as const, hash: 'boosting' as const, label: 'The Truth' },
  { to: '/' as const, hash: 'gap' as const, label: 'The Gap' },
  { to: '/' as const, hash: 'packages' as const, label: 'Pricing' },
  { to: '/' as const, hash: 'apply' as const, label: 'Apply free' },
  { to: '/about' as const, label: 'Who We Are' },
  { to: '/' as const, hash: 'contact' as const, label: 'Contact' },
] as const

export function SiteFooter() {
  return (
    <footer className="border-t border-primary/10 bg-secondary px-6 py-12 lg:px-12">
      <div className="mx-auto flex max-w-hero flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div>
          <Link to="/" aria-label="The Hard Port home">
            <THPLogo />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-primary/60">
            A no-bullshit media agency for businesses that are done being
            &quot;fine.&quot; We give a f*ck. We just don&apos;t care.
          </p>
        </div>

        <nav className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm font-medium text-primary">
          {footerLinks.map((link) =>
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
        </nav>
      </div>

      <div className="mx-auto mt-10 max-w-hero border-t border-primary/10 pt-6 text-sm text-primary/50">
        © {new Date().getFullYear()} The Hard Port. All rights reserved.
      </div>
    </footer>
  )
}
