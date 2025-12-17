/**
 * Returns the longest common subsequence of `a` and `b`.
 *
 * @param a - first string
 * @param b - second string
 * @returns the LCS string (empty string if there is none)
 *
 * Time   : O(|a| * |b|)
 * Space  : O(|a| * |b|)   (the DP table)
 */
export function longestCommonSubsequence(a: string, b: string): string {
  const m = a.length;
  const n = b.length;

  // dp[i][j] = length of LCS of a[0..i-1] and b[0..j-1]
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array<number>(n + 1).fill(0)
  );

  // Fill the table
  for (let i = 1; i <= m; i++) {
    const ai = a.charAt(i - 1);
    for (let j = 1; j <= n; j++) {
      if (ai === b.charAt(j - 1)) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Back‑track to build the subsequence
  let i = m;
  let j = n;
  const lcsChars: string[] = [];

  while (i > 0 && j > 0) {
    if (a.charAt(i - 1) === b.charAt(j - 1)) {
      // Current characters belong to LCS
      lcsChars.push(a.charAt(i - 1));
      i--;
      j--;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      i--; // Move up
    } else {
      j--; // Move left
    }
  }

  // The characters were collected backwards, reverse them
  return lcsChars.reverse().join('');
}

/* -------------------------------------------------------------
   Example usage
------------------------------------------------------------- */
const s1 = "AGGTAB";
const s2 = "GXTXAYB";

console.log(longestCommonSubsequence(s1, s2)); // → "GTAB"
/**
 * Returns the length of the LCS of `a` and `b`.
 *
 * Uses O(min(|a|,|b|)) extra space.
 */
export function lcsLength(a: string, b: string): number {
  // Ensure `b` is the shorter string to minimise memory.
  if (a.length < b.length) [a, b] = [b, a];

  const m = a.length;
  const n = b.length;

  // `prev` holds dp[i‑1][*], `curr` holds dp[i][*]
  let prev = new Array<number>(n + 1).fill(0);
  let curr = new Array<number>(n + 1).fill(0);

  for (let i = 1; i <= m; i++) {
    const ai = a.charAt(i - 1);
    for (let j = 1; j <= n; j++) {
      if (ai === b.charAt(j - 1)) {
        curr[j] = prev[j - 1] + 1;
      } else {
        curr[j] = Math.max(prev[j], curr[j - 1]);
      }
    }
    // Swap rows for next iteration
    [prev, curr] = [curr, prev];
  }

  // After the final swap `prev` holds the last computed row.
  return prev[n];
}

/* -------------------------------------------------------------
   Example usage
------------------------------------------------------------- */
console.log(lcsLength("AGGTAB", "GXTXAYB")); // → 4 (length of "GTAB")
// lcs.ts
export function longestCommonSubsequence(a: string, b: string): string {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array<number>(n + 1).fill(0)
  );

  for (let i = 1; i <= m; i++) {
    const ai = a.charAt(i - 1);
    for (let j = 1; j <= n; j++) {
      dp[i][j] = ai === b.charAt(j - 1) ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  const result: string[] = [];
  let i = m,
    j = n;
  while (i > 0 && j > 0) {
    if (a.charAt(i - 1) === b.charAt(j - 1)) {
      result.push(a.charAt(i - 1));
      i--;
      j--;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  return result.reverse().join('');
}

export function lcsLength(a: string, b: string): number {
  if (a.length < b.length) [a, b] = [b, a];
  const n = b.length;
  let prev = new Array<number>(n + 1).fill(0);
  let curr = new Array<number>(n + 1).fill(0);

  for (let i = 1; i <= a.length; i++) {
    const ai = a.charAt(i - 1);
    for (let j = 1; j <= n; j++) {
      curr[j] = ai === b.charAt(j - 1) ? prev[j - 1] + 1 : Math.max(prev[j], curr[j - 1]);
    }
    [prev, curr] = [curr, prev];
  }
  return prev[n];
}

/* -------------------------------------------------------------
   Quick test (run with `ts-node lcs.ts` or import in your code)
------------------------------------------------------------- */
if (require.main === module) {
  const s1 = "AGGTAB";
  const s2 = "GXTXAYB";

  console.log("LCS string :", longestCommonSubsequence(s1, s2)); // GTAB
  console.log("LCS length :", lcsLength(s1, s2));                // 4
}
