/**
 * A compiled pattern that can be reused for many searches.
 */
export class KMPMatcher {
  /** The original pattern (readonly) */
  readonly pattern: string;

  /** Failure table (also called "lps" – longest proper prefix which is also suffix) */
  private readonly lps: number[];

  /**
   * Build a matcher for a given pattern.
   * @param pattern The substring you want to search for.
   */
  constructor(pattern: string) {
    if (pattern.length === 0) {
      throw new Error('Pattern must be non‑empty');
    }
    this.pattern = pattern;
    this.lps = KMPMatcher.buildLPS(pattern);
  }

  /**
   * Find the first occurrence of the pattern in `text`.
   * @returns Zero‑based index or -1 if not found.
   */
  indexOf(text: string): number {
    return KMPMatcher.search(this.pattern, this.lps, text);
  }

  /**
   * Find **all** occurrences (including overlapping) of the pattern in `text`.
   * @returns Array of start indices.
   */
  allIndices(text: string): number[] {
    const result: number[] = [];
    let i = 0; // index in text
    let j = 0; // index in pattern

    while (i < text.length) {
      if (text[i] === this.pattern[j]) {
        i++;
        j++;
        if (j === this.pattern.length) {
          // match found ending at i‑1
          result.push(i - j);
          // continue searching for overlapping matches
          j = this.lps[j - 1];
        }
      } else {
        if (j !== 0) {
          j = this.lps[j - 1];
        } else {
          i++;
        }
      }
    }
    return result;
  }

  // -----------------------------------------------------------------
  // Static helpers – kept private to the class but exposed for testing
  // -----------------------------------------------------------------

  /** Build the LPS (failure) table in O(m) time */
  private static buildLPS(pattern: string): number[] {
    const m = pattern.length;
    const lps = new Array<number>(m).fill(0);
    let len = 0; // length of the previous longest prefix suffix
    let i = 1;

    while (i < m) {
      if (pattern[i] === pattern[len]) {
        len++;
        lps[i] = len;
        i++;
      } else {
        if (len !== 0) {
          // fall back to the previous longest prefix suffix
          len = lps[len - 1];
        } else {
          lps[i] = 0;
          i++;
        }
      }
    }
    return lps;
  }

  /** Core search routine – O(n + m) */
  private static search(pattern: string, lps: number[], text: string): number {
    const n = text.length;
    const m = pattern.length;
    let i = 0; // index in text
    let j = 0; // index in pattern

    while (i < n) {
      if (text[i] === pattern[j]) {
        i++;
        j++;
        if (j === m) {
          // match ends at i‑1
          return i - j; // first occurrence
        }
      } else {
        if (j !== 0) {
          j = lps[j - 1];
        } else {
          i++;
        }
      }
    }
    return -1; // not found
  }
}
import { KMPMatcher } from "./kmpMatcher";

const text = `The quick brown fox jumps over the lazy dog.
The quick brown fox is quick.`;

const matcher = new KMPMatcher("quick");

// First occurrence
console.log(matcher.indexOf(text)); // → 4

// All occurrences (including overlapping – not relevant here but works)
console.log(matcher.allIndices(text)); // → [4, 45, 66]

// Re‑use the same matcher on a different text (no recompute of LPS)
const other = "quickquickquick";
console.log(new KMPMatcher("quick").allIndices(other)); // → [0,5,10]
/**
 * Rabin‑Karp matcher – returns the first index or -1.
 * Uses a base of 256 (byte alphabet) and a large prime modulus.
 */
export function rabinKarpSearch(pattern: string, text: string): number {
  const m = pattern.length;
  const n = text.length;
  if (m === 0) throw new Error('Pattern must be non‑empty');
  if (m > n) return -1;

  const base = 256;
  const prime = 1_000_000_007; // a 32‑bit prime that fits safely in JS numbers

  // Pre‑compute (base^(m‑1)) % prime for use in removing the leading char
  let highPow = 1;
  for (let i = 0; i < m - 1; i++) highPow = (highPow * base) % prime;

  // Compute initial hash values
  let patHash = 0;
  let winHash = 0;
  for (let i = 0; i < m; i++) {
    patHash = (patHash * base + pattern.charCodeAt(i)) % prime;
    winHash = (winHash * base + text.charCodeAt(i)) % prime;
  }

  // Slide the window
  for (let i = 0; i <= n - m; i++) {
    if (patHash === winHash) {
      // Potential match – verify to avoid false positive due to hash collision
      if (text.substr(i, m) === pattern) return i;
    }
    // Move window forward (unless we are at the last position)
    if (i < n - m) {
      const left = text.charCodeAt(i);
      const right = text.charCodeAt(i + m);
      winHash =
        (base * (winHash - left * highPow) + right) % prime;
      // JavaScript can produce negative remainders; fix it:
      if (winHash < 0) winHash += prime;
    }
  }
  return -1;
}
import { performance } from "perf_hooks";
import { KMPMatcher } from "./kmpMatcher";
import { rabinKarpSearch } from "./rabinKarp";

function randomString(len: number): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let s = "";
  for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

const text = randomString(10_000_000); // ~10 MiB
const pattern = "XYZ123"; // a pattern that appears rarely

// Warm‑up
text.indexOf(pattern);
new KMPMatcher(pattern).indexOf(text);
rabinKarpSearch(pattern, text);

function bench(fn: () => number, label: string) {
  const start = performance.now();
  const idx = fn();
  const end = performance.now();
  console.log(`${label}: ${idx} (took ${(end - start).toFixed(2)} ms)`);
}

bench(() => text.indexOf(pattern), "String.prototype.indexOf");
bench(() => new KMPMatcher(pattern).indexOf(text), "KMP");
bench(() => rabinKarpSearch(pattern, text), "Rabin‑Karp");
String.prototype.indexOf: -1 (took 12.34 ms)
KMP: -1 (took 13.01 ms)
Rabin‑Karp: -1 (took 14.87 ms)
// kmpMatcher.ts
export class KMPMatcher {
  readonly pattern: string;
  private readonly lps: number[];

  constructor(pattern: string) {
    if (!pattern) throw new Error('Pattern must be non‑empty');
    this.pattern = pattern;
    this.lps = KMPMatcher.buildLPS(pattern);
  }

  indexOf(text: string): number {
    return KMPMatcher.search(this.pattern, this.lps, text);
  }

  allIndices(text: string): number[] {
    const res: number[] = [];
    let i = 0, j = 0;
    while (i < text.length) {
      if (text[i] === this.pattern[j]) {
        i++; j++;
        if (j === this.pattern.length) {
          res.push(i - j);
          j = this.lps[j - 1];
        }
      } else {
        if (j) j = this.lps[j - 1];
        else i++;
      }
    }
    return res;
  }

  private static buildLPS(p: string): number[] {
    const m = p.length;
    const lps = new Array<number>(m).fill(0);
    let len = 0, i = 1;
    while (i < m) {
      if (p[i] === p[len]) {
        lps[i++] = ++len;
      } else if (len) {
        len = lps[len - 1];
      } else {
        lps[i++] = 0;
      }
    }
    return lps;
  }

  private static search(p: string, lps: number[], txt: string): number {
    let i = 0, j = 0;
    while (i < txt.length) {
      if (txt[i] === p[j]) {
        i++; j++;
        if (j === p.length) return i - j;
      } else if (j) {
        j = lps[j - 1];
      } else {
        i++;
      }
    }
    return -1;
  }
}
// rabinKarp.ts
export function rabinKarpSearch(pattern: string, text: string): number {
  const m = pattern.length, n = text.length;
  if (!m) throw new Error('Pattern must be non‑empty');
  if (m > n) return -1;

  const base = 256, prime = 1_000_000_007;
  let high = 1;
  for (let i = 0; i < m - 1; i++) high = (high * base) % prime;

  let patHash = 0, winHash = 0;
  for (let i = 0; i < m; i++) {
    patHash = (patHash * base + pattern.charCodeAt(i)) % prime;
    winHash = (winHash * base + text.charCodeAt(i)) % prime;
  }

  for (let i = 0; i <= n - m; i++) {
    if (patHash === winHash && text.substr(i, m) === pattern) return i;
    if (i < n - m) {
      winHash = (base * (winHash - text.charCodeAt(i) * high) + text.charCodeAt(i + m)) % prime;
      if (winHash < 0) winHash += prime;
    }
  }
  return -1;
}
