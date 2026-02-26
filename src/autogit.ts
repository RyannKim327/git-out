/**
 * Build the bad‑character shift table for the pattern.
 * The table maps a character code to the distance we can safely skip
 * when that character is found in the text.
 */
function buildShiftTable(pattern: string): Int32Array {
  const m = pattern.length;
  const shift = new Int32Array(256);       // ASCII table size
  shift.fill(m);                          // default shift = pattern length

  // Populate the table for every character except the last one.
  // The last character is handled by the searches’ failure condition.
  for (let i = 0; i < m - 1; i++) {
    shift[pattern.charCodeAt(i)] = m - 1 - i;
  }
  return shift;
}

/**
 * Boyer‑Moore‑Horspool string search.
 * @param text The string to search in.
 * @param pattern The string to find.
 * @returns The index of the first occurrence, or -1 if not found.
 */
export function boyerMooreHorspool(text: string, pattern: string): number {
  const n = text.length;
  const m = pattern.length;

  if (m === 0) return 0;          // empty pattern matches at start
  if (m > n) return -1;           // longer pattern than text → impossible

  const shift = buildShiftTable(pattern);

  let i = m - 1;                  // index in text aligned with last pattern char
  while (i < n) {
    let j = 0;                    // offset from last pattern char
    while (j < m && pattern[m - 1 - j] === text[i - j]) {
      j++;
    }

    if (j === m) {                // all characters matched
      return i - m + 1;           // return starting index
    }

    // Shift by the value in the table for the mismatching text character
    const nextChar = text.charCodeAt(i);
    i += Math.max(shift[nextChar], 1);   // never shift by 0
  }
  return -1;                      // not found
}
const txt = "abcxabcdabxabcdabcdabcy";
const pat = "abcdabcy";

console.log(boyerMooreHorspool(txt, pat));  // → 15
