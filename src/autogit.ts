const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(email: string): boolean {
    return emailRegex.test(email);
}

// Usage
console.log(validateEmail("test@example.com")); // true
console.log(validateEmail("invalid-email"));    // false
const comprehensiveEmailRegex: RegExp = 
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function validateEmailComprehensive(email: string): boolean {
    return comprehensiveEmailRegex.test(email);
}
class EmailValidator {
    private static emailPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    static validate(email: string): boolean {
        return this.emailPattern.test(email);
    }

    static validateWithError(email: string): void {
        if (!this.validate(email)) {
            throw new Error("Invalid email address");
        }
    }
}

// Usage
const isValid = EmailValidator.validate("user@domain.com");
EmailValidator.validateWithError("invalid-email"); // Throws error
// Install: npm install validator
import validator from 'validator';

function validateEmail(email: string): boolean {
    return validator.isEmail(email);
}
interface ValidationResult {
    isValid: boolean;
    error?: string;
}

function validateEmailWithDetails(email: string): ValidationResult {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        return { isValid: false, error: "Email is required" };
    }
    
    if (!regex.test(email)) {
        return { isValid: false, error: "Invalid email format" };
    }
    
    return { isValid: true };
}

// Usage
const result = validateEmailWithDetails("test@example.com");
if (!result.isValid) {
    console.error(result.error);
}
