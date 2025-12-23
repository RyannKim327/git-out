/**
 * Returns true if `str` reads the same forward and backward,
 * **including** spaces, punctuation and case.
 */
export function isExactPalindrome(str: string): boolean {
  // Quick length‑0/1 shortcut
  if (str.length <= 1) return true;

  // Compare the string with its reversed copy
  const reversed = str.split('').reverse().join('');
  return str === reversed;
}
isExactPalindrome('racecar'); // true
isExactPalindrome('Racecar'); // false (case matters)
isExactPalindrome('A man a plan a canal Panama'); // false (spaces matter)
/**
 * Returns true if `str` is a palindrome when case is ignored.
 */
export function isCaseInsensitivePalindrome(str: string): boolean {
  const normalized = str.toLowerCase();
  return normalized === normalized.split('').reverse().join('');
}
isCaseInsensitivePalindrome('RaceCar'); // true
isCaseInsensitivePalindrome('Madam');   // true
/**
 * Returns true if `str` is a palindrome after:
 *   • converting to lower case,
 *   • removing every character that is not a letter or digit.
 *
 * This matches the classic definition used in interview questions.
 */
export function isCleanPalindrome(str: string): boolean {
  // Remove everything that isn’t a letter or digit and lower‑case it.
  const cleaned = str.replace(/[^a-z0-9]/gi, '').toLowerCase();

  // Two‑pointer technique – O(n) time, O(1) extra space.
  let left = 0;
  let right = cleaned.length - 1;

  while (left < right) {
    if (cleaned[left] !== cleaned[right]) {
      return false; // early exit on first mismatch
    }
    left++;
    right--;
  }
  return true;
}
isCleanPalindrome('A man, a plan, a canal: Panama'); // true
isCleanPalindrome('No lemon, no melon');            // true
isCleanPalindrome('Hello, World!');                 // false
export const isPalindromeOneLiner = (s: string) =>
  s.replace(/[^a-z0-9]/gi, '').toLowerCase() ===
  [...s.replace(/[^a-z0-9]/gi, '').toLowerCase()].reverse().join('');
// palindrome.ts
export function isExactPalindrome(str: string): boolean {
  if (str.length <= 1) return true;
  return str === str.split('').reverse().join('');
}

export function isCaseInsensitivePalindrome(str: string): boolean {
  const normalized = str.toLowerCase();
  return normalized === normalized.split('').reverse().join('');
}

/**
 * Cleaned palindrome: ignore case and any non‑alphanumeric characters.
 */
export function isCleanPalindrome(str: string): boolean {
  const cleaned = str.replace(/[^a-z0-9]/gi, '').toLowerCase();

  let left = 0;
  let right = cleaned.length - 1;
  while (left < right) {
    if (cleaned[left] !== cleaned[right]) return false;
    left++;
    right--;
  }
  return true;
}

/**
 * One‑liner version (useful for REPL or quick checks).
 */
export const isPalindromeOneLiner = (s: string) =>
  s.replace(/[^a-z0-9]/gi, '').toLowerCase() ===
  [...s.replace(/[^a-z0-9]/gi, '').toLowerCase()].reverse().join('');
// palindrome.test.ts
import {
  isExactPalindrome,
  isCaseInsensitivePalindrome,
  isCleanPalindrome,
} from './palindrome';

describe('Palindrome utilities', () => {
  test('Exact palindrome', () => {
    expect(isExactPalindrome('')).toBe(true);
    expect(isExactPalindrome('a')).toBe(true);
    expect(isExactPalindrome('racecar')).toBe(true);
    expect(isExactPalindrome('Racecar')).toBe(false);
    expect(isExactPalindrome('A man a plan a canal Panama')).toBe(false);
  });

  test('Case‑insensitive palindrome', () => {
    expect(isCaseInsensitivePalindrome('RaceCar')).toBe(true);
    expect(isCaseInsensitivePalindrome('Madam')).toBe(true);
    expect(isCaseInsensitivePalindrome('Hello')).toBe(false);
  });

  test('Clean palindrome (ignore punctuation & case)', () => {
    expect(isCleanPalindrome('A man, a plan, a canal: Panama')).toBe(true);
    expect(isCleanPalindrome('No lemon, no melon')).toBe(true);
    expect(isCleanPalindrome('Was it a car or a cat I saw?')).toBe(true);
    expect(isCleanPalindrome('Not a palindrome')).toBe(false);
  });
});
npm install --save-dev jest @types/jest ts-jest
npx jest
const CLEAN_RE = /[^a-z0-9]/gi;
export function isCleanPalindromeFast(str: string): boolean {
  const cleaned = str.replace(CLEAN_RE, '').toLowerCase();
  // two‑pointer loop as before...
}
/**
 * Checks if a string is a palindrome, ignoring case and all
 * non‑alphanumeric characters.
 */
export const isPalindrome = (input: string): boolean => {
  const cleaned = input.replace(/[^a-z0-9]/gi, '').toLowerCase();
  let i = 0, j = cleaned.length - 1;
  while (i < j) {
    if (cleaned[i++] !== cleaned[j--]) return false;
  }
  return true;
};
