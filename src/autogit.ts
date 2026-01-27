/**
 * Returns the median of two sorted arrays.
 *
 * @param nums1 First sorted array
 * @param nums2 Second sorted array
 * @returns Median value (number)
 */
export function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  // Make sure nums1 is the smaller array; binary search will run on it.
  if (nums1.length > nums2.length) {
    return findMedianSortedArrays(nums2, nums1);
  }

  const m = nums1.length;
  const n = nums2.length;
  const halfLen = Math.floor((m + n + 1) / 2);

  let low = 0;
  let high = m;

  while (low <= high) {
    const i = Math.floor((low + high) / 2);   // Count from nums1
    const j = halfLen - i;                    // Count from nums2

    // If i is too small → move right
    if (i < m && nums2[j - 1] > nums1[i]) {
      low = i + 1;
    }
    // If i is too big → move left
    else if (i > 0 && nums1[i - 1] > nums2[j]) {
      high = i - 1;
    }
    // Found perfect i
    else {
      let maxLeft;
      if (i === 0) maxLeft = nums2[j - 1];
      else if (j === 0) maxLeft = nums1[i - 1];
      else maxLeft = Math.max(nums1[i - 1], nums2[j - 1]);

      // Odd total length – median is max of left side
      if ((m + n) % 2 === 1) return maxLeft;

      // Even total length – median is average of maxLeft and minRight
      let minRight;
      if (i === m) minRight = nums2[j];
      else if (j === n) minRight = nums1[i];
      else minRight = Math.min(nums1[i], nums2[j]);

      return (maxLeft + minRight) / 2;
    }
  }

  // If we get here, input arrays weren’t valid (empty, unsorted, etc.)
  throw new Error('Input arrays are not valid.');
}
