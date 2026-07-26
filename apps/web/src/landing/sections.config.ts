/** Canonical homepage funnel — order, lazy loading, sticky CTA. See 02-conversion-funnel.mdc */

export const HOME_SECTION_IDS = [
  'hero',
  'letter',
  'condition',
  'how-it-works',
  'proof',
  'not-promise',
  'capacity',
  'faq',
  'contact',
] as const

export type HomeSectionId = (typeof HOME_SECTION_IDS)[number]

export type LazyHomeSectionId = Exclude<HomeSectionId, 'hero' | 'letter'>

export type StickyCtaConfig = {
  text: string
  href: string
  hash?: string
}

export type HomeSectionConfig = {
  id: HomeSectionId
  rung: number
  /** Loaded in the initial bundle — above the fold */
  eager?: boolean
  /** Min-height placeholder while IntersectionObserver defers mount */
  minHeight?: string
  stickyCta?: StickyCtaConfig
}

export const HOME_SECTIONS: HomeSectionConfig[] = [
  { id: 'hero', rung: 1, eager: true },
  {
    id: 'letter',
    rung: 2,
    eager: true,
    stickyCta: { text: 'See how it works', href: '/work-with-us' },
  },
  {
    id: 'condition',
    rung: 3,
    minHeight: '28rem',
    stickyCta: { text: 'See how it works', href: '/work-with-us' },
  },
  {
    id: 'how-it-works',
    rung: 4,
    minHeight: '32rem',
    stickyCta: { text: 'Read the full picture', href: '/work-with-us' },
  },
  {
    id: 'proof',
    rung: 5,
    minHeight: '24rem',
    stickyCta: { text: 'Read the full picture', href: '/work-with-us' },
  },
  {
    id: 'not-promise',
    rung: 6,
    minHeight: '24rem',
    stickyCta: { text: 'Apply', href: '/apply' },
  },
  {
    id: 'capacity',
    rung: 7,
    minHeight: '20rem',
    stickyCta: { text: 'Apply', href: '/apply' },
  },
  {
    id: 'faq',
    rung: 8,
    minHeight: '24rem',
    stickyCta: { text: 'Apply', href: '/apply' },
  },
  { id: 'contact', rung: 9, minHeight: '20rem' },
]

export const LAZY_HOME_SECTIONS = HOME_SECTIONS.filter(
  (section): section is HomeSectionConfig & { id: LazyHomeSectionId } => !section.eager,
)

export const STICKY_CTA_SECTION_IDS = HOME_SECTIONS.filter((section) => section.stickyCta).map(
  (section) => section.id,
)

export const STICKY_CTA_BY_SECTION: Partial<Record<HomeSectionId, StickyCtaConfig>> =
  Object.fromEntries(
    HOME_SECTIONS.filter((section) => section.stickyCta).map((section) => [
      section.id,
      section.stickyCta!,
    ]),
  )
