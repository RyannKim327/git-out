function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Usage
console.log(validateEmail("user@example.com")); // true
console.log(validateEmail("invalid-email")); // false
console.log(validateEmail("user@domain")); // false
function validateEmailComprehensive(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
}
class EmailValidator {
  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  static validate(email: string): boolean {
    if (!email || typeof email !== 'string') {
      return false;
    }
    return this.EMAIL_REGEX.test(email.trim());
  }
  
  static validateAndThrow(email: string): void {
    if (!this.validate(email)) {
      throw new Error(`Invalid email address: ${email}`);
    }
  }
}

// Usage
const isValid = EmailValidator.validate("test@example.com");
console.log(isValid); // true

try {
  EmailValidator.validateAndThrow("invalid-email");
} catch (error) {
  console.error(error.message); // "Invalid email address: invalid-email"
}
interface User {
  id: number;
  name: string;
  email: string;
}

class UserService {
  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  static createUser(name: string, email: string): User {
    if (!this.isValidEmail(email)) {
      throw new Error(`Invalid email format: ${email}`);
    }
    
    return {
      id: Date.now(),
      name,
      email: email.toLowerCase().trim()
    };
  }
  
  private static isValidEmail(email: string): boolean {
    return this.EMAIL_REGEX.test(email);
  }
}

// Usage
try {
  const user = UserService.createUser("John Doe", "john@example.com");
  console.log(user);
} catch (error) {
  console.error(error.message);
}
function validateEmailAdvanced(email: string): { isValid: boolean; reason?: string } {
  if (!email) {
    return { isValid: false, reason: "Email is required" };
  }
  
  const trimmedEmail = email.trim();
  
  if (trimmedEmail.length > 254) {
    return { isValid: false, reason: "Email is too long" };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(trimmedEmail)) {
    return { isValid: false, reason: "Invalid email format" };
  }
  
  // Additional check for valid domain
  const domain = trimmedEmail.split('@')[1];
  if (domain.length > 253) {
    return { isValid: false, reason: "Domain name is too long" };
  }
  
  return { isValid: true };
}

// Usage
const result = validateEmailAdvanced("user@example.com");
console.log(result); // { isValid: true }
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
