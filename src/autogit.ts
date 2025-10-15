function longestCommonSubsequence(str1: string, str2: string): string {
    const m = str1.length;
    const n = str2.length;
    
    // Create a 2D DP table
    const dp: number[][] = Array(m + 1)
        .fill(0)
        .map(() => Array(n + 1).fill(0));
    
    // Fill the DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    // Backtrack to construct the LCS
    let i = m;
    let j = n;
    let lcs = '';
    
    while (i > 0 && j > 0) {
        if (str1[i - 1] === str2[j - 1]) {
            lcs = str1[i - 1] + lcs;
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }
    
    return lcs;
}

// Alternative function that returns the length only
function lcsLength(str1: string, str2: string): number {
    const m = str1.length;
    const n = str2.length;
    
    const dp: number[][] = Array(m + 1)
        .fill(0)
        .map(() => Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[m][n];
}

// Usage example
const str1 = "ABCDGH";
const str2 = "AEDFHR";

console.log(`LCS: "${longestCommonSubsequence(str1, str2)}"`); // Output: "ADH"
console.log(`LCS Length: ${lcsLength(str1, str2)}`); // Output: 3

// Another example
const str3 = "AGGTAB";
const str4 = "GXTXAYB";
console.log(`LCS: "${longestCommonSubsequence(str3, str4)}"`); // Output: "GTAB"
console.log(`LCS Length: ${lcsLength(str3, str4)}`); // Output: 4
function lcsLengthOptimized(str1: string, str2: string): number {
    const m = str1.length;
    const n = str2.length;
    
    if (m < n) {
        // Use the shorter string for the outer loop to optimize space
        return lcsLengthOptimized(str2, str1);
    }
    
    const prev = new Array(n + 1).fill(0);
    const curr = new Array(n + 1).fill(0);
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                curr[j] = prev[j - 1] + 1;
            } else {
                curr[j] = Math.max(prev[j], curr[j - 1]);
            }
        }
        [prev, curr] = [curr, prev]; // Swap arrays
        curr.fill(0); // Reset current array
    }
    
    return prev[n];
}
