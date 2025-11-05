/**
 * Returns the maximum-sum contiguous sub-array.
 * @param nums input array (may contain negative numbers)
 * @returns {sum: number, left: number, right: number}
 *          sum  – the maximum sum
 *          left – inclusive start index of the best sub-array
 *          right– inclusive end   index of the best sub-array
 */
function maxSubArray(nums: number[]): { sum: number; left: number; right: number } {
  if (nums.length === 0) return { sum: 0, left: 0, right: -1 };

  let bestSum = nums[0];
  let bestLeft = 0;
  let bestRight = 0;

  let curSum = nums[0];
  let curLeft = 0;

  for (let i = 1; i < nums.length; i++) {
    // Extend the current window or start a new one
    if (curSum < 0) {
      curSum = nums[i];
      curLeft = i;
    } else {
      curSum += nums[i];
    }

    // Record new best
    if (curSum > bestSum) {
      bestSum = curSum;
      bestLeft = curLeft;
      bestRight = i;
    }
  }

  return { sum: bestSum, left: bestLeft, right: bestRight };
}

/* ---------- usage ---------- */
const data = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
const result = maxSubArray(data);
console.log(`Max sum = ${result.sum}`);            // 6
console.log(`Sub-array = [${data.slice(result.left, result.right + 1).join(', ')}]`); // [4, -1, 2, 1]
