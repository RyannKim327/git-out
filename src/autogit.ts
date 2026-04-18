/**
 * Returns the maximum sum of any contiguous sub‑array of `arr`.
 * Works for arrays that contain only numbers.
 *
 * @param arr - array of numbers (can be empty)
 * @returns maximum sub‑array sum (for an empty array returns 0)
 */
export function maxSubArraySum(arr: number[]): number {
  if (arr.length === 0) return 0;

  let maxEndingHere = arr[0];   // best sum ending at current index
  let maxSoFar = arr[0];        // best sum found so far

  for (let i = 1; i < arr.length; i++) {
    // Either extend the previous sub‑array or start a new one at i
    maxEndingHere = Math.max(arr[i], maxEndingHere + arr[i]);

    // Update the best overall sum
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }

  return maxSoFar;
}
const nums = [ -2, 1, -3, 4, -1, 2, 1, -5, 4 ];
console.log(maxSubArraySum(nums));  // 6
