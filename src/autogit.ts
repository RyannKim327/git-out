/**
 * Returns the longest common subsequence (LCS) of two strings.
 * @param a First string
 * @param b Second string
 * @returns { subsequence: string; length: number }
 */
function longestCommonSubsequence(a: string, b: string) {
  const m = a.length;
  const n = b.length;

  // 1. Build DP matrix (m+1) x (n+1) filled with 0
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  // 2. Fill DP matrix
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // 3. Back‑track to rebuild the subsequence
  let i = m, j = n;
  const subseq: string[] = [];
  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      subseq.push(a[i - 1]); // same char belongs to LCS
      i--;
      j--;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      i--;            // move up
    } else {
      j--;            // move left
    }
  }

  return {
    subsequence: subseq.reverse().join(''),
    length: dp[m][n]
  };
}

// Quick demo
const { subsequence, length } = longestCommonSubsequence('AGCAT', 'GAC');
console.log(`Longest common subsequence: ${subsequence} (length ${length})`);
