// Very permissive – just makes sure there is one @ and at least one dot after it.
const SIMPLE_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/**
 * RFC‑5322‑inspired but still readable.
 * Allows:
 *   - alphanumeric characters, dots, underscores, hyphens, plus signs in the local part
 *   - domain labels separated by dots, each label 1‑63 chars, TLD ≥ 2 chars
 *   - Internationalized domain names (IDN) via punycode (xn--…) – optional
 */
const STRICT_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:(?:[a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,})$/;
const STRICT_UNICODE_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:(?:[\p{L}\p{N}-]{1,63}\.)+[\p{L}]{2,})$/u;
/**
 * Validate an e‑mail address.
 *
 * @param email   The string to test.
 * @param pattern Optional custom RegExp. If omitted, the "strict" pattern is used.
 * @returns true if the string matches the pattern, false otherwise.
 *
 * @example
 *   isValidEmail('john.doe@example.com'); // true
 *   isValidEmail('invalid@@example.com'); // false
 */
export function isValidEmail(
  email: string,
  pattern: RegExp = STRICT_EMAIL_REGEX
): boolean {
  // Quick early‑exit for non‑string inputs (helps when the function is used with unknown data)
  if (typeof email !== 'string') return false;

  // Trim whitespace – users often paste with surrounding spaces.
  const trimmed = email.trim();

  // Test the regex.
  return pattern.test(trimmed);
}

/* ------------------------------------------------------------------ */
/* Optional overload that returns a typed result (useful for form libs) */
export type EmailValidationResult = {
  valid: boolean;
  reason?: string; // human‑readable error (optional)
};

/**
 * Validate and optionally get a reason why it failed.
 *
 * @param email   The e‑mail string.
 * @param pattern Optional custom RegExp.
 * @returns An object with `valid` and optional `reason`.
 */
export function validateEmail(
  email: string,
  pattern: RegExp = STRICT_EMAIL_REGEX
): EmailValidationResult {
  if (typeof email !== 'string') {
    return { valid: false, reason: 'Not a string' };
  }

  const trimmed = email.trim();

  if (trimmed.length === 0) {
    return { valid: false, reason: 'Empty string' };
  }

  if (!pattern.test(trimmed)) {
    return { valid: false, reason: 'Does not match e‑mail pattern' };
  }

  return { valid: true };
}
import { isValidEmail, validateEmail } from './emailValidator';

// Simple boolean check
if (isValidEmail(userInput)) {
  console.log('Looks good!');
} else {
  console.warn('Please enter a valid e‑mail address.');
}

// Detailed result (useful for UI error messages)
const result = validateEmail(userInput);
if (!result.valid) {
  console.error('Invalid e‑mail:', result.reason);
}
import { isValidEmail } from './emailValidator';

describe('isValidEmail – strict pattern', () => {
  const ok = [
    'john.doe@example.com',
    'user+tag@sub.domain.co.uk',
    'a_b-c.d@xn--d1acufc.xn--p1ai', // punycode domain (still matches strict pattern)
    'simple@example.io',
    '12345@numbers.net',
  ];

  const bad = [
    '',
    '   ',
    'plainaddress',
    '@no-local-part.com',
    'no-at-sign.com',
    'multiple@@ats.com',
    'trailingdot.@example.com',
    '.leadingdot@example.com',
    'spaces in@address.com',
    'user@-invalid-start.com',
    'user@invalid-.com',
    'user@toolongtoolongtoolongtoolongtoolongtoolongtoolongtoolong.com', // >63 chars label
    'user@domain.c', // TLD too short
  ];

  test.each(ok)('accepts %s', (email) => {
    expect(isValidEmail(email)).toBe(true);
  });

  test.each(bad)('rejects %s', (email) => {
    expect(isValidEmail(email)).toBe(false);
  });
});
import validator from 'validator';

export function isValidEmailLib(email: string): boolean {
  // Options mirror the strictness you want.
  return validator.isEmail(email, {
    allow_display_name: false,
    require_tld: true,
    allow_utf8_local_part: true,
    // domain_specific_validation: true, // checks MX records (optional, async)
  });
}
// emailValidator.ts
export const SIMPLE_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const STRICT_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:(?:[a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,})$/;

/**
 * Returns true if the supplied string looks like a valid e‑mail address.
 * By default it uses the stricter pattern.
 */
export function isValidEmail(email: string, pattern: RegExp = STRICT_EMAIL_REGEX): boolean {
  if (typeof email !== 'string') return false;
  return pattern.test(email.trim());
}

/**
 * Returns an object with a boolean flag and an optional reason.
 */
export function validateEmail(email: string, pattern: RegExp = STRICT_EMAIL_REGEX) {
  if (typeof email !== 'string') return { valid: false, reason: 'Not a string' };
  const trimmed = email.trim();
  if (!trimmed) return { valid: false, reason: 'Empty string' };
  if (!pattern.test(trimmed)) return { valid: false, reason: 'Invalid format' };
  return { valid: true };
}
// usage example (e.g., in a React component)
import { isValidEmail } from './emailValidator';

function onSubmit(e: React.FormEvent) {
  e.preventDefault();
  const email = (e.currentTarget as HTMLFormElement).email.value;
  if (!isValidEmail(email)) {
    alert('Please enter a valid e‑mail address.');
    return;
  }
  // …continue with form submission
}
