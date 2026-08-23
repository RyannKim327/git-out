/**
 * A generic binary search.
 *
 * @param arr      Sorted array to search.
 * @param target   Value to locate.
 * @param compare  Optional comparator: (a, b) → negative, 0, positive.
 *                 If omitted, the default `<`/`>` operators are used.
 * @returns Index of `target` in `arr`, or `-1` if not found.
 */
export function binarySearch<T>(
  arr: readonly T[],
  target: T,
  compare?: (a: T, b: T) => number
): number {
  if (!arr.length) return -1;
  const cmp = compare ?? defaultCompare<T>;
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = (low + high) >>> 1;        // Integer mid – no float gymnastics
    const comp = cmp(arr[mid], target);
    if (comp === 0) return mid;
    if (comp < 0) low = mid + 1;           // target is greater
    else high = mid - 1;                  // target is smaller
  }

  return -1;
}

/** Recursive version – identical semantics. */
export function binarySearchRecursive<T>(
  arr: readonly T[],
  target: T,
  compare?: (a: T, b: T) => number,
  low = 0,
  high = arr.length - 1
): number {
  if (!arr.length || low > high) return -1;
  const cmp = compare ?? defaultCompare<T>;

  const mid = (low + high) >>> 1;
  const comp = cmp(arr[mid], target);

  if (comp === 0) return mid;
  if (comp < 0) return binarySearchRecursive(arr, target, compare, mid + 1, high);
  return binarySearchRecursive(arr, target, compare, low, mid - 1);
}

/** Fallback when you didn’t provide a comparator. */
function defaultCompare<T>(a: T, b: T): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}
const nums = [3, 7, 12, 18, 22, 33, 42];
console.log(binarySearch(nums, 18));           // 3
console.log(binarySearch(nums, 5));            // -1

// To search objects, supply a comparator:
const words = ['apple', 'banana', 'cherry'];
console.log(binarySearch(words, 'banana', (a, b) => a.localeCompare(b)));
