function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Usage
console.log(isValidEmail("test@example.com")); // true
console.log(isValidEmail("invalid-email"));    // false
function isValidEmailStrict(email: string): boolean {
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
  
  static validateWithAdditionalChecks(email: string): { isValid: boolean; message: string } {
    if (!email) {
      return { isValid: false, message: 'Email is required' };
    }
    
    const trimmedEmail = email.trim();
    
    if (trimmedEmail.length === 0) {
      return { isValid: false, message: 'Email cannot be empty' };
    }
    
    if (!this.EMAIL_REGEX.test(trimmedEmail)) {
      return { isValid: false, message: 'Invalid email format' };
    }
    
    // Additional length check
    if (trimmedEmail.length > 254) {
      return { isValid: false, message: 'Email is too long' };
    }
    
    return { isValid: true, message: 'Valid email' };
  }
}

// Usage
console.log(EmailValidator.validate('user@example.com')); // true
console.log(EmailValidator.validateWithAdditionalChecks('invalid')); 
// { isValid: false, message: 'Invalid email format' }
// First install: npm install validator
import validator from 'validator';

function validateEmailWithLibrary(email: string): boolean {
  return validator.isEmail(email);
}
type Email = string & { readonly __brand: unique symbol };

function isEmail(value: string): value is Email {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

function createEmail(value: string): Email | null {
  return isEmail(value) ? value as Email : null;
}

// Usage
const email1 = createEmail('test@example.com');
if (email1) {
  // TypeScript knows email1 is a valid Email type
  console.log('Valid email:', email1);
}
class EmailValidation {
  // Simple validation - good for most use cases
  static simple(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // RFC 5322 compliant (more strict)
  static rfc5322(email: string): boolean {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }

  // Validation with length constraints
  static withConstraints(email: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (!email) {
      errors.push('Email is required');
      return { isValid: false, errors };
    }

    const trimmed = email.trim();
    
    if (trimmed.length > 254) {
      errors.push('Email too long (max 254 characters)');
    }
    
    if (!this.simple(trimmed)) {
      errors.push('Invalid email format');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// Usage examples
const testEmails = [
  'user@example.com',
  'invalid-email',
  'user@sub.domain.com',
  'user+tag@example.com'
];

testEmails.forEach(email => {
  const result = EmailValidation.withConstraints(email);
  console.log(`${email}: ${result.isValid ? 'Valid' : 'Invalid'}`);
  if (!result.isValid) {
    console.log('  Errors:', result.errors);
  }
});
