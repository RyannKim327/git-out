/**
 * Rabin–Karp substring search.
 * Returns the index of the first occurrence of `pattern` inside `text`,
 * or -1 if not found.
 *
 * Time:  O(n + m)  expected, O(nm) worst-case (if modulus is bad).
 * Space: O(1)
 */
export function rabinKarp(text: string, pattern: string): number {
  const n = text.length;
  const m = pattern.length;
  if (m === 0) return 0;               // empty pattern matches at start
  if (m > n) return -1;

  /* --- constants --- */
  const base = 257;                    // small prime > Unicode max
  const mod = 0x7fffffff;              // 2^31 - 1, fits into signed 32-bit

  /* --- precompute base^(m-1) mod mod --- */
  let basePow = 1;                     // base^(m-1) % mod
  for (let i = 1; i < m; ++i) basePow = (basePow * base) % mod;

  /* --- hash the pattern and first window --- */
  let patHash = 0;
  let winHash = 0;
  for (let i = 0; i < m; ++i) {
    const p = pattern.codePointAt(i)!;
    const t = text.codePointAt(i)!;
    patHash = (patHash * base + p) % mod;
    winHash = (winHash * base + t) % mod;
  }

  /* --- slide over the text --- */
  for (let i = 0; i <= n - m; ++i) {
    // if hashes match, confirm character-by-character (avoids false positives)
    if (patHash === winHash) {
      let match = true;
      for (let j = 0; j < m; ++j) {
        if (text[i + j] !== pattern[j]) {   // fast for ASCII, still correct for UTF-16
          match = false;
          break;
        }
      }
      if (match) return i;
    }

    // remove text[i] and add text[i+m] (unless we are at the last window)
    if (i < n - m) {
      const left  = text.codePointAt(i)!;
      const right = text.codePointAt(i + m)!;
      winHash = (winHash + mod - (left * basePow) % mod) % mod; // remove left
      winHash = (winHash * base + right) % mod;                // add right
    }
  }
  return -1;
}

/* ------------------ small sanity check ------------------ */
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it('works', () => {
    expect(rabinKarp('hello world', 'world')).toBe(6);
    expect(rabinKarp('aaaaaa', 'aaa')).toBe(0);
    expect(rabinKarp('🚀🌟🚀🌟', '🌟🚀')).toBe(-1);
    expect(rabinKarp('🚀🌟🚀🌟', '🚀🌟')).toBe(0);
    expect(rabinKarp('abc', '')).toBe(0);
    expect(rabinKarp('abc', 'd')).toBe(-1);
  });
}
const idx = rabinKarp('the quick brown fox', 'brown');
console.log(idx); // 10
