/**
 * Iterative binary search.
 * @param arr Sorted array of numbers
 * @param target Value to find
 * @returns Index of target or -1 if not found
 */
function binarySearch(arr: number[], target: number): number {
  let lo = 0;
  let hi = arr.length - 1;

  while (lo <= hi) {
    // Same as Math.floor((lo + hi) / 2) but avoids overflow
    const mid = lo + ((hi - lo) >> 1);
    const val = arr[mid];

    if (val === target) return mid;
    if (val < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}

/**
 * Recursive binary search (tail-recursive, but JS/TS engines don’t optimize it).
 */
function binarySearchRecursive(
  arr: number[],
  target: number,
  lo = 0,
  hi = arr.length - 1
): number {
  if (lo > hi) return -1;

  const mid = lo + ((hi - lo) >> 1);
  const val = arr[mid];

  if (val === target) return mid;
  return val < target
    ? binarySearchRecursive(arr, target, mid + 1, hi)
    : binarySearchRecursive(arr, target, lo, mid - 1);
}

/* ---------- Usage ---------- */
const nums = [2, 4, 7, 10, 15, 23, 38];
console.log(binarySearch(nums, 15)); // → 4
console.log(binarySearchRecursive(nums, 4)); // → 1
function binarySearchGeneric<T>(
  arr: T[],
  target: T,
  compare: (a: T, b: T) => number
): number { ... }
