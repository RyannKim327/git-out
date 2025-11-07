const validateEmailBasic = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
const validateEmailComprehensive = (email: string): boolean => {
  // More detailed regex that follows RFC 5322 standard
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};
const isValidEmail = (email: string): boolean => {
  // RFC 5322 compliant regex (simplified version)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
};

// Usage
const email = "user@example.com";
if (isValidEmail(email)) {
  console.log("Valid email");
} else {
  console.log("Invalid email");
}
class EmailValidator {
  private static emailRegex: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  static isValid(email: string): boolean {
    if (!email || email.length > 254) {
      return false;
    }
    return this.emailRegex.test(email);
  }

  static validate(email: string): { isValid: boolean; message?: string } {
    if (!email) {
      return { isValid: false, message: "Email is required" };
    }
    
    if (email.length > 254) {
      return { isValid: false, message: "Email is too long" };
    }
    
    if (!this.emailRegex.test(email)) {
      return { isValid: false, message: "Invalid email format" };
    }
    
    return { isValid: true };
  }
}

// Usage
const result = EmailValidator.validate("test@example.com");
console.log(result);
npm install validator
import validator from 'validator';

const isValid = validator.isEmail('test@example.com');
console.log(isValid); // true or false
const validateEmail = (email: string): boolean => {
  // Basic format check
  const basicCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!basicCheck) return false;
  
  // Additional sanity checks
  if (email.length > 254) return false;
  if (email.indexOf('@') === -1) return false;
  
  return true;
};
