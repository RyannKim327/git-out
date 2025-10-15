function longestCommonSubsequence(str1: string, str2: string): string {
    const m = str1.length;
    const n = str2.length;

    // Initialize a (m+1) x (n+1) DP table with zeros
    const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

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

    // Backtrack to find the LCS
    let i = m, j = n;
    const lcsChars: string[] = [];

    while (i > 0 && j > 0) {
        if (str1[i - 1] === str2[j - 1]) {
            lcsChars.push(str1[i - 1]);
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
console.log(longestCommonSubsequence("ABCBDAB", "BDCAB")); // Outputs "BCAB" (or "BDAB")
console.log(longestCommonSubsequence("abcde", "ace"));     // Outputs "ace"
