/**
 * Return the index of the first occurrence of `pattern` inside `text`,
 * or -1 if the pattern is absent.
 */
export function kmpSearch(text: string, pattern: string): number {
  if (pattern.length === 0) return 0; // trivially found at start

  const lps = computeLPSArray(pattern); // longest‑prefix‑suffix table
  let i = 0; // index for text
  let j = 0; // index for pattern

  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i++;
      j++;
      if (j === pattern.length) { // whole pattern matched
        return i - j; // match start index
      }
    } else if (j > 0) {
      // mismatch after j matches – skip ahead by lps[j‑1]
      j = lps[j - 1];
    } else {
      // mismatch at start of pattern
      i++;
    }
  }

  return -1; // no match
}

/**
 * Pre‑process the pattern to build the “longest prefix that is also a suffix”
 * (LPS) array. lps[i] = the length of the longest proper prefix of
 * pattern[0..i] that is also a suffix of pattern[0..i].
 */
function computeLPSArray(pattern: string): number[] {
  const lps: number[] = Array(pattern.length).fill(0);
  let len = 0;   // length of previous longest prefix suffix
  let i = 1;     // lps[0] is always 0

  while (i < pattern.length) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else if (len !== 0) {
      // use the previous lps value to avoid re‑checking
      len = lps[len - 1];
    } else {
      lps[i] = 0;
      i++;
    }
  }

  return lps;
}
console.log(kmpSearch("ababcabcababc", "abc"));   // 2
console.log(kmpSearch("ababcabcababc", "abcd"));  // -1
console.log(kmpSearch("aaaaa", "aaa"));           // 0
