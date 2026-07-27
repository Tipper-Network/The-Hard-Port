'use client'

import { useEffect, useRef, type ReactNode } from 'react'

import type { FormStepId } from '@/lib/tracking/form-steps'
import { isStepComplete } from '@/lib/tracking/form-steps'
import { trackFormStepComplete, trackFormStepView } from '@/lib/tracking/event-store'

type FormStepSectionProps = {
  step: FormStepId
  values: Record<string, string | boolean>
  children: ReactNode
}

export function FormStepSection({ step, values, children }: FormStepSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const viewed = useRef(false)
  const completed = useRef(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || viewed.current) return
        viewed.current = true
        trackFormStepView(step)
      },
      { threshold: 0.2 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [step])

  useEffect(() => {
    if (completed.current) return
    if (!isStepComplete(step, values)) return
    completed.current = true
    trackFormStepComplete(step)
  }, [step, values])

  return (
    <div ref={ref} className="space-y-5">
      {children}
    </div>
  )
}
