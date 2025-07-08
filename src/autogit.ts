function isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

// Example usage:
const email1 = "example@example.com";
const email2 = "invalid-email@.com";

console.log(isValidEmail(email1)); // true
console.log(isValidEmail(email2)); // false
