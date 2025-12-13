export function longestIncreasingSubsequenceDP(nums: number[]): number[] {
  const n = nums.length;
  if (n === 0) return [];

  // dp[i] = length of LIS ending at i
  const dp = new Array<number>(n).fill(1);
  // prev[i] = previous index in the LIS ending at i (for reconstruction)
  const prev = new Array<number | null>(n).fill(null);

  let maxLen = 1;
  let lastIndex = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i] && dp[j] + 1 > dp[i]) {
        dp[i] = dp[j] + 1;
        prev[i] = j;
      }
    }
    if (dp[i] > maxLen) {
      maxLen = dp[i];
      lastIndex = i;
    }
  }

  // Reconstruct LIS
  const lis: number[] = [];
  let idx: number | null = lastIndex;
  while (idx !== null) {
    lis.push(nums[idx]);
    idx = prev[idx] ?? null;
  }
  lis.reverse();
  return lis;
}
export function longestIncreasingSubsequenceBinSearch(nums: number[]): number[] {
  const n = nums.length;
  if (n === 0) return [];

  const tailIndices = new Array<number>(n); // tailIndices[len] = index of smallest tail for LIS of length len+1
  const prevIndices = new Array<number>(n).fill(-1); // predecessor index for reconstruction

  let length = 0; // current LIS length

  for (let i = 0; i < n; i++) {
    // Binary search for the largest j in [0, length) with nums[tailIndices[j]] < nums[i]
    let low = 0;
    let high = length;
    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      if (nums[tailIndices[mid]] < nums[i]) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    const newLen = low; // position to place nums[i]

    prevIndices[i] = newLen > 0 ? tailIndices[newLen - 1] : -1;
    tailIndices[newLen] = i;

    if (newLen + 1 > length) {
      length = newLen + 1;
    }
  }

  // Reconstruct LIS
  const lis: number[] = new Array(length);
  let k = tailIndices[length - 1];
  for (let idx = length - 1; idx >= 0; idx--) {
    lis[idx] = nums[k];
    k = prevIndices[k];
  }

  return lis;
}
