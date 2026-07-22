'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import LinkButton from '@/components/link_button'
import { clearAccessToken, getAccessToken } from '@/lib/auth-session'
import type { ApplicationSummary } from '@/lib/pipeline-constants'
import { listApplications } from '@/lib/reviewer-api'

function formatDate(value: string) {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export function ReviewDashboard() {
  const router = useRouter()
  const [applications, setApplications] = useState<ApplicationSummary[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!getAccessToken()) {
      router.replace('/sign-in')
      return
    }

    let cancelled = false

    async function load() {
      const result = await listApplications()
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

      setApplications(result.applications)
      setLoading(false)
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [router])

  function signOut() {
    clearAccessToken()
    router.replace('/sign-in')
  }

  const activeSlot = applications.find((app) => app.activeCapacitySlot)

  if (loading) {
    return <p className="text-white/70">Loading applications…</p>
  }

  if (error) {
    return (
      <div className="space-y-4">
        <p className="text-alert">{error}</p>
        <LinkButton text="Try again" href="/review" intensity={1} />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm text-white/60">
            {applications.length} application{applications.length === 1 ? '' : 's'}
          </p>
          {activeSlot ? (
            <p className="text-sm text-accent">
              Capacity slot: {activeSlot.businessName}
            </p>
          ) : (
            <p className="text-sm text-white/40">No active capacity slot</p>
          )}
        </div>
        <button
          type="button"
          onClick={signOut}
          className="text-sm font-semibold text-accent underline"
        >
          Sign out
        </button>
      </div>

      {applications.length === 0 ? (
        <p className="text-white/70">No applications yet.</p>
      ) : (
        <div className="overflow-x-auto border border-white/10">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-white/5 text-xs font-bold tracking-[0.12em] text-white/50 uppercase">
              <tr>
                <th className="px-4 py-3">Submitted</th>
                <th className="px-4 py-3">Business</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Next action</th>
                <th className="px-4 py-3">Reviewer</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-t border-white/10 text-white/80">
                  <td className="px-4 py-3 whitespace-nowrap">{formatDate(app.submittedAt)}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-secondary">{app.businessName}</div>
                    <div className="text-xs text-white/50">{app.founderName}</div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">
                    {app.lifecycleStatus}
                    {app.activeCapacitySlot ? (
                      <span className="ml-2 text-accent">[slot]</span>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 max-w-xs truncate">{app.nextAction ?? '—'}</td>
                  <td className="px-4 py-3">{app.assignedReviewer ?? '—'}</td>
                  <td className="px-4 py-3">
                    <Link href={`/review/${app.id}`} className="text-accent underline">
                      Open
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
