function longestCommonSubstring(s1: string, s2: string): string {
    const m = s1.length;
    const n = s2.length;
    
    // Create a 2D array to store lengths of longest common suffixes
    const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    let maxLength = 0;
    let endIndex = 0; // To track the end index of the longest common substring in s1

    // Build the dp array
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1; // Length of the common substring
                if (dp[i][j] > maxLength) {
                    maxLength = dp[i][j];
                    endIndex = i; // Update the end index of the longest substring
                }
            } else {
                dp[i][j] = 0; // No common substring
            }
        }
    }

    // Extract the longest common substring
    const longestSubstring = s1.substring(endIndex - maxLength, endIndex);
    return longestSubstring;
}

// Example usage:
const str1 = "abcdef";
const str2 = "zabcxy";
const result = longestCommonSubstring(str1, str2);
console.log(result); // Output: "abc"
