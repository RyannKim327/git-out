|left| = |right|   (or |left| = |right| + 1 when total length is odd)
max(left) ≤ min(right)
A[0 … i‑1]  +  B[0 … j‑1]
A[i … m‑1]  +  B[j … n‑1]
i + j = (m + n + 1) / 2          // integer division, works for odd/even
A[i‑1] ≤ B[j]   &&   B[j‑1] ≤ A[i]
/**
 * Returns the median of two sorted numeric arrays.
 * Runs in O(log(min(m, n))) time and O(1) extra space.
 *
 * @param nums1 - first sorted array (any length, can be empty)
 * @param nums2 - second sorted array (any length, can be empty)
 * @throws Error if both arrays are empty
 */
export function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  // Ensure nums1 is the shorter array (helps keep the binary search range small)
  if (nums1.length > nums2.length) {
    return findMedianSortedArrays(nums2, nums1);
  }

  const m = nums1.length;
  const n = nums2.length;

  if (m === 0 && n === 0) {
    throw new Error('Both input arrays are empty');
  }

  let low = 0;
  let high = m; // we can cut after any element of nums1, including before the first (0) and after the last (m)

  const halfLen = Math.floor((m + n + 1) / 2); // number of elements that must be on the left side

  while (low <= high) {
    const i = Math.floor((low + high) / 2); // partition of nums1
    const j = halfLen - i;                  // partition of nums2 (derived from i)

    // Edge values: use -Infinity / +Infinity when the partition touches an array border
    const Aleft  = i === 0 ? -Infinity : nums1[i - 1];
    const Aright = i === m ?  Infinity : nums1[i];
    const Bleft  = j === 0 ? -Infinity : nums2[j - 1];
    const Bright = j === n ?  Infinity : nums2[j];

    // Check if we have found the correct partition
    if (Aleft <= Bright && Bleft <= Aright) {
      // Correct partition
      if ((m + n) % 2 === 1) {
        // Odd total length → median is the max of left side
        return Math.max(Aleft, Bleft);
      } else {
        // Even total length → median is average of max left and min right
        return (Math.max(Aleft, Bleft) + Math.min(Aright, Bright)) / 2;
      }
    } else if (Aleft > Bright) {
      // A's left part is too big → move partition i left
      high = i - 1;
    } else {
      // B's left part is too big → move partition i right
      low = i + 1;
    }
  }

  // If we exit the loop something went wrong (should never happen with valid input)
  throw new Error('Unable to find median – check that input arrays are sorted');
}
function test(nums1: number[], nums2: number[], expected: number) {
  const result = findMedianSortedArrays(nums1, nums2);
  const ok = Math.abs(result - expected) < 1e-9;
  console.log(
    `nums1=${JSON.stringify(nums1)}  nums2=${JSON.stringify(nums2)} → ${result} ` +
    (ok ? '✅' : `❌ (expected ${expected})`)
  );
}

// Basic cases
test([1, 3], [2], 2);                     // odd total length
test([1, 2], [3, 4], 2.5);                // even total length
test([], [5], 5);                         // one empty array
test([2], [], 2);                         // the other empty array
test([1, 3, 8, 9, 15], [7, 11, 18, 19, 21, 25], 11); // larger arrays

// Edge cases
test([1], [1], 1);
test([1, 2, 3, 4, 5, 6], [7, 8, 9, 10, 11, 12], 6.5);
test([1, 2, 3], [4, 5, 6, 7, 8, 9], 5);
export function findMedianSortedArraysLinear(nums1: number[], nums2: number[]): number {
  const total = nums1.length + nums2.length;
  const mid = Math.floor(total / 2);
  let i = 0, j = 0, count = 0;
  let left = 0, right = 0; // keep the two middle values

  while (count <= mid) {
    left = right;
    if (i < nums1.length && (j >= nums2.length || nums1[i] <= nums2[j])) {
      right = nums1[i++];
    } else {
      right = nums2[j++];
    }
    count++;
  }

  return total % 2 === 0 ? (left + right) / 2 : right;
}
const median = findMedianSortedArrays([1, 3, 8], [7, 9, 10, 11]); // → 8
