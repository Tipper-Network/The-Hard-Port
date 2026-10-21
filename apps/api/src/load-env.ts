import { config } from 'dotenv'

// Must run before any module reads process.env (ESM hoists imports; keep this as the first import in main.ts).
config()
config({ path: '.env.local', override: true })
