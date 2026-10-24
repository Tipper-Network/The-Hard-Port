# Content pages + S3 (dogfood)

Each **`access.content_items`** row is one **product page**: PDF on CDN, YouTube URL, Substack link, session booking, etc. Staff manage them at **`/thp/content`**.

## Operator flow

1. **`/thp/content/new`** — slug, title, kind, access (`open` for now), asset URL and/or S3 file upload.
2. Upload uses **`POST /admin/thp/api/admin/uploads/presign`** (BFF → Access **`POST /admin/uploads/presign`**) → browser **PUT** to S3 → **`body_ref`** = public CDN URL.
3. **`/thp/content/:slug/edit`** — **PATCH** via BFF to Access **`PATCH /admin/content/:slug`**.

## Env (`services/access` — Access API process)

| Variable | Purpose |
|----------|---------|
| `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` | Presign (IAM user/role on Access service) |
| `AWS_REGION` or `HP_S3_REGION` | Bucket region |
| `HP_S3_BUCKET` | Bucket name |
| `HP_S3_PUBLIC_BASE_URL` | CDN or public bucket base, no trailing slash |
| `HP_S3_PREFIX` | Key prefix (default `content`) |
| `S3_PRESIGN_EXPIRES` | Presigned URL TTL seconds (default `900`) |

Object key: `{prefix}/{tenantSlug}/{slug}/{uuid}-{filename}`  
Public URL: `{HP_S3_PUBLIC_BASE_URL}/{key}`

Bucket must allow **CORS PUT** from the browser (presign is server-side; the file upload is a direct PUT from the client). Example CORS rule on the bucket:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "HEAD"],
    "AllowedOrigins": ["http://localhost:3000", "https://thehardport.com"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]
```

Optional: `HP_S3_URI=s3://bucket-name/thp-access/` sets bucket root prefix for keys (combined with `HP_S3_PREFIX`). `HP_S3_PUBLIC_BASE_URL` should be the **bucket origin** (e.g. `https://bucket.s3.region.amazonaws.com`); path segments in that URL or in `HP_S3_URI` become the key prefix, not part of the hostname.

Objects should be **public-read** (or fronted by CloudFront) until paid/private downloads ship.

## Product fields (where data lives)

| Field (DB) | API (camelCase) | Meaning |
|------------|-----------------|--------|
| `body_ref` | `bodyRef` | Primary file on your CDN (PDF, zip, etc.) |
| `booking_url` | `bookingUrl` | Cal / booking link when `kind = session` |
| `youtube_url` | `youtubeUrl` | YouTube watch URL when `kind = video` |
| `substack_url` | `substackUrl` | Substack (or similar) article URL |
| `source_label` | `sourceLabel` | “Where this came from” — short label for visitors |
| `source_url` | `sourceUrl` | Link paired with `source_label` (channel, post, partner) |

**Storage:** platform Postgres `access.content_items` — migration `db/migrations/007_content_delivery_urls.sql`.

**Staff write path:** `/thp/content/new` or `/thp/content/:slug/edit` → `packages/access-ui/src/views/content-form.tsx` → BFF `packages/access-ui/src/server/handler.ts` → Access `services/access/src/routes/admin.ts` (`POST` / `PATCH /admin/content`).

**Staff read path:** `GET /admin/content/:slug` (same admin route; `contentSelect` lists all columns above).

**Visitor read path (when access granted):** `GET /v1/content/:slug` with site **`pk`** — `services/access/src/routes/public.ts` returns `content.{ bodyRef, bookingUrl, youtubeUrl, substackUrl, sourceLabel, sourceUrl, … }`.

**S3 uploads:** fill **`body_ref`** via `services/access/src/s3-upload.ts` + **`POST /admin/uploads/presign`** (staff session). Next BFF only proxies.

## Visitor-facing page

**`/p/[slug]`** on the marketing site (`apps/web/app/p/[slug]/page.tsx`):

1. Server: **`fetchContentForPage`** (`@psyferblock/access/server/fetch-content`) with **`HP_SECRET_KEY`** — teaser or full payload for **`access_mode = open`** (and keyword/paid rules still apply).
2. Client widget **`ProductPage`** — if locked, keyword gate; if unlocked, **`ProductUnlocked`** shows **Watch** and/or **Read** with toggles: **on this page** (YouTube embed, PDF iframe, or Substack `/embed`) vs **on YouTube** / **on Substack** (external). PDF in `body_ref` wins for on-site read when both PDF and Substack are set. Session booking and non-PDF downloads get their own sections. **Where this came from** uses `source_label` / `source_url`.

Staff can open **`/p/{slug}`** after publish to preview the same layout visitors get.
