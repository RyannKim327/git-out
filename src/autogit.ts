/**
 * Radix sort (LSD, base 256) for positive 32-bit integers.
 * Time: O(n * 4) ≈ O(n)  |  Space: O(n + 256)
 */
export function radixSort(arr: number[]): number[] {
  if (arr.length < 2) return arr.slice();          // already sorted or empty

  const output = arr.slice();                       // work on a copy
  const temp   = new Array<number>(output.length);  // auxiliary buffer

  // 256 buckets => 8 bits per pass => 4 passes for 32 bits
  const counts = new Uint32Array(256);

  for (let shift = 0; shift < 32; shift += 8) {
    counts.fill(0);

    // 1. count frequencies
    for (const n of output) counts[(n >>> shift) & 0xFF]++;

    // 2. convert counts to starting indices
    let sum = 0;
    for (let i = 0; i < 256; i++) {
      const c = counts[i];
      counts[i] = sum;
      sum += c;
    }

    // 3. stable scatter into temp
    for (const n of output) {
      const bucket = (n >>> shift) & 0xFF;
      temp[counts[bucket]++] = n;
    }

    // 4. copy back for next pass
    output.set(temp);
  }
  return output;
}

/* ---------- quick sanity check ---------- */
if (import.meta.vitest) {
  const { expect, test } = import.meta.vitest;
  test('radixSort', () => {
    const data = Array.from({ length: 1_000 }, () => Math.floor(Math.random() * 2 ** 31));
    const copy = [...data];
    const sorted = radixSort(data);
    copy.sort((a, b) => a - b);
    expect(sorted).toEqual(copy);
  });
}
const nums = [170, 45, 75, 90, 2, 802, 2, 66];
console.log(radixSort(nums)); // [2, 2, 45, 66, 75, 90, 170, 802]
const MASK = 0x8000_0000;
function toUnsigned(n: number)  { return (n ^ MASK) >>> 0; }
function fromUnsigned(n: number) { return (n ^ MASK) >> 0; }

export function radixSortSigned(arr: number[]): number[] {
  const mapped = arr.map(toUnsigned);
  const sorted = radixSort(mapped);
  return sorted.map(fromUnsigned);
}
