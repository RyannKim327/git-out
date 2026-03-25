/**
 * Recursively binary‑searches a *sorted* array for `target`.
 *
 * @param arr   Sorted array of comparable values.
 * @param target Value to locate.
 * @returns      Index of `target` in `arr`, or -1 if absent.
 */
export function binarySearchRecursive<T extends number | string>(
  arr: T[],
  target: T
): number {
  // Helper that takes start/end indices.
  function search(start: number, end: number): number {
    if (start > end) return -1;              // Empty slice – no hit.

    const mid = Math.floor((start + end) / 2);
    const midVal = arr[mid];

    if (midVal === target) return mid;       // Bingo!
    if (midVal > target) {
      // Target lives (potentially) in the left half.
      return search(start, mid - 1);
    }
    // Target is bigger – search the right half.
    return search(mid + 1, end);
  }

  return search(0, arr.length - 1);
}
const data = [3, 7, 12, 17, 25, 36, 42, 58, 71];
const idx  = binarySearchRecursive(data, 25);

console.log(idx); // → 4
console.log(binarySearchRecursive(data, 13)); // → -1
