/**
 * Returns the longest common subsequence of two strings.
 * @param a first string
 * @param b second string
 * @returns the LCS (empty string if none)
 */
export function longestCommonSubsequence(a: string, b: string): string {
  const m = a.length;
  const n = b.length;

  // 1. Build DP table of lengths.
  //    dp[i][j] = LCS length of a.slice(0, i) and b.slice(0, j)
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array<number>(n + 1).fill(0)
  );

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // 2. Reconstruct the actual subsequence by walking backwards.
  let i = m;
  let j = n;
  const chars: string[] = [];

  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      chars.push(a[i - 1]);
      i--;
      j--;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  return chars.reverse().join('');
}

/* ---------- Quick sanity checks ---------- */
if (import.meta.vitest) {
  const { expect, it } = import.meta.vitest;
  it('works', () => {
    expect(longestCommonSubsequence('ABCBDAB', 'BDCAB')).toBe('BCAB');
    expect(longestCommonSubsequence('XMJYAUZ', 'MZJAWXU')).toBe('MJAU');
    expect(longestCommonSubsequence('ABC', 'DEF')).toBe('');
  });
}
console.log(longestCommonSubsequence('AGGTAB', 'GXTXAYB')); // -> GTAB
