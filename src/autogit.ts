/**
 * Build the longest‑prefix‑suffix array for the pattern.
 *
 * lps[i]  =>  length of the longest proper prefix of P[0..i]
 *            that is also a suffix of P[0..i]
 *
 * Complexity: O(m) where m = pattern.length
 */
function buildLps(pattern: string): number[] {
  const m = pattern.length;
  const lps = new Array<number>(m).fill(0);
  let length = 0;        // length of the previous longest prefix suffix
  let i = 1;

  while (i < m) {
    if (pattern[i] === pattern[length]) {
      length++;
      lps[i] = length;
      i++;
    } else {
      if (length !== 0) {
        // fall back in pattern without advancing i
        length = lps[length - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }
  return lps;
}

/**
 * Find all start indices of pattern `p` inside text `t` using KMP.
 *
 * Returns an array of numbers (0‑based indices).
 * Complexity: O(n + m) where n = text.length
 */
export function kmpSearch(t: string, p: string): number[] {
  const n = t.length;
  const m = p.length;
  if (m === 0) return []; // convention: no match for empty pattern

  const lps = buildLps(p);
  const result: number[] = [];

  let i = 0; // index for t
  let j = 0; // index for p

  while (i < n) {
    if (t[i] === p[j]) {
      i++; j++;
    }

    if (j === m) {
      // found a match ending at i-1
      result.push(i - j);
      j = lps[j - 1]; // look for next possible match
    } else if (i < n && t[i] !== p[j]) {
      if (j !== 0) {
        j = lps[j - 1]; // avoid re‑checking
      } else {
        i++; // move forward in text
      }
    }
  }

  return result;
}
const text = 'ababcabcabababd';
const pattern = 'ababd';

const matches = kmpSearch(text, pattern);
console.log(matches); // [10]
/**
 * Simple Rabin‑Karp implementation for ASCII patterns.
 *  - Uses base 256, modulus a large prime.
 */
const PRIME = 1_000_000_007;
const BASE = 256;

function rabinKarp(text: string, pattern: string): number[] {
  const n = text.length;
  const m = pattern.length;
  const result: number[] = [];
  if (m === 0 || n < m) return result;

  let patternHash = 0;
  let textHash = 0;

  // base^(m-1) % PRIME  =>  for rolling
  let h = 1;
  for (let i = 0; i < m - 1; i++) h = (h * BASE) % PRIME;

  // compute initial hashes
  for (let i = 0; i < m; i++) {
    patternHash = (BASE * patternHash + pattern.charCodeAt(i)) % PRIME;
    textHash = (BASE * textHash + text.charCodeAt(i)) % PRIME;
  }

  // slide the pattern over the text
  for (let i = 0; i <= n - m; i++) {
    if (patternHash === textHash) {
      // Verify to guard against collisions
      if (text.substr(i, m) === pattern) result.push(i);
    }

    // Compute hash for next window
    if (i < n - m) {
      textHash = (BASE * (textHash - text.charCodeAt(i) * h) + text.charCodeAt(i
