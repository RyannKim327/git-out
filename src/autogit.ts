/**
 * Binary search in a sorted array.
 * Returns the index of `target` if found; otherwise `-1`.
 * Time-complexity:  O(log n)
 * Space-complexity: O(1)  (iterative)
 */
export function binarySearch<T>(
  arr: readonly T[],
  target: T,
  compare: (a: T, b: T) => number = defaultCompare
): number {
  let lo = 0;
  let hi = arr.length - 1;

  while (lo <= hi) {
    // Same as (lo + hi) >>> 1, but avoids overflow
    const mid = Math.trunc(lo + (hi - lo) / 2);
    const cmp = compare(arr[mid], target);

    if (cmp === 0) return mid;
    else if (cmp < 0) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}

/** Recursive flavour (same API). */
export function binarySearchRecursive<T>(
  arr: readonly T[],
  target: T,
  compare: (a: T, b: T) => number = defaultCompare,
  lo = 0,
  hi = arr.length - 1
): number {
  if (lo > hi) return -1;

  const mid = Math.trunc(lo + (hi - lo) / 2);
  const cmp = compare(arr[mid], target);

  return cmp === 0
    ? mid
    : cmp < 0
    ? binarySearchRecursive(arr, target, compare, mid + 1, hi)
    : binarySearchRecursive(arr, target, compare, lo, mid - 1);
}

/* ---------- helpers ---------- */
function defaultCompare<T>(a: T, b: T): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

/* ---------- quick sanity check ---------- */
if (import.meta.vitest) {
  const { expect, test } = import.meta.vitest;
  test('binarySearch', () => {
    const nums = [2, 4, 7, 10, 15, 23, 38];
    expect(binarySearch(nums, 10)).toBe(3);
    expect(binarySearch(nums, 5)).toBe(-1);
    expect(binarySearch([], 1)).toBe(-1);

    const words = ['apple', 'banana', 'cherry'];
    expect(binarySearch(words, 'banana')).toBe(1);
  });
}
const data = [1, 3, 5, 7, 9];
console.log(binarySearch(data, 5)); // → 2
console.log(binarySearch(data, 4)); // → -1
