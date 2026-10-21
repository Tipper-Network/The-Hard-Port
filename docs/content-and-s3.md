# Content pages + S3 (dogfood)

Each **`access.content_items`** row is one **product page**: PDF on CDN, YouTube URL, Substack link, session booking, etc. Staff manage them at **`/thp/content`**.

## Operator flow

1. **`/thp/content/new`** — slug, title, kind, access (`open` for now), asset URL and/or S3 file upload.
2. Upload uses **`POST /thp/api/uploads/presign`** → browser **PUT** to S3 → **`body_ref`** = public CDN URL.
3. **`/thp/content/:slug/edit`** — **PATCH** via BFF to Access **`PATCH /admin/content/:slug`**.

## Env (apps/web server)

| Variable | Purpose |
|----------|---------|
| `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` | Presign only (BFF) |
| `HP_S3_BUCKET` | Bucket name |
| `HP_S3_REGION` | e.g. `us-east-1` |
| `HP_S3_PUBLIC_BASE_URL` | CDN or public bucket base, no trailing slash |
| `HP_S3_PREFIX` | Key prefix (default `content`) |

Object key: `{prefix}/{tenantSlug}/{slug}/{uuid}-{filename}`  
Public URL: `{HP_S3_PUBLIC_BASE_URL}/{key}`

Bucket must allow **CORS PUT** from `http://localhost:3000` (dev) and your production origin. Objects should be **public-read** (or fronted by CloudFront) until paid/private downloads ship.

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

**S3 uploads:** still only fill **`body_ref`** via `packages/access-ui/src/server/s3-upload.ts` + `POST /thp/api/uploads/presign`.

## Visitor-facing page

**`/p/[slug]`** on the marketing site (`apps/web/app/p/[slug]/page.tsx`):

1. Server: **`fetchContentForPage`** (`@psyferblock/access/server/fetch-content`) with **`HP_SECRET_KEY`** — teaser or full payload for **`access_mode = open`** (and keyword/paid rules still apply).
2. Client widget **`ProductPage`** — if locked, keyword gate; if unlocked, **`ProductUnlocked`** shows **Watch** and/or **Read** with toggles: **on this page** (YouTube embed, PDF iframe, or Substack `/embed`) vs **on YouTube** / **on Substack** (external). PDF in `body_ref` wins for on-site read when both PDF and Substack are set. Session booking and non-PDF downloads get their own sections. **Where this came from** uses `source_label` / `source_url`.

Staff can open **`/p/{slug}`** after publish to preview the same layout visitors get.
