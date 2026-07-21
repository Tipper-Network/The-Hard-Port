#!/bin/sh
set -e

cd /app/apps/api

if [ "${RUN_MIGRATIONS:-true}" = "true" ] && [ -n "${DATABASE_URL:-}" ]; then
  echo "Running prisma migrate deploy…"
  pnpm exec prisma migrate deploy
fi

exec "$@"
