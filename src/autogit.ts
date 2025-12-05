function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

// Usage
console.log(isValidEmail('test@example.com'));       // true
console.log(isValidEmail('user.name+tag@sub.domain.co.uk')); // true
console.log(isValidEmail('invalid.email@'));         // false
console.log(isValidEmail('no@domain'));              // false
function isValidEmailInternational(email: string): boolean {
  // Allows international characters via \u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF
  const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return emailRegex.test(email);
}
