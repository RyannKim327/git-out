function isPalindromeSimple(str: string): boolean {
  // Convert to an array of characters, reverse it, join back to a string
  const reversed = str.split('').reverse().join('');
  return str === reversed;
}
console.log(isPalindromeSimple('racecar')); // true
console.log(isPalindromeSimple('hello'));   // false
function isPalindrome(
  input: string,
  options?: { ignoreCase?: boolean; ignoreNonAlphanumeric?: boolean }
): boolean {
  const { ignoreCase = true, ignoreNonAlphanumeric = true } = options ?? {};

  // 1️⃣ Normalise the string
  let s = input;
  if (ignoreCase) s = s.toLowerCase();
  if (ignoreNonAlphanumeric) s = s.replace(/[^a-z0-9]/gi, '');

  // 2️⃣ Compare characters from both ends without creating a reversed copy
  const len = s.length;
  for (let i = 0; i < len / 2; ++i) {
    if (s[i] !== s[len - 1 - i]) return false;
  }
  return true;
}
console.log(isPalindrome('A man, a plan, a canal: Panama')); // true
console.log(isPalindrome('No lemon, no melon'));             // true
console.log(isPalindrome('Hello, World!'));                 // false
function isPalindromeUnicode(
  input: string,
  options?: { ignoreCase?: boolean; ignoreNonAlphanumeric?: boolean }
): boolean {
  const { ignoreCase = true, ignoreNonAlphanumeric = true } = options ?? {};

  // Normalise the string (case folding for Unicode)
  let s = input;
  if (ignoreCase) s = s.toLocaleLowerCase(); // locale‑aware lower‑casing
  if (ignoreNonAlphanumeric) s = s.replace(/[^\p{L}\p{N}]/gu, ''); // keep letters & numbers

  // Convert to an array of Unicode code points
  const chars = Array.from(s); // works with surrogate pairs, emoji, etc.
  const len = chars.length;

  for (let i = 0; i < len / 2; ++i) {
    if (chars[i] !== chars[len - 1 - i]) return false;
  }
  return true;
}
console.log(isPalindromeUnicode('😀madam😀')); // true (emoji are mirrored)
console.log(isPalindromeUnicode('Éléphant')); // false (accent matters)
console.log(isPalindromeUnicode('Éléphant', { ignoreCase: true })); // false
// palindrome.test.ts
import { isPalindrome, isPalindromeUnicode } from './palindrome';

describe('Palindrome utilities', () => {
  test('simple ASCII', () => {
    expect(isPalindrome('racecar')).toBe(true);
    expect(isPalindrome('RaceCar')).toBe(false); // case‑sensitive by default
  });

  test('ignore case & punctuation', () => {
    expect(isPalindrome('A man, a plan, a canal: Panama')).toBe(true);
    expect(isPalindrome('No lemon, no melon')).toBe(true);
  });

  test('Unicode aware', () => {
    expect(isPalindromeUnicode('😀madam😀')).toBe(true);
    expect(isPalindromeUnicode('😀madam')).toBe(false);
  });
});
npm test
const isPalindrome = (s: string): boolean => s === [...s].reverse().join('');
