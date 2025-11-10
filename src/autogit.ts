/**
 * Stable counting-sort for signed 32-bit integers.
 * Time  : O(n + k)   (k = max - min + 1)
 * Memory: O(n + k)
 * @param arr array to sort *in place*
 */
export function countingSort(arr: number[]): void {
  if (arr.length < 2) return;          // nothing to do

  // 1. Find range
  let min = arr[0];
  let max = arr[0];
  for (let i = 1; i < arr.length; ++i) {
    const v = arr[i];
    if (v < min) min = v;
    if (v > max) max = v;
  }

  const range = max - min + 1;
  if (range > 10_000_000) {
    throw new Error('Range too large for counting sort');
  }

  // 2. Frequency histogram
  const freq = new Int32Array(range);        // zero-initialised
  for (let i = 0; i < arr.length; ++i) {
    ++freq[arr[i] - min];
  }

  // 3. Transform freq -> start indices (inclusive prefix sum)
  let total = 0;
  for (let i = 0; i < range; ++i) {
    const old = freq[i];
    freq[i] = total;
    total += old;
  }

  // 4. Stable scatter into output
  const out = new Int32Array(arr.length);
  for (let i = 0; i < arr.length; ++i) {
    const v = arr[i];
    const pos = freq[v - min]++;
    out[pos] = v;
  }

  // 5. Copy back
  for (let i = 0; i < arr.length; ++i) {
    arr[i] = out[i];
  }
}

/* ------------------- small demo ------------------- */
if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test('counting sort', () => {
    const data = [3, -2, 3, 1, 9, -2, 0, 0, 3];
    countingSort(data);
    expect(data).toEqual([-2, -2, 0, 0, 1, 3, 3, 3, 9]);
  });
}
import { countingSort } from './countingSort';

const nums = [12, 4, -3, 4, 15, 0];
countingSort(nums);
console.log(nums); // [-3, 0, 4, 4, 12, 15]
