a = "ABCBDAB"
b = "BDCAB"
LCS = "BCAB"   (length = 4)
if a[i‑1] === b[j‑1]   → dp[i][j] = dp[i‑1][j‑1] + 1
else                   → dp[i][j] = max(dp[i‑1][j], dp[i][j‑1])
/**
 * Returns the longest common subsequence of two strings.
 *
 * @param a - first string
 * @param b - second string
 * @returns the LCS (empty string if there is none)
 *
 * Time  : O(m * n) where m = a.length, n = b.length
 * Space : O(m * n) for the DP table (can be reduced to O(min(m,n)) if you only need the length)
 */
export function longestCommonSubsequence(a: string, b: string): string {
  const m = a.length;
  const n = b.length;

  // Edge case – one of the strings is empty
  if (m === 0 || n === 0) return "";

  // dp[i][j] = length of LCS of a[0..i-1] and b[0..j-1]
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  // Fill the DP table
  for (let i = 1; i <= m; i++) {
    const aChar = a[i - 1];
    for (let j = 1; j <= n; j++) {
      if (aChar === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Reconstruct the LCS string by back‑tracking
  let i = m;
  let j = n;
  const lcsChars: string[] = [];

  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      // Current characters belong to the LCS
      lcsChars.push(a[i - 1]); // or b[j-1], they are equal
      i--;
      j--;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      i--; // Move up
    } else {
      j--; // Move left
    }
  }

  // The characters were collected backwards, reverse them
  return lcsChars.reverse().join("");
}
import { longestCommonSubsequence } from "./lcs";

console.log(longestCommonSubsequence("ABCBDAB", "BDCAB")); // → "BCAB"
console.log(longestCommonSubsequence("AGGTAB", "GXTXAYB")); // → "GTAB"
console.log(longestCommonSubsequence("abcd", "efgh")); // → "" (no common subsequence)
console.log(longestCommonSubsequence("", "anything")); // → ""
export function lcsLength(a: string, b: string): number {
  // Ensure `b` is the shorter string to minimise memory
  if (a.length < b.length) [a, b] = [b, a];

  const prev = new Array(b.length + 1).fill(0);
  const curr = new Array(b.length + 1).fill(0);

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        curr[j] = prev[j - 1] + 1;
      } else {
        curr[j] = Math.max(prev[j], curr[j - 1]);
      }
    }
    // swap buffers for next iteration
    [prev, curr] = [curr, prev];
  }
  return prev[b.length];
}
function assertEqual(actual: string, expected: string, msg: string) {
  if (actual !== expected) {
    console.error(`❌ ${msg}\n   Expected: "${expected}"\n   Got:      "${actual}"`);
  } else {
    console.log(`✅ ${msg}`);
  }
}

// Simple test suite
assertEqual(longestCommonSubsequence("ABCBDAB", "BDCAB"), "BCAB", "example from Wikipedia");
assertEqual(longestCommonSubsequence("AGGTAB", "GXTXAYB"), "GTAB", "classic example");
assertEqual(longestCommonSubsequence("abcd", "efgh"), "", "no common characters");
assertEqual(longestCommonSubsequence("", "anything"), "", "empty first string");
assertEqual(longestCommonSubsequence("same", "same"), "same", "identical strings");
