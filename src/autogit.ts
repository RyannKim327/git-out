/**
 * Build the LPS (Longest Prefix Suffix) table for KMP.
 *
 * @param pattern - The pattern string for which the table is built.
 * @returns An array where lps[i] is the length of the longest proper
 *          prefix of pattern[0..i] that is also a suffix of that substring.
 */
function buildLPS(pattern: string): number[] {
  const m = pattern.length;
  const lps: number[] = Array(m).fill(0);
  let length = 0;                 // length of previous longest prefix suffix
  let i = 1;                      // lps[0] is always 0

  while (i < m) {
    if (pattern[i] === pattern[length]) {
      length += 1;
      lps[i] = length;
      i += 1;
    } else {
      if (length !== 0) {
        // fall back in the pattern (do not increment i here)
        length = lps[length - 1];
      } else {
        lps[i] = 0;
        i += 1;
      }
    }
  }
  return lps;
}

/**
 * KMP search – returns all starting indices of `pattern` in `text`.
 *
 * @param text    – The string to search within.
 * @param pattern – The string to find.
 * @returns Array of start indices where pattern occurs in text.
 */
export function kmpSearch(text: string, pattern: string): number[] {
  if (pattern.length === 0) return [];          // nothing to find
  const lps = buildLPS(pattern);
  const result: number[] = [];

  let i = 0;   // index for text
  let j = 0;   // index for pattern

  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i += 1;
      j += 1;
    }

    // full match found
    if (j === pattern.length) {
      result.push(i - j);   // starting index
      j = lps[j - 1];       // allow overlapping matches
    } else if (i < text.length && text[i] !== pattern[j]) {
      // mismatch after j matches
      if (j !== 0) {
        j = lps[j - 1];
      } else {
        i += 1;
      }
    }
  }

  return result;
}
const text = "ABABDABACDABABCABAB";
const pattern = "ABABCABAB";

const matches = kmpSearch(text, pattern);
console.log(matches);          // [10]

const hasMatch = matches.length > 0;
console.log(hasMatch);         // true
