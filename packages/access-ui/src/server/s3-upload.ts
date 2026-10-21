import 'server-only'

import { randomUUID } from 'node:crypto'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export type S3UploadConfig = {
  bucket: string
  region: string
  publicBaseUrl: string
  prefix: string
  tenantSlug: string
}

export function loadS3UploadConfig(tenantSlug: string): S3UploadConfig | null {
  const bucket = process.env.HP_S3_BUCKET?.trim()
  const region = process.env.HP_S3_REGION?.trim() || process.env.AWS_REGION?.trim()
  const publicBaseUrl = (process.env.HP_S3_PUBLIC_BASE_URL ?? '').replace(/\/$/, '')
  const prefix = (process.env.HP_S3_PREFIX ?? 'content').replace(/^\/+|\/+$/g, '')
  if (!bucket || !region || !publicBaseUrl) return null
  return { bucket, region, publicBaseUrl, prefix, tenantSlug }
}

function safeFilename(name: string): string {
  const base = name.replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/^-+|-+$/g, '')
  return base.slice(0, 120) || 'file'
}

export async function createPresignedUpload(
  config: S3UploadConfig,
  input: { slug: string; filename: string; contentType: string },
): Promise<{ uploadUrl: string; publicUrl: string; key: string }> {
  const key = `${config.prefix}/${config.tenantSlug}/${input.slug}/${randomUUID()}-${safeFilename(input.filename)}`
  const client = new S3Client({ region: config.region })
  const command = new PutObjectCommand({
    Bucket: config.bucket,
    Key: key,
    ContentType: input.contentType || 'application/octet-stream',
  })
  const uploadUrl = await getSignedUrl(client, command, { expiresIn: 900 })
  const publicUrl = `${config.publicBaseUrl}/${key}`
  return { uploadUrl, publicUrl, key }
}
