import type { Metadata } from 'next'

import { SignInPanel } from '@/components/auth/sign-in-panel'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'

export const metadata: Metadata = {
  title: 'Team Sign-in — The Hard Port',
  robots: { index: false, follow: false },
}

export default function SignInPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-depth-9 px-6 py-16 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-md">
          <p className="text-xs font-bold tracking-[0.18em] text-accent uppercase">
            THP operators only
          </p>
          <h1 className="mt-3 font-heading text-3xl font-normal uppercase leading-tight text-secondary">
            Sign in
          </h1>
          <p className="mt-4 text-base leading-7 text-white/70">
            Applicants do not sign in. This is for THP reviewers to access submitted
            applications.
          </p>
          <div className="mt-10">
            <SignInPanel />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
