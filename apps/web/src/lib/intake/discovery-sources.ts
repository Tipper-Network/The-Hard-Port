export enum DISCOVERY_SOURCE_OPTIONS__Enum {
  YOUTUBE = 'YouTube',
  GOOGLE_SEARCH = 'Google / search',
  REFERRAL = 'Referral — someone sent me',
  SOCIAL_MEDIA = 'Social media',
  DIRECT = 'Direct — I found the site myself',
  OTHER = 'Other',
}

export const DISCOVERY_SOURCE_OPTIONS = [
  { value: DISCOVERY_SOURCE_OPTIONS__Enum.YOUTUBE, label: 'YouTube' },
  { value: DISCOVERY_SOURCE_OPTIONS__Enum.GOOGLE_SEARCH, label: 'Google / search' },
  { value: DISCOVERY_SOURCE_OPTIONS__Enum.REFERRAL, label: 'Referral — someone sent me' },
  { value: DISCOVERY_SOURCE_OPTIONS__Enum.SOCIAL_MEDIA, label: 'Social media' },
  { value: DISCOVERY_SOURCE_OPTIONS__Enum.DIRECT, label: 'Direct — I found the site myself' },
  { value: DISCOVERY_SOURCE_OPTIONS__Enum.OTHER, label: 'Other' },
] as const

export type DiscoverySourceValue = (typeof DISCOVERY_SOURCE_OPTIONS)[number]['value']
