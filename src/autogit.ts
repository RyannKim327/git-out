const basicEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmailBasic(email: string): boolean {
  return basicEmailRegex.test(email);
}

// Usage
console.log(isValidEmailBasic("test@example.com")); // true
console.log(isValidEmailBasic("invalid-email"));    // false
const rfc5322EmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function isValidEmailRFC(email: string): boolean {
  return rfc5322EmailRegex.test(email);
}
const comprehensiveEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function isValidEmailComprehensive(email: string): boolean {
  return comprehensiveEmailRegex.test(email);
}
class EmailValidator {
  private static emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  static validate(email: string): boolean {
    if (!email) return false;
    return this.emailRegex.test(email);
  }
  
  static validateWithError(email: string): { isValid: boolean; error?: string } {
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
const result = EmailValidator.validateWithError("test@example.com");
if (!result.isValid) {
  console.error(result.error);
}
interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

class AdvancedEmailValidator {
  private static emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  static async validate(email: string): Promise<ValidationResult> {
    const errors: string[] = [];
    
    // Basic format validation
    if (!this.emailRegex.test(email)) {
      errors.push("Invalid email format");
    }
    
    // Additional checks
    if (email.length > 254) {
      errors.push("Email is too long");
    }
    
    const [localPart, domain] = email.split('@');
    if (localPart.length > 64) {
      errors.push("Local part is too long");
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// Usage
const validation = await AdvancedEmailValidator.validate("test@example.com");
npm install class-validator
# or
npm install zod
import { IsEmail } from 'class-validator';

class UserDto {
  @IsEmail()
  email: string;
}
import { z } from 'zod';

const emailSchema = z.string().email();
const result = emailSchema.safeParse("test@example.com");
export class EmailUtils {
  private static emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  /**
   * Validates an email address format
   */
  static isValidFormat(email: string): boolean {
    if (typeof email !== 'string') return false;
    return this.emailRegex.test(email);
  }
  
  /**
   * Extracts domain from email
   */
  static extractDomain(email: string): string | null {
    if (!this.isValidFormat(email)) return null;
    return email.split('@')[1];
  }
  
  /**
   * Validates email with comprehensive checks
   */
  static validate(email: string): {
    isValid: boolean;
    reason?: string;
    domain?: string;
  } {
    if (!email) {
      return { isValid: false, reason: 'Email is empty' };
    }
    
    if (!this.isValidFormat(email)) {
      return { isValid: false, reason: 'Invalid email format' };
    }
    
    const domain = this.extractDomain(email);
    return { isValid: true, domain };
  }
}
