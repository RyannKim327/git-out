/**
 * Boyer-Moore-Horspool string search.
 * @param haystack  The text to search in.
 * @param needle    The pattern to search for.
 * @returns Index of the first match, or -1 if not found.
 */
export function horspool(haystack: string, needle: string): number {
  if (needle.length === 0) return 0;                    // empty pattern ⇒ match at start
  if (needle.length > haystack.length) return -1;      // impossible to match

  // 1. Build bad-character shift table (only for the pattern alphabet)
  const badChar = new Map<number, number>();            // charCode → shift
  const last = needle.length - 1;

  for (let i = 0; i < last; ++i) {                    // skip last char (shift = len if absent)
    badChar.set(needle.charCodeAt(i), last - i);
  }

  // 2. Search
  let pos = 0;
  while (pos + needle.length <= haystack.length) {
    let i = last;
    while (i >= 0 && needle.charCodeAt(i) === haystack.charCodeAt(pos + i)) {
      --i;
    }
    if (i < 0) return pos;                              // full match
    const shift = badChar.get(haystack.charCodeAt(pos + last)) ?? (needle.length);
    pos += shift;
  }
  return -1;
}

/* ---------- usage example ---------- */
if (import.meta.vitest) {
  const { expect, it } = import.meta.vitest;
  it('finds pattern', () => {
    expect(horspool('ababcab', 'abc')).toBe(2);
    expect(horspool('aaaaa', 'bba')).toBe(-1);
    expect(horspool('', '')).toBe(0);
    expect(horspool('abc', '')).toBe(0);
  });
}
