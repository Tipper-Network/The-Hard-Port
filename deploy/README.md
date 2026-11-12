# Deploy artifacts

| Path | Purpose |
|------|---------|
| `smb-access-service/` | Git **submodule** → [Tipper-Network/SMB-access-service](https://github.com/Tipper-Network/SMB-access-service) — Dokploy builds `Dockerfile` here |

Fresh clone: `git submodule update --init --recursive` (or `git clone --recurse-submodules …`).

Layout: **`apps/api`** (API), **`apps/web`** (future). See `smb-access-service/REPO-LAYOUT.md`.

Refresh core from monorepo: `./scripts/publish/sync-smb-access-service.sh` — then commit **inside** the submodule and bump the gitlink in Hard Port.
