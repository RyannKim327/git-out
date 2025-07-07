function longestCommonSubsequence(strA: string, strB: string): string {
    const lenA = strA.length;
    const lenB = strB.length;

    // Create the DP table
    const dp: number[][] = Array.from({ length: lenA + 1 }, () => Array(lenB + 1).fill(0));

    // Fill the DP table
    for (let i = 1; i <= lenA; i++) {
        for (let j = 1; j <= lenB; j++) {
            if (strA[i - 1] === strB[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    // Reconstruct the LCS by backtracking
    let i = lenA;
    let j = lenB;
    const lcsChars: string[] = [];

    while (i > 0 && j > 0) {
        if (strA[i - 1] === strB[j - 1]) {
            lcsChars.unshift(strA[i - 1]); // Add to front since we're backtracking
            i--;
            j--;
        } else if (dp[i - 1][j] >= dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }

    return lcsChars.join('');
}

// Example usage:
const str1 = "AGGTAB";
const str2 = "GXTXAYB";

console.log(longestCommonSubsequence(str1, str2)); // Output: "GTAB"
