/**
 * Returns the longest common subsequence of two strings.
 * Example: lcs('AGGTAB', 'GXTXAYB') → 'GTAB'
 */
function lcs(s1: string, s2: string): string {
  const n = s1.length,
        m = s2.length;

  // dp[i][j] = LCS length for s1[0..i-1] and s2[0..j-1]
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

  // Build the DP table.
  for (let i = 1; i <= n; i++) {
    const a = s1[i - 1];
    for (let j = 1; j <= m; j++) {
      if (a === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Reconstruct the subsequence.
  let i = n,
      j = m,
      result: string[] = [];

  while (i > 0 && j > 0) {
    if (s1[i - 1] === s2[j - 1]) {
      // Character is part of LCS – prepend to answer.
      result.push(s1[i - 1]);
      i--; j--;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      i--;   // move up
    } else {
      j--;   // move left
    }
  }

  return result.reverse().join('');
}
const a = 'AGGTAB';
const b = 'GXTXAYB';

const sub = lcs(a, b);
console.log(`LCS length: ${sub.length}`); // 4
console.log(`LCS itself: ${sub}`);       // GTAB
