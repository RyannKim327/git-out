function lcs(a: string, b: string): string {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const dp: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Re‑construct the subsequence
  let i = rows - 1, j = cols - 1;
  const res: string[] = [];
  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      res.push(a[i - 1]);          // same character in both strings
      i--; j--;                    // move diagonally
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      i--;                          // move up
    } else {
      j--;                          // move left
    }
  }
  return res.reverse().join('');
}
console.log(lcs("AGGTAB", "GXTXAYB")); // → "GTAB"
// lcs.ts
export function lcs(a: string, b: string): string {
  // ...implementation as above...
}

// example usage
import { lcs } from './lcs';
console.log(lcs('abcbdab', 'bdcaba')); // prints bcdab
