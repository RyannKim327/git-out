/**
 * Returns the maximum sum of any contiguous sub‑array.
 *
 * @param arr – array of numbers (may contain negatives)
 * @returns {number} maximum sub‑array sum
 */
export function maxSubArraySum(arr: number[]): number {
  if (arr.length === 0) {
    throw new Error('Array must contain at least one element');
  }

  // init both with first element: handles all‑negative cases nicely
  let currentBest = arr[0];
  let globalBest = arr[0];

  for (let i = 1; i < arr.length; i++) {
    const value = arr[i];

    // Either extend the previous sub‑array or start fresh at value
    currentBest = Math.max(value, currentBest + value);

    // Keep the best seen so far
    globalBest = Math.max(globalBest, currentBest);
  }

  return globalBest;
}
const testSets = [
  { arr: [1, -2, 3, 4, -5, 8], expect: 10 },
  { arr: [-2, -3, -1, -4], expect: -1 },
  { arr: [2, 3, 1, 6], expect: 12 },
  { arr: [5, -1, 2, 3], expect: 9 },
  { arr: [1], expect: 1 },
];

for (const { arr, expect } of testSets) {
  const result = maxSubArraySum(arr);
  console.log(`arr: ${arr} → max sum: ${result} (${result === expect ? '✓' : '✗'})`);
}
arr: 1,-2,3,4,-5,8 → max sum: 10 (✓)
arr: -2,-3,-1,-4 → max sum: -1 (✓)
arr: 2,3,1,6 → max sum: 12 (✓)
arr: 5,-1,2,3 → max sum: 9 (✓)
arr: 1 → max sum: 1 (✓)
interface MaxSubArrayResult {
  sum: number;
  start: number;
  end: number;   // inclusive
}

export function maxSubArraySumWithIndices(arr: number[]): MaxSubArrayResult {
  if (arr.length === 0) {
    throw new Error('Array must contain at least one element');
  }

  let currentBest = arr[0];
  let globalBest = arr[0];

  // working indices
  let currentStart = 0;
  let bestStart = 0;
  let bestEnd = 0;

  for (let i = 1; i < arr.length; i++) {
    const value = arr[i];

    // decide whether to continue or start a new sub‑array
    if (currentBest + value < value) {
      currentBest = value;
      currentStart = i;
    } else {
      currentBest += value;
    }

    // update global best if we found a better sum
    if (currentBest > globalBest) {
      globalBest = currentBest;
      bestStart = currentStart;
      bestEnd = i;
    }
  }

  return { sum: globalBest, start: bestStart, end: bestEnd };
}
const { sum, start, end } = maxSubArraySumWithIndices([1, -2, 3, 4, -5, 8]);
console.log(`max sum ${sum} from index ${start} to ${end}`);
// → max sum 10 from index 2 to 5
