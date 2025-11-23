/**
 * Returns true if `email` is a syntactically valid e-mail address.
 * (Follows the HTML5 specification.)
 */
export function isValidEmail(email: string): boolean {
  // The pattern used by the HTML5 spec
  const html5Email =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  return html5Email.test(email);
}

/* ---------- usage ---------- */
console.log(isValidEmail('john.doe@example.com')); // true
console.log(isValidEmail('bad..dots@example.com'));  // false
