/**
 * Median of two sorted arrays.
 *
 * The algorithm keeps a binary search on the smaller array.  
 * At each step we decide how many elements from `a` belong on the left side of the
 * partition.  The counterpart from `b` is computed so that the left side contains
 * exactly half (or half‑plus‑one for odd total length) of the elements.
 *
 * Edge cases:
 *   * one of the arrays may be empty
 *   * indices can go out of bounds – use `-Infinity` / `Infinity` to simplify comparisons
 */
export function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  // Ensure `a` is the shorter array to keep the binary search limits small.
  let a = nums1;
  let b = nums2;
  if (a.length > b.length) [a, b] = [b, a];

  const m = a.length;
  const n = b.length;
  // `halfLen` is the number of elements that must be on the left side
  // of the partition (including the middle element when total length is odd).
  const halfLen = Math.floor((m + n + 1) / 2);

  let low = 0;
  let high = m;

  while (low <= high) {
    // Number of elements from a put on the left side
    const i = Math.floor((low + high) / 2);
    // Number of elements from b put on the left side
    const j = halfLen - i;

    const aLeft  = i === 0 ? -Infinity : a[i - 1];
    const aRight = i === m ?  Infinity : a[i];

    const bLeft  = j === 0 ? -Infinity : b[j - 1];
    const bRight = j === n ?  Infinity : b[j];

    // Partition is correct: all left elements ≤ all right elements
    if (aLeft <= bRight && bLeft <= aRight) {
      // If total length is odd, the median is the max of the left side
      if ((m + n) % 2 === 1) {
        return Math.max(aLeft, bLeft);
      }
      // If even, it’s the mean of the two middle values
      return (Math.max(aLeft, bLeft) + Math.min(aRight, bRight)) / 2;
    } else if (aLeft > bRight) {
      // Too many elements from a on the left: move left
      high = i - 1;
    } else {
      // Too few elements from a on the left: move right
      low = i + 1;
    }
  }

  // Should never reach here for valid input
  throw new Error("Invalid input");
}
const arr1 = [1, 3, 8];
const arr2 = [7, 9, 10, 11];
console.log(findMedianSortedArrays(arr1, arr2)); // 8
export function medianNaive(a: number[], b: number[]): number {
  const merged: number[] = [];
  let i = 0, j = 0;
  while (i < a.length || j < b.length) {
    if (j >= b.length || (i < a.length && a[i] <= b[j])) {
      merged.push(a[i++]);
    } else {
      merged.push(b[j++]);
    }
  }
  const mid = Math.floor(merged.length / 2);
  return merged.length % 2
    ? merged[mid]
    : (merged[mid - 1] + merged[mid]) / 2;
}
