/**
 * Pre-process the pattern and return the LPS (Longest Prefix Suffix) array.
 * Time  : O(pattern.length)
 * Memory: O(pattern.length)
 */
function buildLpsTable(pattern: string): number[] {
  const m = pattern.length;
  const lps = new Array<number>(m).fill(0);
  let len = 0;          // length of the current longest prefix suffix
  let i = 1;            // lps[0] is always 0, so start at 1

  while (i < m) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else if (len !== 0) {
      len = lps[len - 1]; // fallback in the LPS table
    } else {
      lps[i] = 0;
      i++;
    }
  }
  return lps;
}

/**
 * KMP search.
 * @returns index of the first occurrence of `pattern` in `text`, or -1.
 * Time  : O(text.length + pattern.length)
 * Memory: O(pattern.length)
 */
export function kmpSearch(text: string, pattern: string): number {
  if (pattern.length === 0) return 0;          // empty pattern is found at 0
  if (pattern.length > text.length) return -1;

  const lps = buildLpsTable(pattern);
  let i = 0;  // index for text
  let j = 0;  // index for pattern

  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i++;
      j++;
      if (j === pattern.length) {
        return i - j;   // match found
      }
    } else if (j !== 0) {
      j = lps[j - 1]; // fallback in pattern
    } else {
      i++;
    }
  }
  return -1; // no match
}

/* ------------- usage example ------------- */
if (require.main === module) {
  const txt = "ababcababaad";
  const pat = "ababa";
  console.log(kmpSearch(txt, pat)); // → 5
}
npx ts-node kmp.ts
