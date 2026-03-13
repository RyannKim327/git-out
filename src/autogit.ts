/**
 * Encodes a string using Burrows–Wheeler transform.
 *
 * @param input – Source text (any length, any chars including nulls).
 * @returns {bwt: string, index: number} – BWT string + original row index.
 */
export function bwtEncode(input: string): { bwt: string; index: number } {
  const n = input.length;
  // Quick escape for empty string.
  if (n === 0) return { bwt: "", index: 0 };

  // Build the rotation array.
  const rotations: string[] = [];
  for (let offset = 0; offset < n; offset++) {
    const rotation = input.slice(offset) + input.slice(0, offset);
    rotations.push(rotation);
  }

  // Sort the rotations.
  rotations.sort();

  // Construct the BWT string (last column) and locate the original string.
  let lastColumn = "";
  let origIndex = -1;
  for (let i = 0; i < n; i++) {
    const rot = rotations[i];
    lastColumn += rot.charAt(n - 1);          // last char of the rotation
    if (rot === input) origIndex = i;        // original text keeps its place
  }

  return { bwt: lastColumn, index: origIndex };
}

/**
 * Decodes a BWT pair back to the original string.
 *
 * @param bwt – String produced by bwtEncode (last column).
 * @param index – Index returned by bwtEncode.
 * @returns original string.
 */
export function bwtDecode(bwt: string, index: number): string {
  const n = bwt.length;
  if (n === 0) return "";

  // Initialize table with empty strings.
  const table: string[] = Array(n).fill("");

  // Each iteration prepends a character from the BWT to every row,
  // then sorts. After n iterations the table is the sorted matrix.
  for (let step = 0; step < n; step++) {
    // Prepend the BWT characters.
    for (let i = 0; i < n; i++) {
      table[i] = bwt.charAt(i) + table[i];
    }
    // Stable sort by the whole string.
    table.sort();
  }

  // The row at the recorded index is the original string.
  return table[index];
}
import { bwtEncode, bwtDecode } from "./bwt";

const text = "The quick brown fox jumps over the lazy dog";

const { bwt, index } = bwtEncode(text);
console.log("BWT String:", bwt);
console.log("Original index =", index);

const recovered = bwtDecode(bwt, index);
console.log("Recovered:", recovered);
console.log("Match:", recovered === text); // true
