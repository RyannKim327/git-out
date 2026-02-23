/**
 * Build the longest‑prefix‑suffix (LPS) array for the pattern.
 * lps[i] will contain the length of the longest proper prefix
 * that is also a suffix for the substring pattern[0…i].
 *
 * @param pattern – the pattern
 * @returns the filled LPS array
 */
function computeLPS(pattern: string): number[] {
  const lps: number[] = new Array(pattern.length).fill(0);
  let length = 0;          // length of the previous longest prefix suffix
  let i = 1;               // lps[0] is always 0

  while (i < pattern.length) {
    if (pattern[i] === pattern[length]) {
      length++;
      lps[i] = length;
      i++;
    } else {
      if (length !== 0) {
        // don't move i here; keep looking for a smaller prefix
        length = lps[length - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }

  return lps;
}

/**
 * Perform KMP search for a pattern in a text.
 *
 * @param text     – the string to search in
 * @param pattern  – the pattern to look for
 * @returns an array of starting indices where the pattern occurs
 */
function kmpSearch(text: string, pattern: string): number[] {
  if (pattern.length === 0) return []; // nothing to search for

  const lps = computeLPS(pattern);
  const positions: number[] = [];
  let i = 0; // index for text
  let j = 0; // index for pattern

  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i++;
      j++;

      if (j === pattern.length) {
        // match found – record starting index
        positions.push(i - j);
        // continue searching for next possible match
        j = lps[j - 1];
      }
    } else {
      if (j !== 0) {
        // jump back in the pattern based on LPS
        j = lps[j - 1];
      } else {
        i++; // move to next character in text
      }
    }
  }

  return positions;
}

/* Example usage */
const haystack = "ABABDABACDABABCABAB";
const needle = "ABABCABAB";

const matches = kmpSearch(haystack, needle);
console.log("Pattern found at positions:", matches);
// Expected output: Pattern found at positions: [9]
