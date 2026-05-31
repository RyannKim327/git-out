/**
 * Returns `true` if `s` is a palindrome.
 *
 * Options:
 *   - ignoreCase   – treat uppercase and lowercase as the same.
 *   - ignoreNonAlnum – strip out everything that isn’t a letter or digit.
 *
 * This keeps the function flexible while still being straightforward.
 */
export function isPalindrome(
  s: string,
  {
    ignoreCase = true,
    ignoreNonAlnum = false,
  }: { ignoreCase?: boolean; ignoreNonAlnum?: boolean } = {}
): boolean {
  // Normalise the string
  let normalized = s;

  if (ignoreNonAlnum) {
    // Keep only alphanumerics
    normalized = normalized.replace(/[^a-z0-9]/gi, "");
  }

  if (ignoreCase) {
    normalized = normalized.toLowerCase();
  }

  // Compare characters from start and end moving toward the centre
  const len = normalized.length;
  for (let i = 0; i < len / 2; i++) {
    if (normalized[i] !== normalized[len - 1 - i]) {
      return false; // early out on first mismatch
    }
  }

  return true;
}
console.log(isPalindrome("RaceCar"));                         // true
console.log(isPalindrome("RaceCar", { ignoreNonAlnum: true }));// true
console.log(isPalindrome("A man, a plan, a canal: Panama"));   // false by default
console.log(isPalindrome("A man, a plan, a canal: Panama", {
  ignoreCase: true,
  ignoreNonAlnum: true,
}));                                                     // true
