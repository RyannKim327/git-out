/**
 * Return the median of two sorted arrays `a` and `b`.
 * Both inputs must be sorted in non‑decreasing order.
 */
export function medianOfTwoSortedArrays(a: number[], b: number[]): number {
  // Make sure `a` is the shorter array – this keeps the binary search
  // on the smaller size which guarantees the log(min(n, m)) bound.
  if (a.length > b.length) return medianOfTwoSortedArrays(b, a);

  const m = a.length;
  const n = b.length;
  const half = Math.floor((m + n + 1) / 2); // number of elements that go to the left side

  let low = 0;
  let high = m;

  while (low <= high) {
    const i = Math.floor((low + high) / 2); // elements taken from `a`
    const j = half - i;                     // elements taken from `b`

    const aLeft  = (i === 0)          ? -Infinity : a[i - 1];
    const aRight = (i === m)          ?  Infinity : a[i];
    const bLeft  = (j === 0)          ? -Infinity : b[j - 1];
    const bRight = (j === n)          ?  Infinity : b[j];

    // Check if we have found the perfect split
    if (aLeft <= bRight && bLeft <= aRight) {
      // Odd total: middle element is the rightmost of the left side
      if ((m + n) % 2 === 1) {
        return Math.max(aLeft, bLeft);
      }
      // Even total: average of two middle elements
      return (Math.max(aLeft, bLeft) + Math.min(aRight, bRight)) / 2;
    } else if (aLeft > bRight) {
      // Too many elements taken from `a`, shift left
      high = i - 1;
    } else {
      // Too few elements taken from `a`, shift right
      low = i + 1;
    }
  }

  // If we reach here something is wrong with the inputs
  throw new Error('Input arrays are not sorted or contain incompatible lengths.');
}
console.log(medianOfTwoSortedArrays([1, 3, 8], [7, 9, 10, 11])); // 8
console.log(medianOfTwoSortedArrays([1, 2], [3, 4]));             // 2.5
