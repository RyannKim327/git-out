/**
 * Rabin–Karp string search in TypeScript
 * 2024 – public domain / CC0-1.0
 */

const DEFAULT_BASE = 256;          // alphabet size (extended ASCII)
const DEFAULT_PRIME = 2_147_483_647; // large prime < 2³¹-1

/**
 * Search for `pattern` inside `text`.
 * @return index of first match, or -1 if not found
 */
export function indexOf(
  text: string,
  pattern: string,
  base = DEFAULT_BASE,
  prime = DEFAULT_PRIME
): number {
  const n = text.length;
  const m = pattern.length;

  if (m === 0) return 0; // empty pattern ⇒ found at 0
  if (m > n) return -1;

  let patternHash = 0;   // hash value for pattern
  let windowHash = 0;  // hash value for current window of text

  // pre-compute base^(m-1) % prime (used for removing leading digit)
  let basePow = 1;
  for (let i = 0; i < m - 1; i++) basePow = (basePow * base) % prime;

  // compute initial hashes
  for (let i = 0; i < m; i++) {
    patternHash = (base * patternHash + pattern.charCodeAt(i)) % prime;
    windowHash  = (base * windowHash  + text.charCodeAt(i)) % prime;
  }

  for (let i = 0; i <= n - m; i++) {
    // if hashes match, compare the actual strings to avoid false positives
    if (patternHash === windowHash) {
      let j = 0;
      while (j < m && text[i + j] === pattern[j]) j++;
      if (j === m) return i; // found
    }

    // slide window: remove leftmost char, add new rightmost char
    if (i < n - m) {
      windowHash =
        (windowHash -
          basePow * text.charCodeAt(i) +
          prime) % prime; // make sure it's positive
      windowHash =
        (windowHash * base + text.charCodeAt(i + m)) % prime;
    }
  }
  return -1;
}

/**
 * Collect all match indices.
 */
export function indicesOf(
  text: string,
  pattern: string,
  base = DEFAULT_BASE,
  prime = DEFAULT_PRIME
): number[] {
  const res: number[] = [];
  const n = text.length;
  const m = pattern.length;

  if (m === 0 || m > n) return res;

  let patternHash = 0;
  let windowHash  = 0;
  let basePow = 1;
  for (let i = 0; i < m - 1; i++) basePow = (basePow * base) % DEFAULT_PRIME;

  for (let i = 0; i < m; i++) {
    patternHash = (base * patternHash + pattern.charCodeAt(i)) % DEFAULT_PRIME;
    windowHash  = (base * windowHash  + text.charCodeAt(i)) % DEFAULT_PRIME;
  }

  for (let i = 0; i <= n - m; i++) {
    if (patternHash === windowHash) {
      let j = 0;
      while (j < m && text[i + j] === pattern[j]) j++;
      if (j === m) res.push(i);
    }
    if (i < n - m) {
      windowHash =
        (windowHash -
          basePow * text.charCodeAt(i) +
          DEFAULT_PRIME) % DEFAULT_PRIME;
      windowHash =
        (windowHash * base + text.charCodeAt(i + m)) % DEFAULT_PRIME;
    }
  }
  return res;
}

/* ------------------- quick sanity checks ------------------- */
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it('finds single occurrence', () => {
    expect(indexOf('hello world', 'world')).toBe(6);
  });
  it('finds multiple occurrences', () => {
    expect(indicesOf('aaaa', 'aa')).toEqual([0, 1, 2]);
  });
  it('handles empty pattern', () => {
    expect(indexOf('abc', '')).toBe(0);
  });
}
import { indexOf, indicesOf } from './rabin-karp';

console.log(indexOf('abracadabra', 'cad'));      // → 4
console.log(indicesOf('aaaa', 'aa'));            // → [0, 1, 2]
