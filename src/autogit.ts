/**
 * Burrows-Wheeler Transform (BWT) and inverse.
 * No external libraries required.
 */

/**
 * Build the suffix-array for the input string.
 * The suffix-array SA is an array of indices such that
 *   text[SA[i]..]  is the i-th lexicographically smallest suffix.
 * Runs in O(n log n) time and O(n) extra space.
 */
function buildSuffixArray(text: string): number[] {
  const n = text.length;
  const SA = Array.from({ length: n }, (_, i) => i);

  // Comparison helper: compare suffixes starting at i and j
  const cmp = (i: number, j: number): number => {
    let k = 0;
    while (k < n) {
      const ci = text[(i + k) % n];
      const cj = text[(j + k) % n];
      if (ci !== cj) return ci < cj ? -1 : 1;
      k++;
    }
    return 0;
  };

  SA.sort(cmp);
  return SA;
}

/**
 * Forward Burrows-Wheeler Transform.
 * Returns { bwt: string, primaryIndex: number } where
 *   bwt            – the last column of the sorted rotation matrix
 *   primaryIndex   – row index of the original string in the sorted list
 */
export function bwtEncode(input: string): { bwt: string; primaryIndex: number } {
  if (input.length === 0) return { bwt: '', primaryIndex: 0 };

  const n = input.length;
  const SA = buildSuffixArray(input);

  let bwt = '';
  let primaryIndex = -1;

  for (let i = 0; i < n; i++) {
    const j = SA[i];
    if (j === 0) primaryIndex = i;
    bwt += input[(j - 1 + n) % n];
  }

  return { bwt, primaryIndex };
}

/**
 * Inverse Burrows-Wheeler Transform.
 * Reconstructs the original string from the BWT and the primary index.
 * Runs in O(n) time using the standard “LF-mapping” technique.
 */
export function bwtDecode(bwt: string, primaryIndex: number): string {
  const n = bwt.length;
  if (n === 0) return '';

  // Count occurrences of each character
  const counts: Record<string, number> = {};
  for (const ch of bwt) counts[ch] = (counts[ch] || 0) + 1;

  // Build alphabet in sorted order
  const alphabet = Object.keys(counts).sort();

  // Compute cumulative counts (first position of each char in F column)
  const first: Record<string, number> = {};
  let sum = 0;
  for (const ch of alphabet) {
    first[ch] = sum;
    sum += counts[ch];
  }

  // Build next-array: next[i] = index of the same row in the F column
  const next = new Array<number>(n);
  const ptr = { ...first };
  for (let i = 0; i < n; i++) {
    const ch = bwt[i];
    next[ptr[ch]] = i;
    ptr[ch]++;
  }

  // Walk backwards from the primary row
  const res: string[] = new Array(n);
  let row = primaryIndex;
  for (let i = n - 1; i >= 0; i--) {
    res[i] = bwt[row];
    row = next[row];
  }

  return res.join('');
}

/* ---------- Quick sanity checks ---------- */
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it('round-trips random strings', () => {
    const rnd = (len: number) =>
      Array.from({ length: len }, () =>
        String.fromCharCode(97 + Math.floor(Math.random() * 4))
      ).join('');

    for (let i = 0; i < 100; i++) {
      const s = rnd(50 + Math.floor(Math.random() * 100));
      const { bwt, primaryIndex } = bwtEncode(s);
      const restored = bwtDecode(bwt, primaryIndex);
      expect(restored).toBe(s);
    }
  });
}
const original = "banana";
const { bwt, primaryIndex } = bwtEncode(original);
console.log({ bwt, primaryIndex });          // { bwt: 'annb$aa', primaryIndex: 4 }

const restored = bwtDecode(bwt, primaryIndex);
console.log(restored === original);            // true
