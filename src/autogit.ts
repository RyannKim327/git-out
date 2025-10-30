/**
 * Boyer-Moore-Horspool string search.
 * @param haystack  The text to search in.
 * @param needle    The pattern to search for.
 * @returns The start index of the first match, or -1.
 */
export function horspool(haystack: string, needle: string): number {
  if (needle.length === 0) return 0;                // empty pattern ⇒ match at start
  if (needle.length > haystack.length) return -1;   // impossible to match

  // 1. Build bad-character shift table (only for the pattern alphabet)
  const badShift: number[] = new Array(256).fill(needle.length);
  for (let i = 0; i < needle.length - 1; ++i) {
    badShift[needle.charCodeAt(i)] = needle.length - 1 - i;
  }

  // 2. Search
  let pos = 0;
  const last = needle.length - 1;
  while (pos <= haystack.length - needle.length) {
    let i = last;
    while (i >= 0 && needle[i] === haystack[pos + i]) --i;
    if (i < 0) return pos;                          // full match
    pos += badShift[haystack.charCodeAt(pos + last)]; // jump forward
  }
  return -1;
}

/* ---------- small sanity checks ---------- */
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it('works', () => {
    expect(horspool('abracadabra', 'bra')).toBe(1);
    expect(horspool('hello', 'world')).toBe(-1);
    expect(horspool('aaaaaaa', 'aaa')).toBe(0);
    expect(horspool('', '')).toBe(0);
    expect(horspool('abc', '')).toBe(0);
  });
}
const idx = horspool('the quick brown fox', 'brown');
console.log(idx); // 10
