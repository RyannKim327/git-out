/**
 * Returns the longest common subsequence of two strings.
 *
 * @param a The first string.
 * @param b The second string.
 * @returns The LCS string.
 */
export function lcs(a: string, b: string): string {
  const m = a.length;
  const n = b.length;

  // dp[i][j] will hold the length of LCS of a[0..i-1] and b[0..j-1].
  // We keep one extra row/column at index 0 for the empty prefix.
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  // Build the table bottom‑up.
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Reconstruct one LCS by walking back through the table.
  let i = m, j = n;
  const chars: string[] = [];

  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      // The character is part of the LCS.
      chars.push(a[i - 1]);
      i--;
      j--;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      i--;          // Move up.
    } else {
      j--;          // Move left.
    }
  }

  // The chars array holds the LCS in reverse order.
  return chars.reverse().join('');
}
const s1 = "AGGTAB";
const s2 = "GXTXAYB";

console.log(lcs(s1, s2)); // "GTAB"
