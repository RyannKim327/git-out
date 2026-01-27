/**
 * Binary search on a sorted array.
 *
 * @param arr   Sorted array of comparable items.
 * @param value Value to search for.
 * @returns Index of value, or -1 if not found.
 */
export function binarySearch<T>(arr: T[], value: T): number {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    // Middle index – floor division
    const mid = Math.floor((low + high) / 2);
    const midVal = arr[mid];

    if (midVal === value) return mid;      // exact match
    if (midVal < value) {
      low = mid + 1;                       // value is in higher half
    } else {
      high = mid - 1;                      // value is in lower half
    }
  }
  return -1;  // not found
}
const nums = [3, 7, 12, 18, 24, 31, 42];
const idx = binarySearch(nums, 18); // => 3
const missing = binarySearch(nums, 5); // => -1
