import { randomUUID } from 'node:crypto';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export type S3UploadConfig = {
  bucket: string;
  region: string;
  publicBaseUrl: string;
  prefix: string;
  tenantSlug: string;
  presignExpiresSec: number;
};

/**
 * Reads S3 presign settings from the Access process environment (not the Next.js BFF).
 */
export function loadS3UploadConfig(tenantSlug: string): S3UploadConfig | null {
  const bucket = (process.env.HP_S3_BUCKET ?? process.env.S3_BUCKET ?? '').trim();
  const region = (process.env.HP_S3_REGION ?? process.env.AWS_REGION ?? '').trim();
  const publicBaseUrl = (process.env.HP_S3_PUBLIC_BASE_URL ?? process.env.S3_PUBLIC_BASE_URL ?? '').replace(/\/$/, '');
  const prefix = (process.env.HP_S3_PREFIX ?? process.env.S3_PREFIX ?? 'content').replace(/^\/+|\/+$/g, '');
  const rawExpires = Number(process.env.S3_PRESIGN_EXPIRES ?? process.env.HP_S3_PRESIGN_EXPIRES ?? 900);
  const presignExpiresSec =
    Number.isFinite(rawExpires) && rawExpires >= 60 && rawExpires <= 86_400 ? rawExpires : 900;
  if (!bucket || !region || !publicBaseUrl) return null;
  return { bucket, region, publicBaseUrl, prefix, tenantSlug, presignExpiresSec };
}

function safeFilename(name: string): string {
  const base = name.replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/^-+|-+$/g, '');
  return base.slice(0, 120) || 'file';
}

export async function createPresignedUpload(
  config: S3UploadConfig,
  input: { slug: string; filename: string; contentType: string },
): Promise<{ uploadUrl: string; publicUrl: string; key: string }> {
  const key = `${config.prefix}/${config.tenantSlug}/${input.slug}/${randomUUID()}-${safeFilename(input.filename)}`;
  const client = new S3Client({ region: config.region });
  const command = new PutObjectCommand({
    Bucket: config.bucket,
    Key: key,
    ContentType: input.contentType || 'application/octet-stream',
  });
  const uploadUrl = await getSignedUrl(client, command, { expiresIn: config.presignExpiresSec });
  const publicUrl = `${config.publicBaseUrl}/${key}`;
  return { uploadUrl, publicUrl, key };
}
