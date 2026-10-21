import { AccessApp } from '@psyferblock/access'
import { notFound } from 'next/navigation'

import { isAccessInstalled } from '@psyferblock/access/server/config'

export default function AdminThpConsolePage() {
  if (!isAccessInstalled()) notFound()

  return (
    <AccessApp
      basePath="/admin/thp"
      websiteAdminHref="/admin"
      publicProductHref={(slug) => `/thp/catalog/${encodeURIComponent(slug)}`}
    />
  )
}
