/**
 * Normalises a string for anagram comparison.
 *
 * - Converts to lower‑case.
 * - Removes any character that is not a letter (you can change the regex).
 *
 * @param s The raw input string.
 * @returns A cleaned string consisting only of lower‑case letters.
 */
function normalize(s: string): string {
  // Keep only letters a‑z (Unicode letters can be added with \p{L})
  return s.toLowerCase().replace(/[^a-z]/g, '');
}
/**
 * Returns true if `a` and `b` are anagrams (case‑insensitive, ignoring non‑letters).
 */
function areAnagramsSort(a: string, b: string): boolean {
  const normA = normalize(a);
  const normB = normalize(b);

  // Early exit if lengths differ after normalisation
  if (normA.length !== normB.length) return false;

  const sortedA = normA.split('').sort().join('');
  const sortedB = normB.split('').sort().join('');

  return sortedA === sortedB;
}
/**
 * Returns true if `a` and `b` are anagrams (case‑insensitive, ignoring non‑letters).
 * Uses a frequency map for O(n) time and O(1) extra space (alphabet size is constant).
 */
function areAnagramsCount(a: string, b: string): boolean {
  const normA = normalize(a);
  const normB = normalize(b);

  if (normA.length !== normB.length) return false;

  // Since we only keep a‑z, we can use a fixed‑size array (size 26) for speed.
  const counts = new Uint16Array(26); // 0‑255 would also work for short strings

  const charCode = (c: string) => c.charCodeAt(0) - 97; // 'a' → 0, 'b' → 1, ...

  for (let i = 0; i < normA.length; i++) {
    counts[charCode(normA[i])]++;
    counts[charCode(normB[i])]--;
  }

  // If any bucket is non‑zero, the strings differ.
  for (let i = 0; i < 26; i++) {
    if (counts[i] !== 0) return false;
  }
  return true;
}
// ----- Normalisation -------------------------------------------------
function normalize(s: string): string {
  return s.toLowerCase().replace(/[^a-z]/g, '');
}

// ----- Sort‑based ----------------------------------------------------
function areAnagramsSort(a: string, b: string): boolean {
  const normA = normalize(a);
  const normB = normalize(b);
  if (normA.length !== normB.length) return false;
  return normA.split('').sort().join('') === normB.split('').sort().join('');
}

// ----- Count‑based ----------------------------------------------------
function areAnagramsCount(a: string, b: string): boolean {
  const normA = normalize(a);
  const normB = normalize(b);
  if (normA.length !== normB.length) return false;

  const counts = new Uint16Array(26);
  const offset = 'a'.charCodeAt(0);

  for (let i = 0; i < normA.length; i++) {
    counts[normA.charCodeAt(i) - offset]++;   // ++ for a
    counts[normB.charCodeAt(i) - offset]--;   // -- for b
  }

  for (let i = 0; i < 26; i++) {
    if (counts[i] !== 0) return false;
  }
  return true;
}

// ----- Demo -----------------------------------------------------------
const pairs: [string, string][] = [
  ['Listen', 'Silent'],
  ['Dormitory', 'Dirty room'],
  ['A gentleman', 'Elegant man!'],
  ['Hello', 'Olelh'],
  ['test', 'tost'],
];

pairs.forEach(([x, y]) => {
  console.log(`"${x}" ↔ "${y}"`);
  console.log('  sort  :', areAnagramsSort(x, y));
  console.log('  count :', areAnagramsCount(x, y));
  console.log('---');
});
"Listen" ↔ "Silent"
  sort  : true
  count : true
---
"Dormitory" ↔ "Dirty room"
  sort  : true
  count : true
---
"A gentleman" ↔ "Elegant man!"
  sort  : true
  count : true
---
"Hello" ↔ "Olelh"
  sort  : true
  count : true
---
"test" ↔ "tost"
  sort  : false
  count : false
---
function areAnagramsUnicode(a: string, b: string): boolean {
  const normA = a.toLowerCase(); // keep everything, just lower‑case
  const normB = b.toLowerCase();

  if (normA.length !== normB.length) return false;

  const freq = new Map<string, number>();

  for (const ch of normA) {
    freq.set(ch, (freq.get(ch) ?? 0) + 1);
  }
  for (const ch of normB) {
    const cur = (freq.get(ch) ?? 0) - 1;
    if (cur === 0) freq.delete(ch);
    else freq.set(ch, cur);
  }
  return freq.size === 0;
}
const isAnagram = (a: string, b: string) =>
  a.toLowerCase().replace(/[^a-z]/g, '').split('').sort().join('') ===
  b.toLowerCase().replace(/[^a-z]/g, '').split('').sort().join('');
