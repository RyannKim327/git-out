/**
 * Returns the longest increasing subsequence (strictly increasing)
 * of the input array.  Runs in O(n log n).
 */
export function longestIncreasingSubsequence<T>(arr: T[]): T[] {
  if (arr.length === 0) return [];

  const n = arr.length;
  const tailIdx: number[] = [];        // tailIdx[len] = index of last element of subsequence of length len+1
  const parent: number[] = Array(n);  // parent[i] = index of previous element in LIS ending at i

  for (let i = 0; i < n; ++i) {
    // binary search on the tail values
    let left = 0;
    let right = tailIdx.length;

    while (left < right) {
      const mid = (left + right) >> 1;
      if (arr[tailIdx[mid]] < arr[i]) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    const pos = left; // insertion point
    if (pos > 0) parent[i] = tailIdx[pos - 1];
    else parent[i] = -1;

    if (pos === tailIdx.length) tailIdx.push(i);
    else tailIdx[pos] = i;
  }

  // Reconstruct the LIS by walking back through parent links
  const lis: T[] = [];
  let k = tailIdx[tailIdx.length - 1];
  while (k !== -1) {
    lis.push(arr[k]);
    k = parent[k];
  }
  return lis.reverse();
}

/* ---------- quick sanity check ---------- */
if (import.meta.vitest) {
  const { expect, test } = import.meta.vitest;
  test('LIS', () => {
    expect(longestIncreasingSubsequence([10, 9, 2, 5, 3, 7, 101, 18]))
      .toStrictEqual([2, 3, 7, 18]);
    expect(longestIncreasingSubsequence([0, 1, 0, 3, 2, 3]))
      .toStrictEqual([0, 1, 2, 3]);
    expect(longestIncreasingSubsequence([7, 7, 7, 7])).toStrictEqual([7]);
    expect(longestIncreasingSubsequence([])).toStrictEqual([]);
  });
}
const nums = [3, 4, 1, 8, 2, 6, 7];
console.log(longestIncreasingSubsequence(nums)); // [1, 2, 6, 7]
