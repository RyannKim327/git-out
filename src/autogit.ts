/**
 * KMP search: returns the first index of pattern in text, or -1 if not found.
 * Time: O(n + m)  |  Space: O(m)  (n = text length, m = pattern length)
 */
export function kmpSearch(text: string, pattern: string): number {
  if (!pattern.length) return 0;          // empty pattern is at start
  if (pattern.length > text.length) return -1;

  const lps = buildLpsArray(pattern);       // longest prefix-suffix table
  let i = 0;                              // index in text
  let j = 0;                              // index in pattern

  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i++;
      j++;
      if (j === pattern.length) return i - j; // full match
    } else {
      if (j === 0) {
        i++;
      } else {
        j = lps[j - 1];                     // fallback smartly
      }
    }
  }
  return -1;
}

/**
 * Builds the Longest Prefix-Suffix array used by KMP.
 * lps[i] = length of the longest proper prefix of pattern[0..i] that is also a suffix.
 */
function buildLpsArray(pattern: string): number[] {
  const lps = new Array<number>(pattern.length).fill(0);
  let len = 0;      // length of the current prefix-suffix
  let i = 1;        // starts at 1 since lps[0] = 0

  while (i < pattern.length) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len === 0) {
        lps[i] = 0;
        i++;
      } else {
        len = lps[len - 1]; // fallback within the pattern
      }
    }
  }
  return lps;
}

/* Optional: return all matches */
export function kmpAllMatches(text: string, pattern: string): number[] {
  const lps = buildLpsArray(pattern);
  const matches: number[] = [];
  let i = 0, j = 0;

  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i++;
      j++;
      if (j === pattern.length) {
        matches.push(i - j);
        j = lps[j - 1]; // continue searching
      }
    } else {
      j = j ? lps[j - 1] : 0;
      if (!j) i++;
    }
  }
  return matches;
}
console.log(kmpSearch("abxabcabcaby", "abcaby")); // → 6
console.log(kmpAllMatches("aaaa", "aa")); // → [0, 1, 2]
