/**
 * Iterative binary search.
 * Runs in O(log n) time and O(1) space.
 */
export function binarySearch(arr: number[], target: number): number {
  let lo = 0;
  let hi = arr.length - 1;

  while (lo <= hi) {
    // Same as (lo + hi) >>> 1, but avoids overflow
    const mid = lo + Math.floor((hi - lo) / 2);
    const value = arr[mid];

    if (value === target) return mid;
    if (value < target) {
      lo = mid + 1;        // Search right half
    } else {
      hi = mid - 1;        // Search left half
    }
  }
  return -1;               // Not found
}

/**
 * Recursive binary search (tail-recursive, but JS/TS
 * engines don’t guarantee TCO, so iterative is preferred).
 */
export function binarySearchRecursive(
  arr: number[],
  target: number,
  lo = 0,
  hi = arr.length - 1
): number {
  if (lo > hi) return -1;

  const mid = lo + Math.floor((hi - lo) / 2);
  const value = arr[mid];

  if (value === target) return mid;
  return value < target
    ? binarySearchRecursive(arr, target, mid + 1, hi)
    : binarySearchRecursive(arr, target, lo, mid - 1);
}

/* ---------- Usage example ---------- */
if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest;

  describe('binarySearch', () => {
    const data = [-10, -3, 0, 5, 9, 12, 42, 100];
    it('finds existing items', () => {
      expect(binarySearch(data, 9)).toBe(4);
      expect(binarySearch(data, -10)).toBe(0);
      expect(binarySearch(data, 100)).toBe(7);
    });
    it('returns -1 for missing items', () => {
      expect(binarySearch(data, 4)).toBe(-1);
      expect(binarySearch(data, 101)).toBe(-1);
    });
  });
}
