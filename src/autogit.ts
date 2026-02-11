/** Build the "lps" (longest‑prefix‑which‑is‑also‑suffix) table for the pattern */
function buildLPS(pattern: string): number[] {
  const lps = new Array(pattern.length).fill(0);
  let len = 0;              // length of previous longest prefix suffix
  let i = 1;                // we start from the second character

  while (i < pattern.length) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        len = lps[len - 1];  // fallback in the pattern
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }
  return lps;
}

/** Find the first occurrence of `pattern` in `text` (returns -1 if not found) */
function kmpSearch(text: string, pattern: string): number {
  if (!pattern) return 0; // empty pattern matches at start

  const lps = buildLPS(pattern);
  let i = 0; // index for text
  let j = 0; // index for pattern

  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i++;
      j++;
      if (j === pattern.length) return i - j; // match found
    } else {
      if (j !== 0) {
        j = lps[j - 1]; // shift pattern without re‑examining matched chars
      } else {
        i++;           // no match, move on in the text
      }
    }
  }
  return -1; // no match
}

/** Optional: return *all* starting indices of matches */
function kmpAllMatches(text: string, pattern: string): number[] {
  const indices: number[] = [];
  if (!pattern) return [0];

  const lps = buildLPS(pattern);
  let i = 0, j = 0;

  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i++;
      j++;
      if (j === pattern.length) {
        indices.push(i - j);
        j = lps[j - 1]; // continue searching for next possible match
      }
    } else {
      if (j !== 0) j = lps[j - 1];
      else i++;
    }
  }
  return indices;
}
const txt = "ABABDABACDABABCABAB";
const pat = "ABABCABAB";

const firstIdx = kmpSearch(txt, pat);          // returns 10
const allIdx   = kmpAllMatches(txt, pat);     // returns [10]
