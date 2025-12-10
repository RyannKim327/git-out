const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Usage
console.log(validateEmail("test@example.com")); // true
console.log(validateEmail("invalid-email")); // false
const validateEmailStrict = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
};
class EmailValidator {
  private static emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  static validate(email: string): { isValid: boolean; error?: string } {
    if (!email) {
      return { isValid: false, error: "Email is required" };
    }
    
    if (!this.emailRegex.test(email)) {
      return { isValid: false, error: "Invalid email format" };
    }
    
    return { isValid: true };
  }
}

// Usage
const result = EmailValidator.validate("user@example.com");
if (result.isValid) {
  console.log("Email is valid");
} else {
  console.log(`Error: ${result.error}`);
}
const validateEmailRFC5322 = (email: string): boolean => {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};
interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

class EmailValidationService {
  static validate(email: string): ValidationResult {
    const errors: string[] = [];
    
    // Basic format check
    const basicRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!basicRegex.test(email)) {
      errors.push("Invalid email format");
    }
    
    // Check length
    if (email.length > 254) {
      errors.push("Email is too long");
    }
    
    // Check local part length
    const atIndex = email.indexOf('@');
    if (atIndex > 64) {
      errors.push("Local part of email is too long");
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// Usage
const validation = EmailValidationService.validate("test@example.com");
if (!validation.isValid) {
  console.log("Validation errors:", validation.errors);
}
const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Type guard for TypeScript
const isEmail = (value: unknown): value is string => {
  return typeof value === 'string' && isValidEmail(value);
};
