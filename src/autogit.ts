/**
 * Implements Rabin‑Karp – a sub‑linear string search for a single pattern.
 *
 * It uses a simple rolling hash: (previousHash * base + newChar) % modulus.
 * The base is usually the alphabet size (e.g. 256 for extended ASCII).
 * The modulus is a large prime to keep the hash values bounded and to reduce
 * collisions.  Even if a hash match occurs, we still check the actual string
 * slice to guarantee correctness.
 *
 * The function returns everything that looks like the pattern.
 */
export function rabinKarp(pattern: string, text: string): number[] {
  const result: number[] = [];
  const M = pattern.length;          // pattern length
  const N = text.length;             // text length
  if (M === 0 || N < M) return result;   // nothing to find

  const base = 256;                  // number of possible characters
  const prime = 101;                  // a small prime as mod

  /* ---------- Pre‑compute base^(M-1) % prime ---------- */
  let highOrder = 1;                  // base^(M-1) % prime
  for (let i = 1; i <= M - 1; i++) {
    highOrder = (highOrder * base) % prime;
  }

  /* ---------- Initial hash for pattern and first window ---------- */
  let patternHash = 0;
  let windowHash = 0;
  for (let i = 0; i < M; i++) {
    patternHash = (base * patternHash + pattern.charCodeAt(i)) % prime;
    windowHash = (base * windowHash + text.charCodeAt(i)) % prime;
  }

  /* ---------- Slide the window over the text ---------- */
  for (let i = 0; i <= N - M; i++) {
    // If hash values are equal, do a character‑by‑character check
    if (patternHash === windowHash) {
      let match = true;
      for (let j = 0; j < M; j++) {
        if (text.charAt(i + j) !== pattern.charAt(j)) {
          match = false;
          break;
        }
      }
      if (match) result.push(i);
    }

    // Compute hash for the next window
    if (i < N - M) {
      // Remove leading character
      const leading = (text.charCodeAt(i) * highOrder) % prime;
      windowHash = (windowHash + prime - leading) % prime; // avoid negative

      // Shift left and add the trailing character
      windowHash = (windowHash * base + text.charCodeAt(i + M)) % prime;
    }
  }

  return result;
}
const text = "abracadabra";
const pattern = "abra";

const indices = rabinKarp(pattern, text);
console.log(indices); // → [0, 7]
