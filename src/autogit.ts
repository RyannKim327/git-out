function isPalindromeSimple(str: string): boolean {
  // Reverse the string and compare it to the original
  return str === [...str].reverse().join('');
}

// Usage
console.log(isPalindromeSimple('racecar')); // true
console.log(isPalindromeSimple('hello'));   // false
function isPalindromeIgnoreCase(str: string): boolean {
  const normalized = str.toLowerCase();
  return normalized === [...normalized].reverse().join('');
}
/**
 * Returns true if `input` is a palindrome when you ignore
 * - case differences
 * - all characters that are not letters or digits
 *
 * @param input The string to test
 */
function isPalindrome(input: string): boolean {
  // 1️⃣ Remove everything that isn’t a letter or digit
  //    \p{L} = any kind of letter, \p{N} = any kind of number
  //    The `u` flag enables Unicode property escapes.
  const cleaned = input
    .toLowerCase()
    .replace(/[\p{L}\p{N}]/gu, (c) => c)   // keep only letters/numbers
    .replace(/[^\p{L}\p{N}]/gu, '');       // strip the rest

  // 2️⃣ Compare the cleaned string with its reverse
  const reversed = [...cleaned].reverse().join('');
  return cleaned === reversed;
}

// Examples
console.log(isPalindrome('RaceCar'));                     // true
console.log(isPalindrome('A man, a plan, a canal: Panama')); // true
console.log(isPalindrome('No lemon, no melon'));         // true
console.log(isPalindrome('Hello, World!'));              // false
const cleaned = input.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
function isPalindromeTwoPointer(str: string): boolean {
  const s = str.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }
  return true;
}
// palindrome.ts
export function isPalindrome(
  input: string,
  options?: { ignoreCase?: boolean; ignoreNonAlphaNumeric?: boolean }
): boolean {
  const { ignoreCase = true, ignoreNonAlphaNumeric = true } = options ?? {};

  let s = input;
  if (ignoreCase) s = s.toLowerCase();

  if (ignoreNonAlphaNumeric) {
    // Keep only letters and numbers (Unicode aware)
    s = s.replace(/[^\p{L}\p{N}]/gu, '');
  }

  // Two‑pointer check – O(1) extra memory
  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }
  return true;
}
import { isPalindrome } from './palindrome';

console.log(isPalindrome('Madam'));                         // true (default options)
console.log(isPalindrome('Madam', { ignoreCase: false })); // false
console.log(isPalindrome('Was it a car or a cat I saw?')); // true
