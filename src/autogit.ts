/**
 * Validate an email address format using regex (covers most practical cases)
 * Note: Does NOT guarantee the email exists. Additional verification is needed for full validation.
 */
function isValidEmail(email: string): boolean {
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regex.test(email);
}

// Usage Example
const testEmail = "user.name+tag@domain.co.uk";
console.log(isValidEmail(testEmail));  // true
function validateEmail(email: string): boolean {
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
  // Basic regex check
  if (!regex.test(email)) return false;
  
  // Length checks per RFC standards
  const [localPart, domain] = email.split('@');
  return email.length <= 254 && 
         localPart.length <= 64 &&
         domain.length <= 253;
}
