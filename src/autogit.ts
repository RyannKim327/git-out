/**
 * Median of two sorted arrays (each array is sorted in ascending order).
 * Works in O(log (min(nums1.length, nums2.length))) time.
 */
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  // Make sure nums1 is the smaller array for a lighter binary‑search range
  if (nums1.length > nums2.length) {
    return findMedianSortedArrays(nums2, nums1);
  }

  const m = nums1.length;
  const n = nums2.length;
  const halfLen = Math.floor((m + n + 1) / 2);

  let low = 0;
  let high = m;

  while (low <= high) {
    const i = Math.floor((low + high) / 2);      // partition in nums1
    const j = halfLen - i;                       // partition in nums2

    const nums1LeftMax  = (i === 0) ? -Infinity : nums1[i - 1];
    const nums1RightMin = (i === m) ? Infinity  : nums1[i];
    const nums2LeftMax  = (j === 0) ? -Infinity : nums2[j - 1];
    const nums2RightMin = (j === n) ? Infinity  : nums2[j];

    // If we’ve partitioned correctly, compute the median
    if (nums1LeftMax <= nums2RightMin && nums2LeftMax <= nums1RightMin) {
      if ((m + n) % 2 === 1) {              // odd total length
        return Math.max(nums1LeftMax, nums2LeftMax);
      } else {                               // even total length
        return (Math.max(nums1LeftMax, nums2LeftMax) +
                Math.min(nums1RightMin, nums2RightMin)) / 2;
      }
    }
    // Adjust the binary‑search range
    else if (nums1LeftMax > nums2RightMin) {
      high = i - 1;
    } else {
      low = i + 1;
    }
  }

  throw new Error("Input arrays are not sorted or invalid");
}
console.log(findMedianSortedArrays([1, 3], [2]));                    // 2
console.log(findMedianSortedArrays([1, 2], [3, 4]));                  // 2.5
console.log(findMedianSortedArrays([0, 0], [0, 0]));                  // 0
console.log(findMedianSortedArrays([], [1]));                        // 1
console.log(findMedianSortedArrays([2], []));                        // 2
