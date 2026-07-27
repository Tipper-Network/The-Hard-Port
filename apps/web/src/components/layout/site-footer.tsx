import LinkButton from '@/components/link-button'
import WhatsappButton from '@/components/whatsapp'

import { THPLogo } from '@/components/layout/logo-mark'

const footerLinks = [
  { href: '/work-with-us', label: 'How it works' },
  { href: '/business-levels', label: 'The ladder' },
  { href: '/', hash: 'proof', label: 'Proof' },
  { href: '/apply', label: 'Apply' },
  { href: '/about', label: 'Who We Are' },
  { href: '/', hash: 'contact', label: 'Contact' },
  { href: '/sign-in', label: 'Team sign-in' },
] as const

export function SiteFooter() {
  return (
    <footer className="border-t border-secondary/10 bg-depth-12 px-6 py-12 lg:px-12">
      <div className="mx-auto flex max-w-hero flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div>
          <LinkButton href="/" variant="unstyled" aria-label="The Hard Port home" noMargin>
            <THPLogo />
          </LinkButton>
          <p className="mt-4 max-w-xs text-sm leading-6 text-secondary/60">
            The Media Agency with no tolerance for nonsense.
          </p>
          <div className="mt-5 flex flex-col gap-3">
            <LinkButton
              text="setSail@thehardport.com"
              href="mailto:setSail@thehardport.com"
              variant="text"
              noMargin
              className="text-sm font-semibold text-secondary/70 transition-opacity hover:opacity-70 hover:no-underline"
            />
            <WhatsappButton />
          </div>
        </div>

        <nav className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm font-medium text-secondary">
          {footerLinks.map((link) => (
            <LinkButton
              key={link.label}
              text={link.label}
              href={link.href}
              hash={'hash' in link ? link.hash : undefined}
              variant="nav"
              noMargin
              className="hover:opacity-70"
            />
          ))}
        </nav>
      </div>

      <div className="mx-auto mt-10 max-w-hero border-t border-secondary/10 pt-6">
        <p className="text-sm italic text-secondary/40 mb-4">
          Each sailor should have their own experience in the open sea. For the sea takes the ship each time on a new journey.
        </p>
        <p className="text-sm text-secondary/50">
          © {new Date().getFullYear()} The Hard Port. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
