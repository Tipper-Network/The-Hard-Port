'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { ApplicationPipelineForm } from '@/components/application-pipeline-form'
import LinkButton from '@/components/link_button'
import { clearAccessToken, getAccessToken } from '@/lib/auth-session'
import type { ApplicationRecord } from '@/lib/pipeline-constants'
import { getApplication } from '@/lib/reviewer-api'

type ApplicationReviewPanelProps = {
  id: string
}

function formatDate(value: string) {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export function ApplicationReviewPanel({ id }: ApplicationReviewPanelProps) {
  const router = useRouter()
  const [application, setApplication] = useState<ApplicationRecord | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!getAccessToken()) {
      router.replace('/sign-in')
      return
    }

    let cancelled = false

    async function load() {
      const result = await getApplication(id)
      if (cancelled) return

      if (!result.ok) {
        if (result.unauthorized) {
          clearAccessToken()
          router.replace('/sign-in')
          return
        }
        setError(result.error)
        setLoading(false)
        return
      }

      setApplication(result.application)
      setLoading(false)
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [id, router])

  if (loading) {
    return <p className="text-white/70">Loading application…</p>
  }

  if (error || !application) {
    return (
      <div className="space-y-4">
        <p className="text-alert">{error ?? 'Application not found'}</p>
        <LinkButton text="Back to list" href="/review" intensity={1} />
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <div>
        <Link href="/review" className="text-sm text-accent underline">
          ← All applications
        </Link>
        <h2 className="mt-4 font-heading text-2xl uppercase text-secondary">
          {application.businessName}
        </h2>
        <p className="mt-2 text-sm text-white/60">
          {application.founderName} ·{' '}
          <Link href={`mailto:${application.email}`} className="text-accent underline">
            {application.email}
          </Link>{' '}
          · submitted {formatDate(application.submittedAt)}
        </p>
      </div>

      <section className="border border-white/10 p-6">
        <h3 className="text-xs font-bold tracking-[0.14em] text-accent uppercase">
          Intake responses
        </h3>
        <dl className="mt-4 grid gap-4 text-sm md:grid-cols-2">
          <div>
            <dt className="text-white/50">Core offer</dt>
            <dd className="mt-1 text-white/85">{application.coreOffer}</dd>
          </div>
          <div>
            <dt className="text-white/50">Paying customers</dt>
            <dd className="mt-1 text-white/85">{application.payingCustomers}</dd>
          </div>
          <div>
            <dt className="text-white/50">Operating status</dt>
            <dd className="mt-1 text-white/85">{application.operatingStatus}</dd>
          </div>
          <div>
            <dt className="text-white/50">Primary problems</dt>
            <dd className="mt-1 text-white/85">{application.primaryProblems ?? '—'}</dd>
          </div>
          <div>
            <dt className="text-white/50">Discovery source</dt>
            <dd className="mt-1 text-white/85">{application.discoverySource}</dd>
          </div>
          <div>
            <dt className="text-white/50">Delivery history</dt>
            <dd className="mt-1 text-white/85">{application.deliveryHistory}</dd>
          </div>
        </dl>
      </section>

      <section className="border border-white/10 p-6">
        <h3 className="text-xs font-bold tracking-[0.14em] text-accent uppercase">
          Pipeline tracker
        </h3>
        <p className="mt-2 text-sm text-white/60">
          Updates sync to Postgres — export CSV with{' '}
          <code className="text-white/80">pnpm --filter api pipeline:export</code>
        </p>
        <div className="mt-6">
          <ApplicationPipelineForm
            application={application}
            onUpdated={setApplication}
          />
        </div>
      </section>
    </div>
  )
}
