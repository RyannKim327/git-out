/**
 * Radix sort (LSD, base-256) for non-negative 32-bit integers.
 * Runs in O(n) time and O(n) extra space.
 * @param arr  Array of non-negative integers
 * @returns    New sorted array (original stays unchanged)
 */
export function radixSort(arr: number[]): number[] {
  if (arr.length < 2) return arr.slice();          // trivial case

  const output = arr.slice();                      // copy to avoid mutation
  const temp   = new Array<number>(output.length); // working buffer

  // Process 4 bytes (0xFF masks) per 32-bit number
  for (let shift = 0; shift < 32; shift += 8) {
    const count = new Uint32Array(256);              // byte histogram

    // 1. Count occurrences of each byte value
    for (let i = 0; i < output.length; i++) {
      const byte = (output[i] >>> shift) & 0xFF;   // unsigned right shift
      count[byte]++;
    }

    // 2. Convert counts to cumulative indices
    for (let i = 1; i < 256; i++) count[i] += count[i - 1];

    // 3. Stable scatter into temp
    for (let i = output.length - 1; i >= 0; i--) {
      const byte = (output[i] >>> shift) & 0xFF;
      temp[--count[byte]] = output[i];
    }

    // 4. Swap roles for next digit
    temp.forEach((v, i) => (output[i] = v));
  }
  return output;
}

/* ---------- small sanity check ---------- */
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it('radixSort', () => {
    const data = [170, 45, 75, 90, 2, 802, 2, 66, 99999];
    expect(radixSort(data)).toStrictEqual([2, 2, 45, 66, 75, 90, 170, 802, 99999]);
  });
}
import { radixSort } from './radixSort';

const nums = [3, 1000, 7, 1, 3, 0, 42];
const sorted = radixSort(nums);
console.log(sorted); // [0, 1, 3, 3, 7, 42, 1000]
