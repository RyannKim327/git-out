/**
 * Return true if the supplied string is a palindrome (ignoring case,
 * punctuation, spaces, and other non‑alphanumeric characters).
 */
export function isPalindrome(input: string): boolean {
  // Keep only letters and digits, make everything lowercase
  const cleaned = input.replace(/[^a-z0-9]/gi, '').toLowerCase();

  // Quick escape: a single character or empty string is trivially a palindrome
  if (cleaned.length <= 1) return true;

  // Compare characters from the front and back
  for (let i = 0, j = cleaned.length - 1; i < j; i++, j--) {
    if (cleaned[i] !== cleaned[j]) return false;
  }
  return true;
}
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("racecar"));                         // true
console.log(isPalindrome("Hello, world!"));                   // false
export function isExactPalindrome(input: string): boolean {
  if (input.length <= 1) return true;
  for (let i = 0, j = input.length - 1; i < j; i++, j--) {
    if (input[i] !== input[j]) return false;
  }
  return true;
}
