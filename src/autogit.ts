function isPalindromeSimple(str: string): boolean {
  // Spread the string into an array of characters, reverse it, join back.
  return str === [...str].reverse().join('');
}
console.log(isPalindromeSimple('racecar')); // true
console.log(isPalindromeSimple('Racecar')); // false (case‑sensitive)
function isPalindrome(str: string): boolean {
  // 1️⃣ Normalise: lower‑case + keep only alphanumerics
  const cleaned = str
    .toLowerCase()
    .replace(/[^a-z0-9]/g, ''); // adjust the regex if you need Unicode letters

  // 2️⃣ Compare with its reverse
  return cleaned === [...cleaned].reverse().join('');
}
console.log(isPalindrome('A man, a plan, a canal: Panama')); // true
console.log(isPalindrome('No lemon, no melon'));            // true
console.log(isPalindrome('Hello, world!'));                // false
function isPalindromeEfficient(str: string): boolean {
  // Normalise on the fly while scanning from both ends
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    // Move left pointer to the next alphanumeric character
    while (left < right && !isAlphaNumeric(str.charAt(left))) left++;
    // Move right pointer to the previous alphanumeric character
    while (left < right && !isAlphaNumeric(str.charAt(right))) right--;

    // Compare the lower‑cased characters
    if (left < right && str.charAt(left).toLowerCase() !== str.charAt(right).toLowerCase())
      return false;

    left++;
    right--;
  }

  return true;
}

/** Helper: true if the character is a letter or digit (ASCII only). */
function isAlphaNumeric(ch: string): boolean {
  const code = ch.charCodeAt(0);
  // 0‑9
  if (code >= 48 && code <= 57) return true;
  // A‑Z
  if (code >= 65 && code <= 90) return true;
  // a‑z
  if (code >= 97 && code <= 122) return true;
  return false;
}
console.log(isPalindromeEfficient('Was it a car or a cat I saw?')); // true
console.log(isPalindromeEfficient('Not a palindrome'));            // false
function isPalindromeRecursive(str: string): boolean {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');

  function helper(start: number, end: number): boolean {
    if (start >= end) return true;
    if (cleaned[start] !== cleaned[end]) return false;
    return helper(start + 1, end - 1);
  }

  return helper(0, cleaned.length - 1);
}
export type PalindromeCheckOptions = {
  /** Whether to ignore case (default: true) */
  ignoreCase?: boolean;
  /** Whether to ignore non‑alphanumeric characters (default: true) */
  ignoreNonAlphaNumeric?: boolean;
};

/**
 * Returns true if `input` reads the same forward and backward according to the supplied options.
 */
export function isPalindrome(
  input: string,
  options: PalindromeCheckOptions = {}
): boolean {
  const { ignoreCase = true, ignoreNonAlphaNumeric = true } = options;

  let cleaned = input;
  if (ignoreCase) cleaned = cleaned.toLowerCase();
  if (ignoreNonAlphaNumeric) cleaned = cleaned.replace(/[^a-z0-9]/g, '');

  return cleaned === [...cleaned].reverse().join('');
}
import { isPalindrome } from './palindrome';

console.log(isPalindrome('Madam', { ignoreCase: true })); // true
console.log(isPalindrome('Madam', { ignoreCase: false })); // false
// palindrome.test.ts
import { isPalindrome } from './palindrome';

describe('isPalindrome', () => {
  test('basic palindrome', () => {
    expect(isPalindrome('racecar')).toBe(true);
  });

  test('ignores case & punctuation', () => {
    expect(isPalindrome('A man, a plan, a canal: Panama')).toBe(true);
  });

  test('non‑palindrome', () => {
    expect(isPalindrome('hello')).toBe(false);
  });

  test('custom options', () => {
    expect(isPalindrome('Madam', { ignoreCase: false })).toBe(false);
    expect(isPalindrome('Madam', { ignoreCase: true })).toBe(true);
  });
});
