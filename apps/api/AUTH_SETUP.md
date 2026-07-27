# THP API — Auth (Google + Meta OAuth)

Operator sign-in for reviewers/admins. Public `/apply` intake stays open.

## Endpoints

| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/auth/providers` | — | Which OAuth providers are configured |
| GET | `/auth/google` | — | Start Google OAuth |
| GET | `/auth/google/callback` | — | Google callback → JWT → web redirect |
| GET | `/auth/meta` | — | Start Meta (Facebook) OAuth |
| GET | `/auth/meta/callback` | — | Meta callback → JWT → web redirect |
| GET | `/auth/me` | Bearer JWT | Current user |
| GET | `/intake/applications` | Bearer JWT + reviewer | List applications (reviewers) |
| POST | `/tracking/events` | — | Batch visitor events (public) |
| GET | `/tracking/funnel/summary` | Bearer JWT + reviewer | Funnel drop-off aggregates (`?days=30`) |
| GET | `/tracking/applications/:id/journey` | Bearer JWT + reviewer | Applicant event timeline |

## Environment

```env
JWT_SECRET=                          # required — openssl rand -hex 32
JWT_EXPIRES_IN=7d
WEB_APP_URL=http://localhost:3000

# Google Cloud Console → OAuth 2.0 Client
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=http://localhost:3001/auth/google/callback

# Meta Developer → Facebook Login
META_APP_ID=
META_APP_SECRET=
META_CALLBACK_URL=http://localhost:3001/auth/meta/callback

# Optional — restrict who can sign in (comma-separated emails)
AUTH_ALLOWLIST=
```

OAuth providers are **optional at startup**. Routes return `503` until credentials are set.

## Google setup

1. [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials
2. Create OAuth 2.0 Client ID (Web application)
3. Authorized redirect URI: `http://localhost:3001/auth/google/callback`
4. Copy Client ID + Secret to `.env`

## Meta setup

1. [Meta for Developers](https://developers.facebook.com/) → Create app → Facebook Login
2. Valid OAuth Redirect URI: `http://localhost:3001/auth/meta/callback`
3. Request permissions: **email**, **public_profile**, **user_birthday**, **user_gender**, **user_hometown**
4. Copy App ID + App Secret to `.env`

On sign-in, Meta profile fields are stored on `users`:

| Meta permission | DB column | Notes |
|-----------------|-----------|-------|
| email | `email` | Required for sign-in |
| public_profile | `name`, `image` | Display name + picture |
| user_birthday | `birth_date` | Only when Meta returns MM/DD/YYYY (year shared) |
| user_gender | `gender` | e.g. `male`, `female` |
| user_hometown | `hometown` | City name from Graph `hometown.name` |

## Web flow

1. User visits `{API}/auth/google` or `{API}/auth/meta`
2. After OAuth, API redirects to `{WEB}/auth/callback?token=…`
3. Web stores JWT in `localStorage` (`thp_access_token`)
4. Protected API calls: `Authorization: Bearer {token}`

Web env:

```env
NEXT_PUBLIC_THP_API_URL=http://localhost:3001
```

## Roles

| Role | Default | Notes |
|---|---|---|
| `user` | Applicant | Created from site tracking / application; cannot OAuth sign-in |
| `reviewer` | Operator | OAuth sign-in; can review applications |
| `admin` | Manual in DB | Future admin operations |

Promote users in Prisma Studio: `UPDATE users SET role = 'admin' WHERE email = '…'`.
