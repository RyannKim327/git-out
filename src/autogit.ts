// utils.ts
export type SearchResult = { index: number; match: string } | null;

/**
 * Rabin–Karp string search. Returns the first occurrence of `pattern`
 * inside `text`, or null if no match is found.
 *
 * @param text     The string to search within – can be very long.
 * @param pattern  The string we’re looking for. Must be non‑empty.
 * @returns        The index of the first match or null.
 */
export function rabinKarpSearch(text: string, pattern: string): SearchResult {
  if (!pattern) throw new Error('Pattern must not be empty');
  const n = text.length;
  const m = pattern.length;
  if (m > n) return null;

  /* ---------- Parameters for hashing ---------- */
  const prime = 101;                 // a small prime modulus
  const base  = 256;                 // number of possible characters (ASCII)

  /* ---------- Pre‑compute base^(m‑1) % prime ----------
   *  This value is used to drop the leading character from the
   *  rolling hash.  For example, if the rolling hash is
   *  h = (s[0]·base^(m‑1) + s[1]·base^(m‑2) + … + s[m‑1]) % prime,
   *  after shifting the window by one we remove s[0]·base^(m‑1).
   */
  let highOrder = 1;
  for (let i = 0; i < m - 1; i++) highOrder = (highOrder * base) % prime;

  /* ---------- Compute hash of pattern & first window ----------
   *  Use the same formula for both.  Will be used for direct
   *  comparison when hash values coincide.
   */
  let patHash   = 0;
  let windowHash = 0;
  for (let i = 0; i < m; i++) {
    patHash    = (patHash * base + pattern.charCodeAt(i)) % prime;
    windowHash = (windowHash * base + text.charCodeAt(i)) % prime;
  }

  /* ---------- Slide the pattern over the text ---------- */
  for (let i = 0; i <= n - m; i++) {
    /* 1.  Hash match => candidate.  Verify by a literal comparison. */
    if (patHash === windowHash) {
      if (text.substr(i, m) === pattern) {
        return { index: i, match: pattern };
      }
    }

    /* 2.  Roll the hash: drop the leftmost char, add the rightmost. */
    if (i < n - m) {
      // subtract leading contribution
      windowHash = (windowHash - highOrder * text.charCodeAt(i)) % prime;
      // make it positive if needed
      if (windowHash < 0) windowHash += prime;
      // multiply by base and add new char
      windowHash = (windowHash * base + text.charCodeAt(i + m)) % prime;
    }
  }

  return null;
}
import { rabinKarpSearch } from './utils';

console.log(rabinKarpSearch('abracadabra', 'cad'));   // { index: 4, match: 'cad' }
console.log(rabinKarpSearch('hello world', 'world')); // { index: 6, match: 'world' }
console.log(rabinKarpSearch('hello', 'bye'));        // null
