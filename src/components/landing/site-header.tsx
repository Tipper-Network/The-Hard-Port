import { LogoWordmark } from './logo-mark'

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
] as const

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-navy/5 bg-ice/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-hero items-center justify-between px-6 py-4 lg:px-12">
        <a href="#" aria-label="The Hard Port home">
          <LogoWordmark />
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-navy md:flex">
          {navLinks.slice(0, -1).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-opacity hover:opacity-70"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-button border border-navy px-4 py-2 transition-colors hover:bg-navy hover:text-white"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  )
}
