const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email: string): boolean {
  return emailRegex.test(email);
}

// Usage
console.log(isValidEmail("test@example.com")); // true
console.log(isValidEmail("invalid.email"));    // false
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function isValidEmail(email: string): boolean {
  return emailRegex.test(email);
}
class EmailValidator {
  private static emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  static validate(email: string): boolean {
    if (!email || typeof email !== 'string') {
      return false;
    }
    return this.emailRegex.test(email.trim());
  }
  
  static validateWithError(email: string): { isValid: boolean; error?: string } {
    if (!email) {
      return { isValid: false, error: 'Email is required' };
    }
    
    if (typeof email !== 'string') {
      return { isValid: false, error: 'Email must be a string' };
    }
    
    const trimmedEmail = email.trim();
    if (trimmedEmail.length === 0) {
      return { isValid: false, error: 'Email cannot be empty' };
    }
    
    if (!this.emailRegex.test(trimmedEmail)) {
      return { isValid: false, error: 'Invalid email format' };
    }
    
    return { isValid: true };
  }
}

// Usage
console.log(EmailValidator.validate('test@example.com')); // true
const result = EmailValidator.validateWithError('invalid');
console.log(result); // { isValid: false, error: 'Invalid email format' }
class AdvancedEmailValidator {
  private static emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  private static commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
  
  static validate(email: string): boolean {
    if (!this.emailRegex.test(email)) {
      return false;
    }
    
    // Additional domain validation (optional)
    const domain = email.split('@')[1];
    return this.isValidDomain(domain);
  }
  
  private static isValidDomain(domain: string): boolean {
    // Check if domain has valid structure
    const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return domainRegex.test(domain);
  }
  
  static getDomain(email: string): string | null {
    if (!this.validate(email)) {
      return null;
    }
    return email.split('@')[1];
  }
}
import { useState, useCallback } from 'react';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useEmailValidation() {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = useCallback((emailToValidate: string) => {
    setEmail(emailToValidate);
    
    if (!emailToValidate) {
      setIsValid(false);
      setError('Email is required');
      return;
    }
    
    if (!emailRegex.test(emailToValidate)) {
      setIsValid(false);
      setError('Please enter a valid email address');
      return;
    }
    
    setIsValid(true);
    setError(null);
  }, []);

  return {
    email,
    isValid,
    error,
    validateEmail,
    setEmail,
  };
}
import { z } from 'zod';

const emailSchema = z.string().email('Invalid email address');

function validateEmailWithZod(email: string): { success: boolean; error?: string } {
  const result = emailSchema.safeParse(email);
  
  if (!result.success) {
    return { 
      success: false, 
      error: result.error.errors[0]?.message || 'Invalid email' 
    };
  }
  
  return { success: true };
}
// Simple and effective for most cases
const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
