/**
 * Radix sort for 32‑bit unsigned integers.
 * Sorts in place and returns the sorted array for convenience.
 */
export function radixSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;          // already sorted

  // Pick a base that gives a nice trade‑off between passes and bucket size.
  // Base 256 (8 bits per pass) lets us use a Uint32Array for buckets.
  const base = 256;
  const maxBit = 32; // 32 bits for a signed int, but we only store positives here

  // Number of passes, one per byte in this case.
  const passes = maxBit / 8;

  // Temporary array for intermediate results.
  const temp = new Array<number>(arr.length);

  // Helper: counts how many numbers have a certain digit value at a given byte.
  const count = new Uint32Array(base);

  for (let pass = 0; pass < passes; ++pass) {
    // Reset counts.
    count.fill(0);

    // Count occurrences of each bucket value.
    const shift = pass * 8;
    for (const n of arr) {
      const bucket = (n >> shift) & 0xff;
      count[bucket]++;
    }

    // Compute cumulative counts => start indices in `temp`.
    const startIdx = new Uint32Array(base);
    let sum = 0;
    for (let i = 0; i < base; ++i) {
      startIdx[i] = sum;
      sum += count[i];
    }

    // Place numbers into the correct bucket order.
    for (const n of arr) {
      const bucket = (n >> shift) & 0xff;
      const idx = startIdx[bucket]++;
      temp[idx] = n;
    }

    // Swap the source and destination for the next round.
    [arr, temp] = [temp, arr];
  }

  // After an even number of passes `arr` points to original input; the sorted
  // result ends up in `arr`. If passes were odd, the sorted array will be in `temp`.
  // Ensure we return the sorted array reference.
  return arr.length === sizeOfInput ? arr : temp;
}

/** Quick tests */
const unsorted = [170, 45, 75, 90, 802, 24, 2, 66];
console.log('unsorted:', unsorted);
console.log('sorted:  ', radixSort([...unsorted])); // use spread to leave original intact
