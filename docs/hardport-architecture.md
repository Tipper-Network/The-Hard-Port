# Hard Port Platform: Architecture

Two products that work on their own and connect over signed HTTP. Many websites (tenants) share one platform database and only ever see their own rows.

This file lives with the code, in `The Hard Port` (`/home/psyfer/Desktop/The-Hard-Port-stuff/The Hard Port`). Package manager is pnpm. The route catalogue is [`platform-routes.md`](platform-routes.md). Functions in `packages/core`, `services/access`, and `services/payments` carry JSDoc for callers, parameters, and return values.

| Product | Job | Schema / DB role |
|---|---|---|
| **Access** | Content, keyword/promo codes, free library, partners and attribution, staff and partner panels, entitlements | `access` / `hp_access` |
| **Payments** | Checkout sessions, Microform capture, orders, commissions, payouts record | `payments` / `hp_payments` |
| Shared (`platform` schema) | Tenants, users, sessions, memberships, sites, API keys, plans, subscriptions, licences, audit log | read through narrow functions |

Payments never holds money. Each tenant supplies its own gateway credentials (CyberSource tied to its own bank), stored AES-256-GCM encrypted.

## Where the code is

```
The Hard Port/
  apps/web          thehardport.com (Next.js). Own Prisma database.
  apps/api          website API (Nest). Same website database.
  packages/core     signing, sessions, field encryption, Db.withTenant
  services/access   port 4001, role hp_access
  services/payments port 4002, role hp_payments
  db/migrations     platform schema (not the website schema)
  scripts/platform  migrate and bootstrap
  docs/platform-routes.md
```

The website database (users, OAuth, applications) is not the platform database. One Postgres server with two databases is fine. One shared schema is not. Other sites can call Access and Payments over HTTP later without joining this repo.

The unzipped tree at `Desktop/hardport-platform` and the older `Desktop/payment-gateway-service` are not this codebase. Do not edit them.

## 1. Tenancy and isolation

1. Every tenant table has `tenant_id`. Foreign keys are composite `(tenant_id, id)`, so a row cannot point at another tenant's row.
2. Every request runs in one transaction. `Db.withTenant(actor, fn)` sets transaction-local settings (`app.tenant_id`, `app.role`, `app.partner_id`, `app.business_id`, `app.user_id`).
3. A RESTRICTIVE row-level-security policy `tenant_guard` on every tenant table is ANDed with the per-role policies. If the settings are unset, nothing is visible (fail closed).
4. Runtime roles (`hp_access`, `hp_payments`) are not table owners, have least-privilege grants, and cannot read pre-auth tables (users, sessions, login attempts, licences, tenants). Those are reached only through `SECURITY DEFINER` functions with a pinned `search_path`.
5. Roles: owner, admin, staff, partner, business, public, system. A partner cannot read customers or orders and sees only their own campaigns, events and commissions.

`packages/core/test/isolation.test.ts` checks this against a real Postgres, including a mutation check that proves the tests fail when a policy is removed.

## 2. Login and data safety

- Passwords: scrypt (N=2^15). Owner/admin must enrol TOTP; each code is accepted once (replay protected).
- Lockout: 5 failures per 15 min per email hash, 30 per IP. Every failure returns the same 401.
- Sessions: random token in an HttpOnly, SameSite=Lax cookie; only its SHA-256 is stored. `__Host-` prefix when secure.
- CSRF: Origin allow-list on all unsafe methods.
- API keys: `pk` (browser, tied to allowed origins) and `sk` (server only, rejected if an Origin header is present). Hashes only; shown once.
- Sensitive fields (2FA secrets, payout details, gateway credentials) are AES-256-GCM encrypted with a rotating key ring and context binding, so a ciphertext copied to another row will not decrypt.
- Service-to-service calls are HMAC-signed (key id, timestamp, nonce, body hash) with replay rejection. Keyword sessions are signed short-lived tokens.
- All request bodies use `.strict()` schemas: no mass assignment, tenant always comes from the session or key.
- Audit log is append-only (triggers block update and delete).
- Responses are sent only after the transaction commits.

## 3. How Access and Payments connect

```
Website -> Access: keyword lookup (pk) -> content unlocked (keyword session)
Access  -> Payments: signed POST /internal/checkout-sessions   (price computed server-side)
Payments -> CyberSource: POST /microform/v2/sessions           (capture context, target origin from the tenant)
Browser: CyberSource iframes. Card data stays in those iframes. Browser receives a transient token.
Website server -> Payments: signed POST /internal/checkout-sessions/complete
Payments -> CyberSource: POST /pts/v2/payments                 (transient token + the order amount)
Payments: order + commission + outbox row, one transaction
Payments -> Access: signed POST /internal/events               (outbox, retries with backoff)
Access: creates entitlement, content opens. Refund event revokes it.
```

`processing` means a charge was submitted. A second complete call does not charge again. A bad token, expired context, bad credentials, a gateway rejection, or an unsupported currency puts the order back to `pending`. A timeout or a 5xx from CyberSource leaves the order `processing`, because the card may already have been charged. An authorization whose amount does not match the order does not mark it paid. `REVIEW` does not mark it paid.

The fake gateway still uses a redirect URL and `POST /gateway/fake/:tenantId/notify` so the paid, commission, and outbox tests keep running. CyberSource does not use that notify route. Do not point CyberSource webhooks at it until signing is confirmed.

Commissions are held (default 30 days), then `promote_commissions()` makes them payable; the owner records manual payouts.

Credential JSON for CyberSource, encrypted with AAD `gw:<tenantId>:cybersource:<mode>`: `merchantId`, `keyId`, `sharedSecret` (base64), `targetOrigins` (https origins, no path, never taken from the browser), optional `allowedCardNetworks` (default VISA and MASTERCARD).

## 4. Licensing and the monthly model

- **Hosted**: tenant row + subscription (`plans` seeded with placeholder prices; replace). Billing integration is not built yet.
- **Self-install**: Ed25519-signed licence key, verified offline. This is soft enforcement; anyone with the source can remove the check, so the real protection is support, updates and the hosted option.

## 5. Known limits (read before production)

1. **CyberSource sale path is Microform v2** (capture context, then `/pts/v2/payments` with the transient token). Webhook signing for refunds is not built; `verifyNotification` rejects everything. 3-D Secure, eCheck, and saved cards (TMS) are not built. Confirm those with the bank before live charges. The fake gateway still covers the notification tests.
2. The website checkout widget is not wired. The API is the part that exists.
3. Nonce store and rate limiter are in memory: fine for one instance; use Redis or Postgres before running several.
4. RLS protects against forgotten `WHERE` clauses, not SQL injection. Parameterised queries remain mandatory.
5. `body_ref` is returned raw; swap for short-lived signed storage URLs.
6. `__Host-` cookies need both products on one host (reverse-proxy paths) or separate cookie names per product.
7. scrypt is used instead of argon2id to avoid native dependencies.
8. Subscription billing, partner invite flow, business-client accounts UI and the admin front end are not built; the API supports them.
9. Run a third-party security review before onboarding other people's customers.

## 6. Suggested phases

1. Done in this repo: Access and Payments beside the website, pnpm workspace, Microform sale path, route catalogue, JSDoc.
2. Wire thehardport.com to checkout and complete, then run the bank sandbox. Manual paid grants still work without the widget.
3. Admin and partner front end.
4. Subscription billing for tenants; licence issuing tool.
5. DM/comment automation once the structure is settled.
