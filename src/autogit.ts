/**
 * Burrows‑Wheeler Transform (forward) – O(n²)
 * @param input original string
 * @returns {lastColumn, primaryIndex}
 *
 * `lastColumn` – the BWT output string (characters that appear as the
 *                 last column of the sorted rotation matrix).
 * `primaryIndex` – row number (0‑based) that contains the original
 *                  string in the sorted matrix; needed for the inverse.
 */
export function bwt(input: string): { lastColumn: string; primaryIndex: number } {
  const n = input.length;
  // Build the rotation array
  const rotations: string[] = [];                    //  O(n)
  for (let i = 0; i < n; i++) {
    rotations.push(input.slice(i) + input.slice(0, i));
  }

  // Sort the rotations lexicographically
  rotations.sort();                                 //  O(n log n) * O(n) Comparisons

  // Pull the last character of each sorted row
  let last = '';
  let primary = -1;
  for (let col = 0; col < n; col++) {
    const row = rotations[col];
    if (row === input) primary = col;               // original string position
    last += row[n - 1];
  }
  return { lastColumn: last, primaryIndex: primary };
}

/**
 * Inverse Burrows‑Wheeler Transform – O(n²) worst‑case
 * @param lastCol BWT string (last column)
 * @param primaryIndex index of original string within sorted rotations
 * @returns original string
 */
export function inverseBWT(lastCol: string, primaryIndex: number): string {
  const n = lastCol.length;
  // `first` column is just the sorted last column
  const first = lastCol.split('').sort().join('');

  // Build the LF‑mapping: for every position i in `last`
  // find the row in `first` that corresponds to the same
  // character and *occurrence* (i.e., the k‑th 'a' in last
  // maps to the k‑th 'a' in first).
  // We do that by counting occurrences.
  const occ: Array<Map<string, number>> = new Array(n);
  const count: Map<string, number> = new Map();
  for (let i = 0; i < n; i++) {
    const c = lastCol[i];
    const cCount = (count.get(c) ?? 0) + 1;
    count.set(c, cCount);
    occ[i] = new Map(count);
  }

  // Build `firstPos` – for each character, the 0‑based
  // index of its first occurrence in the sorted `first` column
  const firstPos: Map<string, number> = new Map();
  let sum = 0;
  for (const ch of [...new Set(first)].sort()) {
    firstPos.set(ch, sum);
    sum += first.split('').filter(c => c === ch).length;
  }

  // Reconstruct the original string char by char:
  // starting from `primaryIndex`, each step moves to the preceding
  // character (because of the LF mapping).
  const result: string[] = [];
  let pos = primaryIndex;
  for (let k = 0; k < n; k++) {
    const c = lastCol[pos];
    result.unshift(c); // prepend, since we traverse backwards
    const occIdx = occ[pos].get(c)!;              // occurrence rank
    // LF mapping: next position in `lastCol`
    pos = firstPos.get(c)! + occIdx - 1;
  }
  return result.join('');
}
const original = 'BANANA$';
const { lastColumn, primaryIndex } = bwt(original);
console.log('BWT:', lastColumn);          // → 'ANNB$AA'
console.log('Inv:', inverseBWT(lastColumn, primaryIndex)); // → 'BANANA$'
