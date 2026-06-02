/**
 * Returns true if `s` is a palindrome.
 *
 * Options:
 *   - ignoreCase   strip upper/lower differences (default: true)
 *   - ignoreNonAlpha  remove everything that isn’t a letter/digit (default: true)
 */
export function isPalindrome(
  s: string,
  { ignoreCase = true, ignoreNonAlpha = true } = {}
): boolean {
  let processed = s;

  // Optional: drop punctuation, spaces, etc.
  if (ignoreNonAlpha) {
    processed = processed.replace(/[^a-zA-Z0-9]/g, "");
  }

  // Optional: treat “A” and “a” as the same.
  if (ignoreCase) {
    processed = processed.toLowerCase();
  }

  // Compare string to its reverse.
  const reversed = processed.split("").reverse().join("");
  return processed === reversed;
}
console.log(isPalindrome("Racecar"));                 // true
console.log(isPalindrome("noon"));                    // true
console.log(isPalindrome("hello"));                   // false
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
