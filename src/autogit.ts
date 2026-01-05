/**
 * Binary Search – Iterative
 * Returns the index of `target` in the sorted `arr`, or -1 if not found.
 * Time: O(log n), Space: O(1)
 */
function binarySearchIterative<T>(
  arr: readonly T[],
  target: T,
  compare: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): number {
  let lo = 0;
  let hi = arr.length - 1;

  while (lo <= hi) {
    // lo + ((hi - lo) >> 1) avoids potential overflow
    const mid = lo + ((hi - lo) >> 1);
    const cmp = compare(arr[mid], target);

    if (cmp === 0) return mid;
    else if (cmp < 0) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}

/**
 * Binary Search – Recursive
 * Same API as above, but implemented recursively.
 * Time: O(log n), Space: O(log n) call-stack
 */
function binarySearchRecursive<T>(
  arr: readonly T[],
  target: T,
  compare: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0),
  lo = 0,
  hi = arr.length - 1
): number {
  if (lo > hi) return -1;

  const mid = lo + ((hi - lo) >> 1);
  const cmp = compare(arr[mid], target);

  if (cmp === 0) return mid;
  if (cmp < 0) return binarySearchRecursive(arr, target, compare, mid + 1, hi);
  return binarySearchRecursive(arr, target, compare, lo, mid - 1);
}

/* ---------- Usage ---------- */
const nums = [2, 4, 7, 10, 15, 23, 38];
console.log(binarySearchIterative(nums, 15)); // → 4
console.log(binarySearchRecursive(nums, 7));  // → 2
console.log(binarySearchIterative(nums, 5));    // → -1

/* With custom comparator (descending order array) */
const desc = [90, 80, 70, 60, 50];
console.log(binarySearchIterative(desc, 60, (a, b) => b - a)); // → 3
