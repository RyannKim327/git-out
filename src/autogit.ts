/**
 * Rabin‑Karp string search.
 * @param text    The string to be searched.
 * @param pattern The pattern to search for.
 * @returns      An array containing the starting indices where `pattern`
 *               occurs in `text`. If the pattern is not found, returns [].
 */
export function rabinKarp(text: string, pattern: string): number[] {
  const n = text.length;
  const m = pattern.length;
  const result: number[] = [];

  if (m === 0 || n < m) return result;       // edge cases

  /* ---- constants ---- */
  const prime = 1000000007;                   // large prime modulus
  const base = 256;                           // number of possible char values

  /* ---- pre‑compute base^(m-1) % prime ---- */
  let highestPower = 1;
  for (let i = 1; i < m; i++) highestPower = (highestPower * base) % prime;

  /* ---- first window hash ---- */
  let patternHash = 0;
  let textHash = 0;
  for (let i = 0; i < m; i++) {
    patternHash = (patternHash * base + pattern.charCodeAt(i)) % prime;
    textHash   = (textHash   * base + text.charCodeAt(i))   % prime;
  }

  /* ---- slide through text ---- */
  for (let i = 0; i <= n - m; i++) {
    /* match: compare hashes first, then do a full string compare to avoid false positives */
    if (patternHash === textHash) {
      if (text.substr(i, m) === pattern) {
        result.push(i);
      }
    }

    /* roll: compute hash for next window */
    if (i < n - m) {
      // Remove leading character
      textHash = (textHash - text.charCodeAt(i) * highestPower) % prime;
      // Avoid negative
      if (textHash < 0) textHash += prime;
      // Add trailing character
      textHash = (textHash * base + text.charCodeAt(i + m)) % prime;
    }
  }

  return result;
}
const text = "abracadabra";
const pattern = "abra";

console.log(rabinKarp(text, pattern)); // → [0, 7]
