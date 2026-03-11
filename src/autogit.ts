/**
 * Build the bad‑character shift table.
 * For each letter we record the distance from the end of the pattern
 * where that letter last appears. If it never appears, the shift is
 * the whole pattern length.
 */
function buildBadCharShift(pattern: string): number[] {
  const m = pattern.length;
  const SHIFT_SIZE = 256; // ASCII range
  const table = new Array<number>(SHIFT_SIZE).fill(m);

  for (let i = 0; i < m - 1; i++) {
    table[pattern.charCodeAt(i)] = m - 1 - i;
  }
  return table;
}

/**
 * Build the good‑suffix shift table.
 * Uses suffix and prefix tables derived from the reversed pattern.
 */
function buildGoodSuffixShift(pattern: string): number[] {
  const m = pattern.length;
  const table = new Array<number>(m).fill(0);
  const suff = new Array<number>(m).fill(0);

  // 1. Compute suff array: longest suffix of pattern[0..i] that is also a prefix of pattern
  suff[m - 1] = m;
  let g = m - 1, f = m - 1;
  for (let i = m - 2; i >= 0; i--) {
    if (i > g && suff[i + m - 1 - f] < i - g) {
      suff[i] = suff[i + m - 1 - f];
    } else {
      g = Math.min(g, i);
      f = i;
      while (g >= 0 && pattern[g] === pattern[g + m - 1 - f]) g--;
      suff[i] = f - g;
    }
  }

  // 2. Fill table with shifts based on suff array
  for (let i = 0; i < m; i++) table[i] = m;
  let j = 0;
  for (let i = m - 1; i >= 0; i--) {
    if (suff[i] === i + 1) {
      for (; j < m - 1 - i; j++) {
        if (table[j] === m) table[j] = m - 1 - i;
      }
    }
  }
  for (let i = 0; i < m - 1; i++) {
    table[m - 1 - suff[i]] = m - 1 - i;
  }

  return table;
}
/**
 * Boyer–Moore search.
 * @param text   string to search inside
 * @param pattern  string to find
 * @returns index of the first occurrence or -1 if not found
 */
export function boyerMooreSearch(text: string, pattern: string): number {
  const n = text.length;
  const m = pattern.length;
  if (m === 0) return 0;
  if (n < m) return -1;

  const badChar = buildBadCharShift(pattern);
  const goodSuffix = buildGoodSuffixShift(pattern);

  let s = 0; // alignment of the pattern with the text
  while (s <= n - m) {
    let j = m - 1;

    // compare looking from the end of the pattern
    while (j >= 0 && pattern[j] === text[s + j]) j--;

    if (j < 0) {
      return s; // full match
    }

    const bcShift = badChar[text.charCodeAt(s + j)] - (m - 1 - j);
    const gsShift = goodSuffix[j];

    // maximum of both shift suggestions
    s += Math.max(bcShift, gsShift, 1); // at least 1 to avoid infinite loop
  }
  return -1;
}
import { boyerMooreSearch } from './boyer-moore';

const haystack = "Here is a simple example string for searching.";
const needle   = "example";

const pos = boyerMooreSearch(haystack, needle);
if (pos !== -1) {
  console.log(`'${needle}' found at index ${pos}`);
} else {
  console.log(`'${needle}' not found`);
}
