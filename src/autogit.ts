/**
 * Build the shift table used by BMH.
 * Each entry tells us how far we can jump when the bad character
 * (the character that mismatched) appears.
 */
function buildShiftTable(pattern: string): Record<string, number> {
  const table: Record<string, number> = {};
  const m = pattern.length;

  // every character that does NOT appear in the pattern gets a full skip
  // (m).  Characters *inside* the pattern get a smaller value.
  for (let i = 0; i < m - 1; i++) {
    table[pattern[i]] = m - 1 - i;
  }

  return table;
}

/**
 * Classic Boyer‑Moore‑Horspool
 *
 * @param text    The text to search in
 * @param pattern The pattern to find
 * @returns Index of the first occurrence or -1
 */
export function boyerMooreHorspool(text: string, pattern: string): number {
  if (pattern.length === 0) return 0;          // empty pattern matches immediately
  if (pattern.length > text.length) return -1;   // impossible

  const shift = buildShiftTable(pattern);
  const n = text.length;
  const m = pattern.length;

  let i = 0;          // index in text where we start aligning the pattern

  while (i <= n - m) {
    // start comparing from the end of the pattern
    let j = m - 1;
    while (j >= 0 && pattern[j] === text[i + j]) {
      j--;
    }

    if (j < 0) {
      return i;  // whole pattern matched
    }

    // bad character at text[i + m - 1]
    const badChar = text[i + m - 1];
    const skip = shift[badChar] ?? m; // default skip is m
    i += skip;
  }

  return -1; // not found
}
console.log(boyerMooreHorspool("ABAAACD", "AAC")); // → 4
console.log(boyerMooreHorspool("hello world", "world")); // → 6
console.log(boyerMooreHorspool("visible", "nope")); // → -1
