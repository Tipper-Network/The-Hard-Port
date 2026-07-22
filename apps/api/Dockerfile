# syntax=docker/dockerfile:1

FROM node:22-alpine AS build

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/api/package.json apps/api/

# Prisma generate runs on postinstall — placeholder URL for build only
ENV DATABASE_URL="postgresql://build:build@localhost:5432/build?sslmode=disable"

RUN pnpm install --frozen-lockfile

COPY apps/api apps/api

RUN pnpm --filter api build

FROM node:22-alpine AS runner

RUN apk add --no-cache wget

RUN corepack enable

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

COPY --from=build /app/package.json /app/pnpm-workspace.yaml /app/pnpm-lock.yaml ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/api/package.json ./apps/api/
COPY --from=build /app/apps/api/dist ./apps/api/dist
COPY --from=build /app/apps/api/prisma ./apps/api/prisma
COPY --from=build /app/apps/api/prisma.config.ts ./apps/api/
COPY apps/api/docker-entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

WORKDIR /app/apps/api

USER node

EXPOSE 3001

ENTRYPOINT ["/entrypoint.sh"]
CMD ["node", "dist/main.js"]
