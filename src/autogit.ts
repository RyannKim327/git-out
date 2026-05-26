/**
 * Return the median of two sorted numeric arrays.
 * Complexity: O(m + n) time, O(1) extra space (besides a few indices).
 */
export function medianOfTwoSortedLinear(a: number[], b: number[]): number {
  const m = a.length, n = b.length;
  const total = m + n;
  const k = Math.floor((total - 1) / 2); // 0‑based index of first median element

  let i = 0, j = 0, count = 0;
  let cur = 0, next = 0;

  while (count <= k) {
    // Pick the next smallest element
    if (i < m && (j >= n || a[i] <= b[j])) {
      cur = next;   // shift previous value
      next = a[i++];
    } else {
      cur = next;
      next = b[j++];
    }
    count++;
  }

  // If total is odd, median is next
  if (total % 2 === 1) {
    return next;
  }

  // If total is even, median is average of cur and next
  return (cur + next) / 2;
}
/**
 * Median of two sorted arrays in O(log(min(m,n))) time.
 * Assumes a and b are sorted in non‑decreasing order.
 */
export function medianOfTwoSortedBinary(a: number[], b: number[]): number {
  // Ensure a is the smaller array
  if (a.length > b.length) return medianOfTwoSortedBinary(b, a);

  let m = a.length, n = b.length;
  let low = 0, high = m;
  const halfLen = Math.floor((m + n + 1) / 2);

  while (low <= high) {
    const i = Math.floor((low + high) / 2);
    const j = halfLen - i;

    const aLeft  = (i === 0)  ? Number.NEGATIVE_INFINITY : a[i - 1];
    const aRight = (i === m) ? Number.POSITIVE_INFINITY : a[i];
    const bLeft  = (j === 0)  ? Number.NEGATIVE_INFINITY : b[j - 1];
    const bRight = (j === n) ? Number.POSITIVE_INFINITY : b[j];

    if (aLeft <= bRight && bLeft <= aRight) {
      // Partitions are correct
      if ((m + n) % 2 === 1) {
        return Math.max(aLeft, bLeft);
      }
      return (Math.max(aLeft, bLeft) + Math.min(aRight, bRight)) / 2;
    } else if (aLeft > bRight) {
      high = i - 1; // move left in a
    } else {
      low = i + 1; // move right in a
    }
  }

  throw new Error('Input arrays are not sorted or sizes are incorrect.');
}
const arr1 = [1, 3, 8];
const arr2 = [7, 9, 10, 11];

console.log(medianOfTwoSortedLinear(arr1, arr2));   // 8
console.log(medianOfTwoSortedBinary(arr1, arr2));    // 8
