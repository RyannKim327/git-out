/**
 * Radix sort (LSD, base 256) for non-negative 32-bit integers.
 * Time-complexity:  O(n)  – exactly 4 passes for 32-bit numbers.
 * Space-complexity: O(n) – two auxiliary arrays of length n.
 */
export function radixSort(arr: number[]): number[] {
  if (arr.length < 2) return arr.slice();

  const n = arr.length;
  const output = new Uint32Array(n);
  const count = new Uint32Array(256);

  // 4 passes, one per byte (least-significant byte first)
  for (let shift = 0; shift < 32; shift += 8) {
    count.fill(0);

    // 1. frequency histogram
    for (let i = 0; i < n; i++) {
      const byte = (arr[i] >>> shift) & 0xFF;
      count[byte]++;
    }

    // 2. prefix sum -> positions
    let sum = 0;
    for (let i = 0; i < 256; i++) {
      const c = count[i];
      count[i] = sum;
      sum += c;
    }

    // 3. stable move to output
    for (let i = 0; i < n; i++) {
      const byte = (arr[i] >>> shift) & 0xFF;
      output[count[byte]++] = arr[i];
    }

    // 4. copy back for next pass
    for (let i = 0; i < n; i++) arr[i] = output[i];
  }

  return arr;
}

/* ---------- small sanity check ---------- */
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it('sorts', () => {
    const data = [170, 45, 75, 90, 2, 802, 2, 66, 999_999, 0];
    expect(radixSort(data)).toStrictEqual([0, 2, 2, 45, 66, 75, 90, 170, 802, 999_999]);
  });
}
const nums = [3, 1000000, 7, 1, 0, 42];
const sorted = radixSort(nums);
console.log(sorted); // [0, 1, 3, 7, 42, 1000000]
