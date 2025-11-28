function longestCommonSubsequence(s1: string, s2: string): string {
    const m = s1.length;
    const n = s2.length;

    // Step 1: Build the DP table to store lengths
    // dp[i][j] stores the length of LCS of s1[0...i-1] and s2[0...j-1]
    // The table size is (m+1) x (n+1) because we include a base case for empty prefixes (index 0).
    const dp: number[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));

    // Fill the dp table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            // If characters match, add 1 to the diagonal element (LCS of previous prefixes)
            if (s1[i - 1] === s2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                // If characters don't match, take the maximum from the cell above or to the left
                // (representing dropping a char from s1 or s2 respectively)
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    // Step 2: Reconstruct the LCS string from the DP table
    const lcsChars: string[] = []; // To store the characters of the LCS
    let i = m; // Start from the bottom-right corner of the DP table
    let j = n;

    while (i > 0 && j > 0) {
        // If the current characters in s1 and s2 match, they are part of the LCS
        if (s1[i - 1] === s2[j - 1]) {
            lcsChars.push(s1[i - 1]); // Add the character
            i--; // Move diagonally up-left
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            // If the value came from the cell above (dp[i-1][j]), it means s1[i-1] was not included
            i--; // Move up
        } else {
            // If the value came from the cell to the left (dp[i][j-1]), it means s2[j-1] was not included
            j--; // Move left
        }
    }

    // The characters were added in reverse order, so reverse and join them
    return lcsChars.reverse().join('');
}

// --- Example Usage ---
console.log(`LCS of "ABCDGH" and "AEDFHR": "${longestCommonSubsequence("ABCDGH", "AEDFHR")}"`); // Expected: "ADH"
console.log(`LCS of "AGGTAB" and "GXTXAYB": "${longestCommonSubsequence("AGGTAB", "GXTXAYB")}"`); // Expected: "GTAB"
console.log(`LCS of "ABC" and "ACB": "${longestCommonSubsequence("ABC", "ACB")}"`); // Expected: "AB" or "AC" (depends on path, but length is 2)
console.log(`LCS of "ABC" and "DEF": "${longestCommonSubsequence("ABC", "DEF")}"`); // Expected: ""
console.log(`LCS of "A" and "A": "${longestCommonSubsequence("A", "A")}"`); // Expected: "A"
console.log(`LCS of "" and "ABC": "${longestCommonSubsequence("", "ABC")}"`); // Expected: ""
console.log(`LCS of "ABC" and "": "${longestCommonSubsequence("ABC", "")}"`); // Expected: ""
