/**
 * Recursively searches for `target` in a sorted numeric array.
 *
 * @param arr    The sorted array to search.
 * @param target The value we’re looking for.
 * @param low    The lower bound index for the current search window.
 * @param high   The upper bound index for the current search window.
 * @returns The index of `target` in `arr`, or -1 if it’s absent.
 */
function binarySearchRec(
  arr: number[],
  target: number,
  low: number = 0,
  high: number = arr.length - 1
): number {
  // Base case: window collapsed → not found.
  if (low > high) return -1;

  const mid = Math.floor((low + high) / 2);
  const midVal = arr[mid];

  if (midVal === target) return mid;           // Found!
  if (midVal < target)
    return binarySearchRec(arr, target, mid + 1, high); // Search right half
  else
    return binarySearchRec(arr, target, low, mid - 1);  // Search left half
}
const sorted = [1, 4, 7, 9, 12, 18, 25];

console.log(binarySearchRec(sorted, 9));  // → 3
console.log(binarySearchRec(sorted, 5));  // → -1 (not present)
function binarySearchRecGeneric<T>(
  arr: T[],
  target: T,
  compare: (a: T, b: T) => number,  // Returns <0, 0, >0
  low = 0,
  high = arr.length - 1
): number {
  if (low > high) return -1;

  const mid = Math.floor((low + high) / 2);
  const cmp = compare(arr[mid], target);

  if (cmp === 0) return mid;
  if (cmp < 0)   return binarySearchRecGeneric(arr, target, compare, mid + 1, high);
  return binarySearchRecGeneric(arr, target, compare, low, mid - 1);
}
const names = ['Alice', 'Bob', 'Charlie', 'Diana'];
const idx = binarySearchRecGeneric(
  names,
  'Charlie',
  (a, b) => a.localeCompare(b)   // Comparator
);
console.log(idx); // → 2
