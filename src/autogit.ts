/**
 * Returns the longest common subsequence (LCS) of two strings.
 * Time  : O(m * n)
 * Space : O(m * n)  (can be reduced to O(min(m,n)) if you only need the length)
 */
export function longestCommonSubsequence(a: string, b: string): { length: number; sequence: string } {
  const m = a.length;
  const n = b.length;

  // 1. DP table: dp[i][j] = length of LCS of a.slice(0,i) and b.slice(0,j)
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

  // 2. Reconstruct the subsequence by walking backwards
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

  return {
    length: dp[m][n],
    sequence: chars.reverse().join(''),
  };
}

/* ---------- quick sanity check ---------- */
if (import.meta.vitest) {
  const { expect, it } = import.meta.vitest;
  it('works', () => {
    expect(longestCommonSubsequence('ABCBDAB', 'BDCAB')).toEqual({
      length: 4,
      sequence: 'BCAB',
    });
  });
}
const result = longestCommonSubsequence('XMJYAUZ', 'MZJAWXU');
console.log(result); // { length: 4, sequence: 'MJAU' }
