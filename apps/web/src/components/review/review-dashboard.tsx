'use client'

import Link from 'next/link'

import LinkButton from '@/components/link-button'
import { ReviewerSessionBar } from '@/components/review/reviewer-session-bar'
import { useReviewerSession } from '@/components/review/use-reviewer-session'
import { isUnauthorizedError } from '@/lib/api/errors'
import { useApplications } from '@/hooks/api/use-applications'

function formatDate(value: string) {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export function ReviewDashboard() {
  const { user, loading: sessionLoading, error: sessionError, signOut } = useReviewerSession()
  const {
    data: applications = [],
    isPending,
    isError,
    error,
  } = useApplications({ enabled: !!user })

  if (sessionLoading || (user && isPending)) {
    return <p className="text-white/70">Loading applications…</p>
  }

  if (sessionError) {
    return (
      <div className="space-y-4">
        <p className="text-alert">{sessionError}</p>
        <LinkButton text="Sign in" href="/sign-in" intensity={1} />
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (isError) {
    if (isUnauthorizedError(error)) {
      return null
    }

    return (
      <div className="space-y-4">
        <ReviewerSessionBar user={user} onSignOut={signOut} />
        <p className="text-alert">{error.message}</p>
        <LinkButton text="Try again" href="/review" intensity={1} />
      </div>
    )
  }

  const activeSlot = applications.find((app) => app.activeCapacitySlot)

  return (
    <div className="space-y-8">
      <ReviewerSessionBar user={user} onSignOut={signOut} />

      <div className="space-y-1">
        <p className="text-sm text-white/60">
          {applications.length} application{applications.length === 1 ? '' : 's'}
        </p>
        {activeSlot ? (
          <p className="text-sm text-accent">Capacity slot: {activeSlot.businessName}</p>
        ) : (
          <p className="text-sm text-white/40">No active capacity slot</p>
        )}
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
                  <td className="px-4 py-3 max-w-xs truncate">{app.nextAction ?? '-'}</td>
                  <td className="px-4 py-3">{app.assignedReviewer ?? '-'}</td>
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
