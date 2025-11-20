/**
 * Returns `true` if `email` is a syntactically valid e-mail address.
 * Uses the official HTML5 spec regex (https://html.spec.whatwg.org/#valid-e-mail-address).
 */
export function isValidEmail(email: string): boolean {
  const html5EmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return html5EmailRegex.test(email);
}

/* ---------- usage ---------- */
console.log(isValidEmail('john.doe@example.com')); // true
console.log(isValidEmail('bad@@example.com'));       // false
