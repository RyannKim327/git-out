function longestCommonSubstring(str1: string, str2: string): string {
    const len1 = str1.length;
    const len2 = str2.length;
    
    // Early exit if either string is empty
    if (len1 === 0 || len2 === 0) return '';

    // Create DP table with dimensions (len1+1) x (len2+1)
    const dp: number[][] = Array.from({ length: len1 + 1 }, () => 
        Array(len2 + 1).fill(0)
    );

    let maxLength = 0;  // Stores length of longest common substring found
    let endIndex = 0;   // Stores ending index of LCS in str1

    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            // When characters match, extend the previous substring
            if (str1[i-1] === str2[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
                
                // Update maximum length and ending index
                if (dp[i][j] > maxLength) {
                    maxLength = dp[i][j];
                    endIndex = i - 1;  // Current index in str1
                }
            }
            // When characters don't match, reset substring length
            else {
                dp[i][j] = 0;
            }
        }
    }

    // Extract the longest common substring
    return maxLength === 0 
        ? '' 
        : str1.substring(endIndex - maxLength + 1, endIndex + 1);
}
function longestCommonSubstringOptimized(str1: string, str2: string): string {
    if (str1.length > str2.length) {
        [str1, str2] = [str2, str1];  // Ensure str1 is the shorter string
    }

    let maxLength = 0;
    let endIndex = 0;
    const prevRow = new Array<number>(str2.length + 1).fill(0);
    const currRow = new Array<number>(str2.length + 1).fill(0);

    for (let i = 1; i <= str1.length; i++) {
        for (let j = 1; j <= str2.length; j++) {
            if (str1[i-1] === str2[j-1]) {
                currRow[j] = prevRow[j-1] + 1;
                
                if (currRow[j] > maxLength) {
                    maxLength = currRow[j];
                    endIndex = i - 1;
                }
            } else {
                currRow[j] = 0;
            }
        }
        // Swap rows for next iteration
        [prevRow, currRow] = [currRow, prevRow];
        currRow.fill(0);
    }

    return maxLength === 0 
        ? '' 
        : str1.substring(endIndex - maxLength + 1, endIndex + 1);
}
const result = longestCommonSubstring("ABABC", "BABCA");
console.log(result); // Output: "BABC"
