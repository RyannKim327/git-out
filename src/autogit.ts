/**
 * Returns the longest common *contiguous* substring of `a` and `b`.
 *
 * If there are multiple substrings with the same maximum length, the first
 * one that appears in `a` is returned.
 *
 * Time:  O(a.length * b.length)
 * Space: O(a.length * b.length)   (you can trim this to O(a.length) if you’re
 *                                   hunting for a memory‑tight version)
 */
export function longestCommonSubstring(a: string, b: string): string {
  const aLen = a.length;
  const bLen = b.length;

  // A 2‑D array where dp[i][j] holds the length of the longest suffix that
  // ends at a[i-1] and b[j-1].  We use 1‑based indexing to keep the math
  // simple: dp[0][*] and dp[*][0] are zero by construction.
  const dp: number[][] = Array.from({ length: aLen + 1 }, () =>
    new Array(bLen + 1).fill(0)
  );

  let bestLen = 0;
  let bestI = 0; // end index in `a`

  for (let i = 1; i <= aLen; i++) {
    for (let j = 1; j <= bLen; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        if (dp[i][j] > bestLen) {
          bestLen = dp[i][j];
          bestI = i; // slice stops at `i` (exclusive)
        }
      } else {
        dp[i][j] = 0;
      }
    }
  }

  return bestLen > 0 ? a.slice(bestI - bestLen, bestI) : '';
}
console.log(longestCommonSubstring('BANANA', 'ANANAB')); // "ANANA"
console.log(longestCommonSubstring('hello', 'world'));   // ""
console.log(longestCommonSubstring('', 'something'));    // ""
