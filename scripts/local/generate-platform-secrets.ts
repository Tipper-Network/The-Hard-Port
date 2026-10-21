import { randomBytes } from 'node:crypto';

const fieldKey = randomBytes(32).toString('base64');
const pepper = randomBytes(24).toString('base64url');
const internal = randomBytes(32).toString('base64url');
const keyword = randomBytes(32).toString('base64url');

console.log(`
# Paste into services/access/.env (local only — generate fresh values for production)

IP_PEPPER=${pepper}
FIELD_KEYS={"current":"k1","keys":{"k1":"${fieldKey}"}}
INTERNAL_SIGNING_KEYS={"current":"k1","keys":{"k1":"${internal}"}}
KEYWORD_SESSION_KEYS={"current":"k1","keys":{"k1":"${keyword}"}}
ACCESS_TEST_OTP=123456
`);
