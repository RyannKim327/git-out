function isPalindromeSimple(str: string): boolean {
  return str === [...str].reverse().join('');
}
/**
 * Returns true if `input` is a palindrome.
 *
 * @param input   The string to test.
 * @param options Optional flags to control normalisation.
 *                - ignoreCase:   true → case‑insensitive (default)
 *                - ignoreSpaces: true → strip all whitespace (default)
 *                - ignoreNonAlpha: true → strip everything except letters/numbers (default)
 */
function isPalindrome(
  input: string,
  {
    ignoreCase = true,
    ignoreSpaces = true,
    ignoreNonAlpha = true,
  }: {
    ignoreCase?: boolean;
    ignoreSpaces?: boolean;
    ignoreNonAlpha?: boolean;
  } = {}
): boolean {
  // 1️⃣ Normalise the string according to the options
  let normalized = input;

  if (ignoreCase) {
    normalized = normalized.toLocaleLowerCase(); // locale‑aware lower‑casing
  }

  if (ignoreSpaces) {
    normalized = normalized.replace(/\s+/g, '');
  }

  if (ignoreNonAlpha) {
    // Keep letters and numbers only (Unicode aware)
    normalized = normalized.replace(/[^\p{L}\p{N}]/gu, '');
  }

  // 2️⃣ Compare with its reverse
  const reversed = [...normalized].reverse().join('');
  return normalized === reversed;
}
console.log(isPalindrome('madam'));                     // true
console.log(isPalindrome('Madam'));                     // true (case‑insensitive)
console.log(isPalindrome('A man, a plan, a canal: Panama')); // true
console.log(isPalindrome('No lemon, no melon!'));       // true

// Turn off the "ignoreNonAlpha" flag – punctuation now matters
console.log(
  isPalindrome('A man, a plan, a canal: Panama', {
    ignoreNonAlpha: false,
  })
); // false
function isPalindromeRecursive(str: string): boolean {
  const clean = str.replace(/[\W_]/g, '').toLowerCase(); // strip non‑alphanum & lower‑case
  const len = clean.length;

  // Base case: 0 or 1 character → palindrome
  if (len <= 1) return true;

  // Compare first & last characters
  if (clean[0] !== clean[len - 1]) return false;

  // Recurse on the substring without the outer characters
  return isPalindromeRecursive(clean.slice(1, -1));
}
// 1️⃣ Simple, exact match
isPalindromeSimple('racecar'); // true

// 2️⃣ Full‑featured utility
isPalindrome('Was it a car or a cat I saw?'); // true

// 3️⃣ Recursive (educational)
isPalindromeRecursive('level'); // true
