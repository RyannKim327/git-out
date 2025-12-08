function longestCommonSubstring(a: string, b: string): string {
    // Table: dp[i][j] = length of longest common substring ending at a[i-1], b[j-1]
    const dp: number[][] = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
    let maxLength = 0;
    let endIndexInA = 0;

    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            if (a[i - 1] === b[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;

                if (dp[i][j] > maxLength) {
                    maxLength = dp[i][j];
                    endIndexInA = i;
                }
            } else {
                dp[i][j] = 0; // no match at these positions
            }
        }
    }

    return a.slice(endIndexInA - maxLength, endIndexInA);
}

// Example usage:
console.log(longestCommonSubstring("abcdef", "zabcf"));
