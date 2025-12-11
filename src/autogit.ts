/**
 * KMP – Knuth-Morris-Pratt string search
 * Complexity: O(n + m) time, O(m) space
 */
export function kmpSearch(text: string, pattern: string): number {
  if (pattern.length === 0) return 0;               // empty pattern is found at 0
  if (pattern.length > text.length) return -1;    // impossible

  const lps = buildLPS(pattern);
  let i = 0; // index for text
  let j = 0; // index for pattern

  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i++;
      j++;
      if (j === pattern.length) return i - j;     // full match
    } else {
      if (j !== 0) {
        j = lps[j - 1];                           // fallback in pattern
      } else {
        i++;                                      // no match, advance text
      }
    }
  }
  return -1;                                      // not found
}

/**
 * Build LPS (Longest Prefix Suffix) table for KMP
 */
function buildLPS(pattern: string): number[] {
  const lps: number[] = new Array(pattern.length).fill(0);
  let len = 0; // length of the previous longest prefix suffix
  let i = 1;

  while (i < pattern.length) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        len = lps[len - 1]; // fallback in pattern
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }
  return lps;
}

/* ------------------- Usage demo ------------------- */
if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest;

  describe('KMP', () => {
    it('finds pattern', () => {
      expect(kmpSearch('ababcabcababcabc', 'abcab')).toBe(5);
      expect(kmpSearch('aaaaa', 'aaa')).toBe(0);
      expect(kmpSearch('abcdef', 'xyz')).toBe(-1);
      expect(kmpSearch('', '')).toBe(0);
    });
  });
}
import { kmpSearch } from './kmp';

const idx = kmpSearch('the quick brown fox', 'brown');
console.log(idx); // 10
export function kmpSearchAll(text: string, pattern: string): number[] {
  if (pattern.length === 0) return [0];
  const lps = buildLSP(pattern);
  const res: number[] = [];
  let i = 0, j = 0;

  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i++; j++;
      if (j === pattern.length) {
        res.push(i - j);
        j = lps[j - 1]; // continue searching for next match
      }
    } else {
      j = j !== 0 ? lps[j - 1] : 0;
      i += j === 0 ? 1 : 0;
    }
  }
  return res;
}
