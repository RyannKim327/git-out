function longestCommonSubsequence(str1: string, str2: string): string {
    const m = str1.length;
    const n = str2.length;
    
    // Create DP table with (m+1) rows and (n+1) columns initialized to 0
    const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    
    // Build DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                // Characters match - extend previous subsequence
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                // Take maximum of left or upper value
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    // Backtrack to find the LCS characters
    let i = m;
    let j = n;
    const lcsChars: string[] = [];
    
    while (i > 0 && j > 0) {
        if (str1[i - 1] === str2[j - 1]) {
            // Found common character, add to result
            lcsChars.unshift(str1[i - 1]);
            i--;
            j--;
        } else {
            // Move to the cell with the higher value
            dp[i - 1][j] > dp[i][j - 1] ? i-- : j--;
        }
    }
    
    return lcsChars.join('');
}

// Example usage:
const str1 = "ABCBDAB";
const str2 = "BDCAB";
console.log(longestCommonSubsequence(str1, str2)); // Outputs "BDAB" (or "BCAB" depending on path)
