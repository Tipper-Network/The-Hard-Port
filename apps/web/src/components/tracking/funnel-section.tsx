'use client'

import type { ReactNode } from 'react'

import type { HomeSectionId } from '@/landing/sections.config'
import { HOME_SECTIONS } from '@/landing/sections.config'

type FunnelSectionProps = {
  id: HomeSectionId
  children: ReactNode
  className?: string
}

export function FunnelSection({ id, children, className }: FunnelSectionProps) {
  const config = HOME_SECTIONS.find((section) => section.id === id)
  const rung = config?.rung ?? 0

  return (
    <div data-funnel-section={id} data-funnel-rung={rung} className={className}>
      {children}
    </div>
  )
}
