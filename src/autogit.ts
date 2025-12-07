/**
 * Returns the longest strictly increasing subsequence in `nums`.
 * If several LIS exist, the one that finishes earliest is returned.
 */
export function longestIncreasingSubsequence(nums: number[]): number[] {
  const n = nums.length;
  if (n === 0) return [];

  // tail[i] = index in nums of the smallest tail value of any increasing
  // subsequence of length (i+1) found so far.
  const tail: number[] = [];

  // predecessor[i] = index of previous element in the LIS ending at i.
  const predecessor: number[] = new Array(n).fill(-1);

  for (let i = 0; i < n; i++) {
    const val = nums[i];

    // Binary search on tail indices
    let left = 0;
    let right = tail.length;

    while (left < right) {
      const mid = (left + right) >> 1;
      if (nums[tail[mid]] < val) left = mid + 1;
      else right = mid;
    }

    // left is the length of the LIS we can extend
    if (left > 0) predecessor[i] = tail[left - 1];

    if (left === tail.length) tail.push(i);
    else if (val < nums[tail[left]]) tail[left] = i;
  }

  // Reconstruct the sequence
  const lis: number[] = [];
  let k = tail[tail.length - 1];
  while (k !== -1) {
    lis.push(nums[k]);
    k = predecessor[k];
  }
  return lis.reverse();
}

/* ---------- Quick sanity checks ---------- */
if (import.meta.vitest) {
  const { expect, it } = import.meta.vitest;
  it('handles typical cases', () => {
    expect(longestIncreasingSubsequence([10, 9, 2, 5, 3, 7, 101, 18]))
      .toEqual([2, 3, 7, 18]);
    expect(longestIncreasingSubsequence([0, 1, 0, 3, 2, 3]))
      .toEqual([0, 1, 2, 3]);
    expect(longestIncreasingSubsequence([7, 7, 7, 7])).toEqual([7]);
    expect(longestIncreasingSubsequence([])).toEqual([]);
  });
}
