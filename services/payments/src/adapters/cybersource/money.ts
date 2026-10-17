const EXPONENT: Record<string, number> = {
  USD: 2, EUR: 2, GBP: 2, AUD: 2, CAD: 2, CHF: 2, AED: 2,
  JPY: 0, KRW: 0,
};

/**
 * Formats an integer minor-unit amount as the decimal string CyberSource expects.
 * `10000` USD is `"100.00"`. JPY and KRW have no decimals.
 * @param minor - Amount in the currency's minor unit
 * @param currency - ISO 4217 code
 * @throws Error when the currency is not supported or the amount is not a non-negative integer
 */
export function minorToDecimal(minor: number, currency: string): string {
  const exp = EXPONENT[currency.toUpperCase()];
  if (exp === undefined) throw new Error(`unsupported_currency:${currency}`);
  if (!Number.isInteger(minor) || minor < 0) throw new Error('invalid_amount');
  if (exp === 0) return String(minor);
  const digits = minor.toString().padStart(exp + 1, '0');
  return `${digits.slice(0, -exp)}.${digits.slice(-exp)}`;
}

/**
 * Parses CyberSource's authorized amount back into minor units so it can be compared with the order.
 * @param amount - Decimal string such as `"100.00"`
 * @param currency - ISO 4217 code from the same response
 * @throws Error when the string has more decimal places than the currency allows
 */
export function decimalToMinor(amount: string, currency: string): number {
  const exp = EXPONENT[currency.toUpperCase()];
  if (exp === undefined) throw new Error(`unsupported_currency:${currency}`);
  if (!/^\d+(\.\d+)?$/.test(amount)) throw new Error('invalid_amount');
  const [whole, frac = ''] = amount.split('.');
  if (frac.length > exp) throw new Error('invalid_amount');
  const padded = frac.padEnd(exp, '0');
  return Number(whole) * 10 ** exp + Number(padded || '0');
}
