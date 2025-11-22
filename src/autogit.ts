/**
 * Radix sort (LSD, base-256) for positive 32-bit integers.
 * Time:  O(n · k)  (k = 4 bytes)
 * Space: O(n + 256)
 */
export function radixSort(arr: number[]): number[] {
  if (arr.length < 2) return arr.slice();          // already sorted or empty

  const output = arr.slice();                      // work on a copy
  const temp   = new Array<number>(arr.length);

  // Process 4 bytes (0..3) from least-significant to most-significant
  for (let shift = 0; shift < 32; shift += 8) {
    const count = new Uint32Array(256);              // 256 bins

    // 1. frequency
    for (const v of output) {
      count[(v >>> shift) & 0xFF]++;
    }

    // 2. prefix-sum (start index for each bin)
    let sum = 0;
    for (let i = 0; i < 256; ++i) {
      const c = count[i];
      count[i] = sum;
      sum += c;
    }

    // 3. stable scatter into temp
    for (const v of output) {
      const bucket = (v >>> shift) & 0xFF;
      temp[count[bucket]++] = v;
    }

    // 4. copy back for next digit
    output.set(temp);
  }
  return output;
}

/* ---------- small sanity check ---------- */
if (import.meta.vitest) {
  const { expect, test } = import.meta.vitest;
  test('radixSort', () => {
    const data = Array.from({ length: 1_000 }, () => Math.floor(Math.random() * 2 ** 31));
    const copy = [...data].sort((a, b) => a - b);
    expect(radixSort(data)).toEqual(copy);
  });
}
const nums = [170, 45, 75, 90, 2, 802, 2, 66];
console.log(radixSort(nums)); // [2, 2, 45, 66, 75, 90, 170, 802]
const mapped = arr.map(v => v + 0x8000_0000); // shift [-2³¹..2³¹-1] -> [0..2³²-1]
const sorted = radixSort(mapped).map(v => v - 0x8000_0000);
