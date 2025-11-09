/**
 * Implements the KMP algorithm for substring search.
 * @param text - The string to search within.
 * @param pattern - The substring to search for.
 * @returns The starting index of the first occurrence of `pattern` in `text`, or -1 if not found.
 */
function kmpSearch(text: string, pattern: string): number {
  if (pattern.length === 0) return 0;

  // Precompute Longest Prefix Suffix (LPS) array
  const lps: number[] = computeLPS(pattern);
  let i = 0; // Index for text
  let j = 0; // Index for pattern

  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i++;
      j++;
      if (j === pattern.length) return i - j; // Match found
    } else {
      if (j !== 0) {
        j = lps[j - 1]; // Backtrack using LPS array
      } else {
        i++;
      }
    }
  }

  return -1; // Not found
}

/** Computes the LPS array for KMP preprocessing. */
function computeLPS(pattern: string): number[] {
  const lps: number[] = new Array(pattern.length).fill(0);
  let len = 0;
  let i = 1;

  while (i < pattern.length) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        len = lps[len - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }

  return lps;
}
const text = "ABABDABACDABABCABAB";
const pattern = "ABABCABAB";
console.log(kmpSearch(text, pattern)); // Output: 10
/**
 * Implements the simplified Boyer-Moore algorithm (Bad Character Heuristic).
 * @param text - The string to search within.
 * @param pattern - The substring to search for.
 * @returns The starting index of the first occurrence of `pattern` in `text`, or -1 if not found.
 */
function boyerMooreSearch(text: string, pattern: string): number {
  const n = text.length;
  const m = pattern.length;
  if (m === 0) return 0;

  // Preprocess bad-character skip table
  const skipTable: Record<string, number> = {};
  for (let i = 0; i < m; i++) {
    skipTable[pattern[i]] = Math.max(1, m - i - 1);
  }

  let i = 0;
  while (i <= n - m) {
    let j = m - 1;

    // Match from end of pattern
    while (j >= 0 && text[i + j] === pattern[j]) j--;

    if (j < 0) return i; // Match found

    // Skip ahead using the bad character rule
    const badChar = text[i + j];
    const skip = skipTable[badChar] || m;
    i += Math.max(skip, j - (m - skip - 1));
  }

  return -1; // Not found
}
console.log(boyerMooreSearch(text, pattern)); // Output: 10
// Using indexOf()
const foundIndex = text.indexOf(pattern);

// Using RegExp
const regex = new RegExp(pattern);
const isFound = regex.test(text);
