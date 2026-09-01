// A lean, common‑sense pattern that covers most real‑world emails
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Test whether a string looks like an e‑mail address
export function isEmail(str: string): boolean {
  return EMAIL_RE.test(str);
}
console.log(isEmail('foo@bar.com'));   // true
console.log(isEmail('invalid@'));      // false
console.log(isEmail('no-at-symbol'));  // false
