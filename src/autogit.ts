/**
 * Returns the longest increasing subsequence of `nums`.
 * If several LIS exist, the one that finishes earliest is returned.
 */
export function longestIncreasingSubsequence<T>(nums: T[]): T[] {
  if (nums.length === 0) return [];

  const prev: number[] = new Array(nums.length);   // predecessor index
  const tailIdx: number[] = [-1];                  // tailIdx[len] = index of last element of an increasing subsequence of length `len`
  const cmp = (a: T, b: T) => (a as any) - (b as any); // default comparator

  for (let i = 0; i < nums.length; ++i) {
    const val = nums[i];

    // Binary-search in the tail indices
    let left = 1, right = tailIdx.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (cmp(nums[tailIdx[mid]], val) < 0) left = mid + 1;
      else right = mid - 1;
    }

    const len = left;                     // length of the subsequence we can extend
    prev[i] = tailIdx[len - 1] ?? -1;     // predecessor of i
    tailIdx[len] = i;                   // extend / replace
    if (len === tailIdx.length) tailIdx.push(-1);
  }

  // Reconstruct the sequence
  const lis: T[] = [];
  let k = tailIdx[tailIdx.length - 1];    // index of last element of the LIS
  while (k !== -1) {
    lis.push(nums[k]);
    k = prev[k];
  }
  return lis.reverse();
}

/* ---------- demo ---------- */
const arr = [10, 9, 2, 5, 3, 7, 101, 18];
console.log(longestIncreasingSubsequence(arr)); // → [2, 3, 7, 18]
