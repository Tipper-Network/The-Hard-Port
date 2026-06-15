FROM oven/bun:1 AS build

WORKDIR /app

COPY apps/web/package.json apps/web/bun.lock ./
RUN bun install --frozen-lockfile

COPY apps/web .
RUN bun run build

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

COPY --from=build /app/.output ./.output

USER node

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
