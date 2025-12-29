/**
 * Build the longest‑prefix‑suffix (LPS) table for KMP.
 * lps[i] = length of the longest proper prefix of pattern[0..i]
 *          which is also a suffix of this substring.
 */
function buildLps(pattern: string): number[] {
  const m = pattern.length;
  const lps = new Array<number>(m).fill(0);

  // length of the previous longest prefix suffix
  let len = 0;
  // i starts from 1 because lps[0] is always 0
  for (let i = 1; i < m; ) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        // fall back to the previous longest prefix
        len = lps[len - 1];
        // note: we do NOT increment i here
      } else {
        // no proper prefix, stay at 0
        lps[i] = 0;
        i++;
      }
    }
  }
  return lps;
}

/**
 * KMP search – returns all start indices where `pattern` occurs in `text`.
 * If you only need the first occurrence, break after the first push.
 */
export function kmpSearch(text: string, pattern: string): number[] {
  const n = text.length;
  const m = pattern.length;

  if (m === 0) return []; // empty pattern → no matches (or you could return all indices)

  const lps = buildLps(pattern);
  const result: number[] = [];

  let i = 0; // index in text
  let j = 0; // index in pattern

  while (i < n) {
    if (text[i] === pattern[j]) {
      i++;
      j++;

      if (j === m) {
        // full match found ending at i-1
        result.push(i - j);
        // continue searching for overlapping matches
        j = lps[j - 1];
      }
    } else {
      if (j !== 0) {
        // fall back in the pattern, keep i where it is
        j = lps[j - 1];
      } else {
        // no prefix to fall back to, move forward in text
        i++;
      }
    }
  }

  return result;
}
import { kmpSearch } from "./kmp";

const text = "ababcabcabababd";
const pattern = "ababd";

const matches = kmpSearch(text, pattern);
console.log(matches); // → [10] (pattern starts at index 10)
/**
 * Rabin‑Karp search returning start indices of all matches.
 * Uses a 64‑bit prime modulus via BigInt to avoid overflow.
 */
export function rabinKarpSearch(text: string, pattern: string): number[] {
  const n = text.length;
  const m = pattern.length;
  if (m === 0) return [];

  const base = 256n;               // number of possible byte values
  const mod = 2n ** 61n - 1n;       // a large prime (Mersenne prime)

  // Helper: (a * b) % mod using BigInt (fast enough for typical sizes)
  const mulMod = (a: bigint, b: bigint) => (a * b) % mod;

  // Pre‑compute base^(m‑1) % mod for use in rolling step
  let highestPow = 1n;
  for (let i = 0; i < m - 1; i++) highestPow = mulMod(highestPow, base);

  // Compute hash of pattern and first window of text
  let patHash = 0n;
  let winHash = 0n;
  for (let i = 0; i < m; i++) {
    patHash = (mulMod(patHash, base) + BigInt(pattern.charCodeAt(i))) % mod;
    winHash = (mulMod(winHash, base) + BigInt(text.charCodeAt(i))) % mod;
  }

  const matches: number[] = [];

  for (let i = 0; i <= n - m; i++) {
    // If hashes match, verify characters to avoid false positive
    if (patHash === winHash) {
      let equal = true;
      for (let j = 0; j < m; j++) {
        if (text[i + j] !== pattern[j]) {
          equal = false;
          break;
        }
      }
      if (equal) matches.push(i);
    }

    // Slide window: remove leftmost char, add next char
    if (i < n - m) {
      const left = BigInt(text.charCodeAt(i));
      const right = BigInt(text.charCodeAt(i + m));

      // winHash = (winHash - left * highestPow) * base + right   (mod mod)
      winHash = (winHash + mod - mulMod(left, highestPow)) % mod; // remove left
      winHash = (mulMod(winHash, base) + right) % mod;            // add right
    }
  }

  return matches;
}
import { rabinKarpSearch } from "./rabinKarp";

const text = "the quick brown fox jumps over the lazy dog the quick brown fox";
const pattern = "quick";

console.log(rabinKarpSearch(text, pattern)); // → [4, 49]
export enum Matcher {
  KMP = "kmp",
  RabinKarp = "rabinKarp",
}

/**
 * Find all occurrences of `pattern` in `text`.
 * `method` defaults to KMP for deterministic linear time.
 */
export function findAll(
  text: string,
  pattern: string,
  method: Matcher = Matcher.KMP
): number[] {
  if (method === Matcher.KMP) return kmpSearch(text, pattern);
  return rabinKarpSearch(text, pattern);
}
function bench(fn: (t: string, p: string) => number[], text: string, pat: string, runs = 5) {
  const times = [];
  for (let i = 0; i < runs; i++) {
    const start = performance.now();
    fn(text, pat);
    times.push(performance.now() - start);
  }
  console.log(`${fn.name}: avg ${times.reduce((a,b)=>a+b)/runs} ms`);
}

// Example data
const bigText = "a".repeat(5_000_000) + "b";
const pat = "ab";

bench(kmpSearch, bigText, pat);
bench(rabinKarpSearch, bigText, pat);
bench((t,p)=>{ const r=[]; let i=t.indexOf(p); while(i!==-1){r.push(i); i=t.indexOf(p,i+1)}; return r; }, bigText, pat);
// kmp.ts
export function kmpSearch(text: string, pattern: string): number[] {
  // ... (implementation from section 2.2) ...
}

// rabinKarp.ts
export function rabinKarpSearch(text: string, pattern: string): number[] {
  // ... (implementation from section 3.2) ...
}

// matcher.ts
export enum Matcher { KMP = "kmp", RabinKarp = "rabinKarp" }

export function findAll(
  text: string,
  pattern: string,
  method: Matcher = Matcher.KMP
): number[] {
  return method === Matcher.KMP
    ? kmpSearch(text, pattern)
    : rabinKarpSearch(text, pattern);
}
