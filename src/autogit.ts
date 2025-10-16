/**
 * Returns the index of the first occurrence of `pat` in `txt`, or -1 if not found.
 * Case-sensitive, UTF-16 code-unit based (works fine for ASCII).
 */
export function boyerMoore(txt: string, pat: string): number {
  if (pat.length === 0) return 0;
  if (pat.length > txt.length) return -1;

  /* ---------- 1. Build bad-character table ---------- */
  const R = 65_536;               // size of UTF-16 code-unit alphabet
  const right: number[] = new Array(R);
  right.fill(-1);                 // -1 => char not in pattern
  for (let j = 0; j < pat.length; j++) {
    right[pat.charCodeAt(j)] = j; // last occurrence of char
  }

  /* ---------- 2. Search ---------- */
  const m = pat.length;
  const n = txt.length;
  let skip: number;
  for (let i = 0; i <= n - m; i += skip) {
    skip = 0;
    // scan pattern right-to-left
    for (let j = m - 1; j >= 0; j--) {
      const c = txt.charCodeAt(i + j);
      if (c !== pat.charCodeAt(j)) {
        // bad-character jump: max(1, j - right[c])
        skip = Math.max(1, j - right[c]);
        break;
      }
    }
    if (skip === 0) return i;   // whole pattern matched
  }
  return -1;
}

/* ---------- 3. Quick sanity check ---------- */
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it('finds needle', () => {
    expect(boyerMoore('abracadabra', 'cad')).toBe(4);
    expect(boyerMoore('aaaaaaa', 'aaa')).toBe(0);
    expect(boyerMoore('hello', 'world')).toBe(-1);
  });
}
import { boyerMoore } from './boyermoore';

const idx = boyerMoore('the quick brown fox', 'brown');
console.log(idx); // 10
