function longestCommonSubsequence(a: string, b: string): string {
    const m = a.length;
    const n = b.length;

    // dp[i][j] = length of LCS of a[0..i-1], b[0..j-1]
    const dp: number[][] = Array.from({ length: m + 1 }, () =>
        Array(n + 1).fill(0)
    );

    // Fill DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (a[i - 1] === b[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    // Backtrack to find sequence
    let i = m, j = n;
    const lcsChars: string[] = [];

    while (i > 0 && j > 0) {
        if (a[i - 1] === b[j - 1]) {
            lcsChars.push(a[i - 1]);
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }

    return lcsChars.reverse().join('');
}

// Example:
console.log(longestCommonSubsequence("ACDBE", "ABCDE")); // Output: "ACDE"
