import { createPool, Db } from '@hardport/core';
import { buildApp } from './app.js';
import { loadConfig } from './config.js';
import { dispatchOutbox, httpSender } from './outbox.js';

// Connect as the restricted runtime role (hp_payments), never as the migration owner.
const config = loadConfig();
const db = new Db(createPool(process.env.DATABASE_URL!, 10));
const app = await buildApp({ db, config });
await app.listen({ host: config.host, port: config.port });
console.log(`[payments] listening on ${config.host}:${config.port}`);

const send = httpSender(config.accessInternalUrl, config.internalKeys);
const timers = [
  // deliver events to the Access product (at-least-once, retried with backoff)
  setInterval(() => void dispatchOutbox(db, send).catch((e) => console.error('[payments] outbox:', e.message)), 5_000),
  // commissions become payable once their refund window has passed
  setInterval(() => void db.withoutTenant((q) => q.query('SELECT payments.promote_commissions()')).catch((e) => console.error('[payments] promote:', e.message)), 3_600_000),
];

for (const sig of ['SIGINT', 'SIGTERM'] as const) {
  process.on(sig, async () => {
    timers.forEach(clearInterval);
    await app.close();
    await db.close();
    process.exit(0);
  });
}
