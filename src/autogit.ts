/**
 * Very light‑weight e‑mail validator – good for quick UI checks or APIs.
 * It agrees with the majority of real‑world addresses:   local@domain.com
 *
 * @param address – the string to test
 * @returns true if the format looks like an e‑mail, false otherwise
 */
export function isValidEmail(address: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(address);
}
import validator from 'email-validator';

validator.validate('test@example.com'); // true
const tests = [
  'alice@example.com',
  'bob@sub.domain.org',
  'invalid-email',
  'spaces@invalid .com',
  '@missing.local',
  'user@',
];

tests.forEach(email => console.log(`${email}: ${isValidEmail(email)}`));
