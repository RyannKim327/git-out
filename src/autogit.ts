/**
 * Returns the BWT of `s` as an object containing
 *   - last: the encoded string (last column of the sorted matrix)
 *   - index: the row number that holds the original string (0‑based)
 */
function burrowsWheelerEncode(s: string): { last: string; index: number } {
  const n = s.length;
  // Build every rotation: slice(s, i) + slice(s, 0, i)
  const rotations = Array.from({ length: n }, (_, i) =>
    s.slice(i) + s.slice(0, i)
  );

  // Sort rotations lexicographically
  rotations.sort();

  // Extract last column and find original string's row
  let lastCol = "";
  let origIndex = -1;
  for (let r = 0; r < n; r++) {
    const row = rotations[r];
    lastCol += row[row.length - 1];
    if (row === s) origIndex = r;
  }
  return { last: lastCol, index: origIndex };
}
const { last, index } = burrowsWheelerEncode("BANANA");
// last  => "ANNBAA"
// index => 3   // 0‑based, the fourth row is "BANANA"
/**
 * Inverse of the BWT.  Given the last column (`last`) and the original
 * string's row index (`index`), reconstruct the original string.
 */
function burrowsWheelerDecode(last: string, index: number): string {
  const n = last.length;
  const first = [...last].sort();          // First column is sorted last
  const table: string[] = Array(n).fill(""); // Working table of rows

  // Repeatedly prepend last‑column chars to the table rows
  for (let step = 0; step < n; step++) {
    // Prepend each char of last to the corresponding row
    for (let i = 0; i < n; i++) {
      table[i] = last[i] + table[i];
    }
    // Re‑sort the table – now the first column matches `first`
    table.sort();
  }

  // The row at the original index is the decoded string
  return table[index];
}
const original = burrowsWheelerDecode("ANNBAA", 3);
console.log(original); // "BANANA"
const input = "MNEMONIC";
const { last, index } = burrowsWheelerEncode(input);
const restored = burrowsWheelerDecode(last, index);

console.log(last, index);   // e.g., "NOIACEMM 4"
console.log(restored === input); // true
