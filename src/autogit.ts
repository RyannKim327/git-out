/**
 * Returns `true` if `email` is a syntactically valid e-mail address.
 * Uses the official HTML5 e-mail regex.
 */
export function isValidEmail(email: string): boolean {
  // HTML5’s e-mail regex (https://html.spec.whatwg.org/#e-mail-state-(type=email))
  const html5Email =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return html5Email.test(email);
}

/* ---------- usage ---------- */
console.log(isValidEmail('john.doe+tag@example.co.uk')); // true
console.log(isValidEmail('bad@address@com'));           // false
const rfc5322 =
  /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|\\[\x01-\x09\x0B\x0C\x0E-\x7F])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}|(?:\[(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?]))$/;
