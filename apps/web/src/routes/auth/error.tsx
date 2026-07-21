import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/error')({
  component: AuthErrorPage,
  validateSearch: (search: Record<string, unknown>) => ({
    message: typeof search.message === 'string' ? search.message : 'Authentication failed',
  }),
})

function AuthErrorPage() {
  const { message } = Route.useSearch()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-depth-9 px-6 text-center">
      <h1 className="font-heading text-2xl uppercase text-secondary">Sign-in failed</h1>
      <p className="max-w-md text-white/70">{message}</p>
      <Link to="/apply" className="text-accent underline">
        Back to apply
      </Link>
    </main>
  )
}
