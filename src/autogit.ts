// boyer-moore.ts
export function boyerMoore(haystack: string, needle: string): number {
  if (needle.length === 0) return 0;
  if (needle.length > haystack.length) return -1;

  // --- 1. Pre-processing ---

  // Bad-character table: map last occurrence of each code-point in needle
  const badChar = new Map<number, number>();
  for (let i = 0; i < needle.length; i++) {
    badChar.set(needle.codePointAt(i)!, i);
  }

  // Good-suffix table (simplified "prefix" variant, BM-Horspool style)
  const suffix = new Array<number>(needle.length + 1).fill(0);
  const prefix = new Array<boolean>(needle.length + 1).fill(false);
  _preprocessGoodSuffix(needle, suffix, prefix);

  // --- 2. Searching ---
  let i = 0; // alignment of start of needle in haystack
  while (i <= haystack.length - needle.length) {
    let j = needle.length - 1;
    while (j >= 0 && needle[j] === haystack[i + j]) j--;

    if (j < 0) return i; // full match

    // shift according to the larger of the two rules
    const bcShift = j - (badChar.get(haystack.codePointAt(i + j)!) ?? -1);
    const gsShift = _goodSuffixShift(j, needle.length, suffix, prefix);
    i += Math.max(bcShift, gsShift);
  }
  return -1;
}

// Helper: build good-suffix arrays (simplified version)
function _preprocessGoodSuffix(p: string, suffix: number[], prefix: boolean[]): void {
  const m = p.length;
  for (let i = 0; i < m; i++) suffix[i] = 0;
  for (let i = 0; i < m; i++) prefix[i] = false;

  for (let i = 0; i < m - 1; i++) {
    let j = i;
    let k = 0;
    while (j >= 0 && p[j] === p[m - 1 - k]) {
      j--;
      k++;
      suffix[k] = j + 1;
    }
    if (j === -1) prefix[k] = true;
  }
}

// Compute shift distance for good-suffix rule
function _goodSuffixShift(j: number, m: number, suffix: number[], prefix: boolean[]): number {
  const k = m - 1 - j;
  if (suffix[k] !== 0) return j - suffix[k] + 1;
  for (let r = j + 2; r < m; r++) {
    if (prefix[m - r]) return r;
  }
  return m;
}

// --- quick sanity check ---
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it('finds or returns -1', () => {
    expect(boyerMoore('abcab', 'ab')).toBe(0);
    expect(boyerMoore('abcab', 'cab')).toBe(2);
    expect(boyerMoore('abcab', 'xyz')).toBe(-1);
    expect(boyerMoore('', '')).toBe(0);
    expect(boyerMoore('abc', '')).toBe(0);
  });
}
import { boyerMoore } from './boyer-moore';

const idx = boyerMoore('the quick brown fox jumps', 'brown');
console.log(idx); // 10
