#!/usr/bin/env bash
# Forward local 5432 → Dokploy Postgres internal service.
# Usage: DOKPLOY_SSH=user@your-server ./scripts/db-tunnel.sh

set -euo pipefail

SSH_TARGET="${DOKPLOY_SSH:?Set DOKPLOY_SSH=user@your-dokploy-server}"
DB_HOST="${DOKPLOY_DB_HOST:-the-hard-port-thp-3ak6yu}"
LOCAL_PORT="${LOCAL_PORT:-5432}"
REMOTE_PORT="${REMOTE_PORT:-5432}"

echo "Tunnel: localhost:${LOCAL_PORT} → ${DB_HOST}:${REMOTE_PORT} via ${SSH_TARGET}"
echo "Keep this running, then: pnpm db:migrate:deploy"
exec ssh -N -L "${LOCAL_PORT}:${DB_HOST}:${REMOTE_PORT}" "${SSH_TARGET}"
