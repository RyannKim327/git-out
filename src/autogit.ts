function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Usage
console.log(isValidEmail("test@example.com")); // true
console.log(isValidEmail("invalid.email"));    // false
function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
}
class EmailValidator {
  private static emailRegex: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  static validate(email: string): boolean {
    return this.emailRegex.test(email);
  }

  static validateWithError(email: string): void {
    if (!this.validate(email)) {
      throw new Error(`Invalid email address: ${email}`);
    }
  }
}

// Usage
const email = "user@example.com";
if (EmailValidator.validate(email)) {
  console.log("Valid email");
}
interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

function validateEmailWithDetails(email: string): ValidationResult {
  const result: ValidationResult = {
    isValid: true,
    errors: []
  };

  // Check if empty
  if (!email || email.trim() === '') {
    result.isValid = false;
    result.errors.push('Email cannot be empty');
    return result;
  }

  // Basic regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    result.isValid = false;
    result.errors.push('Invalid email format');
  }

  // Check length
  if (email.length > 254) {
    result.isValid = false;
    result.errors.push('Email too long');
  }

  return result;
}
npm install validator
import validator from 'validator';

function isValidEmail(email: string): boolean {
  return validator.isEmail(email);
}

// Or with options
function isBusinessEmail(email: string): boolean {
  return validator.isEmail(email, { 
    allow_utf8_local_part: false,
    require_tld: true 
  });
}
interface EmailValidationOptions {
  allowSubdomains?: boolean;
  allowPlusSign?: boolean;
  requireTld?: boolean;
}

class CustomEmailValidator {
  static validate(
    email: string, 
    options: EmailValidationOptions = {}
  ): boolean {
    const { 
      allowSubdomains = true, 
      allowPlusSign = true, 
      requireTld = true 
    } = options;

    let regexPattern = '^[a-zA-Z0-9';
    
    if (allowPlusSign) {
      regexPattern += '+';
    }
    
    regexPattern += '.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?';
    
    if (allowSubdomains) {
      regexPattern += '(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*';
    } else {
      regexPattern += '\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?';
    }
    
    if (requireTld) {
      regexPattern += '$';
    } else {
      regexPattern += '(?:\\.[a-zA-Z]{2,})?$';
    }

    return new RegExp(regexPattern).test(email);
  }
}
// Use a library for robust validation
import validator from 'validator';

export class EmailService {
  static async validateEmail(email: string): Promise<boolean> {
    // Basic format check
    if (!validator.isEmail(email)) {
      return false;
    }

    // Additional checks
    if (email.length > 254) {
      return false;
    }

    // Optional: DNS validation or SMTP check
    return true;
  }

  static async sendVerificationEmail(email: string): Promise<void> {
    if (!await this.validateEmail(email)) {
      throw new Error('Invalid email address');
    }
    
    // Send verification email logic
  }
}
