/**
 * Radix sort (LSD, base 256) for non-negative 32-bit integers.
 * Time complexity:  O(n)  – effectively linear for practical input sizes.
 * Space complexity: O(n + 256)  – two auxiliary arrays of length n plus 256 counters.
 */
export function radixSort(arr: number[]): number[] {
  if (arr.length < 2) return arr.slice();          // already sorted or empty

  const len = arr.length;
  const output = new Array<number>(len);

  // 256-way buckets give us exactly 4 passes for 32-bit numbers
  const byteMask = 0xff;
  const bitsPerByte = 8;

  for (let shift = 0; shift < 32; shift += bitsPerByte) {
    // 1. Count frequencies
    const count = new Uint32Array(256);
    for (let i = 0; i < len; i++) {
      const byte = (arr[i] >>> shift) & byteMask;
      count[byte]++;
    }

    // 2. Convert counts to cumulative indices
    for (let i = 1; i < 256; i++) count[i] += count[i - 1];

    // 3. Stable scatter into output
    for (let i = len - 1; i >= 0; i--) {
      const byte = (arr[i] >>> shift) & byteMask;
      output[--count[byte]] = arr[i];
    }

    // 4. Swap roles of arr and output for next pass
    [arr, output] = [output, arr];
  }

  return arr;
}

/* ---------- Quick sanity check ---------- */
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it('radixSort', () => {
    const data = [170, 45, 75, 90, 2, 802, 2, 66];
    const sorted = radixSort(data);
    expect(sorted).toEqual([2, 2, 45, 66, 75, 90, 170, 802]);
  });
}
const nums = [3, 1_000_000, 42, 0, 9999];
const sorted = radixSort(nums);
console.log(sorted); // [0, 42, 9999, 1000000]
export function radixSortSigned(arr: number[]): number[] {
  const biased = arr.map(n => n + 0x80000000 >>> 0); // >>> 0 forces unsigned 32-bit
  const sorted = radixSort(biased);
  return sorted.map(n => (n - 0x80000000) >> 0);   // >> 0 restores signed 32-bit
}
