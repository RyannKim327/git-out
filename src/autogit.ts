function isValidEmail(email: string): boolean {
  // Regex pattern for email validation (case-insensitive)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailRegex.test(email);
}

// Example usage:
console.log(isValidEmail("user@example.com"));        // true
console.log(isValidEmail("first.last@sub.domain.com")); // true
console.log(isValidEmail("invalid.email@domain"));      // false
console.log(isValidEmail("noatsymbol.com"));          // false
const strictEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
