/**
 * Returns the longest strictly increasing subsequence of `arr`.
 *
 * Example:
 *   longestIncreasingSubsequence([10, 9, 2, 5, 3, 7, 101, 18])
 *   → [2, 3, 7, 101]
 */
export function longestIncreasingSubsequence(arr: number[]): number[] {
  if (arr.length === 0) return [];

  // `tails` keeps the smallest tail value for all subsequences
  // of a given length. `tails[i]` is the least possible tail of
  // an increasing subsequence with length i+1.
  const tails: number[] = [];
  // `prevIndices` remembers, for each element, the index of its
  // predecessor in the LIS that passes through that element.
  const prevIndices: number[] = new Array(arr.length).fill(-1);
  // `indicesAtLength` holds the index of the last element of the LIS
  // of a given length, allowing us to reconstruct the sequence.
  const indicesAtLength: number[] = [];

  arr.forEach((val, idx) => {
    // Binary search for the first tail that is >= val
    let l = 0;
    let r = tails.length;
    while (l < r) {
      const m = Math.floor((l + r) / 2);
      if (tails[m] < val) l = m + 1;
      else r = m;
    }

    // `l` is the length (0‑based) of the subsequence that will end at idx
    if (l > 0) prevIndices[idx] = indicesAtLength[l - 1];

    if (l === tails.length) {
      tails.push(val);
      indicesAtLength.push(idx);
    } else {
      tails[l] = val;
      indicesAtLength[l] = idx;
    }
  });

  // Reconstruct the LIS from the recorded indices
  const lis: number[] = [];
  let k = indicesAtLength[indicesAtLength.length - 1];
  while (k !== -1) {
    lis.push(arr[k]);
    k = prevIndices[k];
  }
  lis.reverse();
  return lis;
}
const data = [3, 10, 2, 1, 20];
console.log(longestIncreasingSubsequence(data));
// → [3, 10, 20]
