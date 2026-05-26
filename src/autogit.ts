maxLeftA  ≤  minRightB
maxLeftB  ≤  minRightA
/**
 * Returns the median of two sorted arrays.
 * Works for arrays of different lengths, including empty arrays.
 *
 * Time:  O(log min(m, n))
 * Space: O(1)
 */
export function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  // Make sure nums1 is the smaller array.
  if (nums1.length > nums2.length) {
    return findMedianSortedArrays(nums2, nums1);
  }

  const m = nums1.length;
  const n = nums2.length;
  const total = m + n;
  const half = Math.floor((total + 1) / 2);

  let low = 0;
  let high = m;

  while (low <= high) {
    const i = Math.floor((low + high) / 2);        // Partition in nums1
    const j = half - i;                           // Partition in nums2

    const maxLeftA = i === 0 ? -Infinity : nums1[i - 1];
    const minRightA = i === m ? Infinity : nums1[i];

    const maxLeftB = j === 0 ? -Infinity : nums2[j - 1];
    const minRightB = j === n ? Infinity : nums2[j];

    if (maxLeftA > minRightB) {
      // Need to move partition i left
      high = i - 1;
    } else if (maxLeftB > minRightA) {
      // Need to move partition i right
      low = i + 1;
    } else {
      // Correct partition found
      if (total % 2 === 1) {
        return Math.max(maxLeftA, maxLeftB);
      } else {
        return (Math.max(maxLeftA, maxLeftB) + Math.min(minRightA, minRightB)) / 2;
      }
    }
  }

  // If we get here, inputs were invalid (not sorted / mismatch lengths).
  // Depending on your use‑case you can throw an error or return NaN.
  throw new Error("Input arrays are not valid");
}
console.log(findMedianSortedArrays([1, 3], [2]));           // 2
console.log(findMedianSortedArrays([1, 2], [3, 4]));        // 2.5
console.log(findMedianSortedArrays([], [1]));               // 1
console.log(findMedianSortedArrays([1, 2, 3], [4, 5, 6])); // 3.5
export function medianSimple(nums1: number[], nums2: number[]): number {
  const merged: number[] = [];
  let i = 0, j = 0;

  while (merged.length <= Math.floor((nums1.length + nums2.length - 1) / 2)) {
    if (i < nums1.length && (j >= nums2.length || nums1[i] <= nums2[j])) {
      merged.push(nums1[i++]);
    } else {
      merged.push(nums2[j++]);
    }
  }

  const mid = merged.length - 1;
  const total = nums1.length + nums2.length;

  if (total % 2 === 1) {
    return merged[mid];
  }
  // Need to peek
