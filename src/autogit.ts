dp[i][j] = length of LCS of A[0..i‑1] and B[0..j‑1]
if A[i‑1] === B[j‑1]   → dp[i][j] = dp[i‑1][j‑1] + 1
else                  → dp[i][j] = max(dp[i‑1][j], dp[i][j‑1])
/**
 * Returns the length of the longest common subsequence of two strings.
 * Uses O(min(m,n)) extra space (two rows of the DP matrix).
 *
 * @param a First string
 * @param b Second string
 * @returns Length of the LCS
 */
export function lcsLengthOptimised(a: string, b: string): number {
  // Ensure we allocate the smaller dimension for the DP rows.
  if (a.length < b.length) return lcsLengthOptimised(b, a);

  const m = a.length;
  const n = b.length;

  // Two rows: previous and current.
  let prev = new Uint16Array(n + 1); // Uint16 is enough for typical string lengths (< 65535)
  let cur = new Uint16Array(n + 1);

  for (let i = 1; i <= m; i++) {
    const ai = a.charAt(i - 1);
    for (let j = 1; j <= n; j++) {
      if (ai === b.charAt(j - 1)) {
        cur[j] = prev[j - 1] + 1;
      } else {
        cur[j] = Math.max(prev[j], cur[j - 1]);
      }
    }
    // swap rows for next iteration
    const tmp = prev;
    prev = cur;
    cur = tmp;
  }

  // After the last swap, `prev` holds the final row.
  return prev[n];
}

/**
 * Returns the actual longest common subsequence string.
 * This version builds the full DP matrix (O(m·n) space) to make back‑tracking easy.
 *
 * @param a First string
 * @param b Second string
 * @returns The LCS string (empty string if none)
 */
export function lcs(a: string, b: string): string {
  const m = a.length;
  const n = b.length;

  // dp[i][j] = length of LCS of a[0..i-1] and b[0..j-1]
  const dp: Uint16Array[] = Array.from({ length: m + 1 }, () => new Uint16Array(n + 1));

  // Fill DP table
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

  // Reconstruct the subsequence by walking backwards
  const result: string[] = [];
  let i = m;
  let j = n;
  while (i > 0 && j > 0) {
    if (a.charAt(i - 1) === b.charAt(j - 1)) {
      // Character belongs to LCS
      result.push(a.charAt(i - 1));
      i--;
      j--;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      i--; // Move up
    } else {
      j--; // Move left
    }
  }

  // `result` was built backwards, so reverse it.
  return result.reverse().join('');
}

/**
 * Simple wrapper that returns both length and subsequence.
 *
 * @param a First string
 * @param b Second string
 * @returns Object containing length and the subsequence itself
 */
export function lcsInfo(a: string, b: string): { length: number; subsequence: string } {
  const subsequence = lcs(a, b);
  return { length: subsequence.length, subsequence };
}

/* --------------------------------------------------------------
   Demo / quick test
   -------------------------------------------------------------- */
if (require.main === module) {
  const s1 = "AGGTAB";
  const s2 = "GXTXAYB";

  console.log(`String 1: ${s1}`);
  console.log(`String 2: ${s2}`);

  console.log("\n--- Using full DP (returns the subsequence) ---");
  const { length, subsequence } = lcsInfo(s1, s2);
  console.log(`LCS length: ${length}`);
  console.log(`LCS: ${subsequence}`); // Expected: "GTAB"

  console.log("\n--- Using space‑optimised length only ---");
  console.log(`LCS length (optimised): ${lcsLengthOptimised(s1, s2)}`);
}
import { lcs, lcsLengthOptimised, lcsInfo } from "./lcs";

// Example strings
const a = "ABCDGH";
const b = "AEDFHR";

console.log(lcs(a, b));               // → "ADH"
console.log(lcsLengthOptimised(a, b)); // → 3
console.log(lcsInfo(a, b));            // → { length: 3, subsequence: 'ADH' }
