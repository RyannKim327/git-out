/**
 * Builds the longest‑prefix‑suffix (LPS) array for the pattern.
 * LPS[i] stores the length of the longest proper prefix of P[0…i]
 * that is also a suffix of P[0…i].
 *
 * Complexity: O(m)
 */
function buildLps(p: string): number[] {
  const lps: number[] = new Array(p.length).fill(0);
  let len = 0;            // current length of the previous longest prefix
  let i = 1;

  while (i < p.length) {
    if (p[i] === p[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        // fall back to the last known good prefix
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
 * Performs KMP search.
 *
 * Returns the starting index of the first match
 * or -1 if the pattern does not occur in the text.
 *
 * Complexity: O(n + m)
 */
export function kmpSearch(text: string, pattern: string): number {
  if (pattern.length === 0) return 0;
  const lps = buildLps(pattern);

  let i = 0; // index in text
  let j = 0; // index in pattern

  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i++;
      j++;
      if (j === pattern.length) return i - j; // match found
    } else {
      if (j !== 0) {
        j = lps[j - 1]; // use LPS to skip comparisons
      } else {
        i++;
      }
    }
  }
  return -1; // no match
}
console.log(kmpSearch('ababcabcab', 'abc')); // 3
console.log(kmpSearch('aaaa', 'b'));        // -1
