/**
 * Returns the starting indices of every occurrence of `pat` in `text`.
 * Runs in O(n + m) time, O(m) space.
 * Works correctly with full-Unicode strings (emoji, CJK, etc.).
 */
export function kmpSearch(text: string, pat: string): number[] {
  if (pat.length === 0) return [];
  if (pat.length > text.length) return [];

  // 1. Build longest-prefix-suffix (LPS) table for the pattern.
  const lps = buildLps(Array.from(pat));

  // 2. Scan the text.
  const res: number[] = [];
  const txt = Array.from(text);          // keeps full-Unicode chars intact
  const pArr = Array.from(pat);

  let i = 0; // index for txt
  let j = 0; // index for pArr

  while (i < txt.length) {
    if (txt[i] === pArr[j]) {
      i++;
      j++;
      if (j === pArr.length) {
        res.push(i - j); // match found
        j = lps[j - 1];  // allow overlapping matches
      }
    } else if (j > 0) {
      j = lps[j - 1];
    } else {
      i++;
    }
  }
  return res;
}

/**
 * Builds the LPS (longest prefix which is also suffix) table.
 * lps[i] = length of the longest proper prefix of pat[0..i] that
 * is also a suffix of that substring.
 */
function buildLps(pat: string[]): number[] {
  const lps = new Array<number>(pat.length).fill(0);
  let len = 0; // length of the previous longest prefix suffix
  let i = 1;

  while (i < pat.length) {
    if (pat[i] === pat[len]) {
      len++;
      lps[i] = len;
      i++;
    } else if (len > 0) {
      len = lps[len - 1];
    } else {
      lps[i] = 0;
      i++;
    }
  }
  return lps;
}
console.log(kmpSearch('ababcabcababc', 'abc')); // → [2, 7]
console.log(kmpSearch('😀😃😀😄😀😃😀', '😀😃')); // → [0, 4]
