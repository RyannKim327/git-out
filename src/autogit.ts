/**
 * Boyer-Moore-Horspool string search.
 * Returns the *first* index of `pattern` inside `text`, or `-1` if not found.
 * Complexity: O(n) worst-case, Θ(n/m) on average, where n = text.length, m = pattern.length.
 */
export function indexOf(text: string, pattern: string, start = 0): number {
  if (pattern.length === 0) return 0;                 // empty pattern matches at start
  const m = pattern.length;
  const n = text.length;
  if (m > n - start) return -1;                       // pattern longer than remaining text

  /* ---------- 1. Build bad-character skip table ---------- */
  const skip = new Uint16Array(256);                   // 256 ASCII bytes
  skip.fill(m);                                      // default skip = full pattern length
  for (let i = 0; i < m - 1; ++i) {                  // last char not needed
    skip[pattern.charCodeAt(i)] = m - 1 - i;          // right-most occurrence (excl. last)
  }

  /* ---------- 2. Search ---------- */
  let pos = start + m - 1;                            // align end of pattern
  while (pos < n) {
    let i = m - 1;                                    // start at end of pattern
    let j = pos;
    while (i >= 0 && text[j] === pattern[i]) {        // compare backwards
      --i;
      --j;
    }
    if (i < 0) return j + 1;                          // full match found
    pos += skip[text.charCodeAt(pos)];                  // jump by skip value
  }
  return -1;                                          // not found
}

/* ---------- 3. Convenience helpers ---------- */
export function contains(text: string, pattern: string): boolean {
  return indexOf(text, pattern) !== -1;
}

export function indexOfAll(text: string, pattern: string): number[] {
  const res: number[] = [];
  let idx = indexOf(text, pattern);
  while (idx !== -1) {
    res.push(idx);
    idx = indexOf(text, pattern, idx + 1);
  }
  return res;
}

/* ---------- 4. Quick demo ---------- */
if (import.meta.vitest) {                              // Vitest guard (remove if you use Jest/Mocha)
  const { it, expect } = import.meta.vitest;
  it('finds first occurrence', () => {
    expect(indexOf('abracadabra', 'cad')).toBe(4);
    expect(indexOf('aaaaaaa', 'aaa')).toBe(0);
    expect(indexOf('Hello World', 'x')).toBe(-1);
  });
}
import { indexOf, contains, indexOfAll } from './bmh';

console.log(indexOf('the quick brown fox', 'brown')); // → 10
console.log(contains('banana', 'ana'));                 // → true
console.log(indexOfAll('aaaa', 'aa'));                // → [0,1,2]  (overlapping matches)
