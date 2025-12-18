export function longestCommonSubstring(a: string, b: string): string {
  const m = a.length;
  const n = b.length;
  if (m === 0 || n === 0) return "";

  // dp[i][j] = length of longest common suffix of a[0..i-1], b[0..j-1]
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  let maxLen = 0;
  let endIndex = 0; // end index in string a

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        if (dp[i][j] > maxLen) {
          maxLen = dp[i][j];
          endIndex = i;
        }
      } else {
        dp[i][j] = 0;
      }
    }
  }

  return maxLen === 0 ? "" : a.substring(endIndex - maxLen, endIndex);
}
export function longestCommonSubstring(a: string, b: string): string {
  const m = a.length;
  const n = b.length;
  if (m === 0 || n === 0) return "";

  let maxLen = 0;
  let endIndex = 0;

  let prev = new Array<number>(n + 1).fill(0);
  let curr = new Array<number>(n + 1).fill(0);

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        curr[j] = prev[j - 1] + 1;
        if (curr[j] > maxLen) {
          maxLen = curr[j];
          endIndex = i;
        }
      } else {
        curr[j] = 0;
      }
    }
    // roll the rows
    const tmp = prev;
    prev = curr;
    curr = tmp;
    curr.fill(0);
  }

  return maxLen === 0 ? "" : a.substring(endIndex - maxLen, endIndex);
}
