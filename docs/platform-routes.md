# Platform routes

How Access and Payments connect, and how another website calls them.

The Hard Port website (`apps/web`, `apps/api`) keeps its own Postgres (users, OAuth, applications). Access and Payments share a **different** Postgres. They do not read each other's tables. The website, and any later tenant, talks to them over HTTP.

| Process | Package | Default port | Database role |
|---|---|---|---|
| Access | `@hardport/access` | 4001 | `hp_access` |
| Payments | `@hardport/payments` | 4002 | `hp_payments` |

Shared code is `@hardport/core` (signing, sessions, field encryption, the database wrapper). Start both with `pnpm --filter @hardport/access start` and `pnpm --filter @hardport/payments start` after `pnpm platform:migrate`.

```
thehardport.com (or any other site)
    |  public key, from the browser
    |  secret key, from that site's server
    v
Access :4001                          Payments :4002
  keyword lookup, content read          checkout session, capture context
    |                                     |
    |  HMAC  POST /internal/checkout-sessions
    |------------------------------------>|
    |                                     |  HTTPS + HTTP Signature
    |                                     v
    |                                  CyberSource
    |                                     |  capture context, then /pts/v2/payments
    |  HMAC  POST /internal/checkout-sessions/complete
    |------------------------------------>|
    |                                     |
    |  HMAC  POST /internal/events        |  outbox, every few seconds
    |<------------------------------------|
    v
entitlement created or revoked
```

Card numbers and CVVs stay in CyberSource iframes. This platform only sees a transient token and the amount it already computed.

## Four credentials

Do not mix them.

| Credential | Header or cookie | Who holds it | What it may call |
|---|---|---|---|
| Public key `pk…` | `x-hp-key` plus `Origin` on the key's allow-list | Browser on the tenant's site | `POST /v1/keywords/lookup`, `GET /v1/content/:slug` |
| Secret key `sk…` | `x-hp-key`, and **no** `Origin` header | The tenant's own server | `GET /v1/content/:slug` with `x-hp-customer` |
| Staff session | `hp_session`, or `__Host-hp_session` when `COOKIE_SECURE=true`. HttpOnly, SameSite=Lax. Unsafe methods also need `Origin` in `ADMIN_ORIGINS` | Owner, admin, staff, partner after `POST /auth/login` | `/admin/*`, `/partner/*` on both products. One login works on both only if they are served from the same host |
| Internal HMAC | `x-hp-signature: kid=…,t=…,n=…,s=…` | Access, Payments, or a tenant server that was given `INTERNAL_SIGNING_KEYS` | `POST /internal/checkout-sessions`, `POST /internal/checkout-sessions/complete`, `POST /internal/events` |

The signature covers the unix time, a one-time nonce, the method, the path, and a hash of the raw body. Build it with `signRequest` from `@hardport/core`. A captured request cannot be replayed or pointed at a different path. The browser never sees this key.

`GET /healthz` on either process returns `{ "ok": true }` and needs no credential. Use it for a load balancer only.

## Purchase, from a website that is not this repo

The website server is the signed caller. The browser only talks to Access with the public key, and to CyberSource's iframe script.

1. Staff create the paid item, keyword, and site keys on Access (`/admin/content`, `/admin/keywords`, `/admin/sites`).
2. The visitor's browser `POST`s `/v1/keywords/lookup` with the public key. A hit returns `{ ok, slug, session }`. Send that session back as `x-hp-session` on later content reads.
3. When they buy, the **website server** signs `POST /internal/checkout-sessions`. The body carries the catalogue price. Payments subtracts the discount and stores the order. It does not trust a total sent by the browser.
4. If the tenant's gateway is CyberSource, the response is a Microform capture context, not a redirect:

```json
{
  "orderId": "…",
  "status": "pending",
  "captureContext": "<jwt>",
  "clientLibrary": "https://testflex.cybersource.com/microform/bundle/…",
  "clientLibraryIntegrity": "sha256-…"
}
```

Load `clientLibrary` with that integrity hash. Pass `captureContext` to `Flex`. The card fields are CyberSource iframes. `targetOrigins` on the gateway account must be the site origin, set when the account is stored, not taken from the request.

5. `microform.createToken()` gives the browser a transient token. The website server signs `POST /internal/checkout-sessions/complete` with `{ tenantId, orderId, transientToken }`. Payments checks the token against the capture context stored for that order, then `POST`s `/pts/v2/payments` with **the order's amount**.
6. `AUTHORIZED` for that amount marks the order paid, writes the commission, and queues `order.paid`. Payments then signs `POST /internal/events` to Access. Access creates the entitlement. A refund event revokes it.
7. The website server reads `GET /v1/content/:slug` with the secret key and `x-hp-customer: buyer@example.com`. `access: true` means the entitlement is there.

A second complete call on an already paid order does not charge again. A bad token puts the order back to `pending`. While a charge is in flight the status is `processing` and another complete returns `409 payment_in_progress`. An authorization whose amount does not match the order does not mark it paid.

The fake gateway (tests) returns `redirectUrl` instead of a capture context. Its result arrives at `POST /gateway/fake/:tenantId/notify`. CyberSource webhook signing is not implemented; that notify URL rejects CyberSource calls.

### Checkout session body

`POST /internal/checkout-sessions`

```json
{
  "tenantId": "uuid",
  "externalRef": "cart-id-unique-per-tenant",
  "customerEmail": "buyer@example.com",
  "item": { "ref": "roadmap-kit", "title": "Roadmap kit", "listPriceMinor": 12000, "currency": "USD" },
  "discountMinor": 2000,
  "partner": { "id": "uuid", "commissionPct": 10 },
  "codeRef": "optional-keyword"
}
```

`partner` and `codeRef` are optional. Unknown fields are rejected, including a client-supplied total. The same `externalRef` returns the same order. The same `externalRef` with a different price returns `409`.

Money is integer minor units. `12000` USD is 120.00. Supported currencies today: USD, EUR, GBP, AUD, CAD, CHF, AED (2 decimals), JPY, KRW (0 decimals).

### Gateway account

Each tenant stores its own CyberSource credentials, encrypted, on `payments.gateway_accounts`. The JSON inside is:

```json
{
  "merchantId": "…",
  "keyId": "…",
  "sharedSecret": "<base64 HMAC secret>",
  "targetOrigins": ["https://thehardport.com"],
  "allowedCardNetworks": ["VISA", "MASTERCARD"]
}
```

`allowedCardNetworks` may be omitted; it defaults to Visa and Mastercard. `targetOrigins` is required and must be `https` origins with no path.

## Access routes

Default port 4001. Bodies are JSON and reject unknown fields.

### Browser and tenant server

| Method | Path | Caller | Auth | Body / query | Success |
|---|---|---|---|---|---|
| OPTIONS | `/v1/*` | Browser preflight | none | — | `204`. Does not grant access |
| POST | `/v1/keywords/lookup` | Browser | public key + allowed Origin | `{ "word", "anonId" }`. `anonId` is 16–64 chars, `[A-Za-z0-9_-]` | Hit: `{ "ok": true, "slug", "session" }`. Miss: `{ "ok": false }` for unknown, expired, or unpublished words |
| GET | `/v1/content/:slug` | Browser | public key + Origin, optional `x-hp-session` from the lookup | — | `{ "access": true, "content": { slug, title, kind, bodyRef, bookingUrl } }` or `{ "access": false, "teaser": {…} }` |
| GET | `/v1/content/:slug` | Tenant server | secret key, no Origin, optional `x-hp-customer` email | — | Same shape. The email is how a paid entitlement is checked. A secret key sent from a browser (Origin present) is refused |

`slug` is lowercase letters, digits, and hyphens. A draft looks the same as a missing item: `404`.

### Staff session

Login first. The cookie is set by the response. Send it on later calls. POST and other unsafe methods must send `Origin` equal to one of `ADMIN_ORIGINS`.

| Method | Path | Roles | Body | Success |
|---|---|---|---|---|
| POST | `/auth/login` | public, but Origin must be an admin origin | `{ "email", "password", "totp"?, "tenantSlug"? }` | `200` and the session cookie. Every failure is `401 invalid_credentials`. Owner and admin must send a 6-digit `totp` |
| POST | `/auth/logout` | the session's user | — | Clears the cookie |
| GET | `/admin/content` | owner, admin, staff | — | `{ "items": […] }` |
| POST | `/admin/content` | owner, admin, staff | slug, title, kind (`guide`, `part`, `video`, `session`, `ebook`, `download`), accessMode (`open`, `keyword_first`, `paid`), optional summary, freeFrom, bodyRef, bookingUrl, priceMinor, currency, status | `201 { "ok": true, "id" }` |
| POST | `/admin/partners` | owner, admin, staff | `{ "displayName", "commissionPct", "payoutDetails"? }` | `201 { "ok": true, "id" }` |
| POST | `/admin/campaigns` | owner, admin, staff | title, optional platform, postUrl, triggerWord, partnerId | `201 { "ok": true, "id" }` |
| POST | `/admin/keywords` | owner, admin, staff | `{ "word", "contentSlug", "campaignId"? }` | `201 { "ok": true, "id", "word" }` |
| GET | `/admin/keywords/misses` | owner, admin, staff | — | Words that missed in the last 7 days: `{ "misses": [{ "word", "tries" }] }` |
| POST | `/admin/access/grant` | owner, admin, staff | `{ "email", "contentSlug", "note"? }` | Manual entitlement when checkout is not used. `{ "ok": true, "granted": true }` |
| POST | `/admin/sites` | owner, admin | `{ "domain", "origins": ["https://thehardport.com"] }` | `201` with `publicKey` and `secretKey`. The secret is shown once |
| GET | `/partner/campaigns` | partner | — | That partner's campaigns only |
| GET | `/partner/stats` | partner | — | Counts for the last 30 days. No visitor emails |

### Payments calls this

| Method | Path | Caller | Auth | Body | Success |
|---|---|---|---|---|---|
| POST | `/internal/events` | Payments outbox | HMAC | `{ "id", "type": "order.paid" or "order.refunded", "tenantId", "data": { "orderId", "customerEmail", "itemRef" } }` | `{ "ok": true }`. The same `id` again returns `{ "ok": true, "duplicate": true }`. Unknown `itemRef` returns `422` so Payments retries |

## Payments routes

Default port 4002.

### Tenant server calls these

| Method | Path | Caller | Auth | Success |
|---|---|---|---|---|
| POST | `/internal/checkout-sessions` | Tenant server (or Access) | HMAC | Pending order plus `redirectUrl` (fake gateway) or `captureContext`, `clientLibrary`, `clientLibraryIntegrity` (CyberSource). Already paid: `{ "orderId", "status": "paid" }` |
| POST | `/internal/checkout-sessions/complete` | Tenant server | HMAC | Body `{ "tenantId", "orderId", "transientToken" }`. Paid: `{ "ok": true, "orderId", "status": "paid" }`. Declined: `{ "status": "declined" }` |

Complete errors worth handling:

| Status | `error` or `flagged` | Meaning |
|---|---|---|
| 400 | `invalid_token` | The transient token did not verify. The order is `pending` again |
| 409 | `checkout_expired` | The capture context is older than its 15 minute life. Start a new checkout |
| 409 | `payment_in_progress` | A charge is already in flight. Do not send another token yet |
| 409 | `checkout_not_started` | This order has no capture context |
| 409 | `external_ref_conflict` | On create: this `externalRef` was already used for a different item or price |
| 200 | `flagged: amount_mismatch` or `needs_review` | CyberSource did not authorize the order amount. The order stays `processing` and is not entitled |
| 502 | `gateway_unavailable` | CyberSource did not answer. If the order is `processing`, do not retry the charge blindly |

### Gateway calls this

| Method | Path | Caller | Auth | Body |
|---|---|---|---|---|
| POST | `/gateway/fake/:tenantId/notify` | The fake gateway in tests | `x-fake-signature`: HMAC-SHA256 of the raw body with that tenant's gateway secret | `{ "eventId", "orderId", "decision": "ACCEPT" or "DECLINE" or "REFUND", "amountMinor", "currency", "transactionId" }` |
| POST | `/gateway/cybersource/:tenantId/notify` | nobody yet | always `401` | Refund and chargeback webhooks are not signed yet. Do not point CyberSource here until that exists |

A genuine `ACCEPT` whose amount and currency match the order marks it paid. A mismatch is stored and does not. Replaying the same `eventId` returns `{ "ok": true, "duplicate": true }`.

### Staff session

Same cookie as Access, same `ADMIN_ORIGINS` rule. The partner role cannot read orders or emails.

| Method | Path | Roles | Success |
|---|---|---|---|
| GET | `/partner/commissions` | partner | `{ "commissions": [{ id, amount_minor, currency, status, payable_after, paid_at }], "totals": […] }` |
| GET | `/admin/commissions?status=pending` | owner, admin, staff | `status` is optional: `pending`, `payable`, `paid`, `void` |
| POST | `/admin/commissions/mark-paid` | owner, admin | Body `{ "ids": ["uuid"], "payoutRef": "TRF-1" }`. Only rows already `payable` change. `{ "paid", "skipped" }` |

Commissions stay `pending` until `payable_after` (default 30 days), then a background job promotes them. Recording a payout does not move money. The tenant pays the partner from their own bank and writes the reference here.

## Inside each service

Access, after a request is authenticated, opens one transaction with `Db.withTenant`. That sets `app.tenant_id` and `app.role`. Row-level security hides every other tenant. The response is sent after the transaction commits.

Payments does the same. Marking an order paid, inserting the commission, and inserting the outbox row happen in one transaction (`applyDecision`). The outbox sender runs on a timer, signs the event, and POSTs it to Access. Access de-duplicates on the event id, so a retry cannot grant twice.

Neither service imports the website. Another product uses the same routes, with its own tenant, its own API keys, and its own gateway credentials.
