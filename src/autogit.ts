/**
 * Returns an object with the maximum sum and the start/end indices
 * of the sub‑array that produces that sum.
 *
 * @param nums - array of numbers
 * @returns { maxSum, start, end }
 */
export function maxSumSubarray(nums: number[]) {
  // In case the input is empty we can return 0 / -1/-1
  if (nums.length === 0) {
    return { maxSum: 0, start: -1, end: -1 };
  }

  let bestSum = nums[0];
  let currentSum = nums[0];

  // These will record the best sub‑array boundaries
  let bestStart = 0;
  let bestEnd = 0;
  // Temporary positions
  let tempStart = 0;

  for (let i = 1; i < nums.length; i++) {
    // Either extend the previous sub‑array or start fresh at i
    if (currentSum + nums[i] < nums[i]) {
      currentSum = nums[i];
      tempStart = i;
    } else {
      currentSum += nums[i];
    }

    // Update best if we have a better sum
    if (currentSum > bestSum) {
      bestSum = currentSum;
      bestStart = tempStart;
      bestEnd = i;
    }
  }

  return { maxSum: bestSum, start: bestStart, end: bestEnd };
}
const arr = [13, -3, -25, 20, -3, -16, -23, 18, 20, -7, 12];
const { maxSum, start, end } = maxSumSubarray(arr);
console.log(maxSum); // 43
console.log(start, end); // 7 10 (sub‑array: [18, 20, -7, 12])
