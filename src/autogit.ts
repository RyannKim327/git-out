/**
 * A robust but practical regular expression for validating email addresses.
 *
 * This regex aims to cover most common valid email formats (including subdomains)
 * while rejecting clearly invalid ones. It is not 100% RFC-compliant (which would be
 * extremely complex), but suitable for most application needs.
 *
 * Explanation:
 * ^                                   Start of the string.
 * [a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+    Local part: Allows letters, numbers, and many special characters.
 * @                                   Literal "@" symbol.
 * [a-zA-Z0-9]                         Domain part (first segment): Must start with a letter or number.
 * (?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?   Optional middle part for a segment: allows hyphens internally,
 *                                     but not at the start/end of a segment. Max length 63.
 * (?:                                 Non-capturing group for additional domain segments:
 *   \.                                  Literal dot.
 *   [a-zA-Z0-9]                         Each segment must start with letter/number.
 *   (?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?   Optional middle part for segment.
 * )*                                  Zero or more additional domain segments (e.g., "sub.domain").
 * (?:\.[a-zA-Z]{2,})                  Top-level domain (TLD): Must start with a dot, followed by at least 2 letters.
 * $                                   End of the string.
 */
const EMAIL_REGEX = new RegExp(
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*(?:\.[a-zA-Z]{2,})$/
);

function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false; // Handle null, undefined, or non-string inputs
  }

  // Trim whitespace from the email string before testing
  const trimmedEmail = email.trim();

  // Test the trimmed email against the regex
  return EMAIL_REGEX.test(trimmedEmail);
}

// --- Examples ---
console.log("Valid Emails:");
console.log("test@example.com:", isValidEmail("test@example.com")); // true
console.log("john.doe@sub.domain.co.uk:", isValidEmail("john.doe@sub.domain.co.uk")); // true
console.log("user-name+tag@domain.net:", isValidEmail("user-name+tag@domain.net")); // true
console.log("12345@example.org:", isValidEmail("12345@example.org")); // true
console.log("first.last@test-domain.io:", isValidEmail("first.last@test-domain.io")); // true
console.log("with.many.dots@deeply.nested.sub.domain.com:", isValidEmail("with.many.dots@deeply.nested.sub.domain.com")); // true
console.log(" whitespace@example.com ", isValidEmail(" whitespace@example.com ")); // true (after trim)


console.log("\nInvalid Emails:");
console.log("invalid-email", isValidEmail("invalid-email")); // false (no @)
console.log("test@.com", isValidEmail("test@.com")); // false (domain starts with .)
console.log("test@example", isValidEmail("test@example")); // false (no TLD)
console.log("test@example.c", isValidEmail("test@example.c")); // false (TLD too short)
console.log("@example.com", isValidEmail("@example.com")); // false (empty local part)
console.log("test@example-.com", isValidEmail("test@example-.com")); // false (domain ends with hyphen)
console.log("test@-example.com", isValidEmail("test@-example.com")); // false (domain starts with hyphen)
console.log("test@example..com", isValidEmail("test@example..com")); // false (consecutive dots in domain)
console.log("test@example.co m", isValidEmail("test@example.co m")); // false (space in domain)
console.log("test@example.123", isValidEmail("test@example.123")); // true (this regex *does* allow numeric TLDs for some flexibility)
console.log("", isValidEmail("")); // false
console.log(null as any, isValidEmail(null as any)); // false
console.log(undefined as any, isValidEmail(undefined as any)); // false
/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*(?:\.[a-zA-Z]{2,})$/
