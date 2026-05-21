/**
 * Computes the prefix function (failure table) of a pattern.
 * pi[i] = the length of the longest proper prefix of pattern[0..i]
 * that is also a suffix of pattern[0..i].
 */
function buildPrefixTable(pattern: string): number[] {
  const m = pattern.length;
  const pi: number[] = Array(m).fill(0);
  let k = 0;   // mismatch counter

  for (let i = 1; i < m; i++) {
    // fall back until we either hit a match or k == 0
    while (k > 0 && pattern[i] !== pattern[k]) {
      k = pi[k - 1];
    }
    if (pattern[i] === pattern[k]) k++;
    pi[i] = k;
  }
  return pi;
}

/**
 * KMP search – returns the starting indices of all matches of `needle`
 * inside `haystack`.  Does *exact* matching (no regex features).
 */
export function kmpSearch(haystack: string, needle: string): number[] {
  const n = haystack.length;
  const m = needle.length;
  if (m === 0) return [];          // nothing to find
  if (m > n) return [];            // can't fit

  const pi = buildPrefixTable(needle);
  const matches: number[] = [];
  let j = 0;                        // current index in needle

  for (let i = 0; i < n; i++) {
    // if mismatch, fall back using pi until match or j == 0
    while (j > 0 && haystack[i] !== needle[j]) {
      j = pi[j - 1];
    }
    if (haystack[i] === needle[j]) j++;

    // full match found
    if (j === m) {
      matches.push(i - m + 1);
      j = pi[j - 1];   // allow overlaps
    }
  }

  return matches;
}
const txt = "ababcabcababc";
const pat = "abc";

console.log(kmpSearch(txt, pat));   // → [ 2, 5, 10 ]
function contains(haystack: string, needle: string) {
  return haystack.indexOf(needle) !== -1;
}
