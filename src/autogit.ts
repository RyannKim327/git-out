/**
 * Build the shift table for the Boyer–Moore–Horspool algorithm.
 * For each character in the pattern we set the shift distance to the
 * pattern length minus the index - 1, unless the character is the
 * pattern's last one (its shift remains 1).
 */
function buildShiftTable(pattern: string): Record<string, number> {
  const table: Record<string, number> = {};
  const m = pattern.length;

  // Initialize all shifts to the pattern length.
  for (let i = 0; i < m; i++) {
    const ch = pattern.charAt(i);
    table[ch] = m;
  }

  // Adjust shifts for every character except the last one.
  for (let i = 0; i < m - 1; i++) {
    table[pattern.charAt(i)] = m - i - 1;
  }

  return table;
}

/**
 * Boyer–Moore–Horspool substring search.
 * @param text   The string you want to search inside.
 * @param pat    The pattern you are looking for.
 * @returns      The index of the first occurrence, or -1 if not found.
 */
export function boyerMooreHorspool(text: string, pat: string): number {
  const n = text.length;
  const m = pat.length;

  if (m === 0) return 0;          // Empty pattern matches at 0
  if (m > n) return -1;           // Pattern longer than text → impossible

  const shift = buildShiftTable(pat);

  let i = 0;                      // Current position in text

  while (i <= n - m) {
    let j = m - 1;                // Start comparing from the end of the pattern

    // Walk backwards over matched characters
    while (j >= 0 && pat.charAt(j) === text.charAt(i + j)) {
      j--;
    }

    if (j < 0) {
      return i;                   // Match found
    }

    // If mismatch, shift by the table value of the mismatched character
    const badChar = text.charAt(i + m - 1);
    i += shift[badChar] ?? m;     // Default shift if character not in table
  }

  return -1;                      // No match
}
const txt = "Here is a simple example: find the substring.";
const pat = "substring";

const idx = boyerMooreHorspool(txt, pat);
console.log(idx);   // → 34
