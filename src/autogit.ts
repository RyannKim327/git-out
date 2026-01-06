/**
 * Radix sort for non-negative 32-bit integers.
 * Time: O(n * 4) ≈ O(n)   |   Space: O(n + 256)
 * @param arr input array (is NOT mutated; a new sorted array is returned)
 */
export function radixSort(arr: number[]): number[] {
  if (arr.length < 2) return arr.slice();     // already sorted or empty

  const output = arr.slice();                   // copy to avoid mutation
  const temp   = new Array<number>(arr.length);   // workspace for each pass
  const count  = new Uint32Array(256);          // 8-bit counters

  for (let shift = 0; shift < 32; shift += 8) { // 4 passes: 0-7, 8-15, 16-23, 24-31
    count.fill(0);

    // 1. count frequencies
    for (const v of output) count[(v >>> shift) & 0xFF]++;

    // 2. convert counts to starting indices
    for (let i = 1; i < 256; i++) count[i] += count[i - 1];

    // 3. stable placement into temp
    for (let i = output.length - 1; i >= 0; i--) {
      const byte = (output[i] >>> shift) & 0xFF;
      temp[--count[byte]] = output[i];
    }

    // 4. copy back for next pass
    output.set(temp);
  }
  return output;
}

/* ---------- small sanity check ---------- */
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it('sorts random non-negative integers', () => {
    const data = Array.from({ length: 1_000 }, () => Math.floor(Math.random() * 2 ** 31));
    const sorted = radixSort(data);
    expect(sorted).toStrictEqual([...data].sort((a, b) => a - b));
  });
}
const nums = [170, 45, 75, 90, 2, 802, 2, 66];
console.log(radixSort(nums)); // [2, 2, 45, 66, 75, 90, 170, 802]
