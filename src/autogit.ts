/**
 * @param s The string to test.
 * @param options
 *   - ignoreCase: whether to treat “A” and “a” as the same (default: true)
 *   - ignoreNonAlphaNum: whether to strip out spaces, punctuation, etc. (default: true)
 * @returns true if `s` reads the same forward and backward under the chosen options.
 */
function isPalindrome(
  s: string,
  options: { ignoreCase?: boolean; ignoreNonAlphaNum?: boolean } = {}
): boolean {
  const { ignoreCase = true, ignoreNonAlphaNum = true } = options;

  // Optional: strip out anything other than letters/digits
  let cleaned = ignoreNonAlphaNum
    ? s.replace(/[^A-Za-z0-9]/g, '')
    : s;

  // Optional: standardise case
  if (ignoreCase) cleaned = cleaned.toLowerCase();

  // Fast exit on single‑character strings (or empty)
  if (cleaned.length < 2) return true;

  // Compare characters from both ends
  let left = 0;
  let right = cleaned.length - 1;
  while (left < right) {
    if (cleaned[left] !== cleaned[right]) return false;
    left++;
    right--;
  }
  return true;
}
console.log(isPalindrome('Racecar'));           // true
console.log(isPalindrome('hello'));             // false
console.log(isPalindrome('A man, a plan, a canal, Panama')); // true
console.log(isPalindrome('No lemon, no melon', { ignoreNonAlphaNum: true, ignoreCase: true })); // true
