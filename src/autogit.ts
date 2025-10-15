/**
 * A practical regex for email validation.
 * Covers most common email formats.
 *
 * - Allows alphanumeric characters, dots, underscores, percents, plus, and hyphens in the local part.
 * - Requires an '@' symbol.
 * - Allows alphanumeric characters and hyphens in the domain part.
 * - Requires at least one dot in the domain, followed by 2 or more letters for the TLD.
 *
 * Limitations:
 * - Does not strictly adhere to all RFC specifications (e.g., quoted local parts, IP literal domains).
 * - Does not handle internationalized domain names (IDN) or email address internationalization (EAI) out of the box.
 */
const practicalEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function isValidEmailPractical(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }
  return practicalEmailRegex.test(email);
}

// --- Examples ---
console.log("--- Practical Regex Examples ---");
console.log(`test@example.com: ${isValidEmailPractical("test@example.com")}`);      // true
console.log(`john.doe@sub.example.co.uk: ${isValidEmailPractical("john.doe@sub.example.co.uk")}`); // true
console.log(`user+tag@domain.net: ${isValidEmailPractical("user+tag@domain.net")}`);  // true
console.log(`invalid-email: ${isValidEmailPractical("invalid-email")}`);          // false
console.log(`@example.com: ${isValidEmailPractical("@example.com")}`);            // false
console.log(`test@.com: ${isValidEmailPractical("test@.com")}`);                  // false
console.log(`test@domain: ${isValidEmailPractical("test@domain")}`);              // false
console.log(`test@domain.c: ${isValidEmailPractical("test@domain.c")}`);          // false (TLD must be 2+ chars)
console.log(`"john.doe"@example.com: ${isValidEmailPractical('"john.doe"@example.com')}`); // false (doesn't handle quoted local part)
/**
 * A more robust regex for email validation, often used in HTML5 email input validation.
 * It's more complex but covers more valid email formats than the practical one.
 *
 * - Handles quoted strings in the local part (e.g., "John Doe"@example.com).
 * - Handles IP literal domains (e.g., user@[192.168.1.1]).
 * - Still has limitations regarding full RFC compliance and internationalization.
 */
const robustEmailRegex = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

function isValidEmailRobust(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }
  return robustEmailRegex.test(email);
}

// --- Examples ---
console.log("\n--- Robust Regex Examples ---");
console.log(`test@example.com: ${isValidEmailRobust("test@example.com")}`);      // true
console.log(`"john.doe"@example.com: ${isValidEmailRobust('"john.doe"@example.com')}`); // true (handles quoted local part)
console.log(`user@[192.168.1.1]: ${isValidEmailRobust("user@[192.168.1.1]")}`);    // true (handles IP literal domain)
console.log(`user+tag@domain.net: ${isValidEmailRobust("user+tag@domain.net")}`);  // true
console.log(`invalid-email: ${isValidEmailRobust("invalid-email")}`);          // false
console.log(`@example.com: ${isValidEmailRobust("@example.com")}`);            // false
console.log(`test@.com: ${isValidEmailRobust("test@.com")}`);                  // false
console.log(`test@domain: ${isValidEmailRobust("test@domain")}`);              // false
console.log(`test@domain.c: ${isValidEmailRobust("test@domain.c")}`);          // false
