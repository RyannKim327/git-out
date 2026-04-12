// Compute lps array for pattern p
function buildLPS(p: string): number[] {
  const lps = new Array(p.length).fill(0);
  let len = 0;            // length of the previous longest prefix suffix
  let i = 1;

  while (i < p.length) {
    if (p[i] === p[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        // fall back in the pattern, don’t slide the text cursor
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
 * KMP search – returns true if pattern occurs in text
 * @param text the body to scan
 * @param pattern the substring to find
 */
function kmpSearch(text: string, pattern: string): boolean {
  if (pattern === "") return true;          // empty pattern matches everywhere

  const lps = buildLPS(pattern);
  let i = 0; // index for text
  let j = 0; // index for pattern

  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i++; j++;
      if (j === pattern.length) return true;   // full match found
    } else {
      if (j !== 0) {
        j = lps[j - 1];    // drop the matched prefix
      } else {
        i++;               // move on in the text
      }
    }
  }
  return false;
}
function kmpAllMatches(text: string, pattern: string): number[] {
  if (pattern === "") return [];  // or [0,1,2,...] if you want

  const lps = buildLPS(pattern);
  const matches: number[] = [];
  let i = 0, j = 0;

  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i++; j++;
      if (j === pattern.length) {
        matches.push(i - j); // match ends at i-1, so start = i-j
        j = lps[j - 1];      // continue searching
      }
    } else {
      if (j !== 0) j = lps[j - 1];
      else i++;
    }
  }
  return matches;
}
const haystack = "ABABDABACDABABCABAB";
const needle  = "ABABCABAB";

console.log(kmpSearch(haystack, needle));          // true
console.log(kmpAllMatches(haystack, needle));      // [10]
