/**
 * Build the longest–prefix‑suffix (LPS) array for the pattern.
 *
 * lps[i] = length of the longest proper prefix of pattern[0..i]
 *           which is also a suffix of that substring.
 * Complexity: O(m), m = pattern.length
 */
function buildLPS(pattern: string): number[] {
  const m = pattern.length;
  const lps = new Array<number>(m).fill(0);
  let length = 0;               // length of the previous longest prefix suffix
  let i = 1;

  while (i < m) {
    if (pattern[i] === pattern[length]) {
      length++;
      lps[i] = length;
      i++;
    } else {
      if (length !== 0) {
        // fall back to the previous candidate
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
 * KMP search: return all start positions where pattern occurs in text.
 * Complexity: O(n + m), n = text.length, m = pattern.length
 */
export function kmpSearch(text: string, pattern: string): number[] {
  const n = text.length;
  const m = pattern.length;
  const lps = buildLPS(pattern);

  const positions: number[] = [];
  let i = 0; // index for text
  let j = 0; // index for pattern

  while (i < n) {
    if (pattern[j] === text[i]) {
      i++;
      j++;
    }

    if (j === m) {
      // full match found – record start index
      positions.push(i - j);
      j = lps[j - 1]; // allow for overlapping matches
    } else if (i < n && pattern[j] !== text[i]) {
      if (j !== 0) {
        j = lps[j - 1];
      } else {
        i++;
      }
    }
  }

  return positions;
}
const txt = "ABABDABACDABABCABAB";
const pat = "ABABCABAB";

const occ = kmpSearch(txt, pat);
console.log(occ); // → [10]
