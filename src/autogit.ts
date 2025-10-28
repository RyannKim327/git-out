/**
 * Radix sort (LSD, base 256) – ascending order
 * Time:  O(n)  (each pass is O(n) and we do 4 passes)
 * Space: O(n)  (one temp buffer the same size as input)
 */
export function radixSort(arr: number[]): number[] {
  if (arr.length < 2) return arr.slice();   // already sorted or empty

  const buffer = new Uint32Array(arr.length);
  const counts = new Uint32Array(256);      // 0..255 counters
  let source = new Uint32Array(arr);      // work on a copy

  // 4 passes = 4 bytes of a 32-bit int
  for (let shift = 0; shift < 32; shift += 8) {
    counts.fill(0);

    // 1. histogram
    for (let i = 0; i < source.length; i++) {
      const byte = (source[i] >>> shift) & 0xFF;
      counts[byte]++;
    }

    // 2. prefix sum → gives starting index for each bucket
    let sum = 0;
    for (let i = 0; i < 256; i++) {
      const c = counts[i];
      counts[i] = sum;
      sum += c;
    }

    // 3. stable scatter into buffer
    for (let i = 0; i < source.length; i++) {
      const byte = (source[i] >>> shift) & 0xFF;
      buffer[counts[byte]++] = source[i];
    }

    // 4. swap roles
    [source, buffer] = [buffer, source];
  }
  return Array.from(source);
}

/* ---------- quick sanity check ---------- */
if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test('radixSort', () => {
    const data = [170, 45, 75, 90, 2, 802, 2, 66];
    expect(radixSort(data)).toStrictEqual([2, 2, 45, 66, 75, 90, 170, 802]);
  });
}
const nums = [9, 1_000_000, 3, 255, 256];
console.log(radixSort(nums)); // [3, 9, 255, 256, 1000000]
const mapped = arr.map(n => (n >>> 0) ^ 0x80000000);
const sorted = radixSort(mapped);
const restored = sorted.map(n => ((n ^ 0x80000000) >> 0) - 0x80000000);
