/**
 * Rabin‑Karp – find all occurrences of `pat` in `txt`.
 *
 * @param txt   The text to search in.
 * @param pat   The pattern to find.
 * @returns     An array of starting indices where `pat` occurs in `txt`.
 */
export function rabinKarp(txt: string, pat: string): number[] {
  if (pat.length === 0 || txt.length < pat.length) return [];

  const base = 256;       // Number of possible character values
  const mod  = 101;       // A small prime – good for demo purposes

  const m = pat.length;
  const n = txt.length;

  // ---------- 1. Pre‑compute (base^(m-1)) % mod  ----------
  let highestBase = 1;
  for (let i = 1; i <= m - 1; i++) {
    highestBase = (highestBase * base) % mod;
  }

  // ---------- 2. Compute hash of pattern and first window ----------
  let patHash  = 0;
  let windowHash = 0;
  for (let i = 0; i < m; i++) {
    patHash   = (patHash   * base + pat.charCodeAt(i)) % mod;
    windowHash= (windowHash* base + txt.charCodeAt(i)) % mod;
  }

  const result: number[] = [];

  // ---------- 3. Slide the window over the text ----------
  for (let i = 0; i <= n - m; i++) {
    // If the hash values match, perform a character‑by‑character check
    if (patHash === windowHash) {
      let match = true;
      for (let j = 0; j < m; j++) {
        if (txt.charCodeAt(i + j) !== pat.charCodeAt(j)) {
          match = false;
          break;
        }
      }
      if (match) result.push(i);
    }

    // Compute hash for next window
    if (i < n - m) {
      // Remove leading char, add trailing char
      windowHash =
        ((windowHash - txt.charCodeAt(i) * highestBase) * base
          + txt.charCodeAt(i + m)) % mod;

      // Problem: windowHash can become negative – make it positive
      if (windowHash < 0) windowHash += mod;
    }
  }

  return result;
}
import { rabinKarp } from "./rabinKarp";

const text = "ABABDABACDABABCABAB";
const pattern = "ABABCABAB";

const indices = rabinKarp(text, pattern);
console.log(indices); // → [10]
