import { config } from 'dotenv'

// .env.local overrides .env for local dev (DBeaver, pnpm db:migrate)
config()
config({ path: '.env.local', override: true })

import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  schema: 'prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
})
