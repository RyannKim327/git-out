/**
 * Return the maximum sum of any contiguous sub‑array.
 *
 * @param arr - array of numbers (can contain negatives)
 * @returns the maximum sub‑array sum
 */
export function maxSubarraySum(arr: number[]): number {
  if (arr.length === 0) {
    throw new Error('Array must contain at least one element');
  }

  // Initialise both values to the first element
  let currentSum = arr[0];
  let maxSum = arr[0];

  // Scan the rest of the array once
  for (let i = 1; i < arr.length; i++) {
    // Either continue the current sub‑array or start fresh at arr[i]
    currentSum = Math.max(arr[i], currentSum + arr[i]);

    // Update the global maximum if we found a bigger one
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}
console.log(maxSubarraySum([2, -3, 4, -1, 2, 1])); // 6  (sub‑array 4,-1,2,1)
console.log(maxSubarraySum([-2, -3, -1, -4]));      // -1 (single element)
