/**
 * Returns the longest common subsequence (LCS) of two strings.
 *
 * @param a - First input string.
 * @param b - Second input string.
 * @returns The LCS string. If there are several LCSs of the same length,
 *          the one that appears first when back‑tracking from the bottom‑right
 *          corner is returned.
 */
export function longestCommonSubsequence(a: string, b: string): string {
  const m = a.length;
  const n = b.length;

  // Edge cases – if either string is empty, LCS is empty.
  if (m === 0 || n === 0) return '';

  // -------------------------------------------------
  // 1️⃣ Build DP table (size (m+1) × (n+1))
  // -------------------------------------------------
  // Using a typed array for speed, but a plain number[][] works too.
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    const ca = a.charAt(i - 1);
    for (let j = 1; j <= n; j++) {
      if (ca === b.charAt(j - 1)) {
        // Characters match → extend previous LCS.
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        // Take the longer of dropping a[i-1] or dropping b[j-1].
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // -------------------------------------------------
  // 2️⃣ Backtrack to reconstruct the subsequence
  // -------------------------------------------------
  const lcsChars: string[] = [];
  let i = m;
  let j = n;

  while (i > 0 && j > 0) {
    if (a.charAt(i - 1) === b.charAt(j - 1)) {
      // Current characters belong to LCS.
      lcsChars.push(a.charAt(i - 1));
      i--;
      j--;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      // Move up – we dropped a[i-1].
      i--;
    } else {
      // Move left – we dropped b[j-1].
      j--;
    }
  }

  // The characters were collected backwards, so reverse them.
  return lcsChars.reverse().join('');
}
import { longestCommonSubsequence } from './lcs';

const s1 = 'AGGTAB';
const s2 = 'GXTXAYB';

const lcs = longestCommonSubsequence(s1, s2);
console.log(lcs); // → "GTAB"
const tests: Array<[string, string, string]> = [
  ['', '', ''],
  ['ABC', '', ''],
  ['', 'XYZ', ''],
  ['ABCDEF', 'FBDAMN', 'BD'],
  ['XMJYAUZ', 'MZJAWXU', 'MJAU'],
  ['ABCDGH', 'AEDFHR', 'ADH'],
  ['AGGTAB', 'GXTXAYB', 'GTAB'],
];

for (const [a, b, expected] of tests) {
  const result = longestCommonSubsequence(a, b);
  console.assert(
    result === expected,
    `LCS(${a}, ${b}) = ${result} (expected ${expected})`
  );
}
export function lcsLength(a: string, b: string): number {
  // Ensure `b` is the shorter string to minimise memory.
  if (a.length < b.length) [a, b] = [b, a];

  const n = b.length;
  let prev = new Array(n + 1).fill(0);
  let curr = new Array(n + 1).fill(0);

  for (let i = 1; i <= a.length; i++) {
    const ca = a.charAt(i - 1);
    for (let j = 1; j <= n; j++) {
      if (ca === b.charAt(j - 1)) {
        curr[j] = prev[j - 1] + 1;
      } else {
        curr[j] = Math.max(prev[j], curr[j - 1]);
      }
    }
    // Swap rows for next iteration.
    [prev, curr] = [curr, prev];
  }
  return prev[n];
}
const lcs = longestCommonSubsequence('AGGTAB', 'GXTXAYB'); // "GTAB"
