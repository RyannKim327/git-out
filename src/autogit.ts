currentSum = max(x, currentSum + x)
maxSum     = max(maxSum, currentSum)
/**
 * Result of the maximum‑sum sub‑array search.
 */
export interface MaxSubarrayResult {
  /** Maximum sum found */
  maxSum: number;
  /** Inclusive start index of the sub‑array */
  startIdx: number;
  /** Inclusive end index of the sub‑array */
  endIdx: number;
  /** The sub‑array itself (convenient but optional) */
  subarray: number[];
}

/**
 * Kadane's algorithm – O(n) time, O(1) extra space.
 *
 * @param arr - Input array of numbers (can contain negatives, zeros, positives)
 * @returns An object with the maximum sum, its bounds, and the sub‑array.
 *
 * @throws {Error} If the input array is empty.
 */
export function maxSumSubarray(arr: number[]): MaxSubarrayResult {
  if (arr.length === 0) {
    throw new Error('Input array must contain at least one element.');
  }

  // Initialise with the first element – this also correctly handles all‑negative arrays.
  let maxSum = arr[0];
  let currentSum = arr[0];

  // Indices for the best sub‑array found so far.
  let bestStart = 0;
  let bestEnd = 0;

  // Temporary start index for the sub‑array that ends at the current position.
  let tempStart = 0;

  for (let i = 1; i < arr.length; i++) {
    const x = arr[i];

    // Decide whether to extend the previous sub‑array or start fresh at i.
    if (currentSum + x < x) {
      // Starting new is better.
      currentSum = x;
      tempStart = i; // new candidate start
    } else {
      // Extending is better.
      currentSum += x;
    }

    // Update global best if we improved.
    if (currentSum > maxSum) {
      maxSum = currentSum;
      bestStart = tempStart;
      bestEnd = i;
    }
  }

  // Slice the sub‑array for convenience (O(k) where k = length of result).
  const subarray = arr.slice(bestStart, bestEnd + 1);

  return {
    maxSum,
    startIdx: bestStart,
    endIdx: bestEnd,
    subarray,
  };
}
import { maxSumSubarray } from './maxSumSubarray';

// Example 1 – mixed numbers
const a = [‑2, 1, ‑3, 4, ‑1, 2, 1, ‑5, 4];
console.log(maxSumSubarray(a));
/*
{
  maxSum: 6,
  startIdx: 3,
  endIdx: 6,
  subarray: [4, -1, 2, 1]
}
*/

// Example 2 – all negatives (largest single element wins)
const b = [‑8, ‑3, ‑6, ‑2, ‑5];
console.log(maxSumSubarray(b));
/*
{
  maxSum: -2,
  startIdx: 3,
  endIdx: 3,
  subarray: [-2]
}
*/

// Example 3 – all positives (whole array is the answer)
const c = [1, 2, 3, 4];
console.log(maxSumSubarray(c));
/*
{
  maxSum: 10,
  startIdx: 0,
  endIdx: 3,
  subarray: [1, 2, 3, 4]
}
*/

// Example 4 – single element
const d = [42];
console.log(maxSumSubarray(d));
/*
{
  maxSum: 42,
  startIdx: 0,
  endIdx: 0,
  subarray: [42]
}
*/
const maxSum = arr.reduce(
  ([best, cur], x) => {
    const newCur = Math.max(x, cur + x);
    return [Math.max(best, newCur), newCur];
  },
  [Number.NEGATIVE_INFINITY, 0]
)[0];
