// Boyer-Moore in TypeScript
// ----------------------------------------------

/**
 * Returns the index of the first occurrence of `pat` inside `txt`,
 * or -1 if not found.
 */
export function boyerMoore(pat: string, txt: string): number {
  if (pat.length === 0) return 0;
  if (pat.length > txt.length) return -1;

  const badChar = makeBadCharTable(pat);
  const goodSuffix = makeGoodSuffixTable(pat);

  let shift = 0;
  const last = pat.length - 1;

  while (shift <= txt.length - pat.length) {
    let i = last;

    // Compare from right to left
    while (i >= 0 && pat[i] === txt[shift + i]) --i;

    if (i < 0) return shift;               // full match
    const bcShift = badChar[txt.charCodeAt(shift + i)] ?? -1;
    const gsShift = goodSuffix[i];

    shift += Math.max(i - bcShift, gsShift);
  }
  return -1;
}

// ------------------------------------------------
// 1. Bad-character heuristic
// ------------------------------------------------
function makeBadCharTable(pat: string): number[] {
  const table = new Array<number>(65536).fill(-1); // 16-bit Unicode
  for (let i = 0; i < pat.length; ++i) {
    table[pat.charCodeAt(i)] = i;
  }
  return table;
}

// ------------------------------------------------
// 2. Good-suffix heuristic (simplified Galil rule)
// ------------------------------------------------
function makeGoodSuffixTable(pat: string): number[] {
  const m = pat.length;
  const table = new Array<number>(m + 1).fill(m);
  const suffix = computeSuffix(pat);

  // Case 1: a suffix matches, then slide to the rightmost such suffix
  let j = 0;
  for (let i = m - 1; i >= -1; --i) {
    if (i === -1 || suffix[i] === i + 1) {
      for (; j < m - 1 - i; ++j) {
        if (table[j] === m) table[j] = m - 1 - i;
      }
    }
  }

  // Case 2: a prefix matches
  for (let i = 0; i < m - 1; ++i) {
    const shift = m - 1 - suffix[i];
    if (table[shift] > shift) table[shift] = shift;
  }

  return table;
}

// Helper: length of the longest suffix that is also a suffix of pat[0..k]
function computeSuffix(pat: string): number[] {
  const m = pat.length;
  const suffix = new Array<number>(m).fill(0);
  let g = m - 1;

  suffix[m - 1] = m;
  let f = 0;

  for (let i = m - 2; i >= 0; --i) {
    if (i > g && suffix[i + m - 1 - f] < i - g) {
      suffix[i] = suffix[i + m - 1 - f];
    } else {
      if (i < g) g = i;
      f = i;
      while (g >= 0 && pat[g] === pat[g + m - 1 - f]) --g;
      suffix[i] = f - g;
    }
  }
  return suffix;
}

// ------------------------------------------------
// Quick sanity check
// ------------------------------------------------
if (require.main === module) {
  console.log(boyerMoore("EXAMPLE", "HERE IS A SIMPLE EXAMPLE")); // → 17
  console.log(boyerMoore("AAAC", "AAAAACCCAAAAAAAC"));            // → 9
}
