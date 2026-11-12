#!/usr/bin/env bash
# Refresh deploy/smb-access-service lockfile and copy packages/core from Hard Port monorepo.
# Edit Access API in deploy/smb-access-service/apps/api (apps/* layout — see REPO-LAYOUT.md).
#
#   ./scripts/publish/sync-smb-access-service.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
DEST="${ROOT}/deploy/smb-access-service"
STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT

if [[ ! -d "$DEST/apps/api" ]]; then
  echo "Missing $DEST/apps/api — clone SMB-access-service or run from Hard Port with deploy/ populated."
  exit 1
fi

echo "Staging deploy tree in $STAGE"

mkdir -p "$STAGE/packages/core" "$STAGE/apps/api" "$STAGE/apps/web" "$STAGE/db/migrations"

rsync -a --delete \
  --exclude node_modules --exclude .env --exclude .git \
  "$ROOT/packages/core/" "$STAGE/packages/core/"
rsync -a --delete \
  --exclude node_modules --exclude .env --exclude .git \
  "$DEST/apps/api/" "$STAGE/apps/api/"
rsync -a \
  "$DEST/apps/web/" "$STAGE/apps/web/"
rsync -a "$DEST/db/migrations/" "$STAGE/db/migrations/"

cp "$DEST/Dockerfile" "$STAGE/Dockerfile"
cp "$DEST/REPO-LAYOUT.md" "$STAGE/REPO-LAYOUT.md"
cp "$DEST/.dockerignore" "$STAGE/.dockerignore" 2>/dev/null || cp "$ROOT/.dockerignore" "$STAGE/.dockerignore" 2>/dev/null || true
cp "$DEST/package.json" "$STAGE/package.json"
cp "$DEST/pnpm-workspace.yaml" "$STAGE/pnpm-workspace.yaml"
cp "$DEST/README.md" "$STAGE/README.md" 2>/dev/null || true
cp "$ROOT/docs/deploy-access-service.md" "$STAGE/DEPLOY.md"

mkdir -p "$STAGE/scripts/platform"
cp "$ROOT/scripts/platform/migrate.ts" "$STAGE/scripts/platform/migrate.ts"

echo "Regenerating lockfile…"
(cd "$STAGE" && corepack enable && pnpm install)

rsync -a --delete \
  --exclude .git --exclude node_modules --exclude .env \
  "$STAGE/" "$DEST/"

echo "Done. Commit in deploy/smb-access-service and push to SMB-access-service on GitHub."
