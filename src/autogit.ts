/**
 * Return true if `s` is a palindrome.
 *
 * @param s      The string to test.
 * @param opts   Optional flags:
 *   - ignoreCase:   Treat uppercase and lowercase the same.
 *   - ignorePunct:  Strip everything that's not a letter or number.
 *
 * @example
 * isPalindrome('A man, a plan, a canal: Panama'); // → true
 */
function isPalindrome(
  s: string,
  opts: { ignoreCase?: boolean; ignorePunct?: boolean } = {}
): boolean {
  const { ignoreCase = false, ignorePunct = false } = opts;

  let cleaned = s;

  if (ignorePunct) {
    // Keep letters and digits only.
    cleaned = cleaned.replace(/[^A-Za-z0-9]/g, '');
  }

  if (ignoreCase) {
    cleaned = cleaned.toLowerCase();
  }

  // Quick fail for empty string – you can decide if you want to treat it as palindrome.
  if (cleaned.length === 0) return true;

  // Compare from both ends without building a reversed copy.
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
console.log(isPalindrome('racecar')); // true
console.log(isPalindrome('RaceCar')); // false (case‑sensitive)
console.log(isPalindrome('RaceCar', { ignoreCase: true })); // true
console.log(isPalindrome('A man, a plan, a canal: Panama')); // false
console.log(
  isPalindrome('A man, a plan, a canal: Panama', {
    ignoreCase: true,
    ignorePunct: true,
  })
); // true
