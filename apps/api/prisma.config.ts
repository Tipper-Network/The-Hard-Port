import 'dotenv/config'

import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  // Directory — loads schema.prisma + all prisma/models/**/*.prisma
  schema: 'prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
})
