/**
 * Return the median of two sorted arrays (ascending order).
 *
 * @param nums1 first sorted array
 * @param nums2 second sorted array
 * @return median value (number or natural fractional)
 */
export function medianOfTwoSortedArrays(nums1: number[], nums2: number[]): number {
  const [A, B] = nums1.length <= nums2.length ? [nums1, nums2] : [nums2, nums1];
  const m = A.length, n = B.length;
  const halfLen = Math.floor((m + n + 1) / 2);

  // Binary‑search over A to find the correct partition
  let low = 0, high = m;
  while (low <= high) {
    const i = Math.floor((low + high) / 2);          // partition of A
    const j = halfLen - i;                           // partition of B

    const Aleft  = i === 0 ? Number.NEGATIVE_INFINITY : A[i - 1];
    const Aright = i === m ? Number.POSITIVE_INFINITY : A[i];
    const Bleft  = j === 0 ? Number.NEGATIVE_INFINITY : B[j - 1];
    const Bright = j === n ? Number.POSITIVE_INFINITY : B[j];

    // Correct partition?
    if (Aleft <= Bright && Bleft <= Aright) {
      // Odd combined length → median is max(left side)
      // Even combined length → median is average of max(left) and min(right)
      if ((m + n) % 2 === 1) {
        return Math.max(Aleft, Bleft);
      } else {
        return (Math.max(Aleft, Bleft) + Math.min(Aright, Bright)) / 2;
      }
    } else if (Aleft > Bright) {
      // Need to move left in A
      high = i - 1;
    } else {
      // Need to move right in A
      low = i + 1;
    }
  }

  throw new Error("Inputs are not sorted or arrays are empty");
}
const arr1 = [1, 3, 8];
const arr2 = [7, 9, 10, 11];

console.log(medianOfTwoSortedArrays(arr1, arr2)); // → 8
