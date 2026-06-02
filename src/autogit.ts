/**
 * Returns the longest common subsequence of a and b.
 * Complexity: O(a.length * b.length) time | O(a.length * b.length) space
 */
export function longestCommonSubsequence(a: string, b: string): string {
  const m = a.length;
  const n = b.length;

  // dp[i][j] = LCS length of a[0..i-1] and b[0..j-1]
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  // Build the table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Back‑track to reconstruct one LCS
  let i = m;
  let j = n;
  const lcsChars: string[] = [];

  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      // Matches – this character is part of the LCS
      lcsChars.push(a[i - 1]);
      i--;
      j--;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      i--;          // move up
    } else {
      j--;          // move left
    }
  }

  // The chars were collected backwards, reverse them
  return lcsChars.reverse().join('');
}
console.log(longestCommonSubsequence('abcdef', 'acbcf')); // outputs "abcf"
console.log(longestCommonSubsequence('AGGTAB', 'GXTXAYB')); // outputs "GTAB"
