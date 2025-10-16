const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmailBasic(email: string): boolean {
  return emailRegex.test(email);
}
// More comprehensive regex that handles most common email formats
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function isValidEmail(email: string): boolean {
  return emailRegex.test(email);
}
class EmailValidator {
  // RFC 5322 compliant regex (simplified version)
  private static emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  /**
   * Validate email address format
   * @param email - Email address to validate
   * @returns boolean indicating if email is valid
   */
  public static validate(email: string): boolean {
    if (!email || typeof email !== 'string') {
      return false;
    }
    
    // Check length constraints
    if (email.length > 254) {
      return false;
    }
    
    return this.emailRegex.test(email);
  }

  /**
   * Validate email with additional checks
   * @param email - Email address to validate
   * @returns Object with validation results
   */
  public static validateDetailed(email: string): {
    isValid: boolean;
    reasons: string[];
  } {
    const reasons: string[] = [];
    
    if (!email) {
      reasons.push('Email is empty');
      return { isValid: false, reasons };
    }
    
    if (email.length > 254) {
      reasons.push('Email exceeds maximum length of 254 characters');
    }
    
    if (!this.emailRegex.test(email)) {
      reasons.push('Email format is invalid');
    }
    
    return {
      isValid: reasons.length === 0,
      reasons
    };
  }
}

// Usage examples
console.log(EmailValidator.validate('test@example.com')); // true
console.log(EmailValidator.validate('invalid-email')); // false

const result = EmailValidator.validateDetailed('user@domain.co.uk');
console.log(result); // { isValid: true, reasons: [] }
// Install: npm install validator
import validator from 'validator';

function validateEmail(email: string): boolean {
  return validator.isEmail(email);
}
type ValidEmail = string & { __brand: 'ValidEmail' };

function assertValidEmail(email: string): asserts email is ValidEmail {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    throw new Error(`Invalid email format: ${email}`);
  }
}

function createValidEmail(email: string): ValidEmail {
  assertValidEmail(email);
  return email as ValidEmail;
}

// Usage
try {
  const validEmail = createValidEmail('user@example.com');
  // validEmail is now typed as ValidEmail
} catch (error) {
  console.error('Invalid email');
}
// Combined approach: simple regex + library for complex cases
import validator from 'validator';

function validateEmailSafe(email: string): boolean {
  // Quick basic check first
  const basicCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!basicCheck) return false;
  
  // More thorough check with library
  return validator.isEmail(email);
}
