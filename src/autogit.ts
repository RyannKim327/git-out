/**
 * Radix sort (LSD, base 256) for non-negative 32-bit integers.
 * Runs in O(n) time and O(n) extra space.
 */
export function radixSort(arr: number[]): number[] {
  if (arr.length < 2) return arr.slice();          // already sorted or empty

  const buffer = new Uint32Array(arr.length);        // working copy
  const counts   = new Uint32Array(256);             // frequency histogram
  const offsets  = new Uint32Array(256);             // start positions

  // 4 passes, one per byte (LSB → MSB)
  for (let shift = 0; shift < 32; shift += 8) {
    counts.fill(0);

    // 1. histogram
    for (let i = 0; i < arr.length; ++i) {
      const byte = (arr[i] >>> shift) & 0xFF;
      ++counts[byte];
    }

    // 2. prefix sum → offsets
    let sum = 0;
    for (let i = 0; i < 256; ++i) {
      offsets[i] = sum;
      sum += counts[i];
    }

    // 3. stable scatter into buffer
    for (let i = 0; i < arr.length; ++i) {
      const byte = (arr[i] >>> shift) & 0xFF;
      buffer[offsets[byte]++] = arr[i];
    }

    // 4. copy back for next pass
    buffer.set(arr);
  }
  return Array.from(buffer);
}

/* ---------- quick sanity check ---------- */
if (import.meta.vitest) {
  const { expect, test } = import.meta.vitest;
  test('radixSort', () => {
    const data = [170, 45, 75, 90, 2, 802, 2, 66];
    expect(radixSort(data)).toStrictEqual([2, 2, 45, 66, 75, 90, 170, 802]);
  });
}
const nums = [3, 1000000, 7, 1, 999999];
const sorted = radixSort(nums);
console.log(sorted); // [1, 3, 7, 999999, 1000000]
const KEY = 0x80000000;
const adjusted = arr.map(v => (v ^ KEY) >>> 0); // convert to unsigned
const sorted = radixSort(adjusted).map(v => (v ^ KEY) >> 0); // restore sign
