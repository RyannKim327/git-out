type LISResult = { l: number; seq: number[] };

/**
 * Longest Increasing Subsequence – O(n²) DP
 *
 * @param arr numeric array
 * @returns object with length and the LIS itself
 */
export function lisO2(arr: number[]): LISResult {
  if (arr.length === 0) return { l: 0, seq: [] };

  // Each element keeps the LIS length that ends at that index
  const dp = Array(arr.length).fill(1);
  // For reconstruction: previous index in the LIS ending at i
  const prev = Array(arr.length).fill(-1);

  for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[j] < arr[i] && dp[j] + 1 > dp[i]) {
        dp[i] = dp[j] + 1;
        prev[i] = j;
      }
    }
  }

  // Find index of max length
  let maxIdx = 0;
  for (let i = 1; i < dp.length; i++) {
    if (dp[i] > dp[maxIdx]) maxIdx = i;
  }

  // Reconstruct the sequence
  const seq: number[] = [];
  for (let k = maxIdx; k !== -1; k = prev[k]) {
    seq.push(arr[k]);
  }
  seq.reverse();

  return { l: dp[maxIdx], seq };
}
type LISResult = { l: number; seq: number[] };

/**
 * Longest Increasing Subsequence – O(n log n) patience sorting
 *
 * @param arr numeric array
 * @returns object with length and the LIS itself
 */
export function lisOLogN(arr: number[]): LISResult {
  if (arr.length === 0) return { l: 0, seq: [] };

  /*  `tails[i]` holds the last value of a subsequence of length i+1
      that we’ve seen so far.  It is always the smallest possible tail,
      which gives us the chance to extend it later. */
  const tails: number[] = [];
  const indices: number[] = [];         // indices of chosen tails in `arr`
  const prevIdx: number[] = Array.from({ length: arr.length }, () => -1);

  for (let i = 0; i < arr.length; i++) {
    const val = arr[i];
    // Binary search: find first tail that is >= val
    let l = 0, r = tails.length;
    while (l < r) {
      const mid = (l + r) >> 1;
      if (tails[mid] < val) l = mid + 1;
      else r = mid;
    }

    // l is the length (0‑based) of the subsequence we’re updating
    if (l === tails.length) {
      tails.push(val);
      indices.push(i);
    } else {
      tails[l] = val;
      indices[l] = i;
    }

    // Link to predecessor if this is not the first element
    if (l > 0) prevIdx[i] = indices[l - 1];
  }

  // Reconstruct the sequence from the last index (indices[tails.length-1])
  let seq: number[] = [];
  for (let k = indices[tails.length - 1]; k !== -1; k = prevIdx[k]) {
    seq.push(arr[k]);
  }
  seq.reverse();

  return { l: tails.length, seq };
}
const arr = [3, 10, 2, 1, 20];
console.log(lisO2(arr));      // { l: 3, seq: [ 3, 10, 20 ] }
console.log(lisOLogN(arr));   // same output
