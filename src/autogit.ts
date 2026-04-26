/**
 * Find the longest common subsequence between two strings.
 *
 * @param a First string.
 * @param b Second string.
 * @returns The LCS string (empty if there is none).
 */
export function longestCommonSubsequence(a: string, b: string): string {
  const n = a.length
  const m = b.length

  // 1‑based DP table, size (n+1) × (m+1)
  const dp: number[][] = Array.from({ length: n + 1 }, () =>
    Array(m + 1).fill(0)
  )

  // Build the DP table
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }

  // Reconstruct the LCS from the table
  let i = n
  let j = m
  const lcs: string[] = []

  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      lcs.push(a[i - 1]) // characters match – part of LCS
      i--
      j--
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      i--
    } else {
      j--
    }
  }

  return lcs.reverse().join("")
}
import { longestCommonSubsequence } from "./lcs"

const s1 = "AGGTAB"
const s2 = "GXTXAYB"

console.log(longestCommonSubsequence(s1, s2)) // → "GTAB"
