/**
 * Returns true if `str` reads the same forwards and backwards.
 *
 * @param str – The string you want to test.
 * @returns  boolean – palindrome status.
 */
export function isPalindrome(str: string): boolean {
  // Remove all non‑alphanumeric characters and ignore case.
  const cleaned = str.replace(/[^A-Za-z0-9]/g, '').toLowerCase();

  // Two‑pointer scan is faster than reversing a long string.
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
console.log(isPalindrome('racecar'));          // true
console.log(isPalindrome('A man, a plan, a canal: Panama')); // true
console.log(isPalindrome('hello'));            // false
console.log(isPalindrome(''));                 // true (empty string)
