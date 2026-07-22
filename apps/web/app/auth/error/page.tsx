import Link from 'next/link'

type AuthErrorPageProps = {
  searchParams: Promise<{ message?: string }>
}

export default async function AuthErrorPage({ searchParams }: AuthErrorPageProps) {
  const { message = 'Authentication failed' } = await searchParams

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-depth-9 px-6 text-center">
      <h1 className="font-heading text-2xl uppercase text-secondary">Sign-in failed</h1>
      <p className="max-w-md text-white/70">{message}</p>
      <Link href="/" className="text-accent underline">
        Back to home
      </Link>
    </main>
  )
}
