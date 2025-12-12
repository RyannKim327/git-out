/**
 * Returns the longest common subsequence of two strings.
 * If multiple LCS exist, returns the first one found.
 */
export function lcs(a: string, b: string): string {
  const m = a.length;
  const n = b.length;

  // 1. Build the DP table
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1] + 1
          : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  // 2. Reconstruct the subsequence
  const result: string[] = [];
  let i = m;
  let j = n;
  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      result.push(a[i - 1]); // match found
      i--;
      j--;
    } else {
      // move to the cell with the larger value
      if (dp[i - 1][j] >= dp[i][j - 1]) i--;
      else j--;
    }
  }

  return result.reverse().join("");
}

/* Example usage */
console.log(lcs("ABCBDAB", "BDCAB")); // → "BCAB"
