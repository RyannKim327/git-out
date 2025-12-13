/**
 * Returns `true` when `email` looks like a valid address.
 * Uses the official HTML5 e-mail regex.
 */
export function isValidEmail(email: string): boolean {
  const html5Email =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return html5Email.test(email);
}

/* ---------- usage ---------- */
console.log(isValidEmail('john.doe@example.com')); // true
console.log(isValidEmail('bad..dots@example.com')); // false
console.log(isValidEmail('no-tld@localhost'));       // false
