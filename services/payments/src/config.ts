import { z } from 'zod';
import { parseKeyring, parseSigningKeys, type Keyring, type SigningKeys } from '@hardport/core';

const Env = z.object({
  DATABASE_URL: z.string().min(1),
  HOST: z.string().default('127.0.0.1'),
  PORT: z.coerce.number().int().default(4002),
  ADMIN_ORIGINS: z.string().default(''),
  COOKIE_SECURE: z.enum(['true', 'false']).default('true'),
  TRUST_PROXY: z.enum(['true', 'false']).default('false'),
  FIELD_KEYS: z.string().min(1),
  INTERNAL_SIGNING_KEYS: z.string().min(1), // same ring as the Access product
  ACCESS_INTERNAL_URL: z.string().url().default('http://127.0.0.1:4001'),
  // Days a commission waits before becoming payable (covers the refund / chargeback window).
  COMMISSION_HOLD_DAYS: z.coerce.number().int().min(0).max(365).default(30),
});

export interface PaymentsConfig {
  host: string;
  port: number;
  adminOrigins: string[];
  cookieSecure: boolean;
  trustProxy: boolean;
  fieldKeys: Keyring;
  internalKeys: SigningKeys;
  accessInternalUrl: string;
  commissionHoldDays: number;
}

/**
 * Reads Payments environment variables and refuses to start when one is missing or malformed.
 * `INTERNAL_SIGNING_KEYS` must be the same ring Access uses.
 * @param env - Defaults to `process.env`
 */
export function loadConfig(env: Record<string, string | undefined> = process.env): PaymentsConfig {
  const e = Env.parse(env);
  return {
    host: e.HOST,
    port: e.PORT,
    adminOrigins: e.ADMIN_ORIGINS.split(',').map((s) => s.trim()).filter(Boolean),
    cookieSecure: e.COOKIE_SECURE === 'true',
    trustProxy: e.TRUST_PROXY === 'true',
    fieldKeys: parseKeyring(e.FIELD_KEYS),
    internalKeys: parseSigningKeys(e.INTERNAL_SIGNING_KEYS),
    accessInternalUrl: e.ACCESS_INTERNAL_URL,
    commissionHoldDays: e.COMMISSION_HOLD_DAYS,
  };
}
