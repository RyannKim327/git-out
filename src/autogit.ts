/**
 * Binary search (iterative).
 * @param arr    Sorted array of numbers.
 * @param target Value to find.
 * @returns      Index of target, or -1 if not found.
 */
export function binarySearch(arr: number[], target: number): number {
  let lo = 0;
  let hi = arr.length - 1;

  while (lo <= hi) {
    // Same as (lo + hi) >>> 1, but avoids overflow
    const mid = lo + ((hi - lo) >> 1);
    const value = arr[mid];

    if (value === target) return mid;
    if (value < target) {
      lo = mid + 1;          // look right
    } else {
      hi = mid - 1;          // look left
    }
  }
  return -1;
}

/**
 * Binary search (recursive).
 */
export function binarySearchRecursive(
  arr: number[],
  target: number,
  lo = 0,
  hi = arr.length - 1
): number {
  if (lo > hi) return -1;

  const mid = lo + ((hi - lo) >> 1);
  const value = arr[mid];

  if (value === target) return mid;
  return value < target
    ? binarySearchRecursive(arr, target, mid + 1, hi)
    : binarySearchRecursive(arr, target, lo, mid - 1);
}

/* ---------- Demo ---------- */
if (require.main === module) {
  const data = [-10, -3, 0, 4, 7, 9, 15, 21];
  console.log(binarySearch(data, 7));  // → 4
  console.log(binarySearch(data, 2));  // → -1
}
