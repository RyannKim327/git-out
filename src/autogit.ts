/**
 * Normalises a string for anagram comparison.
 *
 * @param s               The raw string.
 * @param ignoreSpaces    If true, removes all whitespace characters.
 * @param ignorePunctuation If true, removes any character that is not a letter or a digit.
 * @returns               A lower‑cased, NFC‑normalised string ready for comparison.
 */
function normalise(
  s: string,
  ignoreSpaces = true,
  ignorePunctuation = true
): string {
  // 1️⃣ Unicode normalisation (NFC = canonical composition)
  let result = s.normalize('NFC').toLowerCase();

  // 2️⃣ Remove spaces if requested
  if (ignoreSpaces) {
    // \s matches any whitespace (space, tab, newline, etc.)
    result = result.replace(/\s+/g, '');
  }

  // 3️⃣ Remove punctuation / symbols if requested
  if (ignorePunctuation) {
    // Keep only letters (including Unicode letters) and digits.
    // \p{L} = any kind of letter, \p{N} = any kind of numeric digit.
    // The 'u' flag enables Unicode property escapes (ES2018+).
    result = result.replace(/[^\p{L}\p{N}]/gu, '');
  }

  return result;
}
/**
 * Returns true if `a` and `b` are anagrams (ignoring case, spaces, punctuation).
 *
 * This implementation sorts the characters of each string and then checks equality.
 *
 * @param a First string.
 * @param b Second string.
 * @returns  Boolean indicating anagram status.
 */
export function areAnagramsSort(
  a: string,
  b: string,
  options?: {
    ignoreSpaces?: boolean;
    ignorePunctuation?: boolean;
  }
): boolean {
  const { ignoreSpaces = true, ignorePunctuation = true } = options ?? {};

  const normA = normalise(a, ignoreSpaces, ignorePunctuation);
  const normB = normalise(b, ignoreSpaces, ignorePunctuation);

  // Quick length check – if lengths differ they cannot be anagrams.
  if (normA.length !== normB.length) return false;

  // Convert to array, sort, and join back.
  const sortedA = [...normA].sort().join('');
  const sortedB = [...normB].sort().join('');

  return sortedA === sortedB;
}
/**
 * Returns true if `a` and `b` are anagrams (ignoring case, spaces, punctuation).
 *
 * This implementation builds a character‑frequency map for the first string
 * and then decrements it while scanning the second string.
 *
 * @param a First string.
 * @param b Second string.
 * @returns  Boolean indicating anagram status.
 */
export function areAnagramsCount(
  a: string,
  b: string,
  options?: {
    ignoreSpaces?: boolean;
    ignorePunctuation?: boolean;
  }
): boolean {
  const { ignoreSpaces = true, ignorePunctuation = true } = options ?? {};

  const normA = normalise(a, ignoreSpaces, ignorePunctuation);
  const normB = normalise(b, ignoreSpaces, ignorePunctuation);

  // Early length check.
  if (normA.length !== normB.length) return false;

  // Map from character → count.
  const freq = new Map<string, number>();

  // 1️⃣ Count characters in the first string.
  for (const ch of normA) {
    freq.set(ch, (freq.get(ch) ?? 0) + 1);
  }

  // 2️⃣ Decrease counts while scanning the second string.
  for (const ch of normB) {
    const current = freq.get(ch);
    // If the character never appeared or we already used up all of them → not an anagram.
    if (current === undefined || current === 0) return false;
    freq.set(ch, current - 1);
  }

  // 3️⃣ If we get here, every count must be zero.
  // (We could skip this loop because the early length check + decrement guarantees it,
  // but it’s a nice safety net if the algorithm changes later.)
  for (const count of freq.values()) {
    if (count !== 0) return false;
  }

  return true;
}
import { areAnagramsSort, areAnagramsCount } from './anagram';

const pairs: [string, string][] = [
  ['listen', 'silent'],
  ['Dormitory', 'Dirty room!!'],
  ['Conversation', 'Voices rant on'],
  ['Astronomer', 'Moon starer'],
  ['The eyes', 'They see'],
  ['A decimal point', "I'm a dot in place"],
  ['hello', 'billion'], // not an anagram
];

// Choose whichever implementation you prefer:
const check = areAnagramsCount; // or areAnagramsSort

for (const [a, b] of pairs) {
  console.log(`"${a}" ↔ "${b}" → ${check(a, b) ? '✅' : '❌'}`);
}
"listen" ↔ "silent" → ✅
"Dormitory" ↔ "Dirty room!!" → ✅
"Conversation" ↔ "Voices rant on" → ✅
"Astronomer" ↔ "Moon starer" → ✅
"The eyes" ↔ "They see" → ✅
"A decimal point" ↔ "I'm a dot in place" → ✅
"hello" ↔ "billion" → ❌
import { areAnagramsSort, areAnagramsCount } from './anagram';

const implementations = {
  sort: areAnagramsSort,
  count: areAnagramsCount,
};

type ImplKey = keyof typeof implementations;

describe.each(Object.entries(implementations) as [ImplKey, typeof areAnagramsSort][])(
  'areAnagrams (%s implementation)',
  (implName, fn) => {
    test('basic positive cases', () => {
      expect(fn('listen', 'silent')).toBe(true);
      expect(fn('Dormitory', 'Dirty room')).toBe(true);
      expect(fn('Conversation', 'Voices rant on')).toBe(true);
    });

    test('ignores case, spaces and punctuation by default', () => {
      expect(fn('A decimal point', "I'm a dot in place")).toBe(true);
    });

    test('detects non‑anagrams', () => {
      expect(fn('hello', 'world')).toBe(false);
      expect(fn('test', 'tost')).toBe(false);
    });

    test('custom options – keep spaces', () => {
      expect(fn('a b', 'ab', { ignoreSpaces: false })).toBe(false);
      expect(fn('a b', 'a b', { ignoreSpaces: false })).toBe(true);
    });

    test('custom options – keep punctuation', () => {
      expect(fn('a!b', 'ba', { ignorePunctuation: false })).toBe(false);
      expect(fn('a!b', 'b!a', { ignorePunctuation: false })).toBe(true);
    });

    test('Unicode handling', () => {
      // é can be represented as U+00E9 or as 'e' + COMBINING ACUTE ACCENT (U+0301)
      const composed = 'café';
      const decomposed = 'cafe\u0301';
      expect(fn(composed, decomposed)).toBe(true);
    });
  }
);
npm test   # assuming jest is set up
// anagram.ts
export function normalise(
  s: string,
  ignoreSpaces = true,
  ignorePunctuation = true
): string {
  let result = s.normalize('NFC').toLowerCase();
  if (ignoreSpaces) result = result.replace(/\s+/g, '');
  if (ignorePunctuation) result = result.replace(/[^\p{L}\p{N}]/gu, '');
  return result;
}

/**
 * Sort‑based anagram check.
 */
export function areAnagramsSort(
  a: string,
  b: string,
  options?: { ignoreSpaces?: boolean; ignorePunctuation?: boolean }
): boolean {
  const { ignoreSpaces = true, ignorePunctuation = true } = options ?? {};
  const normA = normalise(a, ignoreSpaces, ignorePunctuation);
  const normB = normalise(b, ignoreSpaces, ignorePunctuation);
  if (normA.length !== normB.length) return false;
  return [...normA].sort().join('') === [...normB].sort().join('');
}

/**
 * Linear‑time frequency‑map anagram check.
 */
export function areAnagramsCount(
  a: string,
  b: string,
  options?: { ignoreSpaces?: boolean; ignorePunctuation?: boolean }
): boolean {
  const { ignoreSpaces = true, ignorePunctuation = true } = options ?? {};
  const normA = normalise(a, ignoreSpaces, ignorePunctuation);
  const normB = normalise(b, ignoreSpaces, ignorePunctuation);
  if (normA.length !== normB.length) return false;

  const freq = new Map<string, number>();
  for (const ch of normA) freq.set(ch, (freq.get(ch) ?? 0) + 1);
  for (const ch of normB) {
    const cur = freq.get(ch);
    if (!cur) return false;
    freq.set(ch, cur - 1);
  }
  // All counts are zero at this point.
  return true;
}
const areAnagrams = (a: string, b: string) =>
  [...a.replace(/\s+/g, '').toLowerCase()]
    .sort()
    .join('') ===
  [...b.replace(/\s+/g, '').toLowerCase()]
    .sort()
    .join('');
