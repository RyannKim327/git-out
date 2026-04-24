/**
 * Counting sort for an array of integers.
 *
 * @param arr – array of numbers (integers) to sort
 * @returns a new array containing the same numbers in ascending order
 */
export function countingSort(arr: number[]): number[] {
  // nothing to sort
  if (arr.length <= 1) return [...arr];

  // 1. locate the min/max so we know how big the count array must be
  let min = arr[0];
  let max = arr[0];

  for (let i = 1; i < arr.length; i++) {
    const v = arr[i];
    if (v < min) min = v;
    if (v > max) max = v;
  }

  // 2. build the frequency table
  // offset shifts the negative values to positive indices
  const offset = -min;                     // e.g. min = -3 → offset = 3
  const size   = max - min + 1;            // number of distinct keys
  const count  = new Array<number>(size).fill(0);

  for (const v of arr) {
    count[v + offset]++;
  }

  // 3. reconstruct the sorted array
  const out: number[] = new Array(arr.length);
  let writeIdx = 0;

  for (let i = 0; i < size; i++) {
    const qty = count[i];
    if (qty === 0) continue;

    const value = i - offset;   // bring back to original key
    for (let j = 0; j < qty; j++) {
      out[writeIdx++] = value;
    }
  }

  return out;
}
import { countingSort } from './countingSort';

const unsorted = [23, -5, 1, 0, 5, -5, 23, 12];
const sorted   = countingSort(unsorted);

console.log(sorted); // [-5, -5, 0, 1, 5, 12, 23, 23]
