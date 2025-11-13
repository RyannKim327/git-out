function longestCommonSubsequence(text1: string, text2: string): string {
    const m = text1.length;
    const n = text2.length;
    
    // Create DP table with (m+1) x (n+1) dimensions initialized to 0
    const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

    // Build DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    // Reconstruct LCS from DP table
    let i = m;
    let j = n;
    const lcsChars: string[] = [];

    while (i > 0 && j > 0) {
        if (text1[i - 1] === text2[j - 1]) {
            lcsChars.unshift(text1[i - 1]);
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }

    return lcsChars.join('');
}
console.log(longestCommonSubsequence("ABCBDAB", "BDCAB"));  // Outputs "BCAB" (or "BDAB")
console.log(longestCommonSubsequence("abcde", "ace"));     // Outputs "ace"
console.log(longestCommonSubsequence("abc", "def"));       // Outputs ""
