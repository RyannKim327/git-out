/**
 * Stable counting sort for integers.
 *
 * @param  values The array of numbers to sort (integers only).
 * @return        A new sorted array.
 */
function countingSort(values: number[]): number[] {
  if (values.length === 0) return [];

  // ---------- 1. find min & max ----------
  let min = values[0];
  let max = values[0];
  for (let i = 1; i < values.length; i++) {
    const v = values[i];
    if (v < min) min = v;
    if (v > max) max = v;
  }

  // ---------- 2. count frequencies ----------
  const range = max - min + 1;          // number of distinct values
  const counts = new Array<number>(range).fill(0);

  for (const v of values) {
    counts[v - min]++;                  // shift so that the smallest value maps to index 0
  }

  // ---------- 3. prefix sums (running totals) ----------
  const positions = new Array<number>(range).fill(0);
  let sum = 0;
  for (let i = 0; i < range; i++) {
    sum += counts[i];
    positions[i] = sum;                 // positions[i] holds the index after the last element for value (min + i)
  }

  // ---------- 4. build the sorted output ----------
  const result = new Array<number>(values.length);
  // Walk the original array **backwards** to keep stability
  for (let i = values.length - 1; i >= 0; i--) {
    const v = values[i];
    const posIndex = v - min;
    positions[posIndex]--;               // get the correct position for this element
    result[positions[posIndex]] = v;
  }

  return result;
}
const unsorted = [5, -1, 7, 5, 3, -1, 2, 8];
const sorted = countingSort(unsorted);
console.log(sorted); // [-1, -1, 2, 3, 5, 5, 7, 8]
