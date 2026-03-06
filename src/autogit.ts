/**
 * Returns the contiguous segment of `arr` that yields the highest possible sum.
 *
 * @param arr - Array of numbers (integer or float)
 * @returns An object containing:
 *   `maxSum`  – the total sum of the best segment
 *   `start`   – the index where the segment begins
 *   `end`     – the index where the segment ends (inclusive)
 */
function maxSubarray(arr: number[]) {
  if (arr.length === 0) throw new Error('Array cannot be empty');

  let bestSum = arr[0];
  let currentSum = arr[0];
  let bestStart = 0;
  let bestEnd = 0;
  let tempStart = 0;

  for (let i = 1; i < arr.length; i++) {
    const val = arr[i];

    // Either start a new sub‑array at i or extend the existing one
    if (currentSum + val < val) {
      currentSum = val;
      tempStart = i;       // new potential start
    } else {
      currentSum += val;   // keep extending
    }

    // Update the best segment seen so far
    if (currentSum > bestSum) {
      bestSum = currentSum;
      bestStart = tempStart;
      bestEnd = i;
    }
  }

  return { maxSum: bestSum, start: bestStart, end: bestEnd };
}
const data = [-2, -3, 4, -1, -2, 1, 5, -3];
const result = maxSubarray(data);
console.log(result);
// Expected output:
// { maxSum: 7, start: 2, end: 6 }
// (segment [4, -1, -2, 1, 5] sums to 7)
