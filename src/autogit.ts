/**
 * Computes the LPS (Longest Prefix–Suffix) table for a pattern.
 * lps[i] is the length of the longest proper prefix of pattern[0..i]
 * that is also a suffix of pattern[0..i].
 */
function buildLps(pattern: string): number[] {
  const lps: number[] = new Array(pattern.length).fill(0);
  let length = 0;                 // length of the previous longest prefix‑suffix
  let i = 1;                      // we start from the second character

  while (i < pattern.length) {
    if (pattern[i] === pattern[length]) {
      length++;
      lps[i] = length;
      i++;
    } else {
      if (length !== 0) {
        // fall back to the previous potential prefix
        length = lps[length - 1];
        // note: we do **not** increment i here
      } else {
        // no match at all; lps[i] stays 0
        lps[i] = 0;
        i++;
      }
    }
  }

  return lps;
}

/**
 * KMP search: returns the index of the first occurrence of the pattern in the text,
 * or -1 if the pattern is absent.
 */
function kmpSearch(text: string, pattern: string): number {
  if (pattern.length === 0) return 0;              // trivial match
  if (text.length < pattern.length) return -1;     // cannot match

  const lps = buildLps(pattern);
  let tIdx = 0;      // index into text
  let pIdx = 0;      // index into pattern

  while (tIdx < text.length) {
    if (pattern[pIdx] === text[tIdx]) {
      tIdx++;
      pIdx++;

      // full match
      if (pIdx === pattern.length) {
        return tIdx - pIdx;   // return starting index
      }
    } else {
      if (pIdx !== 0) {
        // skip comparisons by using the lps table
        pIdx = lps[pIdx - 1];
      } else {
        tIdx++;
      }
    }
  }

  return -1; // not found
}

/* ---------- Example usage ---------- */
const txt = "abxabcabcaby";
const pat = "abcaby";

const idx = kmpSearch(txt, pat);
console.log(idx); // prints 6 (the position where "abcaby" starts in txt)
console.assert(kmpSearch("hello world", "world") === 6);
console.assert(kmpSearch("hello world", "bye")    === -1);
console.assert(kmpSearch("aaaaa", "aa")          === 0); // returns the first match
