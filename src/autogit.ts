// Simple regex for basic email validation
const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email: string): boolean {
  return emailRegex.test(email);
}

// Usage
console.log(isValidEmail("user@example.com")); // true
console.log(isValidEmail("invalid-email")); // false
console.log(isValidEmail("user@domain.co.uk")); // true
// More comprehensive email validation regex
const comprehensiveEmailRegex: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function validateEmail(email: string): boolean {
  // First, check length (max 254 characters as per RFC 5321)
  if (email.length > 254) {
    return false;
  }
  
  return comprehensiveEmailRegex.test(email);
}
class EmailValidator {
  // Basic pattern for quick validation
  private static basicPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // More comprehensive pattern
  private static comprehensivePattern: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  // Domain-specific validation (optional)
  private static tldPattern: RegExp = /\.[a-zA-Z]{2,}$/;

  /**
   * Validates an email address
   * @param email - Email string to validate
   * @param strict - Whether to use strict validation (default: false)
   * @returns Validation result with details
   */
  static validate(email: string, strict: boolean = false): {
    isValid: boolean;
    error?: string;
  } {
    if (typeof email !== 'string' || email.trim() === '') {
      return { isValid: false, error: 'Email cannot be empty' };
    }

    const trimmedEmail = email.trim().toLowerCase();
    
    // Basic checks
    if (trimmedEmail.length > 254) {
      return { isValid: false, error: 'Email too long (max 254 characters)' };
    }

    if (!strict) {
      // Quick validation
      if (!this.basicPattern.test(trimmedEmail)) {
        return { isValid: false, error: 'Invalid email format' };
      }
    } else {
      // Strict validation
      if (!this.comprehensivePattern.test(trimmedEmail)) {
        return { isValid: false, error: 'Invalid email format (strict mode)' };
      }
      
      // Check for valid TLD
      if (!this.tldPattern.test(trimmedEmail)) {
        return { isValid: false, error: 'Invalid top-level domain' };
      }
    }

    return { isValid: true };
  }

  /**
   * Simple boolean validation
   */
  static isValid(email: string, strict: boolean = false): boolean {
    return this.validate(email, strict).isValid;
  }

  /**
   * Extract domain from email
   */
  static getDomain(email: string): string | null {
    const match = email.match(/@(.+)/);
    return match ? match[1] : null;
  }
}

// Usage examples
console.log(EmailValidator.isValid("user@example.com")); // true
console.log(EmailValidator.isValid("invalid-email")); // false
console.log(EmailValidator.isValid("test+filter@gmail.com", true)); // true

const result = EmailValidator.validate("user@domain.co.uk", true);
console.log(result); // { isValid: true }

const invalidResult = EmailValidator.validate("invalid@", true);
console.log(invalidResult); // { isValid: false, error: 'Invalid email format (strict mode)' }

console.log(EmailValidator.getDomain("user@example.com")); // "example.com"
import { useState, useCallback } from 'react';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const useEmailValidation = () => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = useCallback((email: string): boolean => {
    if (!email || email.trim() === '') {
      setIsValid(false);
      setError('Email is required');
      return false;
    }

    const trimmedEmail = email.trim();
    const valid = emailRegex.test(trimmedEmail);

    setIsValid(valid);
    setError(valid ? null : 'Please enter a valid email address');
    
    return valid;
  }, []);

  return {
    isValid,
    error,
    validateEmail,
    reset: () => {
      setIsValid(null);
      setError(null);
    }
  };
};

// Usage in component
const MyComponent = () => {
  const { isValid, error, validateEmail } = useEmailValidation();
  
  const handleSubmit = (email: string) => {
    const isEmailValid = validateEmail(email);
    if (isEmailValid) {
      // Proceed with form submission
      console.log('Email is valid!');
    }
  };

  return (
    <div>
      <input 
        type="email" 
        onBlur={(e) => validateEmail(e.target.value)}
        placeholder="Enter email"
      />
      {error && <span style={{color: 'red'}}>{error}</span>}
      {isValid && <span style={{color: 'green'}}>✓ Valid email</span>}
    </div>
  );
};
