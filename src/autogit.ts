// ✅ Basic “looks‑right” test
function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// usage
console.log(isValidEmail('user@example.com')); // true
console.log(isValidEmail('bad-email.com'));    // false
// ✅ Covers quoted local‑part, IP domains, and "newer" TLDs
function isValidEmailBetter(email: string): boolean {
  const re = /^(?:(?:\"[^\"]+\")|(?:[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+))@(?:(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}|(?:\[[0-9]{1,3}(?:\.[0-9]{1,3}){3}\]))$/;
  return re.test(email);
}
// In a React hook or any form library
const validateEmail = (value: string) => (
  isValidEmail(value) ? undefined : 'Invalid email address'
);
