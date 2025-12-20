/**
 * Normalises a string for anagram comparison.
 *
 * - Converts to lower‑case.
 * - Removes whitespace (space, tab, newline, etc.).
 * - Optionally removes non‑letter characters.
 * - Normalises Unicode (NFC) so that composed/decomposed forms compare equal.
 *
 * @param str   The raw input string.
 * @param keepNonLetters  If true, keep punctuation / numbers; otherwise strip them.
 * @returns The cleaned, lower‑cased string.
 */
function normalise(str: string, keepNonLetters = false): string {
  // Unicode normalisation (important for accented characters)
  const normalized = str.normalize('NFC');

  // Remove whitespace
  const noSpaces = normalized.replace(/\s+/g, '');

  // Optionally strip everything that isn’t a letter (or digit if you want)
  const cleaned = keepNonLetters
    ? noSpaces
    : noSpaces.replace(/[^a-z0-9]/gi, '');

  return cleaned.toLowerCase();
}
/**
 * Returns true if `a` and `b` are anagrams (case‑insensitive, ignoring spaces & punctuation).
 */
function areAnagramsSort(a: string, b: string): boolean {
  const s1 = normalise(a);
  const s2 = normalise(b);

  // Early exit if lengths differ after normalisation
  if (s1.length !== s2.length) return false;

  // Sort characters
  const sorted1 = s1.split('').sort().join('');
  const sorted2 = s2.split('').sort().join('');

  return sorted1 === sorted2;
}

/* -------------------------------------------------
   Example usage
--------------------------------------------------- */
console.log(areAnagramsSort('Listen', 'Silent'));          // true
console.log(areAnagramsSort('Dormitory', 'Dirty room'));   // true
console.log(areAnagramsSort('Hello', 'Olelh!'));           // true (punctuation ignored)
console.log(areAnagramsSort('Apple', 'Pabble'));           // false
/**
 * Returns true if `a` and `b` are anagrams using a character‑frequency map.
 */
function areAnagramsFreq(a: string, b: string): boolean {
  const s1 = normalise(a);
  const s2 = normalise(b);

  if (s1.length !== s2.length) return false;

  // Build frequency map for the first string
  const freq = new Map<string, number>();
  for (const ch of s1) {
    freq.set(ch, (freq.get(ch) ?? 0) + 1);
  }

  // Decrease counts while scanning the second string
  for (const ch of s2) {
    const count = freq.get(ch);
    if (count === undefined) return false; // char not present in s1
    if (count === 1) {
      freq.delete(ch); // count drops to zero – remove entry
    } else {
      freq.set(ch, count - 1);
    }
  }

  // If the map is empty, every count matched
  return freq.size === 0;
}

/* -------------------------------------------------
   Example usage
--------------------------------------------------- */
console.log(areAnagramsFreq('Listen', 'Silent'));          // true
console.log(areAnagramsFreq('Dormitory', 'Dirty room'));   // true
console.log(areAnagramsFreq('Hello', 'Olelh!'));           // true
console.log(areAnagramsFreq('Apple', 'Pabble'));           // false
const isAnagram = (a: string, b: string) =>
  normalise(a) === normalise(b) && // quick length check is implicit
  normalise(a).split('').sort().join('') ===
  normalise(b).split('').sort().join('');
// anagram.test.ts
import { areAnagramsSort, areAnagramsFreq } from './anagram';

describe('Anagram utilities', () => {
  const cases: Array<[string, string, boolean]> = [
    ['Listen', 'Silent', true],
    ['Dormitory', 'Dirty room', true],
    ['Conversation', 'Voices rant on', true],
    ['Hello', 'Olelh!', true],
    ['Apple', 'Pabble', false],
    ['a', 'a', true],
    ['', '', true],
    ['abc', 'ab', false],
  ];

  test.each(cases)('sort: %s vs %s → %s', (a, b, expected) => {
    expect(areAnagramsSort(a, b)).toBe(expected);
  });

  test.each(cases)('freq: %s vs %s → %s', (a, b, expected) => {
    expect(areAnagramsFreq(a, b)).toBe(expected);
  });
});
// anagram.ts
export function normalise(str: string, keepNonLetters = false): string {
  const normalized = str.normalize('NFC');
  const noSpaces = normalized.replace(/\s+/g, '');
  const cleaned = keepNonLetters
    ? noSpaces
    : noSpaces.replace(/[^a-z0-9]/gi, '');
  return cleaned.toLowerCase();
}

/**
 * O(n log n) – sort & compare
 */
export function areAnagramsSort(a: string, b: string, keepNonLetters = false): boolean {
  const s1 = normalise(a, keepNonLetters);
  const s2 = normalise(b, keepNonLetters);
  if (s1.length !== s2.length) return false;
  return s1.split('').sort().join('') === s2.split('').sort().join('');
}

/**
 * O(n) – frequency map
 */
export function areAnagramsFreq(a: string, b: string, keepNonLetters = false): boolean {
  const s1 = normalise(a, keepNonLetters);
  const s2 = normalise(b, keepNonLetters);
  if (s1.length !== s2.length) return false;

  const freq = new Map<string, number>();
  for (const ch of s1) {
    freq.set(ch, (freq.get(ch) ?? 0) + 1);
  }

  for (const ch of s2) {
    const count = freq.get(ch);
    if (count === undefined) return false;
    if (count === 1) {
      freq.delete(ch);
    } else {
      freq.set(ch, count - 1);
    }
  }

  return freq.size === 0;
}
// 1️⃣ Normalise (lower‑case, strip spaces/punctuation)
const clean = (s: string) => s.normalize('NFC')
                              .replace(/\s+/g, '')
                              .replace(/[^a-z0-9]/gi, '')
                              .toLowerCase();

// 2️⃣ Sort‑method
const isAnagramSort = (a: string, b: string) =>
  clean(a).split('').sort().join('') === clean(b).split('').sort().join('');

// 3️⃣ Frequency‑method (linear)
const isAnagramFreq = (a: string, b: string) => {
  const x = clean(a), y = clean(b);
  if (x.length !== y.length) return false;
  const map = new Map<string, number>();
  for (const c of x) map.set(c, (map.get(c) ?? 0) + 1);
  for (const c of y) {
    const v = map.get(c);
    if (!v) return false;
    v === 1 ? map.delete(c) : map.set(c, v - 1);
  }
  return map.size === 0;
};
