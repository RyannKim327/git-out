/**
 * Returns the starting index of `pattern` inside `text`, or -1 if not found.
 * Case-sensitive, Unicode-safe (works on full code-points, not UTF-16 code units).
 */
export function kmpSearch(text: string, pattern: string): number {
  if (pattern.length === 0) return 0;                // empty pattern ⇒ match at 0
  if (pattern.length > text.length) return -1;     // impossible

  // 1. Build LPS table
  const lps: number[] = buildLps(pattern);

  // 2. Scan text
  let i = 0; // index for text
  let j = 0; // index for pattern

  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i++;
      j++;
      if (j === pattern.length) return i - j;        // full match
    } else if (j > 0) {
      j = lps[j - 1];                              // fallback in pattern
    } else {
      i++;                                         // no prefix to reuse
    }
  }
  return -1;                                       // no match
}

/**
 * Builds the LPS (longest proper prefix which is also suffix) table.
 * lps[i] = length of the longest proper prefix of pattern[0..i] that is
 * also a suffix of that substring.
 */
function buildLps(pattern: string): number[] {
  const lps = new Array<number>(pattern.length).fill(0);
  let len = 0; // length of the previous longest prefix suffix
  let i = 1;

  while (i < pattern.length) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else if (len > 0) {
      len = lps[len - 1]; // fallback
    } else {
      lps[i] = 0;
      i++;
    }
  }
  return lps;
}

/* ---------- Convenience helpers ---------- */

/** Return all starting indices where `pattern` occurs in `text`. */
export function kmpSearchAll(text: string, pattern: string): number[] {
  if (pattern.length === 0) return [];
  const lps = buildLps(pattern);
  const res: number[] = [];

  let i = 0;
  let j = 0;

  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i++;
      j++;
      if (j === pattern.length) {
        res.push(i - j);
        j = lps[j - 1]; // allow overlapping matches
      }
    } else if (j > 0) {
      j = lps[j - 1];
    } else {
      i++;
    }
  }
  return res;
}

/* ---------- Quick sanity checks ---------- */
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it('kmpSearch', () => {
    expect(kmpSearch('abxabcabcaby', 'abcaby')).toBe(6);
    expect(kmpSearch('aaaaa', 'bba')).toBe(-1);
    expect(kmpSearch('🚀🌟🚀🌟🌙', '🚀🌟')).toBe(0);
    expect(kmpSearch('🚀🌟🚀🌟🌙', '🌟🌙')).toBe(3);
  });
}
import { kmpSearch, kmpSearchAll } from './kmp';

console.log(kmpSearch('the quick brown fox', 'brown')); // 10
console.log(kmpSearchAll('abababa', 'aba'));            // [0, 2, 4]
