/**
 * Binary search on a sorted array.
 *
 * @param arr   A sorted array that supports the supplied comparator.
 * @param target The value you’re searching for.
 * @param compare A comparison function: returns <0 if a<b, 0 if a===b, >0 if a>b.
 * @returns The index of `target` if found; otherwise –1.
 */
export function binarySearch<T>(
  arr: readonly T[],
  target: T,
  compare: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): number {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    // Use Math.floor to avoid overflow and keep mid an integer.
    const mid = low + Math.floor((high - low) / 2);
    const cmp = compare(arr[mid], target);

    if (cmp === 0) {
      return mid; // Found it!
    } else if (cmp < 0) {
      low = mid + 1; // Search right half
    } else {
      high = mid - 1; // Search left half
    }
  }

  return -1; // Not found
}
// Example with numbers
const nums = [3, 7, 12, 18, 25, 34];
const index = binarySearch(nums, 18); // → 3

// Example with strings – note we pass a custom comparator for case‑insensitive search
const words = ['apple', 'banana', 'cherry', 'date', 'fig'];
const idx = binarySearch(
  words,
  'CHeRry',
  (a, b) => a.localeCompare(b, undefined, { sensitivity: 'accent' })
); // → 2
