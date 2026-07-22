'use client'

import LinkButton from '@/components/link_button'
import { getGoogleLoginUrl, getMetaLoginUrl } from '@/lib/auth-session'

export function SignInPanel() {
  return (
    <div className="flex flex-col gap-4">
      <LinkButton
        text="Continue with Google"
        href={getGoogleLoginUrl()}
        external
        intensity={2}
        fullWidth
      />
      <LinkButton
        text="Continue with Meta"
        href={getMetaLoginUrl()}
        external
        intensity={2}
        variant="ghost"
        fullWidth
      />
    </div>
  )
}
