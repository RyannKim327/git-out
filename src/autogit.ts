/**
 * Returns the longest increasing subsequence (strictly increasing).
 * If several LIS exist, the one that ends with the smallest possible
 * values is returned (canonical result).
 *
 * @param nums array of numbers
 */
export function longestIncreasingSubsequence(nums: number[]): number[] {
  if (nums.length === 0) return [];

  const n = nums.length;
  const tailIdx: number[] = [];      // tailIdx[len] = index of smallest tail of length `len+1`
  const prev: number[] = new Array(n); // prev[i] = index of previous element in LIS ending at i

  for (let i = 0; i < n; ++i) {
    const num = nums[i];

    // Binary-search in tailIdx for the first length s.t. nums[tailIdx[len]] >= num
    let lo = 0;
    let hi = tailIdx.length;

    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (nums[tailIdx[mid]] < num) lo = mid + 1;
      else hi = mid;
    }

    if (lo > 0) prev[i] = tailIdx[lo - 1];
    else prev[i] = -1;

    if (lo === tailIdx.length) tailIdx.push(i);
    else if (num < nums[tailIdx[lo]]) tailIdx[lo] = i;
  }

  // Reconstruct the sequence walking backwards through prev[]
  const lis: number[] = [];
  let k = tailIdx[tailIdx.length - 1];
  while (k !== -1) {
    lis.push(nums[k]);
    k = prev[k];
  }
  return lis.reverse();
}

/* ---------- Quick sanity checks ---------- */
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it('handles empty input', () => {
    expect(longestIncreasingSubsequence([])).toEqual([]);
  });
  it('returns the LIS', () => {
    expect(longestIncreasingSubsequence([10, 9, 2, 5, 3, 7, 101, 18]))
      .toEqual([2, 3, 7, 18]);
  });
  it('handles duplicates by strict increase', () => {
    expect(longestIncreasingSubsequence([1, 3, 2, 3, 4, 1, 5]))
      .toEqual([1, 2, 3, 4, 5]);
  });
}
const arr = [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15];
console.log(longestIncreasingSubsequence(arr));
// → [0, 2, 6, 9, 11, 15]
