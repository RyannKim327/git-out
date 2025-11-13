/**
 * Radix sort (LSD, base-256) for non-negative 32-bit integers.
 * Runs in O(n) time and O(n) extra space.
 * @param arr  Array of numbers to sort (is mutated in place)
 * @returns    The same array, now sorted
 */
export function radixSort(arr: number[]): number[] {
  if (arr.length < 2) return arr;

  // Find longest number (in terms of byte length)
  let max = 0;
  for (const v of arr) if (v > max) max = v;

  // Process every byte (8 bits) of the 32-bit word, LSB → MSB
  for (let shift = 0; shift < 32; shift += 8) {
    // Stable counting sort on the current byte
    const count = new Uint32Array(256);      // 0..255
    const output = new Uint32Array(arr.length);

    // 1) frequency
    for (const v of arr) {
      const byte = (v >>> shift) & 0xff;
      count[byte]++;
    }
    // 2) prefix sums (starting positions)
    for (let i = 1; i < 256; i++) count[i] += count[i - 1];
    // 3) stable placement into output
    for (let i = arr.length - 1; i >= 0; i--) {
      const byte = (arr[i] >>> shift) & 0xff;
      output[--count[byte]] = arr[i];
    }
    // 4) copy back
    for (let i = 0; i < arr.length; i++) arr[i] = output[i];
  }
  return arr;
}

/* ---------- small sanity check ---------- */
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it('radixSort', () => {
    const data = [170, 45, 75, 90, 2, 802, 2, 99, 123456789, 0];
    radixSort(data);
    expect(data).toEqual([0, 2, 2, 45, 75, 90, 99, 170, 802, 123456789]);
  });
}
const nums = [3, 1000, 7, 1, 999999];
radixSort(nums);
console.log(nums); // [1, 3, 7, 1000, 999999]
