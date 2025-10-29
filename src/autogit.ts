dp[i][j] = dp[i-1][j-1] + 1
dp[i][j] = 0
function longestCommonSubstring(str1: string, str2: string): string {
    const m = str1.length;
    const n = str2.length;
    const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    let maxLength = 0;
    let endIndex = 0; // End index of the longest common substring in str1

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                if (dp[i][j] > maxLength) {
                    maxLength = dp[i][j];
                    endIndex = i;
                }
            } else {
                dp[i][j] = 0;
            }
        }
    }

    return str1.slice(endIndex - maxLength, endIndex);
}

// Example usage:
console.log(longestCommonSubstring("ABABC", "BABCA")); // Output: "BABC"
