function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Usage
console.log(isValidEmail("user@example.com")); // true
console.log(isValidEmail("invalid.email")); // false
function isValidEmailDetailed(email: string): boolean {
  // More comprehensive regex that checks for:
  // - Local part (before @): allows letters, numbers, dots, hyphens, underscores
  // - Domain: requires at least one dot after @
  // - Top-level domain: 2+ characters
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
}
function isValidEmailRFC5322(email: string): boolean {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
}
class EmailValidator {
  private static emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  static validate(email: string): { isValid: boolean; message?: string } {
    if (!email) {
      return { isValid: false, message: 'Email is required' };
    }

    if (!this.emailRegex.test(email)) {
      return { isValid: false, message: 'Invalid email format' };
    }

    return { isValid: true };
  }

  // Additional validation: check if domain exists (mock example)
  static async validateWithDomainCheck(email: string): Promise<{ isValid: boolean; message?: string }> {
    const basicValidation = this.validate(email);
    if (!basicValidation.isValid) {
      return basicValidation;
    }

    // Extract domain for additional checks
    const domain = email.split('@')[1];
    
    // Here you could add actual domain validation
    const isDomainValid = await this.checkDomain(domain);
    
    if (!isDomainValid) {
      return { isValid: false, message: 'Invalid email domain' };
    }

    return { isValid: true };
  }

  private static async checkDomain(domain: string): Promise<boolean> {
    // Mock implementation - in real scenario, you might check MX records
    return domain.length > 0;
  }
}

// Usage
const result = EmailValidator.validate('test@example.com');
console.log(result.isValid); // true
import validator from 'validator';

function validateEmailWithLibrary(email: string): boolean {
  return validator.isEmail(email);
}

// Install with: npm install validator @types/validator
interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

class EmailValidationService {
  private static readonly EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  static validateEmail(email: string): ValidationResult {
    const errors: string[] = [];
    
    if (!email) {
      errors.push('Email is required');
      return { isValid: false, errors };
    }
    
    if (email.length > 254) {
      errors.push('Email is too long');
    }
    
    if (!this.EMAIL_REGEX.test(email)) {
      errors.push('Invalid email format');
    }
    
    // Check local part length (before @)
    const localPart = email.split('@')[0];
    if (localPart.length > 64) {
      errors.push('Local part of email is too long');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// Usage example
const email = "user@example.com";
const validation = EmailValidationService.validateEmail(email);

if (validation.isValid) {
  console.log('Email is valid');
} else {
  console.log('Validation errors:', validation.errors);
}
