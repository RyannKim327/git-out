function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Example usage
console.log(isValidEmail("test@example.com")); // true
console.log(isValidEmail("not-an-email"));     // false
function isValidEmailRFC(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

console.log(isValidEmailRFC("user.name+tag@example.co.uk")); // true
console.log(isValidEmailRFC("bad@@example.com")); // false
