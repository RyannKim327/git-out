function longestCommonSubstring(s1: string, s2: string): string {
  const n = s1.length;
  const m = s2.length;

  // dp[i][j] => longest suffix length ending at s1[i-1], s2[j-1]
  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

  let maxLen = 0;
  let endIdx = 0; // end index (exclusive) in s1 of the best substring

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        if (dp[i][j] > maxLen) {
          maxLen = dp[i][j];
          endIdx = i; // end is exclusive
        }
      }
    }
  }

  return maxLen === 0 ? "" : s1.slice(endIdx - maxLen, endIdx);
}
console.log(longestCommonSubstring("ABABC", "BABCA")); // “ABC”
function longestCommonSubstringSpaceOptimized(s1: string, s2: string): string {
  // Ensure s2 is the shorter string to keep the inner array small
  if (s1.length < s2.length) {
    return longestCommonSubstringSpaceOptimized(s2, s1);
  }

  const n = s1.length;
  const m = s2.length;

  const prev = Array(m + 1).fill(0);
  const curr = Array(m + 1).fill(0);

  let maxLen = 0;
  let endIdx = 0;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        curr[j] = prev[j - 1] + 1;
        if (curr[j] > maxLen) {
          maxLen = curr[j];
          endIdx = i;
        }
      } else {
        curr[j] = 0;
      }
    }
    // swap references for next iteration
    [prev, curr] = [curr, prev];
  }

  return maxLen === 0 ? "" : s1.slice(endIdx - maxLen, endIdx);
}
console.log(longestCommonSubstringSpaceOptimized("abcdxyz", "xyzabcd")); // "abcd"
console.log(longestCommonSubstringSpaceOptimized("abc", "def"));         // ""
console.log(longestCommonSubstringSpaceOptimized("a", "a"));             // "a"
