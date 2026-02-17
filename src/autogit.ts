/**
 * Return the maximum sum sub‑array (Kadane) along with its start & end indices.
 *
 * @param nums  Array of numbers – can contain positives, zeros and negatives.
 * @returns     Object with `maxSum`, `start`, `end` (inclusive).
 */
export function maxSubarrayWithIndices(nums: number[]): {
  maxSum: number;
  start: number;
  end: number;
} {
  if (nums.length === 0) throw new Error("Input array must contain at least one element");

  let bestSum = nums[0];
  let currentSum = nums[0];

  // These track the best indices we’ve seen
  let bestStart = 0;
  let bestEnd = 0;

  // Temporary indices for the sub‑array we are currently extending
  let tempStart = 0;

  for (let i = 1; i < nums.length; i++) {
    const num = nums[i];

    // Decide whether to extend the current sub‑array or start fresh at i
    if (currentSum + num < num) {
      currentSum = num;
      tempStart = i;
    } else {
      currentSum += num;
    }

    // Update the best found so far
    if (currentSum > bestSum) {
      bestSum = currentSum;
      bestStart = tempStart;
      bestEnd = i;
    }
  }

  return { maxSum: bestSum, start: bestStart, end: bestEnd };
}
const arr = [4, -1, 2, 1, -5, 4];
const result = maxSubarrayWithIndices(arr);
console.log(result); // { maxSum: 6, start: 0, end: 3 }
// Sub‑array: [4, -1, 2, 1] → sum 6
