/**
 * Returns the longest increasing subsequence (strictly increasing).
 * If several have the same maximum length, the one that ends first is returned.
 */
export function longestIncreasingSubsequence<T>(arr: T[]): T[] {
  if (arr.length === 0) return [];

  const n = arr.length;
  const tailIdx: number[] = [];      // tailIdx[len] = index of best tail of length len+1
  const parent: number[] = new Array(n).fill(-1); // predecessor pointer for reconstruction

  for (let i = 0; i < n; i++) {
    const val = arr[i];

    // Binary search on the tail indices
    let left = 0;
    let right = tailIdx.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[tailIdx[mid]] < val) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    const pos = left;                 // pos == length of best subsequence ending at i
    if (pos > 0) parent[i] = tailIdx[pos - 1];
    if (pos === tailIdx.length) {
      tailIdx.push(i);
    } else if (arr[tailIdx[pos]] > val) {
      tailIdx[pos] = i;               // replace with smaller tail
    }
  }

  // Reconstruct the sequence by following parent pointers
  const lis: T[] = [];
  let k = tailIdx[tailIdx.length - 1];
  while (k !== -1) {
    lis.push(arr[k]);
    k = parent[k];
  }
  return lis.reverse();
}

/* ---------- demo ---------- */
if (require.main === module) {
  const data = [10, 9, 2, 5, 3, 7, 101, 18];
  console.log(longestIncreasingSubsequence(data)); // → [2, 3, 7, 18]
}
