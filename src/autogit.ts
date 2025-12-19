/**
 * Boyer‑Moore‑Horspool string search.
 *
 * Returns an array with the start indices of every occurrence of `pattern`
 * inside `text`.  If you only need the first match, stop after the first
 * push.
 *
 * The implementation works with any UTF‑16 string (the same representation
 * JavaScript/TypeScript uses).  For true Unicode code‑point handling you
 * would need to work on an array of code points instead of the raw string.
 */
export class BoyerMooreHorspool {
  /** The pattern we are searching for (kept for reference). */
  private readonly pattern: string;
  /** Length of the pattern – cached for speed. */
  private readonly m: number;
  /** Bad‑character shift table.  key = character, value = shift distance. */
  private readonly shiftTable: Record<string, number>;

  /**
   * @param pattern The needle we want to find.
   * @throws if `pattern` is empty (searching for an empty string is trivial).
   */
  constructor(pattern: string) {
    if (pattern.length === 0) {
      throw new Error('Pattern must not be empty');
    }
    this.pattern = pattern;
    this.m = pattern.length;
    this.shiftTable = this.buildShiftTable(pattern);
  }

  /**
   * Build the bad‑character shift table.
   *
   * For every character `c` that appears in the pattern (except the last one)
   * we store `m - i - 1`, where `i` is the index of the *rightmost* occurrence
   * of `c`.  Characters that never appear get the default shift `m`.
   */
  private buildShiftTable(pat: string): Record<string, number> {
    const table: Record<string, number> = {};

    // Default shift for characters not in the pattern.
    const defaultShift = this.m;

    // Populate the table with the rightmost occurrence rule.
    // We stop at `m - 1` because the last character never contributes
    // to a shift (if it mismatches we always shift by `m`).
    for (let i = 0; i < this.m - 1; i++) {
      const ch = pat[i];
      table[ch] = this.m - i - 1; // distance to the pattern end
    }

    // Store the default shift for any character we haven't seen.
    // Instead of filling the whole Unicode space we just remember the value.
    // The `getShift` helper below will fall back to `defaultShift`.
    (table as any).__default = defaultShift;

    return table;
  }

  /** Helper: get the shift distance for a character (with fallback). */
  private getShift(ch: string): number {
    // `Object.prototype.hasOwnProperty` is safe because we never store
    // keys like "__proto__".
    if (Object.prototype.hasOwnProperty.call(this.shiftTable, ch)) {
      return this.shiftTable[ch];
    }
    return (this.shiftTable as any).__default;
  }

  /**
   * Search `text` for the pattern.
   *
   * @param text The haystack.
   * @returns An array of start indices where the pattern occurs.
   */
  public search(text: string): number[] {
    const n = text.length;
    const m = this.m;
    const result: number[] = [];

    if (n < m) {
      // Pattern longer than text → no matches.
      return result;
    }

    // `i` points to the *rightmost* character of the current window.
    let i = m - 1;

    while (i < n) {
      // Compare from right to left.
      let j = m - 1; // pattern index
      while (j >= 0 && this.pattern[j] === text[i - (m - 1 - j)]) {
        j--;
      }

      if (j < 0) {
        // All characters matched → record the occurrence.
        result.push(i - m + 1);
        // Shift by the full pattern length to look for *non‑overlapping* matches.
        // If you want overlapping matches, use `i += 1` instead.
        i += m;
      } else {
        // Mismatch at pattern[j] vs text[i - (m - 1 - j)].
        const mismatchedChar = text[i];
        const shift = this.getShift(mismatchedChar);
        // Ensure we always move at least one position forward.
        i += Math.max(shift, 1);
      }
    }

    return result;
  }

  /**
   * Convenience static method – no need to instantiate the class.
   *
   * @example
   *   const idx = BoyerMooreHorspool.find('needle', 'haystack with needle');
   *   // idx === 13
   */
  public static find(pattern: string, text: string): number[] {
    return new BoyerMooreHorspool(pattern).search(text);
  }
}

/* ------------------------------------------------------------------ */
/* -------------------------- Example usage -------------------------- */
/* ------------------------------------------------------------------ */

function demo() {
  const text = `The quick brown fox jumps over the lazy dog.
                The quick brown fox is quick.`;

  const pattern = 'quick';

  // 1️⃣ Using the class instance (good if you search many times with the same pattern)
  const bmh = new BoyerMooreHorspool(pattern);
  const positions1 = bmh.search(text);
  console.log('Instance search →', positions1); // e.g. [4, 71]

  // 2️⃣ Using the static helper (convenient for a one‑off search)
  const positions2 = BoyerMooreHorspool.find(pattern, text);
  console.log('Static helper →', positions2);
}

// Uncomment to run the demo when this file is executed directly.
// demo();
// boyerMooreHorspool.ts
export class BoyerMooreHorspool {
  private readonly pattern: string;
  private readonly m: number;
  private readonly shiftTable: Record<string, number>;

  constructor(pattern: string) {
    if (!pattern) throw new Error('Pattern must not be empty');
    this.pattern = pattern;
    this.m = pattern.length;
    this.shiftTable = this.buildShiftTable(pattern);
  }

  private buildShiftTable(pat: string): Record<string, number> {
    const table: Record<string, number> = {};
    const defaultShift = this.m;
    for (let i = 0; i < this.m - 1; i++) {
      table[pat[i]] = this.m - i - 1;
    }
    (table as any).__default = defaultShift;
    return table;
  }

  private getShift(ch: string): number {
    return Object.prototype.hasOwnProperty.call(this.shiftTable, ch)
      ? this.shiftTable[ch]
      : (this.shiftTable as any).__default;
  }

  public search(text: string): number[] {
    const n = text.length;
    const result: number[] = [];
    if (n < this.m) return result;

    let i = this.m - 1;
    while (i < n) {
      let j = this.m - 1;
      while (j >= 0 && this.pattern[j] === text[i - (this.m - 1 - j)]) {
        j--;
      }
      if (j < 0) {
        result.push(i - this.m + 1);
        i += this.m; // non‑overlapping; use `i += 1` for overlapping
      } else {
        i += Math.max(this.getShift(text[i]), 1);
      }
    }
    return result;
  }

  public static find(pattern: string, text: string): number[] {
    return new BoyerMooreHorspool(pattern).search(text);
  }
}

/* ------------------- Quick test ------------------- */
if (require.main === module) {
  const txt = 'abracadabra abracadabra';
  const pat = 'abra';
  console.log('Matches:', BoyerMooreHorspool.find(pat, txt)); // → [0, 7, 11, 18]
}
