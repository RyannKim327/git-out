// Boyer-Moore string search in TypeScript
// --------------------------------------------------------

/**
 * Build the bad‑character shift table.
 * Return an array of 256 integers (for each possible char code).
 * For Unicode > 0xFF we fallback to a Map.
 */
function buildBadCharTable(pattern: string): { table: number[]; map: Map<number, number> } {
  const table = new Array(256).fill(-1);
  const map = new Map<number, number>();

  for (let i = 0; i < pattern.length; i++) {
    const code = pattern.charCodeAt(i);
    if (code < 256) table[code] = i;
    else map.set(code, i);
  }

  return { table, map };
}

/**
 * Build the good‑suffix shift array.
 * Returns an array `shift` where shift[i] tells how far to jump
 * when a mismatch occurs at pattern index i.
 */
function buildGoodSuffixTable(pattern: string): number[] {
  const m = pattern.length;
  const suffix = new Array(m).fill(-1);
  const prefix = new Array(m).fill(false);
  const shift = new Array(m).fill(m); // default shift = pattern length

  // Phase 1: find suffixes
  for (let i = 0; i < m - 1; i++) {
    let j = i;
    let k = 0; // length of matched suffix
    while (j >= 0 && pattern[j] === pattern[m - 1 - k]) {
      j--;
      k++;
      suffix[k] = j + 1;
    }
    if (j === -1) {
      // suffix matched entire prefix
      for (let l = k + 1; l <= m - 1; l++) {
        if (shift[l] === m) shift[l] = m - k - 1;
      }
    }
  }

  // Phase 2: compute shift values
  for (let i = m - 1; i >= 0; i--) {
    if (suffix[i] !== -1) {
      shift[i] = m - suffix[i] - i;
    }
  }

  return shift;
}

/**
 * Boyer‑Moore search: returns the first index of `pattern` in `text` or -1 if not found.
 */
export function boyerMooreSearch(text: string, pattern: string): number {
  if (pattern.length === 0) return 0;

  const { table: badCharTable, map: badCharMap } = buildBadCharTable(pattern);
  const goodSuffix = buildGoodSuffixTable(pattern);

  const n = text.length;
  const m = pattern.length;
  let s = 0; // shift of the pattern relative to text

  while (s <= n - m) {
    let j = m - 1;

    while (j >= 0 && pattern[j] === text[s + j]) {
      j--;
    }

    if (j < 0) {
      return s; // match found
    }

    const badCharCode = text.charCodeAt(s + j);
    const badCharIdx = badCharCode < 256 ? badCharTable[badCharCode] : badCharMap.get(badCharCode) ?? -1;
    const badShift = j - badCharIdx;

    const goodShift = goodSuffix[j];

    // take the greater jump
    s += Math.max(badShift, goodShift);
  }

  return -1; // no match
}
import { boyerMooreSearch } from './boyer-moore';

const text = "the quick brown fox jumps over the lazy dog";
const pattern = "fox";

const idx = boyerMooreSearch(text, pattern);
console.log(idx); // 16

// not found
console.log(boyerMooreSearch(text, "cat")); // -1
