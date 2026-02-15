/**
 * Returns the longest common subsequence of two strings.
 *
 * @param a First string.
 * @param b Second string.
 * @returns The LCS as a string.
 */
function longestCommonSubsequence(a: string, b: string): string {
  const n = a.length;
  const m = b.length;

  // dp[i][j] = LCS length for a[0..i-1] and b[0..j-1]
  const dp: number[][] = Array(n + 1)
    .fill(null)
    .map(() => Array(m + 1).fill(0));

  // Fill table
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Back‑track to build the subsequence
  let i = n,
    j = m,
    lcs = '';

  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      lcs = a[i - 1] + lcs; // prepend
      i--;
      j--;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  return lcs;
}
console.log(longestCommonSubsequence('ABCDGH', 'AEDFHR')); // → "ADH"
function lcsLength(a: string, b: string): number {
  const n = a.length, m = b.length;
  const dp = Array(n + 1).fill(0).map(() => Array(m + 1).fill(0));

  for (let i = 1; i <= n; i++)
    for (let j = 1; j <= m; j++)
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1] + 1
        : Math.max(dp[i - 1][j], dp[i][j - 1]);

  return dp[n][m];
}
