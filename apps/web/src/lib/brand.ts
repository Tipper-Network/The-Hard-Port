/** Hard Port brand tokens — keep in sync with src/styles.css @theme.
 *  Hex approximations of the oklch tokens, for contexts (meta theme-color)
 *  that need a plain hex/rgb fallback. */
export const brand = {
  deepest: '#12151d',
  ink: '#f2f3f6',
  gold: '#d9b676',
} as const

export const site = {
  name: 'The Hard Port',
  title: 'The Hard Port; We give a f*ck. We just don\u2019t care.',
  shortName: 'The Hard Port',
  description:
    'The Hard Port investigates why established microbusinesses stay trapped in survival mode — and what it takes to become stable enough to grow responsibly.',
  logo: '/THP_Logo.svg',
} as const

/** The line everything else hangs off. */
export const slogan = 'We Give A F*ck. We just don\u2019t care.'

/** Public site origin — metadataBase, OG URLs. Set NEXT_PUBLIC_SITE_URL in production. */
export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, '')
  if (configured) return configured
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return 'http://localhost:3000'
}

/** Paste a full YouTube URL or 11-character video ID */
export const video = {
  hero: 'https://youtu.be/wqH_2z21zEc?si=TIfRY47lHca205uc',
} as const
