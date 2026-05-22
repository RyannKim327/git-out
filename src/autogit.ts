// -------------------------------------------------------------
// 1️⃣  O(n²) DP – intuition + implementation
// -------------------------------------------------------------
function lisDP(arr: number[]): { length: number; sequence: number[] } {
  const n = arr.length;
  if (n === 0) return { length: 0, sequence: [] };

  // dp[i]  – length of LIS that ends at index i
  const dp: number[] = Array(n).fill(1);
  // prev[i] – previous index in the LIS that ends at i
  const prev: number[] = Array(n).fill(-1);

  let bestEnd = 0; // index where the overall best LIS ends

  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < i; ++j) {
      if (arr[j] < arr[i] && dp[j] + 1 > dp[i]) {
        dp[i] = dp[j] + 1;
        prev[i] = j;
      }
    }
    if (dp[i] > dp[bestEnd]) bestEnd = i;
  }

  // Rebuild the sequence
  const seq: number[] = [];
  for (let cur = bestEnd; cur !== -1; cur = prev[cur]) seq.push(arr[cur]);
  seq.reverse();

  return { length: dp[bestEnd], sequence: seq };
}
// -------------------------------------------------------------
// 2️⃣  O(n log n) – patience sorting + back‑tracking
// -------------------------------------------------------------
function lisPatience(arr: number[]): { length: number; sequence: number[] } {
  const n = arr.length;
  if (n === 0) return { length: 0, sequence: [] };

  // tails[i] – index of the smallest tail of LIS with length i+1
  const tails: number[] = [];
  // parentIdx[i] – previous index in LIS that ends at i
  const parentIdx: number[] = Array(n).fill(-1);

  for (let i = 0; i < n; ++i) {
    const x = arr[i];

    // Binary search: first tail >= x
    let lo = 0, hi = tails.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (arr[tails[mid]] < x) lo = mid + 1;
      else hi = mid;
    }

    // lo now points to position where x will go
    if (lo > 0) parentIdx[i] = tails[lo - 1];

    if (lo === tails.length) tails.push(i);
    else tails[lo] = i;
  }

  // Reconstruct sequence
  const seq: number[] = [];
  for (let cur = tails[tails.length - 1]; cur !== -1; cur = parentIdx[cur]) seq.push(arr[cur]);
  seq.reverse();

  return { length: tails.length, sequence: seq };
}
const example = [10, 9, 2, 5, 3, 7, 101, 18];

console.log(lisDP(example));
// → { length: 4, sequence: [ 2, 3, 7, 101 ] }

console.log(lisPatience(example));
// → { length: 4, sequence: [ 2, 3, 7, 101 ] }
