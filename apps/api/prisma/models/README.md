# Prisma models

Add one `.prisma` file per domain area. Prisma merges all files under `prisma/` when `schema: "prisma"` is set in `prisma.config.ts`.

| Path | Domain |
|---|---|
| `models/intake/` | Application and intake |
| `models/auth/` | Users and OAuth accounts |
| `models/lifecycle/` | Pipeline stages (future) |
| `models/commercial/` | Agreements and payments (future) |

Do not put a `datasource` block in model files. The root `prisma/schema.prisma` holds `generator` + `datasource provider`; the connection URL lives in `prisma.config.ts` (Prisma 7).
