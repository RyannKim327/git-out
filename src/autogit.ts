/**
 * Counting sort (ascending) for an array of non-negative integers.
 * Time  : O(n + k)   (k = maxValue - minValue + 1)
 * Memory: O(n + k)
 *
 * @param arr  array to sort (is overwritten)
 * @param radix  0-based maximum value that can appear in arr
 */
function countingSort(arr: number[], maxValue: number): void {
  const n = arr.length;
  if (n === 0) return;

  // 1. Frequency histogram
  const freq = new Uint32Array(maxValue + 1);
  for (const v of arr) freq[v]++;

  // 2. Prefix sum -> positions
  for (let i = 1; i <= maxValue; ++i) freq[i] += freq[i - 1];

  // 3. Stable write into output
  const out = new Uint32Array(n);
  for (let i = n - 1; i >= 0; --i) {
    const v = arr[i];
    out[--freq[v]] = v;
  }

  // 4. Copy back
  arr.set(out);
}

/* ---------- Convenience wrapper that handles negatives ---------- */

function countingSortFull(arr: number[]): void {
  if (arr.length === 0) return;

  let min = arr[0], max = arr[0];
  for (const v of arr) {
    if (v < min) min = v;
    else if (v > max) max = v;
  }

  const shift = -min;                 // move range to start at 0
  const shifted = arr.map(v => v + shift);
  countingSort(shifted, max - min);   // maxValue is now (max-min)

  // move values back
  for (let i = 0; i < arr.length; ++i) arr[i] = shifted[i] - shift;
}

/* -------------------------- Demo -------------------------- */

const data = [3, -1, 2, 3, 9, -5, 0, 2];
countingSortFull(data);
console.log(data);   // [-5, -1, 0, 2, 2, 3, 3, 9]
