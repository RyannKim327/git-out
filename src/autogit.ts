/**
 * Returns true if `s` is a palindrome.
 * The check is case‑sensitive and does **not** skip spaces or punctuation.
 * Only O(1) extra space is used (no arrays, stacks, or temporary strings).
 */
function isPalindrome(s: string): boolean {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}
console.log(isPalindrome("racecar"));          // true
console.log(isPalindrome("hello"));            // false
console.log(isPalindromeIgnoreCaseSpace("A man a plan a canal Panama")); // true
console.log(isPalindromeAlphaNum("No 'x' in Nixon!")); // true
