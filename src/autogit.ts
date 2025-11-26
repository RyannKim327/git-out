function longestCommonSubstring(a: string, b: string): string {
    const m = a.length;
    const n = b.length;
    const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    let maxLen = 0;
    let endIndex = 0; // End index of the longest common substring in `a`

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (a[i - 1] === b[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                if (dp[i][j] > maxLen) {
                    maxLen = dp[i][j];
                    endIndex = i;
                }
            } else {
                dp[i][j] = 0;
            }
        }
    }

    return a.slice(endIndex - maxLen, endIndex);
}

// Example usage:
const str1 = "ABABC";
const str2 = "BABCA";
console.log(longestCommonSubstring(str1, str2)); // Output: "BABC"
