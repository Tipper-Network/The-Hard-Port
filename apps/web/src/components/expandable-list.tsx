'use client'

import { useState } from 'react'

import { cn } from '#/lib/utils'
import { Button } from '#/components/ui/button'

export type ExpandableListItem = {
  label: string
  details: readonly string[]
}

type ExpandableListProps = {
  title: string
  items?: readonly ExpandableListItem[]
  defaultOpenIndex?: number
  className?: string
}

function hasExpandableDetails(details: readonly string[]) {
  return details.some((detail) => detail.trim().length > 0)
}

function getInitialOpenIndex(
  items: readonly ExpandableListItem[] | undefined,
  defaultOpenIndex: number,
) {
  if (!items?.length) return null

  const preferred = items[defaultOpenIndex]
  if (preferred && hasExpandableDetails(preferred.details)) return defaultOpenIndex

  const firstExpandable = items.findIndex((item) => hasExpandableDetails(item.details))
  return firstExpandable >= 0 ? firstExpandable : null
}

export function ExpandableList({
  title,
  items,
  defaultOpenIndex = 0,
  className,
}: ExpandableListProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(() =>
    getInitialOpenIndex(items, defaultOpenIndex),
  )

  const rowClassName =
    'flex w-full items-center justify-between gap-2 py-2.5 text-left text-xs font-medium'

  return (
    <div className={cn('text-left', className)}>
      <p className="text-xs font-semibold tracking-wide text-white/90 uppercase">
        {title}
      </p>
      <ul className="mt-3 divide-y divide-white/10">
        {items?.map((item, index) => {
          const isExpandable = hasExpandableDetails(item.details)
          const isOpen = isExpandable && openIndex === index

          return (
            <li key={item.label}>
              {isExpandable ? (
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className={cn(
                    rowClassName,
                    'h-auto w-full  border-0  text-white hover:bg-muted px-2 hover:text-primary! aria-expanded:bg-muted aria-expanded:text-primary!',
                  )}
                  aria-expanded={isOpen}
                >
                  <span className="capitalize">{item.label}</span>
                  <span className="shrink-0 opacity-50 mr-1" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </Button>
              ) : (
                <div className={cn(rowClassName, 'text-white')}>
                  <div className="capitalize rounded-md p-1 px-4">{item.label}</div>
                </div>
              )}
              {isOpen ? (
                <ol className="list-decimal capitalize space-y-1 pb-2.5 pl-4 text-xs leading-5 text-white">
                  {item.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ol>
              ) : null}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
