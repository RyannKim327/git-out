function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}
// Stricter version (allows common country codes and newer TLDs)
const strictEmailRegex = 
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const emails = [
  "user@example.com",          // Valid
  "user.name+tag@sub.domain.co.uk", // Valid
  "invalid@domain",            // Invalid (missing TLD)
  "noatsign.com",              // Invalid
  "spaces @domain.com",        // Invalid
  "unicode@exämple.com"        // Might require additional handling
];

emails.forEach(email => {
  console.log(`${email}: ${isValidEmail(email)}`);
});
npm install validator
import validator from 'validator';

validator.isEmail('test@example.com'); // Returns boolean
