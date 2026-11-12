# Deploy artifacts

| Path | Purpose |
|------|---------|
| `smb-access-service/` | Git clone of [Tipper-Network/SMB-access-service](https://github.com/Tipper-Network/SMB-access-service) — Dokploy builds `Dockerfile` here |

Layout: **`apps/api`** (API), **`apps/web`** (future). See `smb-access-service/REPO-LAYOUT.md`.

Refresh core from monorepo: `./scripts/publish/sync-smb-access-service.sh`
