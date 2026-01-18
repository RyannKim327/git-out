/**
 * Builds the BMH bad‑character shift table.
 *
 * For every byte value (0‑255) we store how many positions the algorithm
 * can safely skip when encountering that byte while scanning from the
 * rightmost side of the pattern.
 */
function makeShiftTable(pattern: string): Uint8Array {
  const m = pattern.length;
  const table = new Uint8Array(256);
  // Default shift is pattern length (skip the whole pattern).
  table.fill(m);

  // For every non‑last character we set shift = m - i - 1
  for (let i = 0; i < m - 1; ++i) {
    const c = pattern.charCodeAt(i);
    table[c] = m - i - 1;
  }
  return table;
}

/**
 * Boyer‑Moore‑Horspool search.
 *
 * @param text    The text where we look for the pattern.
 * @param pattern The pattern to find.
 * @returns       An array of zero‑based start indices where `pattern`
 *                is found in `text`.  Empty array if no match.
 */
export function bmhSearch(text: string, pattern: string): number[] {
  const n = text.length;
  const m = pattern.length;

  // Quick exits
  if (m === 0) return [];          // Empty pattern => nothing meaningful
  if (m > n) return [];            // Pattern longer than text => impossible

  const shiftTable = makeShiftTable(pattern);
  const result: number[] = [];

  let i = 0; // Current offset in `text` aligning the end of the pattern
  while (i <= n - m) {
    // Compare pattern from the end backward
    let j = m - 1;
    while (j >= 0 && pattern[j] === text[i + j]) {
      j -= 1;
    }

    if (j < 0) {               // All characters matched
      result.push(i);
      i += 1;                  // For overlapping matches we shift by 1
    } else {
      const shiftVal = shiftTable[text.charCodeAt(i + m - 1)];
      i += shiftVal;
    }
  }

  return result;
}

/* ---------- Example usage --------------------------------- */

const haystack = "abacababcab";
const needle  = "cab";

const indices = bmhSearch(haystack, needle);
console.log(`Pattern found at indices: ${indices.join(", ")}`);
// -> "Pattern found at indices: 3, 8"

