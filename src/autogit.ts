/**
 * Radix sort (LSD, base-256) for non-negative 32-bit integers.
 * @param arr  Array of numbers (0 … 2³²-1)
 * @returns    The same array instance, now sorted
 */
export function radixSort(arr: number[]): number[] {
  if (arr.length < 2) return arr;

  // 256 buckets per byte
  const bucket = new Array<number>(arr.length);
  const count  = new Array<number>(256);

  // Process bytes from least to most significant
  for (let shift = 0; shift < 32; shift += 8) {
    count.fill(0);

    // 1. Histogram
    for (const v of arr) count[(v >>> shift) & 0xFF]++;

    // 2. Prefix sum (start positions)
    let sum = 0;
    for (let i = 0; i < 256; ++i) {
      const c = count[i];
      count[i] = sum;
      sum += c;
    }

    // 3. Stable scatter into bucket
    for (const v of arr) {
      const idx = (v >>> shift) & 0xFF;
      bucket[count[idx]++] = v;
    }

    // 4. Copy back
    arr.set(bucket);
  }
  return arr;
}

/* ---------- small sanity check ---------- */
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it('sorts', () => {
    const data = Array.from({ length: 1_000_000 }, () => Math.floor(Math.random() * 2 ** 32));
    const copy = [...data];
    radixSort(data);
    copy.sort((a, b) => a - b);
    expect(data).toEqual(copy);
  });
}
const nums = [170, 45, 75, 90, 2, 802, 2, 66];
radixSort(nums);
console.log(nums); // [2, 2, 45, 66, 75, 90, 170, 802]
