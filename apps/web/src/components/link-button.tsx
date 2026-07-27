'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'

import { trackClick } from '@/lib/tracking'
import { cn } from '@/lib/utils'

/** Escalation ramp: later-funnel CTAs render bigger/bolder, never smaller. */
const INTENSITY_CLASSES = {
  1: 'px-6 py-3 text-sm font-bold',
  2: 'px-7 py-4 text-base font-extrabold',
  3: 'px-7 py-4 text-lg font-extrabold',
  4: 'px-8 py-5 text-lg font-extrabold md:text-xl',
} as const

const VARIANT_CLASSES = {
  solid: 'bg-accent text-background hover:bg-[--color-gold-hover]',
  ghost:
    'border-[1.5px] border-secondary/70 bg-transparent text-secondary hover:border-accent hover:text-accent',
  text: 'font-bold text-accent normal-case tracking-normal hover:underline',
  nav: 'font-semibold normal-case tracking-normal transition-opacity hover:opacity-60',
  outline:
    'rounded-button border border-white/80 bg-transparent font-medium text-white/80 normal-case tracking-normal transition-colors hover:border-white hover:text-white',
  header:
    'rounded-button bg-accent font-bold text-background normal-case tracking-normal transition-opacity hover:opacity-90',
  unstyled: '',
} as const

function isExternalHref(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href)
}

function resolveHref(href: string, hash?: string) {
  if (href.startsWith('#')) {
    return `/#${href.slice(1)}`
  }

  if (hash) {
    return `${href}#${hash}`
  }

  return href
}

type LinkButtonProps = {
  text?: string
  href: string
  hash?: string
  intensity?: 1 | 2 | 3 | 4
  variant?: keyof typeof VARIANT_CLASSES
  className?: string
  fullWidth?: boolean
  noMargin?: boolean
  external?: boolean
  'aria-label'?: string
  children?: ReactNode
}

const LinkButton = ({
  text,
  href,
  hash,
  intensity = 2,
  variant = 'solid',
  className,
  fullWidth = false,
  noMargin = false,
  external,
  'aria-label': ariaLabel,
  children,
}: LinkButtonProps) => {
  const content = children ?? text
  const isExternal = external ?? isExternalHref(href)
  const isCtaVariant = variant === 'solid' || variant === 'ghost'
  const opensInNewTab = /^https?:/.test(href)

  const classes = cn(
    isCtaVariant &&
      'inline-flex items-center justify-center tracking-wide uppercase transition-all hover:-translate-y-0.5',
    isCtaVariant && INTENSITY_CLASSES[intensity],
    VARIANT_CLASSES[variant],
    fullWidth && 'w-full',
    className,
  )

  const link = isExternal ? (
    <a
      href={href}
      aria-label={ariaLabel}
      target={opensInNewTab ? '_blank' : undefined}
      rel={opensInNewTab ? 'noopener noreferrer' : undefined}
      className={classes}
      onClick={() => {
        if (isCtaVariant && typeof text === 'string') {
          trackClick(text, href)
        }
      }}
    >
      {content}
    </a>
  ) : (
    <Link
      href={resolveHref(href, hash)}
      aria-label={ariaLabel}
      className={classes}
      onClick={() => {
        if (isCtaVariant && typeof text === 'string') {
          trackClick(text, resolveHref(href, hash))
        }
      }}
    >
      {content}
    </Link>
  )

  if (noMargin || variant === 'unstyled' || variant === 'text' || variant === 'nav') {
    return link
  }

  return <div>{link}</div>
}

export default LinkButton
