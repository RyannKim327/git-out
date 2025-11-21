/**
 * Rabin–Karp substring search.
 * @param text    The string to search in.
 * @param pattern The substring to look for.
 * @returns Index of the first occurrence, or -1 if not found.
 */
export function rabinKarp(text: string, pattern: string): number {
  if (pattern.length === 0) return 0;
  if (pattern.length > text.length) return -1;

  const base = 257;                       // alphabet size (Unicode-safe)
  const mod = 2_147_483_647;              // large prime to stay within 32-bit

  const m = pattern.length;
  const n = text.length;

  let patternHash = 0;
  let currentHash = 0;
  let highBase = 1;                       // base^(m-1) % mod

  // Pre-compute base^(m-1) % mod
  for (let i = 1; i < m; i++) {
    highBase = (highBase * base) % mod;
  }

  // Hash pattern and first window of text
  for (let i = 0; i < m; i++) {
    patternHash = (patternHash * base + pattern.charCodeAt(i)) % mod;
    currentHash = (currentHash * base + text.charCodeAt(i)) % mod;
  }

  // Slide over text
  for (let i = 0; i <= n - m; i++) {
    // If hashes match, confirm character-by-character (avoids false positives)
    if (patternHash === currentHash) {
      let j = 0;
      while (j < m && text[i + j] === pattern[j]) j++;
      if (j === m) return i;
    }

    // Roll hash one step to the right (unless we are at the last window)
    if (i < n - m) {
      currentHash =
        (currentHash -
          (text.charCodeAt(i) * highBase) % mod +
          mod) % mod;                     // remove leftmost char
      currentHash = (currentHash * base + text.charCodeAt(i + m)) % mod; // add new char
    }
  }
  return -1;
}

/* ---------- Usage example ---------- */
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it('finds substring', () => {
    expect(rabinKarp('abracadabra', 'bra')).toBe(1);
    expect(rabinKarp('🚀 test 🚀', 'test')).toBe(2);
    expect(rabinKarp('aaaaaa', 'aaa')).toBe(0);
    expect(rabinKarp('abc', 'd')).toBe(-1);
  });
}
