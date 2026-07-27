export const DISCOVERY_SOURCE_OPTIONS = [
  { value: 'YouTube', label: 'YouTube' },
  { value: 'Google / search', label: 'Google / search' },
  { value: 'Referral', label: 'Referral — someone sent me' },
  { value: 'Social media', label: 'Social media' },
  { value: 'Direct', label: 'Direct — I found the site myself' },
  { value: 'Other', label: 'Other' },
] as const

export type DiscoverySourceValue = (typeof DISCOVERY_SOURCE_OPTIONS)[number]['value']
