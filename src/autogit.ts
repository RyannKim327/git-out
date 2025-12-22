/**
 * Boyer‑Moore string search (case‑sensitive) in TypeScript.
 *
 * Returns an array with the starting indices of every occurrence of `pattern`
 * inside `text`.  If you only need the first match, you can stop after the
 * first element.
 *
 * Complexity:
 *   • Pre‑processing: O(m + |Σ|)   (m = pattern length, Σ = alphabet size)
 *   • Search:        O(n) on average, O(n·m) worst‑case (rare)
 *
 * The implementation follows the classic textbook version:
 *   - Bad‑character heuristic (full ASCII table, but you can shrink it)
 *   - Good‑suffix heuristic (using the "border" approach)
 */

export interface BoyerMooreResult {
  /** Zero‑based index of the match in the original text */
  index: number;
  /** The matched substring (identical to `pattern`) – handy for debugging */
  match: string;
}

/**
 * Build the Bad‑Character shift table.
 *
 * For each possible character we store the distance from the rightmost
 * occurrence of that character in the pattern to the end of the pattern.
 *
 * If the character never appears in the pattern we store `pattern.length`.
 *
 * @param pattern The pattern we are searching for.
 * @returns An array indexed by character code (0‑255 for ASCII) containing shift distances.
 */
function buildBadCharTable(pattern: string): Uint16Array {
  const ALPHABET_SIZE = 256; // assuming ASCII; for Unicode you could use a Map instead.
  const table = new Uint16Array(ALPHABET_SIZE);
  const m = pattern.length;

  // Initialise all entries with the full pattern length (i.e., shift past the pattern)
  table.fill(m);

  // Fill with the distance from the rightmost occurrence to the end.
  // We stop at m‑1 because the rightmost character never needs a shift when it matches.
  for (let i = 0; i < m - 1; ++i) {
    const charCode = pattern.charCodeAt(i) & 0xff; // keep within 0‑255
    table[charCode] = m - 1 - i;
  }

  return table;
}

/**
 * Build the Good‑Suffix shift table.
 *
 * The table tells us how far to shift when a suffix of the pattern matches
 * but the character preceding the suffix mismatches.
 *
 * This implementation follows the “border” method described in
 * *Algorithms on Strings, Trees, and Sequences* (Gusfield) and many textbooks.
 *
 * @param pattern The pattern we are searching for.
 * @returns An array of length `m + 1` where `goodSuffix[i]` is the shift
 *          distance when a suffix of length `i` matches.
 */
function buildGoodSuffixTable(pattern: string): Uint16Array {
  const m = pattern.length;
  const goodSuffix = new Uint16Array(m + 1);
  const borderPos = new Uint16Array(m + 1);

  // Step 1: compute border positions (also called "suffixes")
  // borderPos[i] = length of the longest border of pattern[0..i-1]
  let i = m;
  let j = m + 1;
  borderPos[i] = j;

  while (i > 0) {
    // while characters do not match, follow the border chain
    while (j <= m && pattern.charAt(i - 1) !== pattern.charAt(j - 1)) {
      if (goodSuffix[j] === 0) {
        goodSuffix[j] = j - i;
      }
      j = borderPos[j];
    }
    --i;
    --j;
    borderPos[i] = j;
  }

  // Step 2: fill the remaining entries of goodSuffix
  // If a suffix does not have a border, we shift by the distance to the
  // next border of the whole pattern.
  j = borderPos[0];
  for (i = 0; i <= m; ++i) {
    if (goodSuffix[i] === 0) {
      goodSuffix[i] = j;
    }
    if (i === j) {
      j = borderPos[j];
    }
  }

  return goodSuffix;
}

/**
 * Boyer‑Moore search.
 *
 * @param text    The text to search inside.
 * @param pattern The pattern to look for.
 * @returns An array of `BoyerMooreResult` objects (empty if no match).
 */
export function boyerMooreSearch(
  text: string,
  pattern: string
): BoyerMooreResult[] {
  const n = text.length;
  const m = pattern.length;

  if (m === 0) {
    // Edge case: empty pattern matches at every position (including at the end)
    const results: BoyerMooreResult[] = [];
    for (let pos = 0; pos <= n; ++pos) {
      results.push({ index: pos, match: '' });
    }
    return results;
  }

  if (n < m) {
    return []; // pattern longer than text → no match
  }

  const badChar = buildBadCharTable(pattern);
  const goodSuffix = buildGoodSuffixTable(pattern);

  const matches: BoyerMooreResult[] = [];

  // `s` is the shift of the pattern relative to the text
  let s = 0;
  while (s <= n - m) {
    // Start comparing from the rightmost character of the pattern
    let j = m - 1;

    while (j >= 0 && pattern.charAt(j) === text.charAt(s + j)) {
      --j;
    }

    if (j < 0) {
      // Full match!
      matches.push({ index: s, match: pattern });

      // Shift pattern to the next possible match.
      // The good‑suffix table tells us how far we can safely move.
      s += goodSuffix[0];
    } else {
      // Mismatch at position j
      const badCharShift = badChar[text.charCodeAt(s + j) & 0xff] - (m - 1 - j);
      // `badCharShift` can be negative (if the character appears later in the pattern);
      // we never shift left, so we clamp to 1.
      const shiftBC = Math.max(1, badCharShift);
      const shiftGS = goodSuffix[j + 1];
      s += Math.max(shiftBC, shiftGS);
    }
  }

  return matches;
}

/* -------------------------------------------------------------------------- */
/* --------------------------- Example / Test --------------------------------*/
/* -------------------------------------------------------------------------- */

if (require.main === module) {
  // Simple demo when you run `ts-node boyerMoore.ts`
  const text = `ABAAABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCD`;
  const pattern = `ABCDABCD`;

  console.log(`Text:    "${text}"`);
  console.log(`Pattern: "${pattern}"`);
  console.log('---');

  const results = boyerMooreSearch(text, pattern);
  if (results.length === 0) {
    console.log('No matches found.');
  } else {
    console.log(`Found ${results.length} match(es) at index(es):`);
    for (const r of results) {
      console.log(`  • ${r.index}`);
    }
  }
}
import { boyerMooreSearch } from './boyerMoore';

// Example 1 – first occurrence only
const text = "the quick brown fox jumps over the lazy dog";
const pattern = "the";
const first = boyerMooreSearch(text, pattern)[0];
console.log(first?.index); // → 0

// Example 2 – all occurrences (including overlapping)
const text2 = "aaaaa";
const pattern2 = "aa";
const all = boyerMooreSearch(text2, pattern2);
console.log(all.map(r => r.index)); // → [0,1,2,3]

// Example 3 – Unicode (need a Map‑based bad‑char table)
function buildBadCharTableUnicode(pattern: string): Map<number, number> {
  const m = pattern.length;
  const table = new Map<number, number>();
  // default shift is pattern length
  for (let i = 0; i < m - 1; ++i) {
    table.set(pattern.codePointAt(i)!, m - 1 - i);
  }
  return table;
}
export function boyerMooreSearch(text: string, pattern: string) {
  const n = text.length, m = pattern.length;
  if (m === 0) return [...Array(n + 1).keys()].map(i => ({ index: i, match: '' }));
  if (n < m) return [];

  // ---- Bad‑character table (ASCII) ----
  const bad = new Uint16Array(256);
  bad.fill(m);
  for (let i = 0; i < m - 1; ++i) bad[pattern.charCodeAt(i) & 0xff] = m - 1 - i;

  // ---- Good‑suffix table ----
  const good = new Uint16Array(m + 1);
  const border = new Uint16Array(m + 1);
  let i = m, j = m + 1;
  border[i] = j;
  while (i > 0) {
    while (j <= m && pattern[i - 1] !== pattern[j - 1]) {
      if (good[j] === 0) good[j] = j - i;
      j = border[j];
    }
    --i; --j;
    border[i] = j;
  }
  j = border[0];
  for (i = 0; i <= m; ++i) {
    if (good[i] === 0) good[i] = j;
    if (i === j) j = border[j];
  }

  // ---- Search ----
  const res = [];
  let s = 0;
  while (s <= n - m) {
    let j = m - 1;
    while (j >= 0 && pattern[j] === text[s + j]) --j;
    if (j < 0) {
      res.push({ index: s, match: pattern });
      s += good[0];
    } else {
      const bcShift = Math.max(1, bad[text.charCodeAt(s + j) & 0xff] - (m - 1 - j));
      const gsShift = good[j + 1];
      s += Math.max(bcShift, gsShift);
    }
  }
  return res;
}
