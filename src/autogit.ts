/**
 * Forward Burrows‑Wheeler Transform.
 *
 * @param text – input string
 * @returns {lastColumn, originalIndex}
 *   • lastColumn  – the BWT string (the last column of the sorted rotations)
 *   • originalIndex – position of the original string in the sorted list
 */
export function bwt(text: string): { lastColumn: string; originalIndex: number } {
  const n = text.length;
  const rotations = new Array<string>(n);

  // Build all cyclic rotations
  for (let i = 0; i < n; i++) {
    rotations[i] = text.slice(i) + text.slice(0, i);
  }

  // Sort rotations lexicographically
  rotations.sort();

  // Grab last character of each rotation and remember where the original text ended up
  let lastColumn = '';
  let originalIndex = -1;
  for (let i = 0; i < n; i++) {
    const rot = rotations[i];
    lastColumn += rot[rot.length - 1];
    if (rot === text) originalIndex = i;
  }

  return { lastColumn, originalIndex };
}

/**
 * Inverse Burrows‑Wheeler Transform.
 *
 * @param lastColumn  – BWT string (result of the forward transform)
 * @param originalIndex – index returned by the forward transform
 * @returns original input string
 */
export function inverseBwt(lastColumn: string, originalIndex: number): string {
  const n = lastColumn.length;

  // Build the first column by sorting the last column
  const firstColumn = [...lastColumn].sort().join('');

  // Build a map from character to its deque of positions in the last column
  const charQueues: Record<string, number[]> = {};
  for (let i = 0; i < n; i++) {
    const c = lastColumn[i];
    if (!charQueues[c]) charQueues[c] = [];
    charQueues[c].push(i);
  }

  // Reconstruct the original string
  let result = '';
  let idx = originalIndex;
  for (let i = 0; i < n; i++) {
    const c = firstColumn[idx];
    result += c;
    // The row that had c in the last column is the next idx
    idx = charQueues[c].shift()!;
  }

  return result;
}
const { lastColumn, originalIndex } = bwt('BANANA');
console.log(lastColumn);          // 'ANNBAA'
console.log(originalIndex);       // 3

const original = inverseBwt(lastColumn, originalIndex);
console.log(original);            // 'BANANA'
