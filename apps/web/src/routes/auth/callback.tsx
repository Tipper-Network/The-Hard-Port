import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

import { setAccessToken } from '#/lib/auth-session'

export const Route = createFileRoute('/auth/callback')({
  component: AuthCallbackPage,
  validateSearch: (search: Record<string, unknown>) => ({
    token: typeof search.token === 'string' ? search.token : '',
  }),
})

function AuthCallbackPage() {
  const navigate = useNavigate()
  const { token } = Route.useSearch()

  useEffect(() => {
    if (token) {
      setAccessToken(token)
      navigate({ to: '/apply' })
      return
    }
    navigate({ to: '/auth/error', search: { message: 'Missing access token' } })
  }, [token, navigate])

  return (
    <main className="flex min-h-screen items-center justify-center bg-depth-9 px-6 text-white/70">
      Signing you in…
    </main>
  )
}
