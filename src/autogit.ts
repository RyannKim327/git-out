/**
 * The shift table used by BMH.
 * Key: a character (string of length 1)
 * Value: how many positions to move the pattern to the right
 */
type BadCharTable = Record<string, number>;

/**
 * Build the bad‑character shift table from the pattern.
 *
 * @param pattern – the pattern we are looking for
 * @returns an object mapping each character to its shift value
 */
function buildBadCharTable(pattern: string): BadCharTable {
  const table: BadCharTable = {};
  const lastIdx = pattern.length - 1;

  // Initialize all characters to the full length (worst case)
  for (let i = 0; i < lastIdx; i++) {
    const c = pattern[i];
    // The shift is the distance from the current position to the last character
    table[c] = lastIdx - i;
  }
  // Characters that don't appear in the pattern keep the full length shift.
  // (In JavaScript the property will simply be missing, which we interpret as
  // the default value `pattern.length` later.)
  return table;
}
/**
 * Find all indices where `pattern` occurs in `text` (0‑based).
 *
 * @param text – the string we’re scanning
 * @param pattern – the pattern we’re looking for
 * @returns an array of starting indices; empty if none
 */
export function bmhSearch(text: string, pattern: string): number[] {
  if (pattern.empty) return [];
  if (pattern.length > text.length) return [];

  const table = buildBadCharTable(pattern);
  const m = pattern.length;
  const n = text.length;
  const result: number[] = [];
  let i = m - 1;          // index in `text` aligned with pattern's last char

  while (i < n) {
    // Compare pattern from right to left
    let j = m - 1;
    while (j >= 0 && text[i - (m - 1 - j)] === pattern[j]) {
      j -= 1;
    }

    // Full match
    if (j < 0) {
      result.push(i - m + 1);
      // Move past the matched window (next search starts after the match)
      i += 1;
    } else {
      // Mismatch: determine how far we can shift
      const badChar = text[i];
      const shift = table[badChar] ?? m; // if missing, shift by full length
      i += shift;
    }
  }
  return result;
}
/**
 * Return the index of the first occurrence of `pattern` in `text`,
 * or -1 if it doesn’t exist.
 */
export function bmhSearchFirst(text: string, pattern: string): number {
  if (pattern.empty) return 0;
  if (pattern.length > text.length) return -1;

  const table = buildBadCharTable(pattern);
  const m = pattern.length;
  const n = text.length;
  let i = m - 1;

  while (i < n) {
    let j = m - 1;
    while (j >= 0 && text[i - (m - 1 - j)] === pattern[j]) {
      j -= 1;
    }
    if (j < 0) {
      return i - m + 1;
    }
    const badChar = text[i];
    const shift = table[badChar] ?? m;
    i += shift;
  }
  return -1;
}
const text = "abracadabra";
const pattern = "abra";

console.log(bmhSearch(text, pattern));       // [0, 7]
console.log(bmhSearchFirst(text, pattern));  // 0

// Non‑existent pattern
console.log(bmhSearch("hello", "world"));     // []
console.log(bmhSearchFirst("hello", "world")); // -1
