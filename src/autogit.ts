/**
 * Returns the maximum sum sub‑array of a one‑dimensional numeric array,
 * together with the start and end indices of that sub‑array.
 *
 * @param nums   – array of numbers (can contain negatives!)
 * @returns      { sum, start, end }
 *
 * Complexity: O(n) time, O(1) extra space
 */
export function maxSubArray(nums: number[]): { sum: number; start: number; end: number } {
  if (nums.length === 0) throw new Error('Array must contain at least one element');

  let globalMax = nums[0];
  let currentSum = nums[0];

  // Track the indices
  let startIdx = 0;          // beginning of the current candidate
  let bestStartIdx = 0;      // beginning of the best so far
  let bestEndIdx = 0;        // end of the best so far

  for (let i = 1; i < nums.length; i++) {
    // Either extend the current sub‑array or start fresh at i
    if (currentSum + nums[i] > nums[i]) {
      currentSum += nums[i];
    } else {
      currentSum = nums[i];
      startIdx = i;         // new sub‑array starts here
    }

    // Did we find a new champion?
    if (currentSum > globalMax) {
      globalMax = currentSum;
      bestStartIdx = startIdx;
      bestEndIdx = i;
    }
  }

  return { sum: globalMax, start: bestStartIdx, end: bestEndIdx };
}
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
// → { sum: 6, start: 3, end: 6 }
// (the slice [4, -1, 2, 1] adds up to 6)
