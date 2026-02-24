function buildLps(pattern: string): number[] {
  const lps = new Array(pattern.length).fill(0);
  let len = 0;          // length of the previous longest prefix suffix
  let i = 1;            // we start from the second character

  while (i < pattern.length) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      // Mismatch after len matches
      if (len !== 0) {
        // Try the last known good prefix
        len = lps[len - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }
  return lps;
}
/**
 * Returns an array of starting indices where `pattern` occurs in `text`.
 * If no match, returns an empty array.
 */
export function kmpSearch(text: string, pattern: string): number[] {
  const lps = buildLps(pattern);
  const results: number[] = [];

  let i = 0; // index for text
  let j = 0; // index for pattern

  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i++; j++;
      if (j === pattern.length) {
        // Match found at position i - j
        results.push(i - j);
        // Prepare for the next possible match
        j = lps[j - 1];
      }
    } else {
      if (j !== 0) {
        // Mismatch after j matches
        j = lps[j - 1];
      } else {
        // Mismatch at the start
        i++;
      }
    }
  }

  return results;
}
const text = "ABABDABACDABABCABAB";
const pattern = "ABABCABAB";

console.log(kmpSearch(text, pattern)); // [10]
