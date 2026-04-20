/**
 * Checks whether a string is a palindrome.
 *
 * Options:
 *   - ignoreCase: treat “A” and “a” as the same (default: true)
 *   - ignoreNonAlnum: strip out everything that isn’t a letter or digit (default: true)
 *
 * @param input The string to test
 * @param opts  Optional settings
 * @returns true if `input` is a palindrome under the chosen rules
 */
export function isPalindrome(
  input: string,
  opts: { ignoreCase?: boolean; ignoreNonAlnum?: boolean } = {}
): boolean {
  const { ignoreCase = true, ignoreNonAlnum = true } = opts;

  let str = input;

  // 1. Collapse the string if requested
  if (ignoreNonAlnum) {
    // Keep only ASCII letters and digits. For Unicode you might want
    // a regex like `/\p{L}\p{N}/gu` instead.
    str = str.replace(/[^A-Za-z0-9]/g, "");
  }

  // 2. Normalize case if requested
  if (ignoreCase) {
    str = str.toLowerCase();
  }

  // 3. Compare the string to its reverse
  const reversed = str.split("").reverse().join("");
  return str === reversed;
}
console.log(isPalindrome("racecar"));                    // true
console.log(isPalindrome("RaceCar"));                    // true
console.log(isPalindrome("RaceCar", { ignoreCase: false })) // false
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("No lemon, no melon"));          // true
console.log(isPalindrome("hello"));                       // false
