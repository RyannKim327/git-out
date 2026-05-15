/**
 * Boyer–Moore search – Typescript implementation
 * ------------------------------------------------
 * O(m + n) preprocessing  (m = pattern length, n = text length)
 * O(n/m) expected search time (in practice, very fast)
 */

export class BoyerMoore {
  /** Pattern to look for */
  private readonly pat: string;
  /** Length of the pattern */
  private readonly m: number;
  /** Bad‑character shift table (alphanumeric + 128 ASCII fallback) */
  private readonly badChar: number[];
  /** Good‑suffix shift table */
  private readonly goodSuffix: number[];

  constructor(pattern: string) {
    if (!pattern.length) throw new Error("Pattern must not be empty");
    this.pat = pattern;
    this.m = pattern.length;

    this.badChar = this.buildBadCharTable();
    this.goodSuffix = this.buildGoodSuffixTable();
  }

  /* --------------------------------------------- */
  /* ===========  PRE‑PROCESSING  ================= */
  /* --------------------------------------------- */

  /** Build a table indexed by character code (fast array look‑ups). */
  private buildBadCharTable(): number[] {
    const SHIFT = new Array(256).fill(this.m);   // default shift = pattern length
    for (let i = 0; i < this.m - 1; i++) {
      SHIFT[this.pat.charCodeAt(i)] = this.m - i - 1;
    }
    return SHIFT;
  }

  /** Build the good‑suffix table (two parts: border and suffix arrays). */
  private buildGoodSuffixTable(): number[] {
    const r = this.m;
    const suffix = new Array(r + 1).fill(0);
    const border = new Array(r + 1).fill(0);

    // Step 1 – compute suffix[] (longest suffixes that are also prefix)
    let j = r;
    let k = 0;
    suffix[r] = r;
    for (let i = r - 1; i >= 0; i--) {
      while (k < r && this.pat[i + k] !== this.pat[r - 1 - k]) {
        if (suffix[i + k] === 0) suffix[i + k] = r - i - 1;
        k = border[k];
      }
      k++;
      suffix[i] = k;
    }

    // Step 2 – compute border[] (largest border for each prefix length)
    for (let i = 0; i <= r; i++) border[i] = r - suffix[i];

    // Step 3 – fill goodSuffix[] using borders
    const good = new Array(r).fill(r);
    let jMax = 0;
    for (let i = r - 1; i >= 0; i--) {
      if (suffix[i] === 0) continue;
      while (jMax + 1 <= r - i - 1) {
        if (good[jMax] === r) good[jMax] = r - i - 1;
        jMax++;
      }
    }
    // For the remaining positions that have no suffix match
    for (let i = 0; i < r; i++) {
      if (good[i] === r) good[i] = r - border[i];
    }

    return good;
  }

  /* --------------------------------------------- */
  /* ===========       SEARCH        ============= */
  /* --------------------------------------------- */

  /**
   * Find the first occurrence of the pattern in `text`.
   * @returns index of first match or -1 if not found.
   */
  public search(text: string): number {
    const n = text.length;
    let s = 0;               // shift of the pattern

    while (s <= n - this.m) {
      let j = this.m - 1;

      // Step 4 – compare from right to left
      while (j >= 0 && this.pat[j] === text[s + j]) j--;

      if (j < 0) return s;  // match found

      // compute shifts
      const badShift = this.badChar[text.charCodeAt(s + j)];
      const goodShift = this.goodSuffix[j];
      s += Math.max(badShift, goodShift);
    }
    return -1;              // not found
  }

  /* --------------------------------------------- */
  /* ===========  EXAMPLE USAGE  =============== */
  /* --------------------------------------------- */
}

// Example usage:
const bm = new BoyerMoore("needle");
const txt = "haystack needle haystack inside needlesea";
const idx = bm.search(txt);
console.log(idx, txt.slice(idx, idx + bm['m'])); // → 9 'needle'
