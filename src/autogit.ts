const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
class EmailValidator {
  // Basic email validation pattern
  private static basicPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // RFC 5322 compliant pattern (more comprehensive)
  private static rfc5322Pattern: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  /**
   * Validates email using basic pattern
   */
  static isValidBasic(email: string): boolean {
    return this.basicPattern.test(email);
  }

  /**
   * Validates email using RFC 5322 pattern
   */
  static isValidRFC5322(email: string): boolean {
    return this.rfc5322Pattern.test(email);
  }

  /**
   * Validates email and returns detailed result
   */
  static validateEmail(email: string): { isValid: boolean; reason?: string } {
    if (!email) {
      return { isValid: false, reason: 'Email is empty' };
    }

    if (!this.isValidRFC5322(email)) {
      return { isValid: false, reason: 'Invalid email format' };
    }

    // Additional checks
    if (email.length > 254) {
      return { isValid: false, reason: 'Email too long' };
    }

    const [localPart, domain] = email.split('@');
    
    if (localPart.length > 64) {
      return { isValid: false, reason: 'Local part too long' };
    }

    return { isValid: true };
  }
}
// Basic usage
const email1 = "test@example.com";
console.log(EmailValidator.isValidBasic(email1)); // true

const email2 = "invalid-email";
console.log(EmailValidator.isValidBasic(email2)); // false

// Detailed validation
const result = EmailValidator.validateEmail("user@domain.com");
console.log(result); // { isValid: true }

const invalidResult = EmailValidator.validateEmail("invalid");
console.log(invalidResult); // { isValid: false, reason: 'Invalid email format' }
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
};

// Usage
const isValid = validateEmail("test@example.com");
class InputValidator {
  private static patterns = {
    email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  };

  static validate(type: 'email', value: string): boolean {
    switch (type) {
      case 'email':
        return this.patterns.email.test(value);
      default:
        return false;
    }
  }
}
// Use a simple regex for basic format checking
// Combine with additional server-side validation
const isValidEmailFormat = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
