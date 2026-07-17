/** Section order matches the depth-darkening tokens in styles.css — same
 *  rung, same escalation. Anton (font-heading) only ships one real weight,
 *  so this ramp targets body/punchline copy (font-sans), where IBM Plex
 *  Sans actually has 400–700 to work with. */
export const RUNG_ORDER = [
  'hero',
  'letter',
  'boosting',
  'gap',
  'proof',
  'process',
  'branding',
  'strategy',
  'packages',
  'apply',
  'about',
  'faq',
  'contact',
] as const

export type RungId = (typeof RUNG_ORDER)[number]

const TIERS: Array<{ maxIndex: number; className: string }> = [
  { maxIndex: 2, className: 'text-lg font-semibold' },
  { maxIndex: 5, className: 'text-lg font-bold' },
  { maxIndex: 8, className: 'text-xl font-bold tracking-tight' },
  { maxIndex: Infinity, className: 'text-2xl font-bold tracking-tight' },
]

/** Weight/size class for a section's closing punchline — heavier and bigger
 *  the further down the ladder it sits. */
export function rungPunchlineClass(id: RungId): string {
  const index = RUNG_ORDER.indexOf(id)
  const tier = TIERS.find((t) => index <= t.maxIndex)
  return tier?.className ?? TIERS[0].className
}
