/**
 * Binary search on a sorted array.
 * Returns the index of `target` if found, otherwise `-1`.
 * Time-complexity:  O(log n)
 * Space-complexity: O(1)  (iterative)  |  O(log n)  (recursive)
 */
export function binarySearchIterative<T>(
  arr: readonly T[],
  target: T,
  compare: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): number {
  let lo = 0;
  let hi = arr.length - 1;

  while (lo <= hi) {
    // Faster than (lo+hi)/2; avoids overflow in other languages
    const mid = Math.trunc(lo + (hi - lo) / 2);
    const cmp = compare(arr[mid], target);

    if (cmp === 0) return mid;
    else if (cmp < 0) lo = mid + 1; // right half
    else hi = mid - 1;            // left half
  }
  return -1; // not found
}

// ----------------------------------------------------------
// Recursive flavour (same contract)
// ----------------------------------------------------------
export function binarySearchRecursive<T>(
  arr: readonly T[],
  target: T,
  compare: (a: T, b) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0),
  lo = 0,
  hi = arr.length - 1
): number {
  if (lo > hi) return -1;

  const mid = Math.trunc(lo + (hi - lo) / 2);
  const cmp = compare(arr[mid], target);

  if (cmp === 0) return mid;
  if (cmp < 0) return binarySearchRecursive(arr, target, compare, mid + 1, hi);
  return binarySearchRecursive(arr, target, compare, lo, mid - 1);
}

// ----------------------------------------------------------
// Usage
// ----------------------------------------------------------
if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;

  test('binary search on numbers', () => {
    const nums = [-10, -3, 0, 5, 9, 12, 42];
    expect(binarySearchIterative(nums, 9)).toBe(4);
    expect(binarySearchIterative(nums, 2)).toBe(-1);
  });

  test('binary search on strings', () => {
    const words = ['apple', 'banana', 'kiwi', 'pear'];
    expect(binarySearchRecursive(words, 'kiwi')).toBe(2);
    expect(binarySearchRecursive(words, 'orange')).toBe(-1);
  });

  test('custom comparator (descending order)', () => {
    const desc = [100, 90, 80, 70, 60];
    const cmp = (a: number, b: number) => b - a; // reversed
    expect(binarySearchIterative(desc, 80, cmp)).toBe(2);
  });
}
