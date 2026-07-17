import { Link } from '@tanstack/react-router'

import { cn } from '#/lib/utils'

/** Escalation ramp: later-funnel CTAs render bigger/bolder, never smaller. */
const INTENSITY_CLASSES = {
  1: 'px-6 py-3 text-sm font-bold',
  2: 'px-7 py-4 text-base font-extrabold',
  3: 'px-7 py-4 text-lg font-extrabold',
  4: 'px-8 py-5 text-lg font-extrabold md:text-xl',
} as const

const VARIANT_CLASSES = {
  solid:
    'bg-accent text-background hover:bg-[--color-gold-hover]',
  ghost:
    'border-[1.5px] border-secondary/70 bg-transparent text-secondary hover:border-accent hover:text-accent',
} as const

const LinkButton = ({
  text,
  href,
  hash,
  intensity = 2,
  variant = 'solid',
}: {
  text: string
  href: string
  hash?: string
  intensity?: 1 | 2 | 3 | 4
  variant?: 'solid' | 'ghost'
}) => {
  return (
    <div>
      <Link
        to={href}
        hash={hash}
        className={cn(
          'mt-9 inline-flex items-center justify-center tracking-wide uppercase transition-all hover:-translate-y-0.5',
          INTENSITY_CLASSES[intensity],
          VARIANT_CLASSES[variant],
        )}
      >
        {text}
      </Link>
    </div>
  )
}

export default LinkButton