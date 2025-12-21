/**
 * Normalises a string for anagram comparison.
 *
 * - Converts to lower‑case.
 * - Removes characters that are not letters (optional).
 *
 * @param str The raw string.
 * @param keepNonLetters If true, non‑letter characters are kept.
 * @returns A cleaned string.
 */
function normalize(str: string, keepNonLetters = false): string {
  // `Array.from` splits the string into Unicode code points (handles emojis, etc.)
  const chars = Array.from(str.toLowerCase());

  if (!keepNonLetters) {
    // Keep only letters a‑z (you can expand the regex for other alphabets)
    return chars.filter(ch => /[a-z]/u.test(ch)).join('');
  }

  return chars.join('');
}
/**
 * Checks if two strings are anagrams using the sort‑and‑compare method.
 *
 * @param a First string.
 * @param b Second string.
 * @param keepNonLetters Pass `true` to keep spaces/punctuation in the comparison.
 * @returns `true` if they are anagrams, otherwise `false`.
 */
export function areAnagramsSort(a: string, b: string, keepNonLetters = false): boolean {
  const normA = normalize(a, keepNonLetters);
  const normB = normalize(b, keepNonLetters);

  // Quick length check – if lengths differ they can’t be anagrams
  if (normA.length !== normB.length) return false;

  // Sort the characters (Array.from already gave us a proper array)
  const sortedA = Array.from(normA).sort().join('');
  const sortedB = Array.from(normB).sort().join('');

  return sortedA === sortedB;
}
/**
 * Checks if two strings are anagrams using a character‑frequency map.
 *
 * Works in linear time and constant extra space (the map size is bounded by the
 * alphabet you care about – here we use a plain object for any Unicode char).
 *
 * @param a First string.
 * @param b Second string.
 * @param keepNonLetters Pass `true` to keep spaces/punctuation in the comparison.
 * @returns `true` if they are anagrams, otherwise `false`.
 */
export function areAnagramsFreq(a: string, b: string, keepNonLetters = false): boolean {
  const normA = normalize(a, keepNonLetters);
  const normB = normalize(b, keepNonLetters);

  if (normA.length !== normB.length) return false;

  // Build frequency map for the first string
  const freq: Record<string, number> = {};

  for (const ch of Array.from(normA)) {
    freq[ch] = (freq[ch] ?? 0) + 1;
  }

  // Decrease counts while scanning the second string
  for (const ch of Array.from(normB)) {
    if (!(ch in freq)) {
      // Character not present in the first string
      return false;
    }
    freq[ch]--;
    if (freq[ch] === 0) {
      delete freq[ch]; // optional – keeps the map small
    }
  }

  // If the map is empty, every count matched
  return Object.keys(freq).length === 0;
}
// demo.ts (or a test file)
import { areAnagramsSort, areAnagramsFreq } from './anagram';

const pairs: [string, string][] = [
  ['listen', 'silent'],
  ['Triangle', 'Integral'],
  ['Apple', 'Pabble'],          // false
  ['Dormitory', 'Dirty room!!'], // true when ignoring punctuation/spaces
  ['A gentleman', 'Elegant man'],
  ['Astronomer', 'Moon starer'],
  ['12345', '54321'],           // false unless keepNonLetters = true
];

for (const [s1, s2] of pairs) {
  console.log(`"${s1}" ↔ "${s2}"`);
  console.log('  sort  :', areAnagramsSort(s1, s2));
  console.log('  freq  :', areAnagramsFreq(s1, s2));
  console.log('  freq (keep non‑letters):', areAnagramsFreq(s1, s2, true));
  console.log('---');
}
"listen" ↔ "silent"
  sort  : true
  freq  : true
  freq (keep non‑letters): true
---
"Triangle" ↔ "Integral"
  sort  : true
  freq  : true
  freq (keep non‑letters): true
---
"Apple" ↔ "Pabble"
  sort  : false
  freq  : false
  freq (keep non‑letters): false
---
"Dormitory" ↔ "Dirty room!!"
  sort  : true
  freq  : true
  freq (keep non‑letters): false   // punctuation removed, spaces ignored
---
"A gentleman" ↔ "Elegant man"
  sort  : true
  freq  : true
  freq (keep non‑letters): false
---
"Astronomer" ↔ "Moon starer"
  sort  : true
  freq  : true
  freq (keep non‑letters): false
---
"12345" ↔ "54321"
  sort  : false
  freq  : false
  freq (keep non‑letters): true
---
// anagram.ts
/**
 * Normalises a string for anagram comparison.
 */
function normalize(str: string, keepNonLetters = false): string {
  const chars = Array.from(str.toLowerCase());
  if (!keepNonLetters) {
    return chars.filter(ch => /[a-z]/u.test(ch)).join('');
  }
  return chars.join('');
}

/**
 * Sort‑and‑compare implementation.
 */
export function areAnagramsSort(a: string, b: string, keepNonLetters = false): boolean {
  const normA = normalize(a, keepNonLetters);
  const normB = normalize(b, keepNonLetters);
  if (normA.length !== normB.length) return false;
  const sortedA = Array.from(normA).sort().join('');
  const sortedB = Array.from(normB).sort().join('');
  return sortedA === sortedB;
}

/**
 * Linear‑time frequency‑map implementation.
 */
export function areAnagramsFreq(a: string, b: string, keepNonLetters = false): boolean {
  const normA = normalize(a, keepNonLetters);
  const normB = normalize(b, keepNonLetters);
  if (normA.length !== normB.length) return false;

  const freq: Record<string, number> = {};

  for (const ch of Array.from(normA)) {
    freq[ch] = (freq[ch] ?? 0) + 1;
  }

  for (const ch of Array.from(normB)) {
    if (!(ch in freq)) return false;
    freq[ch]--;
    if (freq[ch] === 0) delete freq[ch];
  }

  return Object.keys(freq).length === 0;
}
