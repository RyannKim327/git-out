/**
 * Performs an interpolation search on a strictly‑increasing array of numbers.
 * @param arr   The sorted array (ascending).  Values must be finite numbers.
 * @param key   The value you’re looking for.
 * @returns The index of `key` in `arr`, or ‑1 if it isn’t present.
 */
export function interpolationSearch(arr: readonly number[], key: number): number {
  if (arr.length === 0) return -1;

  let low = 0;
  let high = arr.length - 1;

  // If the target is outside the range, we can bail early.
  if (key < arr[low] || key > arr[high]) return -1;

  while (low <= high && arr[low] !== arr[high]) {
    // Estimate the likely position: a weighted average.
    const pos = low + Math.floor(
      ((high - low) * (key - arr[low])) / (arr[high] - arr[low])
    );

    // Safety: clamp to array bounds.
    if (pos < low)   return -1;
    if (pos > high)  return -1;

    const val = arr[pos];

    if (val === key) return pos;
    if (val < key)   low = pos + 1;
    else             high = pos - 1;
  }

  // Final check if low might still hold the key.
  return (arr[low] === key) ? low : -1;
}
const nums = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30];
const idx = interpolationSearch(nums, 18); // 5
console.log(idx); // prints 5
