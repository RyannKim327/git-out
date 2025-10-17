/**
 * Build the "longest proper prefix which is also suffix" (LPS) table.
 * Time  : O(pattern.length)
 * Memory: O(pattern.length)
 */
function buildLpsTable(pattern: string): number[] {
  const m = pattern.length;
  const lps = new Array<number>(m).fill(0);
  let len = 0;          // length of the current longest prefix suffix
  let i = 1;

  while (i < m) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else if (len !== 0) {
      len = lps[len - 1]; // fallback in the LPS table
    } else {
      lps[i] = 0;
      i++;
    }
  }
  return lps;
}

/**
 * KMP search.
 * Returns the index of the first occurrence of `pattern` in `text`,
 * or -1 if not found.
 *
 * Time  : O(text.length + pattern.length)
 * Memory: O(pattern.length)  (for the LPS table)
 */
export function kmpSearch(text: string, pattern: string): number {
  if (pattern.length === 0) return 0;          // empty pattern is always at 0
  if (pattern.length > text.length) return -1;

  const lps = buildLpsTable(pattern);
  let i = 0; // index for text
  let j = 0; // index for pattern

  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i++;
      j++;
      if (j === pattern.length) return i - j;    // full match
    } else if (j !== 0) {
      j = lps[j - 1];                          // fallback in pattern
    } else {
      i++;                                     // advance text pointer
    }
  }
  return -1;                                   // no match
}

/* ---------- Usage demo ---------- */
if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest;

  describe('KMP', () => {
    it('finds substring', () => {
      expect(kmpSearch('ababcababa', 'ababa')).toBe(5);
      expect(kmpSearch('hello world', 'world')).toBe(6);
      expect(kmpSearch('aaaa', 'aa')).toBe(0);
      expect(kmpSearch('abc', 'd')).toBe(-1);
      expect(kmpSearch('abc', '')).toBe(0);
    });
  });
}
import { kmpSearch } from './kmp';

const idx = kmpSearch('the quick brown fox', 'brown');
console.log(idx); // 10
