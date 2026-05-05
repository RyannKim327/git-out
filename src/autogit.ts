/**
 * Returns the maximum sum of any contiguous sub‑array.
 * If all numbers are negative, the result is the largest (least negative) number.
 */
function maxSubarraySum(arr: number[]): number {
    if (arr.length === 0) throw new Error('Array must contain at least one element');

    let currentSum = arr[0];
    let bestSum = arr[0];

    // We start from index 1 because the first element was already handled
    for (let i = 1; i < arr.length; i++) {
        // Either extend the previous sub‑array or start anew at arr[i]
        currentSum = Math.max(arr[i], currentSum + arr[i]);

        // Update global best if we found a better one
        bestSum = Math.max(bestSum, currentSum);
    }

    return bestSum;
}
const data = [−2, −3, 4, −1, −2, 1, 5, −3];
console.log(maxSubarraySum(data)); // 7

// The winning sub‑array is [4, -1, -2, 1, 5] → sum = 7
function maxSubarrayInfo(arr: number[]): { sum: number; start: number; end: number } {
    let currentSum = arr[0];
    let bestSum = arr[0];
    let tempStart = 0;
    let bestStart = 0;
    let bestEnd = 0;

    for (let i = 1; i < arr.length; i++) {
        if (currentSum + arr[i] >= arr[i]) {
            currentSum += arr[i];
        } else {
            currentSum = arr[i];
            tempStart = i;
        }

        if (currentSum > bestSum) {
            bestSum = currentSum;
            bestStart = tempStart;
            bestEnd = i;
        }
    }

    return { sum: bestSum, start: bestStart, end: bestEnd };
}
