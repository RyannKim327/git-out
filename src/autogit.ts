/**
 * Binary search in a sorted array.
 * Returns the index of `target` if found, otherwise `-1`.
 * Works for any array whose elements can be ordered (`<`, `>`, `===`).
 *
 * @param arr    Sorted array (ascending order).
 * @param target Value to locate.
 * @param compare Optional custom comparator: (a, b) => number
 *                Should return <0 if a < b, >0 if a > b, 0 if equal.
 *                Defaults to numeric/string comparison.
 */
export function binarySearch<T>(
  arr: readonly T[],
  target: T,
  compare: (a: T, b: T) => number = defaultCompare
): number {
  let lo = 0;
  let hi = arr.length - 1;

  while (lo <= hi) {
    // Use bit-shift to avoid potential overflow in other languages
    const mid = lo + ((hi - lo) >> 1);
    const cmp = compare(arr[mid], target);

    if (cmp === 0) return mid;
    if (cmp < 0) {
      lo = mid + 1; // mid too small, search right half
    } else {
      hi = mid - 1; // mid too large, search left half
    }
  }
  return -1; // not found
}

/* ---------- Recursive variant (identical behaviour) ---------- */
export function binarySearchRecursive<T>(
  arr: readonly T[],
  target: T,
  compare: (a: T, b: T) => number = defaultCompare,
  lo = 0,
  hi = arr.length - 1
): number {
  if (lo > hi) return -1;

  const mid = lo + ((hi - lo) >> 1);
  const cmp = compare(arr[mid], target);

  if (cmp === 0) return mid;
  return cmp < 0
    ? binarySearchRecursive(arr, target, compare, mid + 1, hi)
    : binarySearchRecursive(arr, target, compare, lo, mid - 1);
}

/* ---------- Helper ---------- */
function defaultCompare<T>(a: T, b: T): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

/* ---------- Quick sanity check ---------- */
if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test('binarySearch', () => {
    const nums = [-10, -3, 0, 2, 4, 7, 9, 34, 50];
    expect(binarySearch(nums, 7)).toBe(5);
    expect(binarySearch(nums, 1)).toBe(-1);
    expect(binarySearch([], 42)).toBe(-1);
  });
}
const words = ['apple', 'banana', 'cherry', 'date'];
console.log(binarySearch(words, 'cherry')); // 2
console.log(binarySearch(words, 'apricot')); // -1

// Custom comparator (case-insensitive)
const cmpCI = (a: string, b: string) => defaultCompare(a.toLowerCase(), b.toLowerCase());
console.log(binarySearch(words, 'BANANA', cmpCI)); // 1
