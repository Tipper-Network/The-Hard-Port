import { trackEvent, identifyVisitor } from '@/lib/tracking/event-store'
import {
  captureEntryContext,
  getEntryContext,
  hasSessionStarted,
  markSessionStarted,
} from '@/lib/tracking/session'

export function emitSessionStart(pathname: string) {
  if (hasSessionStarted()) return

  const context = getEntryContext() ?? captureEntryContext(pathname)
  markSessionStarted()

  trackEvent('session_start', {
    pathname: context.pathname,
    referrer: context.referrer,
    utmSource: context.utmSource,
    utmMedium: context.utmMedium,
    utmCampaign: context.utmCampaign,
    utmContent: context.utmContent,
    utmTerm: context.utmTerm,
    ref: context.ref,
    video: context.video,
    locale: context.locale,
    timezone: context.timezone,
    viewportWidth: context.viewportWidth,
  })

  identifyVisitor({
    locale: context.locale,
    timezone: context.timezone,
  })
}
