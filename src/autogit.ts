/**
 * Binary search in a sorted array.
 * @param arr Sorted array of numbers (ascending).
 * @param target Value to locate.
 * @returns Index of `target` if found; otherwise `-1`.
 */
export function binarySearch(arr: number[], target: number): number {
  let lo = 0;
  let hi = arr.length - 1;

  while (lo <= hi) {
    // Same as Math.floor((lo + hi) / 2) but avoids overflow
    const mid = lo + ((hi - lo) >> 1);
    const value = arr[mid];

    if (value === target) return mid;
    if (value < target) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return -1;
}

/* ---------- Recursive variant ---------- */
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

/* ---------- Usage ---------- */
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  describe('binarySearch', () => {
    it('finds or returns -1', () => {
      const data = [1, 4, 9, 16, 25];
      expect(binarySearch(data, 9)).toBe(2);
      expect(binarySearch(data, 3)).toBe(-1);
    });
  });
}
