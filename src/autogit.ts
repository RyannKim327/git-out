// email.ts
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/**
 * Returns true when the supplied string is a syntactically valid e-mail address.
 */
export function isValidEmail(value: unknown): boolean {
  return typeof value === 'string' && EMAIL_REGEX.test(value);
}
import { isValidEmail } from './email';

console.log(isValidEmail('john.doe@example.com')); // true
console.log(isValidEmail('bad..addr@site.org')); // false
