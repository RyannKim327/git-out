/**
 * Longest Increasing Subsequence – O(n²) DP
 * @param a   input array of numbers
 * @returns   length of LIS
 */
function lisLengthDP(a: number[]): number {
  const n = a.length;
  if (n === 0) return 0;

  const dp = new Array(n).fill(1);   // each element itself

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (a[j] < a[i] && dp[j] + 1 > dp[i]) {
        dp[i] = dp[j] + 1;
      }
    }
  }

  return Math.max(...dp);
}
console.log(lisLengthDP([10, 9, 2, 5, 3, 7, 101, 18])); // 4  (2,3,7,101)
/**
 * Longest Increasing Subsequence – O(n log n)
 * @param a   input array of numbers
 * @returns   length of LIS
 */
function lisLengthNLogN(a: number[]): number {
  const tails: number[] = [];

  for (const x of a) {
    // Binary search: find the first index in tails where tails[idx] >= x
    let left = 0;
    let right = tails.length;
    while (left < right) {
      const mid = (left + right) >>> 1;
      if (tails[mid] < x) left = mid + 1;
      else right = mid;
    }

    // left is the position to replace
    tails[left] = x;
  }

  return tails.length;
}
console.log(lisLengthNLogN([10, 9, 2, 5, 3, 7, 101, 18])); // 4
function lis(a: number[]): number[] {
  const n = a.length;
  if (n === 0) return [];

  const tails: { val: number; idx: number }[] = [];
  const prev: number[] = new Array(n).fill(-1);

  for (let i = 0; i < n; i++) {
    const x = a[i];
    let left = 0;
    let right = tails.length;
    while (left < right) {
      const mid = (left + right) >>> 1;
      if (tails[mid].val < x) left = mid + 1;
      else right = mid;
    }

    const idx = left > 0 ? tails[left - 1].idx : -1;
    prev[i] = idx;

    const entry = { val: x, idx: i };
    if (left === tails.length) tails.push(entry);
    else tails[left] = entry; // keep minimal tail
  }

  // Reconstruct sequence
  const seq: number[] = [];
  let curr = tails[tails.length - 1].idx;
  while (curr !== -1) {
    seq.push(a[curr]);
    curr = prev[curr];
  }
  return seq.reverse();
}

console.log(lis([10, 9, 2, 5, 3, 7, 101, 18])); // [2, 3, 7, 101]
const arr = Array.from({ length: 200_000 }, (_, i) => Math.floor(Math.random() * 1_000_000));

console.time('DP');
lisLengthDP(arr);
console.timeEnd('DP');

console.time('NlogN');
lisLengthNLogN(arr);
console.timeEnd('NlogN');
