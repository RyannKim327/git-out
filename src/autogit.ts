/**
 * Binary search on a sorted array.
 *
 * @param arr     Sorted array to search
 * @param target  Value to find
 * @param lessThan Comparator that returns true if  a < b
 * @returns Index of the target or -1 if not found
 */
export function binarySearch<T>(
  arr: readonly T[],
  target: T,
  lessThan: (a: T, b: T) => boolean
): number {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    // middle index – use bit‑shifting to avoid overflow
    const mid = (low + high) >> 1;
    const midVal = arr[mid];

    if (lessThan(target, midVal)) {
      high = mid - 1; // target is in the left half
    } else if (lessThan(midVal, target)) {
      low = mid + 1; // target is in the right half
    } else {
      return mid; // found
    }
  }

  return -1; // not found
}
const nums = [1, 3, 5, 7, 9, 11];

// simple number comparison
const index = binarySearch(nums, 7, (a, b) => a < b);
console.log(index); // 3

// with strings
const words = ['apple', 'banana', 'cherry', 'date'];
const idx = binarySearch(words, 'cherry', (a, b) => a < b);
console.log(idx); // 2
