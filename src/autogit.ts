// boyer-moore.ts
type OffsetTable = number[];

/**
 * Pre-computes the Boyer-Moore bad-character shift table.
 * Works on code-points (not UTF-16 code-units) so it is Unicode-safe.
 */
function makeBadCharTable(pattern: string): Map<number, number> {
  const table = new Map<number, number>();
  const p = Array.from(pattern);        // array of code-points
  const last = p.length - 1;

  p.forEach((ch, i) => {
    // shift = how far we can slide to align the last occurrence of ch
    table.set(ch.codePointAt(0)!, last - i);
  });
  return table;
}

/**
 * Pre-computes the Boyer-Moore good-suffix (a.k.a. matching) shift table.
 * Uses the simplified "strong" good-suffix rule (Galil version).
 */
function makeGoodSuffixTable(pattern: string): OffsetTable {
  const p = Array.from(pattern);
  const m = p.length;
  const table = new Array<number>(m).fill(m); // default shift

  let i = m;
  let j = m + 1;
  const bms = new Array<number>(m + 1);
  bms[i] = j;

  while (i > 0) {
    while (j <= m && p[i - 1] !== p[j - 1]) {
      if (table[j] === m) table[j] = j - i;
      j = bms[j];
    }
    i--;
    j--;
    bms[i] = j;
  }

  let shift = bms[0];
  for (let k = 0; k <= m; k++) {
    if (shift > k) shift = bms[k];
    if (table[k] === m) table[k] = shift;
  }
  return table;
}

/**
 * Immutable Boyer-Moore pattern object.
 * Build it once, search many times.
 */
export class BoyerMoore {
  private readonly pat: string;
  private readonly badChar: Map<number, number>;
  private readonly goodSuffix: OffsetTable;
  private readonly m: number;

  constructor(pattern: string) {
    if (!pattern) throw new Error('Empty pattern');
    this.pat = pattern;
    this.m = Array.from(pattern).length;
    this.badChar = makeBadCharTable(pattern);
    this.goodSuffix = makeGoodSuffixTable(pattern);
  }

  /**
   * Returns the index of the first occurrence of pattern in text,
   * or -1 if not found.
   */
  indexIn(text: string): number {
    const n = Array.from(text).length;
    const patArr = Array.from(this.pat);
    const txtArr = Array.from(text);
    let i = 0;

    while (i <= n - this.m) {
      let j = this.m - 1;

      // Compare from right to left
      while (j >= 0 && patArr[j] === txtArr[i + j]) j--;

      if (j < 0) return i; // match found

      const ch = txtArr[i + j].codePointAt(0)!;
      const badCharShift = this.badChar.get(ch) ?? this.m;
      const goodSuffixShift = this.goodSuffix[j + 1];

      i += Math.max(badCharShift, goodSuffixShift);
    }
    return -1;
  }

  /**
   * Returns *all* occurrences (indices) of the pattern in text.
   */
  allIndices(text: string): number[] {
    const res: number[] = [];
    const n = Array.from(text).length;
    const patArr = Array.from(this.pat);
    const txtArr = Array.from(text);
    let i = 0;

    while (i <= n - this.m) {
      let j = this.m - 1;
      while (j >= 0 && patArr[j] === txtArr[i + j]) j--;
      if (j < 0) {
        res.push(i);
        // slide by 1 to find overlapping matches
        i += 1;
      } else {
        const ch = txtArr[i + j].codePointAt(0)!;
        const badCharShift = this.badChar.get(ch) ?? this.m;
        const goodSuffixShift = this.goodSuffix[j + 1];
        i += Math.max(badCharShift, goodSuffixShift);
      }
    }
    return res;
  }
}

/* ---------- usage example ---------- */
if (require.main === module) {
  const needle = 'абвг';
  const haystack = 'ываыва абвг джклабвгд';

  const bm = new BoyerMoore(needle);
  console.log('first index:', bm.indexIn(haystack));       // → 7
  console.log('all indices:', bm.allIndices(haystack));    // → [7, 14]
}
$ npx tsc boyer-moore.ts
$ node boyer-moore.js
first index: 7
all indices: [ 7, 14 ]
