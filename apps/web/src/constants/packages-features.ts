export type FeatureGroups = Record<string, readonly string[]>

export type PlanId = 'port' | 'sea' | 'ocean'

export type ComparisonCell = boolean | string

export type UpgradeComparisonRow = {
  label: string
  port: ComparisonCell
  sea: ComparisonCell
  ocean: ComparisonCell
}

export type PackageCard = {
  id: PlanId
  name: string
  featured?: boolean
  price: number 
  tagline: string
  includesLabel?: string
  bullets: readonly string[]
  upgradeBullets?: readonly string[]
  cta: string
  ctaLink: string
}

export const packageCards: readonly PackageCard[] = [
  {
    id: 'port',
    name: 'TO THE PORT',
    price: 0,
    tagline: 'For stability within your budget',
    bullets: ['Content', 'Reporting', 'Branding'],
    cta: 'Apply',
    ctaLink: '#application',
  },
  {
    id: 'sea',
    name: 'TO THE SEA',
    featured: true,
    price: 632,
    tagline: 'For growth',
    includesLabel: 'Everything in Port',
    bullets: [],
    upgradeBullets: ['Video Content', 'Growth Testing', 'Competitor Research'],
    cta: 'Choose',
    ctaLink: '#contact',
  },
  {
    id: 'ocean',
    name: 'TO THE OCEAN',
    price: 1723,
    tagline: 'For expansion',
    includesLabel: 'Everything in Sea',
    bullets: [],
    upgradeBullets: [
      'Dedicated Strategy',
      'Bi-Weekly Sessions',
      'Custom Deliverables',
    ],
    cta: 'Contact Us',
    ctaLink: '#contact',
  },
]

/** Progressive upgrade table — shows what changes at each tier */
export const upgradeComparisonRows = [
  { label: 'Monthly Content', port: '12 Posts', sea: '12 Posts', ocean: 'Custom' },
  { label: 'Stories', port: '20', sea: '20', ocean: 'Custom' },
  { label: 'Brand Foundation', port: true, sea: true, ocean: true },
  { label: 'Performance Reporting', port: true, sea: true, ocean: true },
  { label: 'Video Strategy', port: false, sea: true, ocean: true },
  { label: 'A/B Testing', port: false, sea: true, ocean: true },
  { label: 'Influencer Collaborations', port: false, sea: true, ocean: true },
  { label: 'Competitor Analysis', port: false, sea: true, ocean: true },
  { label: 'Strategic Roadmap', port: false, sea: true, ocean: true },
  { label: 'Bi-Weekly Check-ins', port: false, sea: false, ocean: true },
  { label: 'Custom Deliverables', port: false, sea: false, ocean: true },
] as const satisfies readonly UpgradeComparisonRow[]

/** Detailed capability breakdown — powers the accordion section */
export const capabilityBreakdown = {
  'Reporting & Insights': [
    'Track engagement metrics',
    'Monitor reach and impressions',
    'Review audience activity',
    'Measure website and link clicks',
    'Monthly performance review',
  ],
  'Content Production': [
    '12 posts per month',
    '20 stories per month',
    'Strategy applied to every design',
    'Grid formatting and layout',
    'Highlight covers',
  ],
  'Brand Foundation': [
    'Brand messaging framework',
    'Taglines and positioning',
    'Value pillars',
    'Tone of voice guidelines',
    'Consistency between physical and digital presence',
  ],
  'Content Planning': [
    'Monthly content calendar',
    'Campaign planning',
    'Content scheduling recommendations',
  ],
  'Video Content': [
    'Videos tailored to target audience',
    'Video content planning',
    'Videography strategy',
  ],
  'Growth Optimization': [
    'A/B testing strategy',
    'Performance experimentation',
    'Growth opportunity analysis',
  ],
  'Audience Expansion': [
    'Influencer collaborations',
    'Partnership opportunities',
    'Audience growth initiatives',
  ],
  'Market Intelligence': [
    'Competitor landscape analysis',
    'Target audience mapping',
    'Industry positioning review',
  ],
  'Strategic Roadmap': [
    '3–6 month growth roadmap',
    'Priority recommendations',
    'Milestone planning',
  ],
  'Dedicated Strategy Sessions': [
    'Bi-weekly strategy check-ins',
    'Goals exploration and alignment',
    'Ongoing performance review',
  ],
  'Custom Engagement Model': [
    'Customisable strategy structure',
    'Foundational system for growth',
    'Digital, physical and communal presence',
  ],
  'Advanced Brand Development': [
    'Social media aesthetic direction',
    'Visual identity refinement',
    'Development of next-level brand positioning',
  ],
} as const satisfies FeatureGroups

/** Which capabilities are included per plan (for capability summary table) */
export const capabilityAvailability: Record<
  keyof typeof capabilityBreakdown,
  Record<PlanId, boolean>
> = {
  'Reporting & Insights': { port: true, sea: true, ocean: true },
  'Content Production': { port: true, sea: true, ocean: true },
  'Brand Foundation': { port: true, sea: true, ocean: true },
  'Content Planning': { port: true, sea: true, ocean: true },
  'Video Content': { port: false, sea: true, ocean: true },
  'Growth Optimization': { port: false, sea: true, ocean: true },
  'Audience Expansion': { port: false, sea: true, ocean: true },
  'Market Intelligence': { port: false, sea: true, ocean: true },
  'Strategic Roadmap': { port: false, sea: true, ocean: true },
  'Dedicated Strategy Sessions': { port: false, sea: false, ocean: true },
  'Custom Engagement Model': { port: false, sea: false, ocean: true },
  'Advanced Brand Development': { port: false, sea: false, ocean: true },
}
