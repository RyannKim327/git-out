/**
 * Pre‑computes the shift table for a pattern.
 *   pattern: the pattern we’re searching for
 *   Returns: a Map from character → shift distance
 */
function buildShiftTable(pattern: string): Map<string, number> {
  const table = new Map<string, number>();
  const m = pattern.length;

  // All characters that appear in the pattern get an initial shift of m
  for (const ch of pattern) {
    table.set(ch, m);
  }

  // For each character except the last one, set its shift to (m - i - 1)
  for (let i = 0; i < m - 1; ++i) {
    table.set(pattern[i], m - i - 1);
  }

  return table;
}
/**
 * Implements Boyer‑Moore‑Horspool.
 * @param text   – the text to search
 * @param pattern – the pattern to find
 * @returns      – the index of the first match, or -1 if none
 */
export function boyerMooreHorspool(text: string, pattern: string): number {
  const n = text.length;
  const m = pattern.length;

  if (m === 0) return 0;          // Empty pattern
  if (m > n) return -1;           // Pattern longer than text

  const shiftTable = buildShiftTable(pattern);

  let idx = 0;                    // Index of the leftmost character of the window
  while (idx <= n - m) {
    let j = m - 1;

    // Compare pattern from right to left
    while (j >= 0 && text[idx + j] === pattern[j]) {
      j -= 1;
    }

    // If all characters matched
    if (j < 0) {
      return idx;                // Found at position idx
    }

    // Mismatch: figure out how far to shift
    const mismatchedChar = text[idx + m - 1];
    const shift = shiftTable.get(mismatchedChar) ?? m;
    idx += shift;
  }

  return -1;                     // No match found
}
const txt = "ABAAABCDABCABABCAB";
const pat = "ABCAB";

const pos = boyerMooreHorspool(txt, pat);
if (pos >= 0) {
  console.log(`"${pat}" found at index ${pos}`);
} else {
  console.log(`"${pat}" not found`);
}
"ABCAB" found at index 12
