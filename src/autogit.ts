const emailRegex: RegExp = 
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
function isValidEmail(email: string): boolean {
  const regex: RegExp = 
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return regex.test(email);
}
// Valid Emails
console.log(isValidEmail("user@example.com")); // true
console.log(isValidEmail("first.last@sub.domain.co.uk")); // true
console.log(isValidEmail("user+filter@example.io")); // true

// Invalid Emails
console.log(isValidEmail("plainaddress")); // false (missing @)
console.log(isValidEmail("@no-local-part.com")); // false
console.log(isValidEmail("user@.invalid-domain")); // false (domain starts with dot)
console.log(isValidEmail("user@domain..com")); // false (double dot in domain)
// Simplified: Requires "@" and a "." after it
const simpleEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
