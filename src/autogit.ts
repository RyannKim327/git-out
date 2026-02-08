/**
 * KMP string matcher.
 * @param text    Text in which to search.
 * @param pattern Pattern to find.
 * @returns Index of first occurrence of pattern in text, or -1 if not found.
 */
export function kmpSearch(text: string, pattern: string): number {
  const n = text.length;
  const m = pattern.length;

  if (m === 0) return 0;           // Empty pattern matches at start.

  // --------- Step 1: build failure function ----------
  const fail: number[] = new Array(m).fill(0);
  let k = 0;                         // length of current match

  for (let i = 1; i < m; i++) {
    while (k > 0 && pattern[k] !== pattern[i]) {
      k = fail[k - 1];
    }
    if (pattern[k] === pattern[i]) k++;
    fail[i] = k;
  }

  // --------- Step 2: scan the text ---------------
  k = 0;                               // reset pattern index
  for (let i = 0; i < n; i++) {
    while (k > 0 && text[i] !== pattern[k]) {
      k = fail[k - 1];
    }
    if (text[i] === pattern[k]) k++;

    if (k === m) {                    // match found
      return i - m + 1;
    }
  }

  return -1;                          // no match
}
const idx = kmpSearch('abxabcabcaby', 'abcaby');
console.log(idx);   // → 6
