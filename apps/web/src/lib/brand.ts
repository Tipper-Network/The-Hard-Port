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
    'A no-bullshit media agency for small businesses that are "doing fine." Fine is the problem. We bring clarity, you bring the commitment. Hard a-port.',
  logo: '/THP_Logo.svg',
} as const

/** The line everything else hangs off. */
export const slogan = 'We Give A F*ck. We just don\u2019t care.'

/** How many freebies we hand out, and how we frame them everywhere. */
export const freeSlots = {
  perMonth: 2,
  label: '2 businesses a month. Free. We pick them.',
} as const

/** Paste a full YouTube URL or 11-character video ID */
export const video = {
  hero: 'https://youtu.be/wqH_2z21zEc?si=TIfRY47lHca205uc',
} as const
