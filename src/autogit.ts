function isPalindromeSimple(str: string): boolean {
  return str === [...str].reverse().join('');
}
console.log(isPalindromeSimple('madam')); // true
console.log(isPalindromeSimple('Madam')); // false (case‑sensitive)
/**
 * Returns true if `input` is a palindrome.
 *
 * - Case‑insensitive.
 * - Considers only letters and digits (Unicode aware).
 *
 * @param input The string to test.
 */
export function isPalindrome(input: string): boolean {
  // 1️⃣ Normalise the string (NFC is a good default)
  const normalized = input.normalize('NFC');

  // 2️⃣ Filter out everything that isn’t a letter or digit.
  //    \p{L} = any kind of letter, \p{N} = any kind of number.
  //    The `u` flag makes the regex Unicode‑aware.
  const alphanum = normalized
    .toLowerCase()
    .match(/\p{L}|\p{N}/gu) ?? [];

  // 3️⃣ Compare the filtered array with its reverse.
  const len = alphanum.length;
  for (let i = 0; i < len / 2; ++i) {
    if (alphanum[i] !== alphanum[len - 1 - i]) {
      return false;
    }
  }
  return true;
}
console.log(isPalindrome('racecar'));                     // true
console.log(isPalindrome('RaceCar'));                     // true
console.log(isPalindrome('A man, a plan, a canal: Panama')); // true
console.log(isPalindrome('No lemon, no melon'));          // true
console.log(isPalindrome('Hello, world!'));               // false
export function isPalindromeTwoPointer(str: string): boolean {
  // Normalise and lower‑case once.
  const s = str.normalize('NFC').toLowerCase();

  // Helper to get the next alphanumeric code point index from the left.
  const nextAlpha = (i: number): number => {
    while (i < s.length) {
      const cp = s.codePointAt(i)!;
      if (isAlphaNumeric(cp)) return i;
      i += cp > 0xFFFF ? 2 : 1; // skip surrogate pair if needed
    }
    return i;
  };

  // Helper to get the next alphanumeric code point index from the right.
  const prevAlpha = (i: number): number => {
    while (i >= 0) {
      const cp = s.codePointAt(i)!;
      // If we landed in the middle of a surrogate pair, step back one more.
      const start = cp >= 0xDC00 && cp <= 0xDFFF ? i - 1 : i;
      const realCp = s.codePointAt(start)!;
      if (isAlphaNumeric(realCp)) return start;
      i = start - 1;
    }
    return i;
  };

  // Unicode alphanumeric test (same as regex \p{L}|\p{N})
  const isAlphaNumeric = (cp: number): boolean => {
    // Quick ASCII shortcut
    if (cp >= 48 && cp <= 57) return true; // 0‑9
    if (cp >= 65 && cp <= 90) return true; // A‑Z
    if (cp >= 97 && cp <= 122) return true; // a‑z
    // For the rest, use Unicode property escapes via a RegExp.
    // This is a tiny overhead but still O(1) per character.
    return /\p{L}|\p{N}/u.test(String.fromCodePoint(cp));
  };

  let left = nextAlpha(0);
  let right = prevAlpha(s.length - 1);

  while (left < right) {
    const leftCp = s.codePointAt(left)!;
    const rightCp = s.codePointAt(right)!;

    if (leftCp !== rightCp) return false;

    left = nextAlpha(left + (leftCp > 0xFFFF ? 2 : 1));
    right = prevAlpha(right - (rightCp > 0xFFFF ? 2 : 1));
  }
  return true;
}
# 1️⃣ Install TypeScript (if you want to compile)
npm i -D typescript @types/node

# 2️⃣ Create a file `palindrome.ts` with any of the functions above
# 3️⃣ Compile & run
npx tsc palindrome.ts && node palindrome.js
<script type="module">
  import { isPalindrome } from './palindrome.js';

  console.log(isPalindrome('Was it a car or a cat I saw?')); // true
</script>
export function isPalindrome(str: string): boolean {
  const cleaned = str
    .normalize('NFC')
    .toLowerCase()
    .match(/\p{L}|\p{N}/gu) ?? [];

  for (let i = 0, j = cleaned.length - 1; i < j; ++i, --j) {
    if (cleaned[i] !== cleaned[j]) return false;
  }
  return true;
}
