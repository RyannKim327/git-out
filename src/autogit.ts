/**
 * Returns `true` if the supplied value is a palindrome.
 * The check is:
 *   • case‑insensitive
 *   • ignores all non‑alphanumeric characters
 *
 * @example
 * isPalindrome("A man, a plan, a canal: Panama") // → true
 * isPalindrome("Madam")                          // → true
 * isPalindrome("Hello")                          // → false
 */
export function isPalindrome(str: string): boolean {
  // Keep only alphanumeric characters and lower‑case the rest.
  const cleaned = str
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  // Two‑pointer technique: compare chars from both ends.
  let left = 0;
  let right = cleaned.length - 1;

  while (left < right) {
    if (cleaned[left] !== cleaned[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("Hello"));                         // false
