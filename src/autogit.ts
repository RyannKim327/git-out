hash(s) = (s[0] * B^(m‑1) + s[1] * B^(m‑2) + … + s[m‑1]) mod M
hT = ((hT - leftChar * B^(m-1)) * B + newChar) mod M
/**
 * Rabin‑Karp string search
 *
 * @param text    The string to search within
 * @param pattern The substring to look for
 * @returns      An array of starting indices where pattern occurs in text
 */
export function rabinKarp(text: string, pattern: string): number[] {
  const n = text.length;
  const m = pattern.length;

  if (m === 0 || n < m) return [];

  /* --------------------------------
   * 1️⃣ Choose base and modulus
   *
   * Base (B) should be > alphabet size.  257 works for extended ASCII.
   * Modulus (M) should be a large prime; 1e9+7 is common and fits 32‑bit int.
   * -------------------------------- */
  const B = 257;                       // base
  const M = 1_000_000_007;             // large prime modulus

  /* --------------------------------
   * 2️⃣ Pre‑compute (B^(m‑1)) mod M
   *      this is the weight of the leftmost character in a window
   * -------------------------------- */
  let highestPower = 1;
  for (let i = 0; i < m - 1; i++) {
    highestPower = (highestPower * B) % M;
  }

  /* --------------------------------
   * 3️⃣ Helper: compute hash of a string slice
   * -------------------------------- */
  const stringHash = (s: string): number => {
    let h = 0;
    for (let i = 0; i < s.length; i++) {
      h = (h * B + s.charCodeAt(i)) % M;
    }
    return h;
  };

  /* --------------------------------
   * 4️⃣ Initial hashes
   * -------------------------------- */
  const patternHash = stringHash(pattern);
  let windowHash = stringHash(text.slice(0, m));

  /* --------------------------------
   * 5️⃣ Sliding window
   * -------------------------------- */
  const result: number[] = [];
  for (let i = 0; i <= n - m; i++) {
    // a hash match → double‑check with a literal comparison
    if (windowHash === patternHash) {
      if (text.substr(i, m) === pattern) {
        result.push(i);
      }
    }

    // prepare hash for next window
    if (i < n - m) {
      const leftCharCode = text.charCodeAt(i);
      const rightCharCode = text.charCodeAt(i + m);

      // delete leftmost contribution
      windowHash = (windowHash - leftCharCode * highestPower) % M;
      if (windowHash < 0) windowHash += M; // keep positive

      // shift left (multiply by
