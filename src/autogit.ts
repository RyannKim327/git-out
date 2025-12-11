/**
 * Boyer-Moore exact pattern search (bad-character + simplified good-suffix).
 * Returns the index of the first occurrence of `pat` in `txt`, or -1 if not found.
 */
export function boyerMoore(txt: string, pat: string): number {
  if (pat.length === 0) return 0;
  if (pat.length > txt.length) return -1;

  // 1. Bad-character table (Unicode-safe)
  const bad: Map<string, number> = new Map();
  for (let i = 0; i < pat.length - 1; ++i) {
    bad.set(pat[i], pat.length - 1 - i);
  }

  // 2. Good-suffix table (simplified: only the whole-suffix case)
  const suffixLen = suffixLength(pat);
  const goodShift = pat.length - suffixLen;

  // 3. Search
  let i = pat.length - 1; // alignment of end of pattern in text
  while (i < txt.length) {
    let j = pat.length - 1; // position in pattern
    let k = i;            // position in text
    while (j >= 0 && txt[k] === pat[j]) {
      --j;
      --k;
    }
    if (j < 0) return k + 1; // match found

    const bcShift = bad.get(txt[i]) ?? pat.length;
    const shift = Math.max(bcShift, goodShift);
    i += shift;
  }
  return -1;
}

/**
 * Returns the length of the longest suffix that is also a prefix.
 * This gives a safe shift for the good-suffix heuristic.
 */
function suffixLength(pat: string): number {
  const n = pat.length;
  for (let len = n - 1; len > 0; --len) {
    let match = true;
    for (let i = 0; i < len; ++i) {
      if (pat[i] !== pat[n - len + i]) {
        match = false;
        break;
      }
    }
    if (match) return len;
  }
  return 0;
}

/* ------------------- Usage example ------------------- */
if (import.meta.vitest) {
  const { expect, it } = import.meta.vitest;
  it('finds needle', () => {
    expect(boyerMoore('aabaacaadaabaaba', 'aabaaba')).toBe(9);
    expect(boyerMoore('abczabcyabcxabcw', 'abcw')).toBe(12);
    expect(boyerMoore('aaaaaaa', 'aaa')).toBe(0);
    expect(boyerMoore('xyz', 'abc')).toBe(-1);
  });
}
import { boyerMoore } from './boyerMoore';

const idx = boyerMoore('the quick brown fox', 'brown');
console.log(idx); // 10
