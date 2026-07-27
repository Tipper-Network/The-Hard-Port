'use client'

import Link from 'next/link'

import type { ApplicationSummary } from '@/lib/intake/pipeline'

function formatDate(value: string) {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

type ApplicationsListPanelProps = {
  applications: ApplicationSummary[]
}

export function ApplicationsListPanel({ applications }: ApplicationsListPanelProps) {
  if (applications.length === 0) {
    return <p className="text-white/70">No applications yet.</p>
  }

  return (
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
              <td className="max-w-xs truncate px-4 py-3">{app.nextAction ?? '-'}</td>
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
  )
}
