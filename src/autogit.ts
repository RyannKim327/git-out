/**
 * Return the starting index of the first occurrence of `pattern` in `text`.
 * Returns -1 if the pattern is not found.
 */
export function kmpSearch(text: string, pattern: string): number {
  if (pattern.length === 0) return 0;          // empty pattern is found at 0
  if (pattern.length > text.length) return -1;

  const lps = buildLPS(pattern);
  let i = 0; // index for text
  let j = 0; // index for pattern

  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i++;
      j++;
      if (j === pattern.length) return i - j;   // full match
    } else if (j > 0) {
      j = lps[j - 1];                         // fallback in pattern
    } else {
      i++;                                    // no match, advance text
    }
  }
  return -1;
}

/**
 * Build the Longest Prefix Suffix (LPS) array for the pattern.
 * lps[i] = length of the longest proper prefix of pattern[0..i]
 *          which is also a suffix of that substring.
 */
function buildLPS(pattern: string): number[] {
  const lps = new Array<number>(pattern.length).fill(0);
  let len = 0; // length of the previous longest prefix suffix
  let i = 1;

  while (i < pattern.length) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else if (len > 0) {
      len = lps[len - 1]; // fallback
    } else {
      lps[i] = 0;
      i++;
    }
  }
  return lps;
}

/* ---------- Usage example ---------- */
if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest;

  describe('KMP search', () => {
    it('finds pattern in text', () => {
      expect(kmpSearch('abxabcabcaby', 'abcaby')).toBe(6);
      expect(kmpSearch('hello world', 'world')).toBe(6);
      expect(kmpSearch('aaaaa', 'aaa')).toBe(0);
      expect(kmpSearch('abcde', 'f')).toBe(-1);
      expect(kmpSearch('', '')).toBe(0);
    });
  });
}
