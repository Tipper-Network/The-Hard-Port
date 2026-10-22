import { AccessApp } from '@psyferblock/access'
import { notFound } from 'next/navigation'

import { isAccessInstalled } from '@psyferblock/access/server/config'

export default function PartnerPortalPage() {
  if (!isAccessInstalled()) notFound()

  return <AccessApp basePath="/partner" scope="partner" />
}
