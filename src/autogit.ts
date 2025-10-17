/**
 * Returns the maximum possible sum of any contiguous sub-array.
 * Works for arrays that contain negative, zero or positive numbers.
 * If the array is empty it returns 0 (change to -Infinity if you prefer).
 */
function maxSubArray(nums: number[]): number {
  if (nums.length === 0) return 0;

  let bestSoFar = nums[0];   // global best
  let bestEnding = nums[0];  // best sum ending at current index

  for (let i = 1; i < nums.length; i++) {
    bestEnding = Math.max(nums[i], bestEnding + nums[i]); // extend or restart
    bestSoFar  = Math.max(bestSoFar, bestEnding);       // update global best
  }
  return bestSoFar;
}

/* ---------- demo ---------- */
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6  ([4,-1,2,1])
console.log(maxSubArray([5, 4, -1, 7, 8]));                 // 23 (whole array)
function maxSubArrayWithSlice(nums: number[]): { sum: number; slice: number[] } {
  if (nums.length === 0) return { sum: 0, slice: [] };

  let bestSum = nums[0];
  let bestStart = 0;
  let bestEnd   = 0;

  let curSum = nums[0];
  let curStart = 0;

  for (let i = 1; i < nums.length; i++) {
    if (curSum < 0) {          // better to start fresh
      curSum  = nums[i];
      curStart = i;
    } else {                   // extend current run
      curSum += nums[i];
    }

    if (curSum > bestSum) {    // found a new global best
      bestSum = curSum;
      bestStart = curStart;
      bestEnd   = i;
    }
  }
  return { sum: bestSum, slice: nums.slice(bestStart, bestEnd + 1) };
}
