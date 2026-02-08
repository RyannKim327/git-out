/**
 * Finds the longest increasing subsequence of an array.
 *
 * @param arr Numeric array (any integers or floats, any sign).
 * @returns Object containing the LIS and its length.
 */
export function longestIncreasingSubsequence(arr: number[]): { seq: number[]; length: number } {
  if (arr.length === 0) return { seq: [], length: 0 };

  // tails[i] — minimal tail of an LIS of length i+1 found so far
  const tails: number[] = [];
  // prevIndices[i] — index of the previous element in the LIS that ends at arr[i]
  const prevIndices: number[] = Array(arr.length).fill(-1);
  // indexInTails[i] — will store the index in tails where arr[i] was placed
  const indexInTails: number[] = Array(arr.length).fill(0);

  for (let i = 0; i < arr.length; i++) {
    const num = arr[i];

    // Binary search: first index in tails where tails[idx] >= num
    let lo = 0,
      hi = tails.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (tails[mid] < num) lo = mid + 1;
      else hi = mid;
    }

    // lo is the length of the new subsequence minus one
    indexInTails[i] = lo;
    if (lo >= tails.length) tails.push(num);
    else tails[lo] = num;

    // Link to previous element of the subsequence
    if (lo > 0) prevIndices[i] = tailsIdx[lo - 1];
  }

  // tailsIdx will hold the indices in the original array that correspond to tails[]
  const tailsIdx: number[] = Array(tails.length);
  const seqIdx: number[] = []; // will hold indices of LIS

  // Reconstruct the sequence by walking backwards using prevIndices
  let k = tailsIdx.length - 1;
  let currentIdx = -1;
  for (let i = arr.length - 1; i >= 0; i--) {
    if (indexInTails[i] === k) {
      seqIdx.push(i); // store index
      k--; // look for previous
      currentIdx = i;
    }
  }
  seqIdx.reverse();

  const seq = seqIdx.map(idx => arr[idx]);

  return { seq, length: seq.length };
}
export function lisLength(arr: number[]): number {
  if (arr.length === 0) return 0;
  const dp = Array(arr.length).fill(1);

  for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j]) dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }
  return Math.max(...dp);
}
const data = [10, 22, 9, 33, 21, 50, 41, 60, 80];
const { seq, length } = longestIncreasingSubsequence(data);

console.log('LIS:', seq);          // [10, 22, 33, 50, 60, 80]
console.log('Length:', length);    // 6
