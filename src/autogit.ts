/**
 * Returns true if `a` and `b` are anagrams of each other.
 *
 * The comparison is:
 *   - case‑insensitive
 *   - ignores any character that is not a letter (A‑Z / a‑z)
 *
 * @param a First string
 * @param b Second string
 */
export function areAnagrams(a: string, b: string): boolean {
  // 1️⃣ Normalise both strings: lower‑case + keep only letters
  const clean = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z]/g, ''); // strip everything except a‑z

  const s1 = clean(a);
  const s2 = clean(b);

  // Early exit: different lengths → cannot be anagrams
  if (s1.length !== s2.length) return false;

  // 2️⃣ Build a frequency map for the first string
  const freq = new Map<string, number>();
  for (const ch of s1) {
    freq.set(ch, (freq.get(ch) ?? 0) + 1);
  }

  // 3️⃣ Decrease the count while scanning the second string
  for (const ch of s2) {
    const count = freq.get(ch);
    if (count === undefined) {
      // character not present in the first string
      return false;
    }
    if (count === 1) {
      freq.delete(ch); // optional – keeps the map small
    } else {
      freq.set(ch, count - 1);
    }
  }

  // 4️⃣ If the map is empty, every character matched perfectly
  return freq.size === 0;
}
export function areAnagramsSorted(a: string, b: string): boolean {
  const normalize = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z]/g, '')
      .split('')
      .sort()
      .join('');

  return normalize(a) === normalize(b);
}
import { areAnagrams, areAnagramsSorted } from './anagram';

console.log(areAnagrams('Listen', 'Silent'));               // true
console.log(areAnagrams('A gentleman', 'Elegant man'));    // true
console.log(areAnagrams('Dormitory', 'Dirty room!!'));      // true
console.log(areAnagrams('Hello', 'World'));                 // false

// Using the sort‑based version (identical results)
console.log(areAnagramsSorted('Astronomer', 'Moon starer')); // true
// anagram.test.ts
import { areAnagrams, areAnagramsSorted } from './anagram';

describe('areAnagrams (frequency‑map)', () => {
  test.each([
    ['Listen', 'Silent', true],
    ['A gentleman', 'Elegant man', true],
    ['Dormitory', 'Dirty room!!', true],
    ['Astronomer', 'Moon starer', true],
    ['Hello', 'Olelh', true],
    ['Hello', 'World', false],
    ['', '', true],
    [' ', '', true], // both become empty after cleaning
    ['123', '321', true], // numbers are stripped → both empty → true
    ['abc', 'ab', false],
  ])('"%s" vs "%s"', (a, b, expected) => {
    expect(areAnagrams(a, b)).toBe(expected);
    // sanity‑check that the alternative implementation behaves the same
    expect(areAnagramsSorted(a, b)).toBe(expected);
  });
});
npm test   # assuming jest is set up
export const areAnagramsQuick = (a: string, b: string): boolean =>
  a
    .toLowerCase()
    .replace(/[^a-z]/g, '')
    .split('')
    .sort()
    .join('') ===
  b
    .toLowerCase()
    .replace(/[^a-z]/g, '')
    .split('')
    .sort()
    .join('');
