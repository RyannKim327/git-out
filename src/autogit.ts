text:   abcdefghijk
        ‖~~~~~~~~~~
pattern:   def
function buildShiftTable(pattern: string): Map<string, number> {
  const table = new Map<string, number>();
  const m = pattern.length;

  // For all chars except the last one
  for (let i = 0; i < m - 1; i++) {
    table.set(pattern[i], m - 1 - i);
  }
  return table;
}
function boyerMooreHorspool(pattern: string, text: string): number | null {
  const m = pattern.length;
  const n = text.length;

  if (m === 0) return 0;          // Empty pattern matches at start
  if (m > n) return null;         // Impossible to find

  const shiftTable = buildShiftTable(pattern);
  const defaultShift = m;

  let i = 0; // Current alignment of pattern in text

  while (i <= n - m) {
    let j = m - 1;

    // Compare from right to left
    while (j >= 0 && pattern[j] === text[i + j]) {
      j--;
    }

    if (j < 0) {
      // Full match
      return i;
    }

    // Mismatch: decide how far to shift
    const mismatchedChar = text[i + j];
    const shift = shiftTable.get(mismatchedChar) ?? defaultShift;

    i += shift;
  }

  return null; // No match found
}
const sampleText = "The quick brown fox jumps over the lazy dog. The fox was quick.";
const samplePattern = "quick";

const matchIdx = boyerMooreHorspool(samplePattern, sampleText);

if (matchIdx !== null) {
  console.log(`Found at index ${matchIdx}`);
} else {
  console.log("No match");
}
