/**
 * Normalises a string for anagram comparison:
 *   - converts to lower‑case,
 *   - removes characters that you don’t want to consider (by default everything
 *     that isn’t a letter is stripped).
 *
 * You can pass a custom RegExp to keep other characters (e.g. digits).
 */
function normalise(
  str: string,
  keepPattern: RegExp = /[a-z]/g   // keep only letters a‑z after lower‑casing
): string {
  // Lower‑case first, then extract the characters we care about.
  // Using match() returns an array of the kept characters (or null).
  const matches = str.toLowerCase().match(keepPattern);
  return matches ? matches.join('') : '';
}
/**
 * Returns true if `a` and `b` are anagrams of each other.
 * Uses the classic “sort the characters and compare” technique.
 */
export function areAnagramsSort(a: string, b: string): boolean {
  const normA = normalise(a);
  const normB = normalise(b);

  // Quick length check – if the normalised strings differ in length they can’t be anagrams.
  if (normA.length !== normB.length) return false;

  // Split → sort → join gives a canonical representation.
  const sortedA = normA.split('').sort().join('');
  const sortedB = normB.split('').sort().join('');

  return sortedA === sortedB;
}
/**
 * Returns true if `a` and `b` are anagrams of each other.
 * Uses a character‑frequency map for O(n) time.
 */
export function areAnagramsFreq(a: string, b: string): boolean {
  const normA = normalise(a);
  const normB = normalise(b);

  if (normA.length !== normB.length) return false;

  // Build a frequency map for the first string.
  const freq = new Map<string, number>();

  for (const ch of normA) {
    freq.set(ch, (freq.get(ch) ?? 0) + 1);
  }

  // Decrease the count while scanning the second string.
  for (const ch of normB) {
    const count = freq.get(ch);
    if (count === undefined) {
      // Character not present in the first string.
      return false;
    }
    if (count === 1) {
      freq.delete(ch); // optional – keeps the map small
    } else {
      freq.set(ch, count - 1);
    }
  }

  // If the map is empty, every character matched perfectly.
  return freq.size === 0;
}
// demo.ts
import { areAnagramsSort, areAnagramsFreq } from "./anagram";

const pairs: [string, string][] = [
  ["listen", "silent"],
  ["Triangle", "Integral"],
  ["Apple", "Pabble"],          // false
  ["Dormitory", "Dirty room!"], // true (ignores spaces & punctuation)
  ["12345", "54321"],           // true if you keep digits
  ["aabbcc", "abcabc"],         // true
];

for (const [s1, s2] of pairs) {
  console.log(`"${s1}" ↔ "${s2}"`);
  console.log("  sort  :", areAnagramsSort(s1, s2));
  console.log("  freq  :", areAnagramsFreq(s1, s2));
  console.log("---");
}
$ ts-node demo.ts
"listen" ↔ "silent"
  sort  : true
  freq  : true
---
"Triangle" ↔ "Integral"
  sort  : true
  freq  : true
---
"Apple" ↔ "Pabble"
  sort  : false
  freq  : false
---
"Dormitory" ↔ "Dirty room!"
  sort  : true
  freq  : true
---
"12345" ↔ "54321"
  sort  : true
  freq  : true
---
"aabbcc" ↔ "abcabc"
  sort  : true
  freq  : true
---
// anagram.ts
/**
 * Normalises a string for anagram comparison.
 * By default it keeps only the letters a‑z (case‑insensitive).
 */
export function normalise(
  str: string,
  keepPattern: RegExp = /[a-z]/g
): string {
  const matches = str.toLowerCase().match(keepPattern);
  return matches ? matches.join('') : '';
}

/**
 * Sort‑and‑compare version – O(n log n) time.
 */
export function areAnagramsSort(a: string, b: string): boolean {
  const normA = normalise(a);
  const normB = normalise(b);
  if (normA.length !== normB.length) return false;
  return normA.split('').sort().join('') === normB.split('').sort().join('');
}

/**
 * Frequency‑map version – O(n) time, O(1) extra space for ASCII.
 */
export function areAnagramsFreq(a: string, b: string): boolean {
  const normA = normalise(a);
  const normB = normalise(b);
  if (normA.length !== normB.length) return false;

  const freq = new Map<string, number>();
  for (const ch of normA) {
    freq.set(ch, (freq.get(ch) ?? 0) + 1);
  }

  for (const ch of normB) {
    const count = freq.get(ch);
    if (count === undefined) return false;
    if (count === 1) freq.delete(ch);
    else freq.set(ch, count - 1);
  }

  return freq.size === 0;
}
import { areAnagramsSort, areAnagramsFreq } from "./anagram";

console.log(areAnagramsSort("Listen", "Silent")); // true
console.log(areAnagramsFreq("Dormitory", "Dirty room!")); // true
