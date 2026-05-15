dp[i][j] = length of longest common suffix of s1[0…i] and s2[0…j]
if s1[i] === s2[j]
    dp[i][j] = dp[i‑1][j‑1] + 1
else
    dp[i][j] = 0
/**
 * Returns the longest common substring of two strings.
 * If there are multiple substrings of the same maximal length,
 * the first one encountered is returned.
 */
function longestCommonSubstring(a: string, b: string): string {
    if (!a || !b) return "";

    const n = a.length;
    const m = b.length;

    // Use a 1‑D array to hold the previous row of DP values.
    let prev = new Array(m + 1).fill(0);
    let curr = new Array(m + 1).fill(0);

    let bestLen = 0;
    let bestEndIdxInA = 0; // index in `a` where the best substring ends

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (a[i - 1] === b[j - 1]) {
                curr[j] = prev[j - 1] + 1;
                if (curr[j] > bestLen) {
                    bestLen = curr[j];
                    bestEndIdxInA = i;
                }
            } else {
                curr[j] = 0;
            }
        }
        // swap references for the next iteration
        [prev, curr] = [curr, prev];
    }

    if (bestLen === 0) return "";
    return a.slice(bestEndIdxInA - bestLen, bestEndIdxInA);
}
console.log(longestCommonSubstring("ABCDXYZ", "XYZABCD"));   // → "ABCD"
console.log(longestCommonSubstring("abcde", "fgh"));        // → ""
console.log(longestCommonSubstring("abcPQRSTabc", "XYabcZ")); // → "abc"
