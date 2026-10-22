import { AccessApp } from '@psyferblock/access'
import { notFound } from 'next/navigation'

import { isAccessInstalled } from '@psyferblock/access/server/config'

import { THP_CATALOG_PATH } from '@/lib/access-public-paths'

export default function AdminThpConsolePage() {
  if (!isAccessInstalled()) notFound()

  return (
    <AccessApp
      basePath="/admin/thp"
      websiteAdminHref="/admin"
      publicProductPathPrefix={THP_CATALOG_PATH}
    />
  )
}
