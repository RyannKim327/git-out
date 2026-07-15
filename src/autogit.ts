/**
 * Builds the bad‑character shift table for a given pattern.
 *
 * The table maps a character code (0–65535 for UTF‑16) to the shift value.
 * The shift is `pattern.length - 1 - lastIndex` where `lastIndex` is the
 * right‑most occurrence of that character inside the pattern.  
 *
 * @param pattern The substring we’re looking for.
 * @returns An array indexed by code unit, containing shift values.
 */
function buildShiftTable(pattern: string): Uint16Array {
  const m = pattern.length;
  const table = new Uint16Array(65536);   // 16‑bit UTF‑16 code units

  // Default shift: length of the pattern
  table.fill(m);

  // For every character except the last one, compute an optimal shift
  for (let i = 0; i < m - 1; i++) {
    const code = pattern.charCodeAt(i);
    table[code] = m - 1 - i;   // shift so the pattern’s character aligns again
  }
  return table;
}

/**
 * Boyer‑Moore‑Horspool search.
 *
 * @param text    The string to search inside.
 * @param pattern The substring we want to find.
 * @returns        All zero‑based indices where `pattern` starts in `text`.
 */
export function bmhSearch(text: string, pattern: string): number[] {
  const n = text.length;
  const m = pattern.length;
  if (m === 0) return [0];              // empty pattern matches at every position
  if (m > n) return [];                // pattern longer than text – no match

  const shift = buildShiftTable(pattern);
  const result: number[] = [];

  let i = 0;   // current alignment: pattern[0] aligned with text[i]
  while (i <= n - m) {
    let j = m - 1;   // start comparing from the end of the pattern

    // Compare backwards
    while (j >= 0 && pattern[j] === text[i + j]) {
      j--;
    }

    if (j < 0) {          // full match
      result.push(i);
    }

    // Compute the shift.  We jump over at least one character, but the
    // shift table may prescribe a longer shift if the mismatching character
    // exists in the pattern.
    const mismatchingCharCode = text.charCodeAt(i + m - 1);
    i += shift[mismatchingCharCode];
  }

  return result;
}
const haystack = 'ABCDABABCABCDABABD';
const needle   = 'ABCDABD';

console.log(bmhSearch(haystack, needle)); // → [11]

// Multiple matches
console.log(bmhSearch('abababa', 'aba')); // → [0, 2, 4]
