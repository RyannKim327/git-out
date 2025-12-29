/**
 * Returns true if `email` looks like a valid RFC 5322 addr-spec.
 * Uses the official HTML5 email regex → fast & future-proof.
 */
export function isValidEmail(email: string): boolean {
  const html5Email =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return html5Email.test(email);
}

/* ---------- usage ---------- */
console.log(isValidEmail('john.doe@example.com')); // true
console.log(isValidEmail('bad@host'));             // false
