function longestCommonSubsequence(str1: string, str2: string): string {
    const m = str1.length;
    const n = str2.length;

    // Create a 2D array to store lengths of longest common subsequence
    const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    // Fill the dp array
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1; // Characters match
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]); // Characters do not match
            }
        }
    }

    // Backtrack to find the LCS
    let lcs = '';
    let i = m, j = n;
    while (i > 0 && j > 0) {
        if (str1[i - 1] === str2[j - 1]) {
            lcs = str1[i - 1] + lcs; // Append character to LCS
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--; // Move up
        } else {
            j--; // Move left
        }
    }

    return lcs; // Return the longest common subsequence
}

// Example usage
const str1 = "AGGTAB";
const str2 = "GXTXAYB";
console.log(longestCommonSubsequence(str1, str2)); // Output: "GTAB"
