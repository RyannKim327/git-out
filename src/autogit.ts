/**
 * Returns the longest increasing subsequence (LIS) of a numeric array.
 *
 * @param arr - Input array of numbers (any order, may contain duplicates)
 * @returns An array containing one of the possible LIS (the subsequence itself)
 *
 * Complexity: O(n log n) time, O(n) extra space
 */
export function longestIncreasingSubsequence(arr: number[]): number[] {
  const n = arr.length;
  if (n === 0) return [];

  // `tails[i]` holds the index of the smallest possible tail
  // of an increasing subsequence of length i+1.
  const tails: number[] = [];

  // `prevIdx[i]` stores the index of the predecessor of arr[i] in the LIS.
  const prevIdx = new Array<number>(n).fill(-1);

  // Helper: binary search for the leftmost position >= target
  const lowerBound = (target: number, end: number): number => {
    let lo = 0;
    let hi = end; // exclusive
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (arr[tails[mid]] < target) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  };

  for (let i = 0; i < n; i++) {
    // Find where arr[i] fits in the current tails
    const pos = lowerBound(arr[i], tails.length);

    // Record predecessor (only if we are not starting a new length‑1 subsequence)
    if (pos > 0) {
      prevIdx[i] = tails[pos - 1];
    }

    // Update tails: either extend or replace
    if (pos === tails.length) {
      tails.push(i);
    } else {
      tails[pos] = i;
    }
  }

  // Reconstruct the LIS by walking backwards from the last index stored in tails
  const lis: number[] = [];
  let k = tails[tails.length - 1];
  while (k !== -1) {
    lis.push(arr[k]);
    k = prevIdx[k];
  }
  lis.reverse(); // we built it backwards

  return lis;
}

/* --------------------------------------------------------------
   Example usage / simple test harness
   -------------------------------------------------------------- */
if (require.main === module) {
  // Run a quick demo when the file is executed directly (node file.js)
  const examples: number[][] = [
    [10, 9, 2, 5, 3, 7, 101, 18],
    [0, 1, 0, 3, 2, 3],
    [7, 7, 7, 7, 7],
    [],
    [1, 2, 3, 4, 5],
    [5, 4, 3, 2, 1],
    [3, 4, -1, 0, 6, 2, 3],
  ];

  for (const arr of examples) {
    console.log('Input :', arr);
    console.log('LIS   :', longestIncreasingSubsequence(arr));
    console.log('Length:', longestIncreasingSubsequence(arr).length);
    console.log('---');
  }
}
export function lisDP(arr: number[]): number[] {
  const n = arr.length;
  if (n === 0) return [];

  const dp = new Array<number>(n).fill(1);      // length of LIS ending at i
  const prev = new Array<number>(n).fill(-1);   // predecessor index

  let maxLen = 1;
  let maxIdx = 0;

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[j] < arr[i] && dp[j] + 1 > dp[i]) {
        dp[i] = dp[j] + 1;
        prev[i] = j;
      }
    }
    if (dp[i] > maxLen) {
      maxLen = dp[i];
      maxIdx = i;
    }
  }

  // Reconstruct
  const lis: number[] = [];
  for (let k = maxIdx; k !== -1; k = prev[k]) {
    lis.push(arr[k]);
  }
  lis.reverse();
  return lis;
}
# Save the file as lis.ts, then compile & run:
tsc lis.ts && node lis.js
Input : [ 10, 9, 2, 5, 3, 7, 101, 18 ]
LIS   : [ 2, 3, 7, 101 ]
Length: 4
---
Input : [ 0, 1, 0, 3, 2, 3 ]
LIS   : [ 0, 1, 2, 3 ]
Length: 4
---
...
import { longestIncreasingSubsequence } from './lis';

// Example: find LIS of a user‑provided array
function handleUserArray(input: unknown) {
  if (!Array.isArray(input) || !input.every(v => typeof v === 'number')) {
    throw new Error('Expected an array of numbers');
  }
  const lis = longestIncreasingSubsequence(input as number[]);
  console.log('Longest increasing subsequence:', lis);
}
export const lisLength = (arr: number[]) => longestIncreasingSubsequence(arr).length;
