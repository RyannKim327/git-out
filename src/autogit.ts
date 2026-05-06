/**
 * Very permissive yet useful email pattern.
 *
 *  - No whitespace
 *  - At least one character before and after the @
 *  - Requires a dot‑separated domain part
 *  - Accepts most user‑friendly variants (e.g. “foo+bar@baz.co.uk”)
 *
 * The pattern is intentionally simple: it catches the majority of mistakes while
 * avoiding needless complexity that can cost performance or readability.
 */
export const simpleEmailRE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Strict RFC‑5322 compliant-ish pattern.  
 *  - Handles quoted local‑part, escaped characters, and domain literals.
 *  - Still keeps things readable by splitting the regex into small parts.
 *
 * Use this only if you need the extra validation and can afford a slightly slower check.
 */
export const strictEmailRE = new RegExp(
  // Local part (quoted or unquoted)
  '^(([^\\s@]+)|"([^"\\\\]|\\\\.|\\\\")+")@' +
  // Domain part (letters, digits, hyphens, dots)
  '([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\\.)+[a-zA-Z]{2,}' +
  '$'
);

/**
 * Helper that returns `true` if the input matches *either* pattern.
 *
 * @param email Email string to validate.
 * @returns `true` when the string looks like a valid email address.
 */
export function isValidEmail(email: string): boolean {
  // Trim first – most forms send untrimmed values.
  const trimmed = email.trim();
  return simpleEmailRE.test(trimmed) || strictEmailRE.test(trimmed);
}
import { isValidEmail } from './emailValidator';

const test = 'user.name+tag@sub.domain.co.uk';

if (isValidEmail(test)) {
  console.log(`"${test}" passes the regex test`);
} else {
  console.log(`"${test}" is definitely not a valid email`);
}
const cases = [
  'simple@example.com',
  'user+mailbox/department=shipping@example.com',  // RFC‑5322 compliant but unusual
  'very.unusual.@.example.com',
  'disposable.style.email.with+symbol@example.com',
  '"much.more unusual"@example.com',
  'admin@mailserver1',                 // missing TLD
  'example@localhost',                 // often allowed in dev env
  'plainaddress',
  'email.@example.com',
  '@missing-local.org',
  'user@.invalid.com',
  'huge‑domain‑name‑that‑really‑long.com',
];

cases.forEach(e => console.log(e, isValidEmail(e)));
