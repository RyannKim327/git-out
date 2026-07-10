/**
 * BWT keeps the input string as an array of characters,
 * builds all rotations, sorts them, then extracts the last
 * column (the transformed string) and remembers the index
 * of the original string in the sorted list – that index
 * is needed for the inverse transform.
 */
export function bwt(str: string): { transformed: string; primaryIndex: number } {
  const n = str.length;
  // Produce all rotations: str[i:] + str[:i]
  const rotations: string[] = Array.from({ length: n }, (_, i) =>
    str.slice(i) + str.slice(0, i)
  );

  // Sort rotations lexicographically
  rotations.sort();

  // The transformed string is the concatenation of the last char
  // of every rotation, appended in sorted order.
  const lastColumn = rotations.map(rot => rot[rot.length - 1]).join('');

  // Find the row that matches the original string; its index
  // is what BWT callers need to recover the original.
  const primaryIndex = rotations.findIndex(rot => rot === str);

  return { transformed: lastColumn, primaryIndex };
}

/**
 * Inverse BWT reconstructs the original string from the
 * transformed string and the index found in the forward step.
 */
export function inverseBwt(
  transformed: string,
  primaryIndex: number
): string {
  const n = transformed.length;

  // Initialize an array of empty strings: will hold the building rows
  let table: string[] = Array.from({ length: n }, () => '');

  // Repeatedly prepend the transformed column to each row,
  // then sort. After n iterations the table is fully sorted.
  for (let step = 0; step < n; step++) {
    // Prepend each character of 'transformed' to the corresponding row
    table = table.map((row, i) => transformed[i] + row);

    // Quick sort (JavaScript's String array sort is fine for our sizes)
    table.sort();
  }

  // The original string is the row at primaryIndex
  return table[primaryIndex];
}

/* ────────────────────── Demo ────────────────────── */

const example = 'banana$';    // '$' is a unique EOF marker
const { transformed, primaryIndex } = bwt(example);

console.log('BWT:', transformed, 'Primary index:', primaryIndex);
console.log('Inverse:', inverseBwt(transformed, primaryIndex));

/* Expected output:

BWT: annb$aa  Primary index: 3
Inverse: banana$

*/
