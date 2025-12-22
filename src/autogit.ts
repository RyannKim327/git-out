/**
 * Boyer-Moore-Horspool string search.
 * @param haystack  The text to search in.
 * @param needle    The pattern to search for.
 * @returns         Zero-based index of first match, or -1.
 */
export function horspool(haystack: string, needle: string): number {
  if (needle.length === 0) return 0;                // empty pattern matches at 0
  if (needle.length > haystack.length) return -1;     // pattern longer than text

  // 1. Build bad-character shift table (only for the pattern alphabet)
  const bad: number[] = new Array<number>(256).fill(needle.length);
  for (let i = 0; i < needle.length - 1; ++i) {
    bad[needle.charCodeAt(i)] = needle.length - 1 - i;
  }

  // 2. Search
  let pos = 0;
  while (pos + needle.length <= haystack.length) {
    let i = needle.length - 1;
    while (i >= 0 && needle[i] === haystack[pos + i]) --i;
    if (i < 0) return pos;                            // full match
    pos += bad[haystack.charCodeAt(pos + needle.length - 1)];
  }
  return -1;
}

/* ---------- usage demo ---------- */
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it('finds pattern', () => {
    expect(horspool('abracadabra', 'cad')).toBe(4);
    expect(horspool('hello world', 'world')).toBe(6);
    expect(horspool('aaaaaaa', 'aaa')).toBe(0);
    expect(horspool('xyz', 'abc')).toBe(-1);
    expect(horspool('', '')).toBe(0);
  });
}
