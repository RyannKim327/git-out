/**
 * Returns the LCS length of two strings.
 */
export function lcsLength(a: string, b: string): number {
  const m = a.length;
  const n = b.length;

  // dp[i][j] = LCS length of a[0..i-1] and b[0..j-1]
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
}

/**
 * Returns the actual longest common subsequence.
 * In case of multiple LCS of the same length, the one found
 * will consist of the characters chosen by the DP traversal.
 */
export function lcs(a: string, b: string): string {
  const m = a.length;
  const n = b.length;

  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  // Build the DP table – same recurrence as in lcsLength
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to rebuild the sequence
  let i = m;
  let j = n;
  const seq: string[] = [];

  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      seq.push(a[i - 1]); // they match
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--; // move up
    } else {
      j--; // move left
    }
  }

  return seq.reverse().join('');
}
const a = "AGGTAB";
const b = "GXTXAYB";

console.log(lcsLength(a, b)); // 4
console.log(lcs(a, b));       // "GTAB"
