/**
 * Longest-Prefix-Suffix table (a.k.a. failure function).
 * lps[i] = length of the longest proper prefix of pat[0..i]
 *          which is also a suffix of pat[0..i].
 */
function buildLPS(pat: string): number[] {
  const m = pat.length;
  const lps = new Array<number>(m).fill(0);
  let len = 0;          // length of the previous longest prefix suffix
  let i = 1;

  while (i < m) {
    if (pat[i] === pat[len]) {
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
 * Returns an array with all starting indices of `pattern` in `text`.
 * Runs in O(n + m) time and O(m) extra space.
 */
export function kmpSearch(text: string, pattern: string): number[] {
  const n = text.length;
  const m = pattern.length;
  if (m === 0) return [];          // empty pattern
  if (m > n) return [];            // impossible

  const lps = buildLPS(pattern);
  const hits: number[] = [];

  let i = 0; // index for text
  let j = 0; // index for pattern

  while (i < n) {
    if (text[i] === pattern[j]) {
      i++;
      j++;
      if (j === m) {               // full match
        hits.push(i - j);
        j = lps[j - 1];              // allow overlapping matches
      }
    } else if (j !== 0) {
      j = lps[j - 1];                // fallback in pattern
    } else {
      i++;                           // advance in text
    }
  }
  return hits;
}

/* ---------- Usage example ---------- */
if (import.meta.url === `file://${process.argv[1]}`) {
  const text = "ababcabcababcabc";
  const pattern = "ababc";
  console.log(kmpSearch(text, pattern)); // → [0, 7]
}
npx ts-node kmp.ts
# [0, 7]
