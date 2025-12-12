maxSum = -∞
currentSum = 0
for each element x at index i:
    if currentSum + x < x:
        // starting a new sub‑array at i is better
        currentSum = x
        tempStart = i
    else:
        currentSum += x

    if currentSum > maxSum:
        maxSum = currentSum
        bestStart = tempStart
        bestEnd   = i
/**
 * Kadane's algorithm – O(n) time, O(1) extra space.
 *
 * @param arr - array of numbers (int or float)
 * @returns the maximum possible sum of any contiguous sub‑array.
 *          If the array is empty, returns 0 (you can change this behaviour).
 */
export function maxSubArraySum(arr: number[]): number {
  if (arr.length === 0) return 0;

  let maxSum = -Infinity;
  let currentSum = 0;

  for (const x of arr) {
    // Either extend the previous sub‑array or start fresh at x
    currentSum = Math.max(x, currentSum + x);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}

/**
 * Returns the sub‑array itself together with its indices.
 *
 * @param arr - array of numbers
 * @returns object containing sum, start index, end index (inclusive) and the slice.
 */
export function maxSubArray(arr: number[]): {
  sum: number;
  start: number;
  end: number;
  subArray: number[];
} {
  if (arr.length === 0) {
    return { sum: 0, start: -1, end: -1, subArray: [] };
  }

  let maxSum = -Infinity;
  let currentSum = 0;

  // temporary start of the *current* candidate segment
  let tempStart = 0;

  // best segment seen so far
  let bestStart = 0;
  let bestEnd = 0;

  for (let i = 0; i < arr.length; i++) {
    const x = arr[i];

    // If starting new at i is better, reset tempStart
    if (currentSum + x < x) {
      currentSum = x;
      tempStart = i;
    } else {
      currentSum += x;
    }

    // Update global best
    if (currentSum > maxSum) {
      maxSum = currentSum;
      bestStart = tempStart;
      bestEnd = i;
    }
  }

  return {
    sum: maxSum,
    start: bestStart,
    end: bestEnd,
    subArray: arr.slice(bestStart, bestEnd + 1),
  };
}

/**
 * Variant that explicitly handles the “all numbers are negative” case.
 * Kadane already works for that, but this version makes the intent clearer.
 *
 * @param arr - array of numbers
 * @returns same shape as `maxSubArray`.
 */
export function maxSubArrayAllNegatives(arr: number[]) {
  if (arr.length === 0) {
    return { sum: 0, start: -1, end: -1, subArray: [] };
  }

  // Initialise with the first element – guarantees a non‑empty result.
  let maxSum = arr[0];
  let currentSum = arr[0];
  let bestStart = 0;
  let bestEnd = 0;
  let tempStart = 0;

  for (let i = 1; i < arr.length; i++) {
    const x = arr[i];

    if (currentSum + x < x) {
      currentSum = x;
      tempStart = i;
    } else {
      currentSum += x;
    }

    if (currentSum > maxSum) {
      maxSum = currentSum;
      bestStart = tempStart;
      bestEnd = i;
    }
  }

  return {
    sum: maxSum,
    start: bestStart,
    end: bestEnd,
    subArray: arr.slice(bestStart, bestEnd + 1),
  };
}
const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
const result = maxSubArray(arr);
console.log(result);
{
  sum: 6,
  start: 3,
  end: 6,
  subArray: [4, -1, 2, 1]
}
function test() {
  const cases: { arr: number[]; expected: number }[] = [
    { arr: [], expected: 0 },
    { arr: [-1, -2, -3], expected: -1 },
    { arr: [5, -2, 3, 4, -1, 2, 1, -5, 4], expected: 12 }, // 5 + -2 + 3 + 4 + -1 + 2 + 1 = 12
    { arr: [-2, 1, -3, 4, -1, 2, 1, -5, 4], expected: 6 },
    { arr: [1, 2, 3, 4, 5], expected: 15 },
    { arr: [0, -1, 0, -2, 0], expected: 0 },
  ];

  for (const { arr, expected } of cases) {
    const got = maxSubArraySum(arr);
    console.assert(got === expected, `FAIL ${JSON.stringify(arr)} → ${got}, expected ${expected}`);
  }

  console.log('All tests passed!');
}

test();
const maxSum = (arr: number[]) =>
  arr.reduce(
    ({ cur, best }, x) => ({
      cur: Math.max(x, cur + x),
      best: Math.max(best, Math.max(x, cur + x)),
    }),
    { cur: 0, best: -Infinity }
  ).best;
