currentSum = A[0]
bestSum    = A[0]
for each element x in A from index 1 to end
    currentSum = max(x, currentSum + x)
    bestSum    = max(bestSum, currentSum)
return bestSum
/**
 * Returns the maximum sum of a contiguous sub‑array.
 *
 * @param nums - Array of numbers (can contain negatives).
 * @returns The maximum sub‑array sum.  For an empty array it returns 0.
 */
export function maxSubarraySum(nums: number[]): number {
  if (nums.length === 0) return 0;

  let currentSum = nums[0];
  let bestSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    const x = nums[i];
    currentSum = x > currentSum + x ? x : currentSum + x;
    // equivalently: currentSum = Math.max(x, currentSum + x);

    if (currentSum > bestSum) bestSum = currentSum;
  }

  return bestSum;
}
console.log(maxSubarraySum([ -2, 1, -3, 4, -1, 2, 1, -5, 4 ])); // 6
let tempStart = 0;
let bestStart = 0;
let bestEnd = 0;

for (let i = 1; i < nums.length; i++) {
  const x = nums[i];
  if (x > currentSum + x) {
    currentSum = x;
    tempStart = i;
  } else {
    currentSum += x;
  }

  if (currentSum > bestSum) {
    bestSum = currentSum;
    bestStart = tempStart;
    bestEnd = i;
  }
}

// bestStart..bestEnd (inclusive) gives the sub‑array with max sum
