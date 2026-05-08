/**
 * Finds the Longest Common Subsequence (LCS) of two strings.
 *
 * @param a – first string
 * @param b – second string
 * @returns an object `{ length, seq }`
 *   * `length` – length of the LCS
 *   * `seq`    – the LCS string itself (empty if none)
 */
export function lcs(a: string, b: string) {
  const m = a.length;
  const n = b.length;

  /* 1. Build DP table:  (m+1) × (n+1) */
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0)
  );

  for (let i = 1; i <= m; i++) {
    const ca = a[i - 1];
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        ca === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  /* 2. Back‑track to recover the sequence */
  let i = m,
    j = n,
    seqArr: string[] = [];

  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      seqArr.push(a[i - 1]); // match – add to subsequence
      i--;
      j--;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      i--; // move up
    } else {
      j--; // move left
    }
  }

  // The string is built backwards, so reverse it
  const seq = seqArr.reverse().join('');
  return { length: dp[m][n], seq };
}
const prev: number[] = Array(n + 1).fill(0);
const curr: number[] = Array(n + 1);
for (let i = 1; i <= m; i++) {
  curr[0] = 0;
  for (let j = 1; j <= n; j++) {
    curr[j] =
      a[i - 1] === b[j - 1]
        ? prev[j - 1] + 1
        : Math.max(prev[j], curr[j - 1]);
  }
  // swap
  [prev, curr] = [curr, prev];
}
