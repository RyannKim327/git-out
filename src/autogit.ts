const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
/**
 * Validates an email address using a common regular expression.
 *
 * @param email The email string to validate.
 * @returns true if the email is valid, false otherwise.
 */
function isValidEmail(email: string): boolean {
  // A reasonably robust regex for email validation
  // It handles most common valid email formats but is not 100% RFC-compliant
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

// --- Usage Examples ---

console.log("Valid emails:");
console.log(`test@example.com: ${isValidEmail("test@example.com")}`);       // true
console.log(`john.doe@sub.domain.co: ${isValidEmail("john.doe@sub.domain.co")}`); // true
console.log(`user123@email.org: ${isValidEmail("user123@email.org")}`);     // true
console.log(`my-email+alias@gmail.com: ${isValidEmail("my-email+alias@gmail.com")}`); // true
console.log(`_underscore.test@host.io: ${isValidEmail("_underscore.test@host.io")}`); // true

console.log("\nInvalid emails:");
console.log(`invalid-email: ${isValidEmail("invalid-email")}`);         // false (no @ or domain)
console.log(`@domain.com: ${isValidEmail("@domain.com")}`);             // false (no local part)
console.log(`user@.com: ${isValidEmail("user@.com")}`);                 // false (invalid domain part)
console.log(`user@domain: ${isValidEmail("user@domain")}`);             // false (no TLD)
console.log(`user@domain.c: ${isValidEmail("user@domain.c")}`);         // false (TLD too short)
console.log(`user@domain..com: ${isValidEmail("user@domain..com")}`);   // false (double dot in domain)
console.log(`test@example.c123: ${isValidEmail("test@example.c123")}`); // true (allows digits in TLD with this regex, which is often undesirable for common TLDs like .com, but valid for some new ones)
// Note: If you want to restrict TLD to letters only, change `[a-zA-Z]{2,}` to `[a-zA-Z]{2,63}`
// or a more specific list. However, this regex is designed to be generally permissive for common use.
