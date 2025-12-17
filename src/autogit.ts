/**
 * Boyer-Moore-Horspool string search
 * Returns index of first occurrence of `needle` in `haystack`, or -1.
 */
export function indexOf(haystack: string, needle: string): number {
  if (needle.length === 0) return 0;                 // empty pattern matches at start
  if (needle.length > haystack.length) return -1;   // impossible match

  const table = makeBadCharTable(needle);
  const last = needle.length - 1;
  let i = last;                                     // align end of pattern with haystack

  while (i < haystack.length) {
    let j = last;
    let k = i;

    while (j >= 0 && haystack[k] === needle[j]) {
      --j;
      --k;
    }
    if (j < 0) return k + 1;                        // full match found
    i += table[haystack.charCodeAt(i)];               // shift by bad-character rule
  }
  return -1;
}

/**
 * Build the bad-character shift table for the pattern.
 * Exported so you can reuse it across multiple searches.
 */
export function makeBadCharTable(pattern: string): Uint8Array {
  const len = pattern.length;
  const table = new Uint8Array(256).fill(len);      // default shift = pattern length

  for (let i = 0; i < len - 1; ++i) {
    table[pattern.charCodeAt(i)] = len - 1 - i;     // last occurrence (excl. last char)
  }
  return table;
}

/* ------------------ Usage example ------------------ */
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it('finds substring', () => {
    expect(indexOf('the quick brown fox', 'quick')).toBe(4);
    expect(indexOf('aaaaaaa', 'aaa')).toBe(0);
    expect(indexOf('hello', 'world')).toBe(-1);
  });
}
