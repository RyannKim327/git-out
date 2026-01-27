/**
 * Minimal email validator.
 * Covers most real‑world cases without being overly strict.
 */
export function isValidEmail(email: string): boolean {
  // 1. Basic structural check: local part @ domain
  // 2. Local part: letters, digits, dots, hyphens, underscores, and plus
  // 3. Domain: DNS‑style labels separated by dots; ends in 2‑63‑letter TLD
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,64}$/;
  return pattern.test(email);
}
import validator from 'validator';

function isValidFullEmail(email: string): boolean {
  return validator.isEmail(email);  // uses RFC‑compliant logic
}
console.log(isValidEmail('user@example.com'));   // true
console.log(isValidEmail('bob.smith@sub.domain.co')); // true
console.log(isValidEmail('invalid-email@'));    // false
