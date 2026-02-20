/**
 * Rabin–Karp string search.
 *
 * @param text    the string to search in
 * @param pattern the string to find
 * @returns array of starting indices where pattern appears in text
 */
export function rabinKarp(text: string, pattern: string): number[] {
  const n = text.length;
  const m = pattern.length;

  if (m === 0 || m > n) {
    return [];
  }

  const base = 256;            // Number of possible ASCII characters
  const mod  = 101;            // A prime modulus – large enough for short strings

  /* ----------  helper: convert a substring to a hash ------------ */
  const hash = (str: string, len: number) => {
    let h = 0;
    for (let i = 0; i < len; i++) {
      h = (h * base + str.charCodeAt(i)) % mod;
    }
    return h;
  };

  /* ----------  pre‑compute base^(m-1)  modulo mod -------------- */
  let highPow = 1;                 // (base^(m‑1)) % mod
  for (let i = 1; i <= m - 1; i++) {
    highPow = (highPow * base) % mod;
  }

  /* ----------  initial hashes ----------------------------------- */
  let patternHash = hash(pattern, m);
  let windowHash  = hash(text, m);

  const result: number[] = [];

  /* ----------  main loop ---------------------------------------- */
  for (let i = 0; i <= n - m; i++) {
    // When hashes match we still do a string comparison to rule out collisions
    if (patternHash === windowHash) {
      if (text.substr(i, m) === pattern) {
        result.push(i);
      }
    }

    // Roll the hash: remove the leftmost character, add the new rightmost
    if (i < n - m) {
      windowHash =
        // Remove leftmost char contribution
        (windowHash - text.charCodeAt(i) * highPow % mod + mod) % mod; // keep positive
      // Add next char
      windowHash = (windowHash * base + text.charCodeAt(i + m)) % mod;
    }
  }

  return result;
}
