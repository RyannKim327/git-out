/**
 * Recursively searches a sorted array for a target value.
 *
 * @param arr  The sorted array (ascending order).
 * @param target  The value to find.
 * @param left  The left boundary of the current search window.
 * @param right The right boundary of the current search window.
 * @returns The index of the target, or -1 if it isn’t in the array.
 */
function binarySearch<T>(
  arr: T[],
  target: T,
  left: number = 0,
  right: number = arr.length - 1,
  comparator?: (a: T, b: T) => number
): number {
  // Base case: window collapsed -> not found
  if (left > right) return -1;

  // Midpoint (avoid overflow by using `left + ((right - left) >> 1)` if you like)
  const mid = Math.floor((left + right) / 2);

  // Resolve comparison logic
  const cmp = comparator
    ? comparator(target, arr[mid])
    : (target > arr[mid]) - (target < arr[mid]); // generic numeric/lexicographic

  if (cmp === 0) return mid;          // found
  if (cmp < 0) return binarySearch(arr, target, left, mid - 1, comparator);
  return binarySearch(arr, target, mid + 1, right, comparator);
}
const nums = [1, 3, 5, 7, 9, 11];

console.log(binarySearch(nums, 7));   // → 3
console.log(binarySearch(nums, 2));   // → -1
const names = ['Alice', 'Bob', 'Charlie', 'David'].sort();
console.log(binarySearch(names, 'bob', 0, names.length - 1, (a, b) =>
  a.toLowerCase().localeCompare(b.toLowerCase())
)); // → 1
