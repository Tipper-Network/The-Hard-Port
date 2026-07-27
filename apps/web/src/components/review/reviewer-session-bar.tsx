'use client'

import type { AuthenticatedUser } from '@/lib/api/auth'

type ReviewerSessionBarProps = {
  user: AuthenticatedUser
  onSignOut: () => void
}

export function ReviewerSessionBar({ user, onSignOut }: ReviewerSessionBarProps) {
  const label = user.name?.trim() || user.email

  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border border-white/10 bg-white/5 px-4 py-3 text-sm">
      <p className="text-white/70">
        Signed in as{' '}
        <span className="font-semibold text-secondary">{label}</span>
        <span className="ml-2 font-mono text-xs text-white/40">{user.role}</span>
      </p>
      <button
        type="button"
        onClick={onSignOut}
        className="font-semibold text-accent underline"
      >
        Sign out
      </button>
    </div>
  )
}
