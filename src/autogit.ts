/**
 * Returns the max sum of any contiguous sub‑array of `nums`.
 * If all numbers are negative, it will still return the best (least negative) value.
 *
 * @param nums Array of numbers
 * @returns maximum sub‑array sum
 */
function maxSubArraySum(nums: number[]): number {
  if (nums.length === 0) {
    throw new Error('Array must contain at least one element');
  }

  let bestSoFar = nums[0];      // best overall
  let bestEndingHere = nums[0]; // best ending at current index

  for (let i = 1; i < nums.length; i++) {
    // Either extend the previous sub‑array or start fresh at nums[i]
    bestEndingHere = Math.max(nums[i], bestEndingHere + nums[i]);

    // Update the global best if needed
    bestSoFar = Math.max(bestSoFar, bestEndingHere);
  }

  return bestSoFar;
}

/* Example usage */
const arr = [−2, 1, −3, 4, −1, 2, 1, −5, 4];
console.log(maxSubArraySum(arr)); // outputs 6 (sub‑array [4, -1, 2, 1])
function maxSubArrayDetail(nums: number[]): { maxSum: number, subArray: number[], indices: [number, number] } {
  let bestSoFar = nums[0], bestEndingHere = nums[0];
  let start = 0, end = 0, tempStart = 0;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > bestEndingHere + nums[i]) {
      bestEndingHere = nums[i];
      tempStart = i;          // potential new start
    } else {
      bestEndingHere += nums[i];
    }

    if (bestEndingHere > bestSoFar) {
      bestSoFar = bestEndingHere;
      start = tempStart;      // commit new start
      end = i;
    }
  }

  return {
    maxSum: bestSoFar,
    subArray: nums.slice(start, end + 1),
    indices: [start, end]
  };
}
console.log(maxSubArrayDetail(arr));
// {
//   maxSum: 6,
//   subArray: [4, -1, 2, 1],
//   indices: [3, 6]
// }
