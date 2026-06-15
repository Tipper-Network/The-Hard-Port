import { LogoWordmark } from './logo-mark'

const footerLinks = [
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
] as const

export function SiteFooter() {
  return (
    <footer className="border-t border-navy/10 bg-ice px-6 py-12 lg:px-12">
      <div className="mx-auto flex max-w-hero flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div>
          <LogoWordmark />
          <p className="mt-4 max-w-xs text-sm leading-6 text-navy/60">
            Media agency for brands that want to set sail and stand out.
          </p>
        </div>

        <nav className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm font-medium text-navy">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-opacity hover:opacity-70"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mx-auto mt-10 max-w-hero border-t border-navy/10 pt-6 text-sm text-navy/50">
        © {new Date().getFullYear()} The Hard Port. All rights reserved.
      </div>
    </footer>
  )
}
