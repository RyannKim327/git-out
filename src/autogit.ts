/**
 * Longest Prefix Suffix table (aka failure function).
 * lps[i] = length of the longest proper prefix of pattern[0..i]
 *          that is also a suffix of pattern[0..i].
 */
function buildLPS(pattern: string): number[] {
  const m = pattern.length;
  const lps = new Array<number>(m).fill(0);
  let len = 0;      // length of the previous longest prefix suffix
  let i = 1;

  while (i < m) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else if (len !== 0) {
      len = lps[len - 1]; // fallback
    } else {
      lps[i] = 0;
      i++;
    }
  }
  return lps;
}

/**
 * Returns an array with every starting index of `pattern` in `text`.
 * Empty array means no match.
 */
export function kmpSearch(text: string, pattern: string): number[] {
  if (pattern.length === 0) return [];   // optional: return all indices if pattern is empty

  const lps = buildLPS(pattern);
  const result: number[] = [];

  let i = 0; // index for text
  let j = 0; // index for pattern

  while (i < text.length) {
    if (pattern[j] === text[i]) {
      i++;
      j++;
    }

    if (j === pattern.length) {
      result.push(i - j); // match found
      j = lps[j - 1];     // continue searching
    } else if (i < text.length && pattern[j] !== text[i]) {
      if (j !== 0) {
        j = lps[j - 1];
      } else {
        i++;
      }
    }
  }
  return result;
}

/* ------------------ Usage example ------------------ */
if (require.main === module) {
  const text = "ababcabcababcabc";
  const pattern = "ababc";
  console.log(kmpSearch(text, pattern)); // → [0, 7]
}
