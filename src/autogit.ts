/**
 * Sort an array of non‑negative integers using counting sort.
 *
 * @param arr   The array of numbers to sort.
 * @param maxVal   The maximum possible value in `arr` (inclusive).
 * @returns A new sorted array.
 */
function countingSort(arr: number[], maxVal: number): number[] {
  // 1. Count occurrences
  const count = new Array(maxVal + 1).fill(0);
  for (const v of arr) count[v]++;

  // 2. Build the output
  const result: number[] = [];
  for (let val = 0; val <= maxVal; val++) {
    const occurrences = count[val];
    if (occurrences > 0) {
      // push `occurrences` copies of `val`
      for (let i = 0; i < occurrences; i++) result.push(val);
    }
  }
  return result;
}
const unsorted = [12, 4, 2, 99, 0, 5];
const sorted = countingSort(unsorted, 99);
console.log(sorted); // [0, 2, 4, 5, 12, 99]
/**
 * Sort an array of integers (positive, zero, or negative) using counting sort.
 *
 * @param arr The array of numbers to sort.
 * @returns A new sorted array.
 */
function countingSortExtended(arr: number[]): number[] {
  if (arr.length === 0) return [];

  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const shift = -min;                     // number of places to shift everything

  const countSize = max + shift + 1;      // inclusive range after shift
  const count: number[] = new Array(countSize).fill(0);

  // 1. Count occurrences (with shift)
  for (const v of arr) count[v + shift]++;

  // 2. Build the output, turning the index back into a real value
  const result: number[] = [];
  for (let i = 0; i < countSize; i++) {
    const occurrences = count[i];
    if (occurrences > 0) {
      const realValue = i + min;          // undo the shift
      for (let j = 0; j < occurrences; j++) result.push(realValue);
    }
  }
  return result;
}
const arr = [7, -3, 0, 5, -1, 7];
const sorted = countingSortExtended(arr);
console.log(sorted); // [-3, -1, 0, 5, 7, 7]
