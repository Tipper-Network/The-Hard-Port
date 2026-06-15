FROM node:22-alpine AS build

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/web/package.json apps/web/

RUN pnpm install --frozen-lockfile

COPY apps/web apps/web

RUN pnpm --filter web build

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

COPY --from=build /app/apps/web/.output ./.output

USER node

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
