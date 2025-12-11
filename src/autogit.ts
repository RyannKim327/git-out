/**
 * Returns the starting index of the first occurrence of `pattern` in `text`,
 * or -1 if the pattern is not found.
 */
export function kmpSearch(text: string, pattern: string): number {
  if (pattern.length === 0) return 0;                // empty pattern is always at start
  if (pattern.length > text.length) return -1;     // impossible to match

  const lps = buildLps(pattern);
  let i = 0; // index for text
  let j = 0; // index for pattern

  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i++;
      j++;
      if (j === pattern.length) return i - j; // full match
    } else {
      if (j > 0) {
        j = lps[j - 1]; // fallback in pattern
      } else {
        i++;          // no match at text[i]
      }
    }
  }
  return -1;
}

/**
 * Builds the LPS array for the pattern.
 * lps[i] = length of the longest proper prefix of pattern[0..i]
 *          which is also a suffix of that substring.
 */
function buildLps(pattern: string): number[] {
  const lps = new Array<number>(pattern.length).fill(0);
  let len = 0; // length of the previous longest prefix suffix
  let i = 1;

  while (i < pattern.length) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len > 0) {
        len = lps[len - 1]; // fallback
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }
  return lps;
}

/* ---------- Usage example ---------- */
if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test('kmpSearch', () => {
    expect(kmpSearch('ababcabcab', 'abc')).toBe(2);
    expect(kmpSearch('aaaaa', 'bba')).toBe(-1);
    expect(kmpSearch('hello', '')).toBe(0);
  });
}
