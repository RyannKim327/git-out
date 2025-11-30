function longestCommonSubstring(s1: string, s2: string): string {
    const m = s1.length;
    const n = s2.length;

    // dp[i][j] will store the length of the longest common suffix of
    // s1[0...i-1] and s2[0...j-1]
    const dp: number[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));

    let maxLength = 0; // Stores the maximum length found
    let endIndexS1 = 0; // Stores the ending index of the LCS in s1

    // Fill the dp table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            // If characters match, extend the common substring
            if (s1[i - 1] === s2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];

                // Update max length and its ending position
                if (dp[i][j] > maxLength) {
                    maxLength = dp[i][j];
                    endIndexS1 = i - 1; // current matching char index in s1
                }
            } else {
                // If characters don't match, common substring length is 0
                // (because it must be contiguous)
                dp[i][j] = 0;
            }
        }
    }

    // If no common substring found, return an empty string
    if (maxLength === 0) {
        return "";
    }

    // Extract the longest common substring using maxLength and endIndexS1
    // The substring starts at (endIndexS1 - maxLength + 1) and ends at endIndexS1
    return s1.substring(endIndexS1 - maxLength + 1, endIndexS1 + 1);
}

// --- Test Cases ---
console.log(`LCS("abcdef", "xyzdef"): "${longestCommonSubstring("abcdef", "xyzdef")}"`); // Expected: "def"
console.log(`LCS("hello", "world"): "${longestCommonSubstring("hello", "world")}"`);     // Expected: "o"
console.log(`LCS("apple", "apply"): "${longestCommonSubstring("apple", "apply")}"`);     // Expected: "appl"
console.log(`LCS("banana", "bandana"): "${longestCommonSubstring("banana", "bandana")}"`); // Expected: "bana" or "anda" (depends on which one is picked first if multiple max, 'bana' in this implementation)
console.log(`LCS("programming", "grammatical"): "${longestCommonSubstring("programming", "grammatical")}"`); // Expected: "gram"
console.log(`LCS("abc", "def"): "${longestCommonSubstring("abc", "def")}"`);         // Expected: ""
console.log(`LCS("", "test"): "${longestCommonSubstring("", "test")}"`);             // Expected: ""
console.log(`LCS("test", ""): "${longestCommonSubstring("test", "")}"`);             // Expected: ""
console.log(`LCS("abcde", "ace"): "${longestCommonSubstring("abcde", "ace")}"`);     // Expected: "a", "c", "e" (depends on order, here 'a')
