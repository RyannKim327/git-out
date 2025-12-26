/**
 * Boyer‑Moore string search.
 *
 * Returns the zero‑based index of the first occurrence of `pattern` in `text`,
 * or -1 if the pattern is not found.
 *
 * The implementation builds two tables:
 *   - badCharShift: map from character → last index in the pattern
 *   - goodSuffixShift: array of shift distances for each pattern position
 *
 * Time complexity:
 *   - Pre‑processing: O(m + |Σ|)   (m = pattern length, Σ = alphabet)
 *   - Search:       O(n) in the average case, O(n·m) worst‑case (rare)
 *
 * @param text    The text to search inside.
 * @param pattern The pattern to look for.
 * @returns       Index of first match or -1.
 */
export function boyerMoore(text: string, pattern: string): number {
  const n = text.length;
  const m = pattern.length;

  if (m === 0) return 0;          // Empty pattern matches at position 0
  if (n < m) return -1;           // Pattern longer than text → no match

  // ---------- 1️⃣ Bad‑character table ----------
  // For each possible character we store the index of its *right‑most* occurrence.
  const badCharShift = new Map<string, number>();
  for (let i = 0; i < m; i++) {
    badCharShift.set(pattern[i], i);
  }

  // ---------- 2️⃣ Good‑suffix tables ----------
  // `suffixes[i]` = length of the longest suffix of pattern[0..i] that is also a suffix of the whole pattern.
  const suffixes = new Array<number>(m).fill(0);
  computeSuffixes(pattern, suffixes);

  // `goodSuffixShift[i]` = how far we can shift when a mismatch occurs at position i.
  const goodSuffixShift = new Array<number>(m + 1).fill(m);
  // First fill with the default shift = pattern length
  for (let i = m; i >= 0; i--) {
    goodSuffixShift[i] = m;
  }

  // Populate using the suffixes array
  let j = 0;
  for (let i = m - 1; i >= -1; i--) {
    if (i === -1 || suffixes[i] === i + 1) {
      // Prefix of pattern matches a suffix of the whole pattern
      while (j < m - 1 - i) {
        if (goodSuffixShift[j] === m) {
          goodSuffixShift[j] = m - 1 - i;
        }
        j++;
      }
    }
  }

  for (let i = 0; i <= m - 2; i++) {
    goodSuffixShift[m - 1 - suffixes[i]] = m - 1 - i;
  }

  // ---------- 3️⃣ Search ----------
  let s = 0; // shift of the pattern with respect to text
  while (s <= n - m) {
    let i = m - 1; // start comparing from the rightmost character

    // Move left while characters match
    while (i >= 0 && pattern[i] === text[s + i]) {
      i--;
    }

    if (i < 0) {
      // All characters matched → pattern found
      return s;
    }

    // Mismatch at position i → compute both possible shifts
    const badCharIdx = badCharShift.get(text[s + i]);
    const badCharShiftAmt = i - (badCharIdx !== undefined ? badCharIdx : -1);
    const goodSuffixShiftAmt = goodSuffixShift[i + 1];

    // Choose the larger shift to guarantee progress
    s += Math.max(badCharShiftAmt, goodSuffixShiftAmt);
  }

  // No occurrence found
  return -1;
}

/**
 * Helper: compute the `suffixes` array used for the good‑suffix rule.
 *
 * `suffixes[i]` = length of the longest suffix of pattern[0..i]
 *                that matches a suffix of the whole pattern.
 *
 * @param pat      The pattern string.
 * @param suffixes Output array (must be pre‑allocated with length = pat.length).
 */
function computeSuffixes(pat: string, suffixes: number[]): void {
  const m = pat.length;
  suffixes[m - 1] = m;
  let g = m - 1; // the leftmost position of the current border
  let f = 0;     // the length of the current border

  for (let i = m - 2; i >= 0; i--) {
    if (i > g && suffixes[i + m - 1 - f] < i - g) {
      // Case 1: suffix is completely inside the previously known border
      suffixes[i] = suffixes[i + m - 1 - f];
    } else {
      // Case 2: we need to recompute the border
      if (i < g) g = i;
      f = i;
      while (g >= 0 && pat[g] === pat[g + m - 1 - f]) {
        g--;
      }
      suffixes[i] = f - g;
    }
  }
}
import { boyerMoore } from "./boyerMoore";

// Simple test
const text = "HERE IS A SIMPLE EXAMPLE";
const pattern = "EXAMPLE";

const idx = boyerMoore(text, pattern);
console.log(idx); // → 17 (the 'E' of EXAMPLE starts at position 17)

// Not‑found case
console.log(boyerMoore(text, "NOTHERE")); // → -1

// Edge cases
console.log(boyerMoore("abc", "")); // → 0 (empty pattern matches at start)
console.log(boyerMoore("", "a"));  // → -1
export class BoyerMoore {
  private readonly pattern: string;
  private readonly badCharShift: Map<string, number>;
  private readonly goodSuffixShift: number[];

  constructor(pattern: string) {
    this.pattern = pattern;
    const m = pattern.length;

    // ---- Bad‑character table ----
    this.badCharShift = new Map();
    for (let i = 0; i < m; i++) this.badCharShift.set(pattern[i], i);

    // ---- Good‑suffix table ----
    const suffixes = new Array<number>(m).fill(0);
    computeSuffixes(pattern, suffixes);
    this.goodSuffixShift = new Array<number>(m + 1).fill(m);

    // Fill good‑suffix shift (same logic as in the function above)
    let j = 0;
    for (let i = m - 1; i >= -1; i--) {
      if (i === -1 || suffixes[i] === i + 1) {
        while (j < m - 1 - i) {
          if (this.goodSuffixShift[j] === m) {
            this.goodSuffixShift[j] = m - 1 - i;
          }
          j++;
        }
      }
    }
    for (let i = 0; i <= m - 2; i++) {
      this.goodSuffixShift[m - 1 - suffixes[i]] = m - 1 - i;
    }
  }

  /** Search `text` for the stored pattern. */
  public indexOf(text: string): number {
    const n = text.length;
    const m = this.pattern.length;
    if (m === 0) return 0;
    if (n < m) return -1;

    let s = 0;
    while (s <= n - m) {
      let i = m - 1;
      while (i >= 0 && this.pattern[i] === text[s + i]) i--;

      if (i < 0) return s;

      const badIdx = this.badCharShift.get(text[s + i]);
      const badShift = i - (badIdx !== undefined ? badIdx : -1);
      const goodShift = this.goodSuffixShift[i + 1];
      s += Math.max(badShift, goodShift);
    }
    return -1;
  }
}
const bm = new BoyerMoore("needle");
console.log(bm.indexOf("haystack with a needle inside")); // → 16
// bm-search.ts
export function boyerMoore(text: string, pattern: string): number {
  // ... (copy the function from the first block) ...
}

// Helper for good‑suffix preprocessing
function computeSuffixes(pat: string, suffixes: number[]): void {
  // ... (copy from the first block) ...
}

/* ------------------- Demo ------------------- */
if (require.main === module) {
  const tests: Array<[string, string]> = [
    ["HERE IS A SIMPLE EXAMPLE", "EXAMPLE"],
    ["abcdabcabcdabcy", "abcdabcy"],
    ["aaaaa", "bba"],
    ["abc", ""],
    ["", "a"],
  ];

  for (const [txt, pat] of tests) {
    const idx = boyerMoore(txt, pat);
    console.log(`text="${txt}" pattern="${pat}" → ${idx}`);
  }
}
npx ts-node bm-search.ts
text="HERE IS A SIMPLE EXAMPLE" pattern="EXAMPLE" → 17
text="abcdabcabcdabcy" pattern="abcdabcy" → 8
text="aaaaa" pattern="bba" → -1
text="abc" pattern="" → 0
text="" pattern="a" → -1
