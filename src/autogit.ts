/**
 * Radix-sort an array of non-negative 32-bit integers.
 *  - stable
 *  - O(n · k) time, O(n) extra space
 *  - mutates the original array (pass a slice if you need to keep the original)
 */
export function radixSort(arr: number[]): number[] {
  if (arr.length < 2) return arr;

  // 1. Find maximum value to know how many passes we need
  let max = 0;
  for (const v of arr) if (v > max) max = v;

  // 2. LSD radix sort, base 256 (one byte per pass)
  const base = 256;
  const output = new Uint32Array(arr.length); // temporary buffer
  const count  = new Uint32Array(base);      // counting array

  for (let shift = 0; max >> (shift * 8) > 0; shift += 1) {
    // 2a. Reset counters
    count.fill(0);

    // 2b. Frequency histogram
    for (let i = 0; i < arr.length; ++i) {
      const digit = (arr[i] >>> (shift * 8)) & 0xff;
      count[digit]++;
    }

    // 2c. Prefix sum → positions
    let total = 0;
    for (let i = 0; i < base; ++i) {
      const old = count[i];
      count[i] = total;
      total += old;
    }

    // 2d. Stable scatter into output
    for (let i = 0; i < arr.length; ++i) {
      const digit = (arr[i] >>> (shift * 8)) & 0xff;
      output[count[digit]++] = arr[i];
    }

    // 2e. Copy back for next pass
    arr.set(output);
  }
  return arr;
}

/* ---------- quick demo ---------- */
if (require.main === module) {
  const data = Array.from({ length: 20 }, () => Math.floor(Math.random() * 1_000_000));
  console.log('original:', data);
  radixSort(data);
  console.log('sorted  :', data);
}
