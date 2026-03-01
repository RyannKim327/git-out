/**
 * Counting sort for non‑negative integers in a known range.
 *
 * @param data Array of numbers to sort.
 * @param min  Minimum possible value in `data` (inclusive).
 * @param max  Maximum possible value in `data` (inclusive).
 * @returns    A new array containing the sorted numbers.
 *
 * Example:
 *   const unsorted = [3, 0, 2, 3, 1];
 *   const sorted = countingSort(unsorted, 0, 3); // [0,1,2,3,3]
 */
export function countingSort(data: number[], min: number, max: number): number[] {
  if (data.length === 0) return [];

  const range = max - min + 1;

  // 1. Count occurrences
  const count: number[] = new Array(range).fill(0);
  for (const v of data) {
    count[v - min]++;
  }

  // 2. Accumulate counts – now each count element holds the index
  //    where that value should be placed in the output array.
  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1];
  }

  // 3. Build the output array in a stable manner.
  const output: number[] = new Array(data.length);
  for (let i = data.length - 1; i >= 0; i--) {
    const v = data[i];
    const idx = --count[v - min];          // <-- decrement first
    output[idx] = v;
  }

  return output;
}
const unsorted = [5, 3, 0, 2, 5, 1];
const sorted = countingSort(unsorted, 0, 5);
console.log(sorted); // [0, 1, 2, 3, 5, 5]
