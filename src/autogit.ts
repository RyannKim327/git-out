/**
 * Normalises a string for anagram comparison:
 *   - removes all non‑letter characters (you can adjust the regex)
 *   - converts to lower‑case
 *   - trims surrounding whitespace
 */
function normalize(str: string): string {
  // Keep only letters (including Unicode letters) and numbers if you want.
  // \p{L} = any kind of letter, \p{N} = any kind of number.
  // The 'u' flag makes the regex Unicode‑aware.
  return str
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}]/gu, '') // strip everything else
    .trim();
}
/**
 * Returns true if `a` and `b` are anagrams of each other.
 * Uses the classic “sort the characters” technique.
 */
export function areAnagramsSort(a: string, b: string): boolean {
  const normA = normalize(a);
  const normB = normalize(b);

  // Early exit: different lengths → cannot be anagrams
  if (normA.length !== normB.length) return false;

  const sortedA = normA.split('').sort().join('');
  const sortedB = normB.split('').sort().join('');

  return sortedA === sortedB;
}
/**
 * Returns true if `a` and `b` are anagrams of each other.
 * Uses a character‑frequency map (linear time, constant extra space for ASCII).
 */
export function areAnagramsFreq(a: string, b: string): boolean {
  const normA = normalize(a);
  const normB = normalize(b);

  if (normA.length !== normB.length) return false;

  // Using a plain object as a hashmap; keys are single characters.
  const freq: Record<string, number> = {};

  // Count characters in the first string
  for (const ch of normA) {
    freq[ch] = (freq[ch] ?? 0) + 1;
  }

  // Subtract counts using the second string
  for (const ch of normB) {
    const count = (freq[ch] ?? 0) - 1;
    if (count < 0) {
      // More of `ch` in `b` than in `a` → not an anagram
      return false;
    }
    freq[ch] = count;
  }

  // If we never hit a negative count, the strings are anagrams.
  // (No need for a second pass because lengths are equal.)
  return true;
}
// demo.ts
import { areAnagramsSort, areAnagramsFreq } from './anagram';

const pairs: [string, string][] = [
  ['listen', 'silent'],
  ['Dormitory', 'Dirty room!!'],
  ['Conversation', 'Voices rant on'],
  ['Astronomer', 'Moon starer'],
  ['hello', 'world'],
  ['😀😃😄', '😄😀😃'],
];

for (const [s1, s2] of pairs) {
  console.log(`"${s1}" ↔ "${s2}"`);
  console.log('  sort  :', areAnagramsSort(s1, s2));
  console.log('  freq  :', areAnagramsFreq(s1, s2));
  console.log('---');
}
"listen" ↔ "silent"
  sort  : true
  freq  : true
---
"Dormitory" ↔ "Dirty room!!"
  sort  : true
  freq  : true
---
"Conversation" ↔ "Voices rant on"
  sort  : true
  freq  : true
---
"Astronomer" ↔ "Moon starer"
  sort  : true
  freq  : true
---
"hello" ↔ "world"
  sort  : false
  freq  : false
---
"😀😃😄" ↔ "😄😀😃"
  sort  : true
  freq  : true
---
function normalizeKeepSpaces(str: string): string {
  return str
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, '') // keep whitespace (\s)
    .trim();
}
const freq = new Map<string, number>();
// ... same logic, but use freq.get(ch) ?? 0 and freq.set(ch, newCount)
const anagram = (a: string, b: string) =>
  normalize(a).split('').sort().join('') ===
  normalize(b).split('').sort().join('');
// anagram.ts
/**
 * Normalises a string for anagram comparison.
 * Adjust the RegExp if you want a different definition of "ignorable" characters.
 */
function normalize(str: string): string {
  return str
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}]/gu, '')
    .trim();
}

/**
 * O(n log n) version – sort the characters.
 */
export function areAnagramsSort(a: string, b: string): boolean {
  const normA = normalize(a);
  const normB = normalize(b);
  if (normA.length !== normB.length) return false;
  return normA.split('').sort().join('') === normB.split('').sort().join('');
}

/**
 * O(n) version – character frequency map.
 */
export function areAnagramsFreq(a: string, b: string): boolean {
  const normA = normalize(a);
  const normB = normalize(b);
  if (normA.length !== normB.length) return false;

  const freq: Record<string, number> = {};

  for (const ch of normA) {
    freq[ch] = (freq[ch] ?? 0) + 1;
  }

  for (const ch of normB) {
    const count = (freq[ch] ?? 0) - 1;
    if (count < 0) return false;
    freq[ch] = count;
  }

  return true;
}
