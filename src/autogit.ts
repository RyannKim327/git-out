/**
 * Rabin–Karp substring search.
 * @param text    The string to search in.
 * @param pattern The substring to look for.
 * @returns The start index of the first match, or -1 if not found.
 */
export function rabinKarp(text: string, pattern: string): number {
  const n = text.length;
  const m = pattern.length;
  if (m === 0) return 0; // empty pattern matches at once
  if (m > n) return -1;

  /* --- Configurable hash parameters --- */
  const base = 65521;            // largest 16-bit prime
  const mod = 0x7fffffff;        // 2^31 - 1

  /* --- Precompute base^(m-1) % mod --- */
  let basePow = 1;               // base^(m-1)
  for (let i = 1; i < m; ++i) basePow = (basePow * base) % mod;

  /* --- Hash the pattern and first window --- */
  let patHash = 0;
  let currHash = 0;
  for (let i = 0; i < m; ++i) {
    const pC = pattern.charCodeAt(i);
    const tC = text.charCodeAt(i);
    patHash = (patHash * base + pC) % mod;
    currHash = (currHash * base + tC) % mod;
  }

  /* --- Slide over the text --- */
  for (let i = 0; i <= n - m; ++i) {
    // If hash matches, confirm character-by-character (avoids spurious hits)
    if (patHash === currHash) {
      let j = 0;
      while (j < m && text[i + j] === pattern[j]) ++j;
      if (j === m) return i;
    }

    // Roll the window (remove leftmost, add rightmost)
    if (i < n - m) {
      const leftChar = text.charCodeAt(i);
      const rightChar = text.charCodeAt(i + m);
      currHash =
        (currHash - (leftChar * basePow) % mod + mod) % mod; // remove left
      currHash = (currHash * base + rightChar) % mod;      // add right
    }
  }
  return -1;
}

/* ---------- Quick sanity checks ---------- */
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it('finds needle in haystack', () => {
    expect(rabinKarp('hello world', 'world')).toBe(6);
    expect(rabinKarp('aaaaa', 'bba')).toBe(-1);
    expect(rabinKarp('🚀🌟🚀🌟', '🌟🚀')).toBe(1);
    expect(rabinKarp('abc', '')).toBe(0);
  });
}
const idx = rabinKarp('the quick brown fox', 'brown');
console.log(idx); // 10
