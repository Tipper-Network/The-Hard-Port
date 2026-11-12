import { site } from '@/lib/brand'

type LogoVariant = 'primary' | 'on-dark'

type LogoProps = {
  className?: string
  /** Site chrome is always on dark grounds; use `primary` only on light panels if added later. */
  variant?: LogoVariant
}

const LOGO_SRC: Record<LogoVariant, string> = {
  primary: site.logo,
  'on-dark': site.logoOnDark,
}

export function THPLogo({ className = 'h-10 w-auto', variant = 'on-dark' }: LogoProps) {
  return (
    <img
      src={LOGO_SRC[variant]}
      alt={site.name}
      className={className}
      width={160}
      height={81}
    />
  )
}
