/**
 * Boyer-Moore-Horspool string search
 * @param haystack  The text to search in
 * @param needle    The pattern to search for
 * @returns Index of first match, or -1
 */
export function horspool(haystack: string, needle: string): number {
  if (needle.length === 0) return 0;                // empty pattern ⇒ match at start
  if (needle.length > haystack.length) return -1;   // pattern longer than text

  // 1. Build bad-character shift table
  const badChar = new Map<number, number>();          // codePoint → shift
  const last = needle.length - 1;

  for (let i = 0; i < last; ++i) {
    badChar.set(needle.codePointAt(i)!, last - i); // only last occurrence before final char
  }

  // 2. Search
  let pos = 0;
  while (pos + needle.length <= haystack.length) {
    let i = last;
    while (haystack.codePointAt(pos + i) === needle.codePointAt(i)) {
      if (i === 0) return pos;                      // full match
      --i;
    }

    // shift by bad-character rule
    const mismatchChar = haystack.codePointAt(pos + last)!;
    const shift = badChar.get(mismatchChar) ?? (needle.length);
    pos += shift;
  }
  return -1;
}

/* ---------- quick sanity checks ---------- */
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it('works', () => {
    expect(horspool('abracadabra', 'bra')).toBe(1);
    expect(horspool('hello world', 'world')).toBe(6);
    expect(horspool('aaaaaaa', 'aaa')).toBe(0);
    expect(horspool('foo', 'bar')).toBe(-1);
    expect(horspool('🚀🌟🚀', '🌟')).toBe(1);
  });
}
const idx = horspool('Where is Waldo?', 'Waldo');
console.log(idx); // 9
