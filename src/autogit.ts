/**
 * Rabin–Karp substring search.
 * @param text  The string to search in.
 * @param pat   The substring to look for.
 * @returns     Index of first occurrence or -1 if not found.
 */
export function rabinKarp(text: string, pat: string): number {
  if (pat.length === 0) return 0;
  if (pat.length > text.length) return -1;

  /* ---------- Config ---------- */
  const base = 257;               // bigger than any UTF-16 code unit
  const mod = 0x7fffffff;         // largest 31-bit prime (2^31-1)

  const m = pat.length;
  const n = text.length;

  /* ---------- Helpers ---------- */
  const charCode = (c: string) => c.charCodeAt(0);

  // Pre-compute base^(m-1) % mod
  let highBase = 1;               // base^(m-1)
  for (let i = 1; i < m; i++) {
    highBase = (highBase * base) % mod;
  }

  /* ---------- Hash the pattern & first window ---------- */
  let patHash = 0;
  let winHash = 0;
  for (let i = 0; i < m; i++) {
    patHash = (patHash * base + charCode(pat[i])) % mod;
    winHash = (winHash * base + charCode(text[i])) % mod;
  }

  /* ---------- Slide over text ---------- */
  for (let i = 0; i <= n - m; i++) {
    // If hashes match, confirm character-by-character (avoids false positives)
    if (patHash === winHash) {
      let j = 0;
      while (j < m && pat[j] === text[i + j]) j++;
      if (j === m) return i;
    }

    // Roll hash one position right (unless last iteration)
    if (i < n - m) {
      winHash =
        ((winHash - charCode(text[i]) * highBase) % mod + mod) % mod; // remove left char
      winHash = (winHash * base + charCode(text[i + m])) % mod;     // add right char
    }
  }
  return -1;
}

/* ---------- Quick sanity check ---------- */
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it('finds needle', () => {
    expect(rabinKarp('abracadabra', 'bra')).toBe(1);
    expect(rabinKarp('aaaaaa', 'aaa')).toBe(0);
    expect(rabinKarp('hello', 'world')).toBe(-1);
    expect(rabinKarp('🦄🌈🦄', '🌈')).toBe(1);
  });
}
const idx = rabinKarp('The quick brown fox', 'brown');
console.log(idx); // 10
