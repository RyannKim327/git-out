/**
 * Returns the zero‑based index of the first occurrence of `pattern` in `text`,
 * or -1 if the pattern is not found.
 *
 * The search is case‑sensitive and works with any UTF‑16 string (including
 * surrogate pairs).  If you need case‑insensitive search, lower‑case both
 * strings before calling.
 *
 * @param text    The haystack to search inside.
 * @param pattern The needle to look for.
 * @returns       Index of the first match, or -1.
 */
export function bmhSearch(text: string, pattern: string): number;
/**
 * Boyer‑Moore‑Horspool string search.
 *
 * This implementation is deliberately written to be:
 *   • Easy to read (no clever tricks that hide the algorithm)
 *   • Type‑safe (full TypeScript typings)
 *   • Efficient (uses a Uint32Array for the shift table)
 *   • Unicode‑aware (operates on UTF‑16 code units, which is what JavaScript strings use)
 *
 * If you need to search on code‑points (e.g., emoji that are surrogate pairs),
 * you can first convert the strings to an array of code points – see the
 * `bmhSearchCodePoints` helper at the bottom.
 */

export function bmhSearch(text: string, pattern: string): number {
  // -------------------------------------------------------------------------
  // 1️⃣  Edge‑case handling
  // -------------------------------------------------------------------------
  const n = text.length;
  const m = pattern.length;

  // Empty pattern matches at position 0 (mirrors String.prototype.indexOf)
  if (m === 0) return 0;
  // Pattern longer than text → never matches
  if (m > n) return -1;

  // -------------------------------------------------------------------------
  // 2️⃣  Build the bad‑character shift table
  // -------------------------------------------------------------------------
  // The table size is 256 for ASCII, but we support the full 16‑bit range.
  // Using Uint32Array gives us O(1) random access and avoids sparse objects.
  const ALPHABET_SIZE = 65536; // 2^16 possible UTF‑16 code units
  const shift = new Uint32Array(ALPHABET_SIZE);

  // Default shift = pattern length (i.e., skip the whole pattern)
  shift.fill(m);

  // For every character except the *last* one, set shift = distance from the right end.
  // Example: pattern = "ABCD"
  //   shift['A'] = 3, shift['B'] = 2, shift['C'] = 1
  for (let i = 0; i < m - 1; ++i) {
    const c = pattern.charCodeAt(i);
    shift[c] = m - 1 - i;
  }

  // -------------------------------------------------------------------------
  // 3️⃣  Search loop
  // -------------------------------------------------------------------------
  // `i` points to the index in `text` that aligns with the *last* character of the pattern.
  let i = m - 1;

  while (i < n) {
    // Compare from right to left
    let j = m - 1; // pattern index
    let k = i;     // text index (aligned with pattern[j])

    while (j >= 0 && text.charCodeAt(k) === pattern.charCodeAt(j)) {
      --j;
      --k;
    }

    if (j < 0) {
      // All characters matched → we found the pattern
      return k + 1; // `k` is now `i - m`, so `k + 1` is the start index
    }

    // Mismatch: look up the shift for the mismatching text character
    const mismatchedChar = text.charCodeAt(i);
    const skip = shift[mismatchedChar] || m; // fallback to `m` for unseen chars
    i += skip;
  }

  // No match found
  return -1;
}

/* -------------------------------------------------------------------------
   Optional helper for true Unicode (code‑point) handling.
   JavaScript strings are UTF‑16 code units, so characters outside the BMP
   (e.g., many emojis) are stored as surrogate pairs.  The basic BMH works on
   code units, which is fine for most ASCII‑centric workloads.  If you need
   to treat each Unicode code point as a single “character”, use this wrapper.
-------------------------------------------------------------------------- */
export function bmhSearchCodePoints(text: string, pattern: string): number {
  // Convert to arrays of code points (O(n) extra memory, but still fast)
  const textCP = Array.from(text);
  const patternCP = Array.from(pattern);
  const n = textCP.length;
  const m = patternCP.length;

  if (m === 0) return 0;
  if (m > n) return -1;

  // Build shift table on code points (use Map because alphabet is unbounded)
  const shift = new Map<string, number>();
  for (let i = 0; i < m - 1; ++i) {
    shift.set(patternCP[i], m - 1 - i);
  }

  let i = m - 1;
  while (i < n) {
    let j = m - 1;
    while (j >= 0 && textCP[i - (m - 1 - j)] === patternCP[j]) {
      --j;
    }
    if (j < 0) {
      // Convert back to UTF‑16 index
      const start = textCP.slice(0, i - (m - 1)).join('').length;
      return start;
    }
    const mismatched = textCP[i];
    const skip = shift.get(mismatched) ?? m;
    i += skip;
  }
  return -1;
}
import { bmhSearch, bmhSearchCodePoints } from "./bmh";

// Simple ASCII search
console.log(bmhSearch("the quick brown fox jumps over the lazy dog", "brown")); // 10
console.log(bmhSearch("hello world", "world")); // 6
console.log(bmhSearch("hello world", "planet")); // -1

// Edge cases
console.log(bmhSearch("abc", "")); // 0  (empty pattern matches at start)
console.log(bmhSearch("", "a")); // -1

// Case‑insensitive search (just lower‑case both strings)
const text = "The Quick BROWN fox";
const needle = "brown";
console.log(bmhSearch(text.toLowerCase(), needle.toLowerCase())); // 10

// Unicode (emoji) – using the code‑point helper
const emojiText = "😀🐶🐱😀🐶";
const emojiPat  = "🐱😀";
console.log(bmhSearchCodePoints(emojiText, emojiPat)); // 3 (starts at the 4th code point)
export class BMH {
  private readonly shift: Uint32Array;
  private readonly pattern: string;
  private readonly m: number;

  constructor(pattern: string) {
    this.pattern = pattern;
    this.m = pattern.length;

    if (this.m === 0) {
      this.shift = new Uint32Array(0);
      return;
    }

    const ALPHABET_SIZE = 65536;
    this.shift = new Uint32Array(ALPHABET_SIZE);
    this.shift.fill(this.m);
    for (let i = 0; i < this.m - 1; ++i) {
      this.shift[pattern.charCodeAt(i)] = this.m - 1 - i;
    }
  }

  /** Returns the first index of the pattern in `text`, or -1. */
  public search(text: string): number {
    const n = text.length;
    const m = this.m;
    if (m === 0) return 0;
    if (m > n) return -1;

    let i = m - 1;
    while (i < n) {
      let j = m - 1;
      let k = i;
      while (j >= 0 && text.charCodeAt(k) === this.pattern.charCodeAt(j)) {
        --j;
        --k;
      }
      if (j < 0) return k + 1;
      i += this.shift[text.charCodeAt(i)] || m;
    }
    return -1;
  }
}

// Example:
const bmh = new BMH("needle");
console.log(bmh.search("haystack with a needle inside"));
// bmh.test.ts
import { bmhSearch, BMH } from "./bmh";

describe("BMH (function version)", () => {
  test("basic matches", () => {
    expect(bmhSearch("abcde", "cd")).toBe(2);
    expect(bmhSearch("abcde", "ab")).toBe(0);
    expect(bmhSearch("abcde", "de")).toBe(3);
  });

  test("no match", () => {
    expect(bmhSearch("abcde", "xy")).toBe(-1);
  });

  test("empty pattern", () => {
    expect(bmhSearch("anything", "")).toBe(0);
  });

  test("pattern longer than text", () => {
    expect(bmhSearch("short", "longer")).toBe(-1);
  });

  test("unicode", () => {
    const txt = "😀🐶🐱😀🐶";
    const pat = "🐱😀";
    expect(bmhSearch(txt, pat)).toBe(3); // works on UTF‑16 units
  });
});

describe("BMH class (re‑use shift table)", () => {
  test("multiple searches", () => {
    const searcher = new BMH("test");
    expect(searcher.search("this is a test string")).toBe(10);
    expect(searcher.search("no match here")).toBe(-1);
    expect(searcher.search("testtest")).toBe(0); // first occurrence
  });
});
npm i -D jest @types/jest ts-jest
npx jest
export const bmhSearch = (text: string, pat: string): number => {
  const n = text.length, m = pat.length;
  if (!m) return 0; if (m > n) return -1;
  const shift = new Uint32Array(65536).fill(m);
  for (let i = 0; i < m - 1; ++i) shift[pat.charCodeAt(i)] = m - 1 - i;
  for (let i = m - 1; i < n; ) {
    let j = m - 1, k = i;
    while (j >= 0 && text.charCodeAt(k) === pat.charCodeAt(j)) { --j; --k; }
    if (j < 0) return k + 1;
    i += shift[text.charCodeAt(i)] || m;
  }
  return -1;
};
