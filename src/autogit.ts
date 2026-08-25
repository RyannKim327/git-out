/**
 * Binary search for a sorted array of numbers.
 *
 * @param arr  The fully sorted array to search.
 * @param target  The value you’re looking for.
 * @param low  Index of the current lower bound (initially 0).
 * @param high Index of the current upper bound (initially arr.length – 1).
 * @returns The index of `target` if it exists; otherwise –1.
 */
function binarySearchRecursive(
  arr: number[],
  target: number,
  low = 0,
  high = arr.length - 1
): number {
  // Base condition – no more elements to inspect
  if (low > high) return -1;

  const mid = Math.floor((low + high) / 2);

  if (arr[mid] === target) {
    return mid;
  } else if (arr[mid] > target) {
    // Search left half
    return binarySearchRecursive(arr, target, low, mid - 1);
  } else {
    // Search right half
    return binarySearchRecursive(arr, target, mid + 1, high);
  }
}
const sorted = [1, 3, 5, 7, 9, 11, 13];

const idx = binarySearchRecursive(sorted, 7); // 3
const notFound = binarySearchRecursive(sorted, 2); // -1
function binarySearch<T>(
  arr: T[],
  target: T,
  compare: (a: T, b: T) => number, // negative if a < b, 0 if equal, positive if a > b
  low = 0,
  high = arr.length - 1
): number {
  if (low > high) return -1;

  const mid = Math.floor((low + high) / 2);
  const cmp = compare(arr[mid], target);

  if (cmp === 0) return mid;
  if (cmp > 0) return binarySearch(arr, target, compare, low, mid - 1);
  return binarySearch(arr, target, compare, mid + 1, high);
}
const words = ['apple', 'banana', 'cherry', 'date', 'fig'];

const idx = binarySearch(words, 'date', (a, b) => a.localeCompare(b)); // 3
