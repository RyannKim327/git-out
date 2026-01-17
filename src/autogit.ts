/**
 * Return the longest common subsequence of `a` and `b`.
 *
 * @param a - first string
 * @param b - second string
 * @returns the LCS (may be empty if nothing matches)
 */
export function lcs(a: string, b: string): string {
  const n = a.length;
  const m = b.length;

  // dp[i][j] = length of LCS of a[0..i-1] and b[0..j-1]
  const dp: number[][] = Array.from({ length: n + 1 }, () =>
    new Array(m + 1).fill(0)
  );

  // Fill table
  for (let i = 1; i <= n; i++) {
    const ca = a.charAt(i - 1);
    for (let j = 1; j <= m; j++) {
      if (ca === b.charAt(j - 1)) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Reconstruct the LCS from the table
  let i = n, j = m;
  const chars: string[] = [];

  while (i > 0 && j > 0) {
    if (a.charAt(i - 1) === b.charAt(j - 1)) {
      chars.push(a.charAt(i - 1)); // or b.charAt(j - 1)
      i--; j--;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      i--;                        // move up
    } else {
      j--;                        // move left
    }
  }

  return chars.reverse().join('');
}
const s1 = 'ABCBDAB';
const s2 = 'BDCABC';

console.log(lcs(s1, s2)); // -> "BCAB"
