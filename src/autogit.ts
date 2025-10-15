/**
 * Pre-process the pattern and return the longest-prefix-suffix (LPS) array.
 * Time  : O(m)
 * Memory: O(m)
 */
function buildLpsTable(pattern: string): number[] {
  const m = pattern.length;
  const lps = new Array<number>(m).fill(0);
  let len = 0;          // length of the previous longest prefix suffix
  let i = 1;

  while (i < m) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else if (len !== 0) {
      len = lps[len - 1]; // fallback
    } else {
      lps[i] = 0;
      i++;
    }
  }
  return lps;
}

/**
 * Returns the starting index of the first occurrence of `pattern` in `text`,
 * or -1 if not found.
 * Time  : O(n + m)
 * Memory: O(m)
 */
export function kmpSearch(text: string, pattern: string): number {
  if (pattern.length === 0) return 0;
  if (text.length < pattern.length) return -1;

  const lps = buildLpsTable(pattern);
  let i = 0; // index for text
  let j = 0; // index for pattern

  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i++;
      j++;
      if (j === pattern.length) return i - j; // match found
    } else if (j !== 0) {
      j = lps[j - 1]; // fallback in pattern
    } else {
      i++;
    }
  }
  return -1;
}

/**
 * Same as kmpSearch but returns *all* starting indices.
 */
export function kmpSearchAll(text: string, pattern: string): number[] {
  const res: number[] = [];
  if (pattern.length === 0) return res;

  const lps = buildLpsTable(pattern);
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
    } else if (j !== 0) {
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
  it('finds needle in haystack', () => {
    expect(kmpSearch('abracadabra', 'abra')).toBe(0);
    expect(kmpSearch('abracadabra', 'dabra')).toBe(5);
    expect(kmpSearch('aaaa', 'aa')).toBe(0);
    expect(kmpSearch('abc', '')).toBe(0);
    expect(kmpSearch('abc', 'xyz')).toBe(-1);
  });
  it('finds all overlaps', () => {
    expect(kmpSearchAll('aaaa', 'aa')).toEqual([0, 1, 2]);
  });
}
import { kmpSearch, kmpSearchAll } from './kmp';

console.log(kmpSearch('The quick brown fox', 'brown')); // 10
console.log(kmpSearchAll('aaaa', 'aa'));                // [0, 1, 2]
