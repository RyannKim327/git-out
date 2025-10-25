const emailRegex = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
/**
 * Validates an email address using a regular expression.
 *
 * @param email The email string to validate.
 * @returns true if the email is valid, false otherwise.
 */
function isValidEmail(email: string): boolean {
  // A robust, commonly used regex for email validation.
  // It handles most common cases including quoted local parts and IP address literals.
  const emailRegex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  return emailRegex.test(email);
}

// --- Usage Examples ---

console.log(`"test@example.com" is valid: ${isValidEmail("test@example.com")}`); // true
console.log(`"john.doe@sub.example.co.uk" is valid: ${isValidEmail("john.doe@sub.example.co.uk")}`); // true
console.log(`"first.last@domain-with-hyphen.net" is valid: ${isValidEmail("first.last@domain-with-hyphen.net")}`); // true
console.log(`"user@192.168.1.1" is valid: ${isValidEmail("user@[192.168.1.1]")}`); // true
console.log(`""prettyandsimple"@example.com" is valid: ${isValidEmail(`"prettyandsimple"@example.com`)}`); // true

console.log(`"invalid-email" is valid: ${isValidEmail("invalid-email")}`); // false
console.log(`"no-at.com" is valid: ${isValidEmail("no-at.com")}`); // false
console.log(`"user@domain" is valid: ${isValidEmail("user@domain")}`); // false (TLD must be 2+ chars)
console.log(`"user@.com" is valid: ${isValidEmail("user@.com")}`); // false
console.log(`"user@domain." is valid: ${isValidEmail("user@domain.")}`); // false
console.log(`"user@domain..com" is valid: ${isValidEmail("user@domain..com")}`); // false
console.log(`"user..name@example.com" is valid: ${isValidEmail("user..name@example.com")}`); // false (consecutive dots in local part)
npm install validator
# or
yarn add validator
import validator from 'validator';

function isValidEmailWithLibrary(email: string): boolean {
  return validator.isEmail(email);
}

console.log(`"test@example.com" with validator: ${isValidEmailWithLibrary("test@example.com")}`);
console.log(`"user..name@example.com" with validator: ${isValidEmailWithLibrary("user..name@example.com")}`); // false
