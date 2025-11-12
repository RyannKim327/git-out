function longestCommonSubstring(str1: string, str2: string): string {
    const m = str1.length;
    const n = str2.length;
    
    // Initialize DP table with zeros
    const dp: number[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
    
    let maxLength = 0;  // Length of longest common substring found
    let endIndex = 0;   // Ending index of LCS in str1

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                
                if (dp[i][j] > maxLength) {
                    maxLength = dp[i][j];
                    endIndex = i - 1;  // Current end index in str1
                }
            } else {
                dp[i][j] = 0;
            }
        }
    }

    // Extract the longest common substring
    return maxLength === 0 
        ? "" 
        : str1.substring(endIndex - maxLength + 1, endIndex + 1);
}

// Example usage
const string1 = "ABCDFGH";
const string2 = "ACDFGX";
console.log(longestCommonSubstring(string1, string2));  // Outputs "CDFG"
