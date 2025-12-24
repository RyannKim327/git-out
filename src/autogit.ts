function longestCommonSubstring(str1: string, str2: string): string {
    const m = str1.length;
    const n = str2.length;
    
    // Create a 2D array to store lengths of common substrings
    const dp: number[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
    let maxLength = 0;
    let endIndex = 0;
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                if (dp[i][j] > maxLength) {
                    maxLength = dp[i][j];
                    endIndex = i - 1; // Store the end index in str1
                }
            } else {
                dp[i][j] = 0;
            }
        }
    }
    
    if (maxLength === 0) return "";
    return str1.substring(endIndex - maxLength + 1, endIndex + 1);
}
function longestCommonSubstringOptimized(str1: string, str2: string): string {
    const m = str1.length;
    const n = str2.length;
    let maxLength = 0;
    let endIndex = 0;
    
    // Use two rows instead of full matrix to save space
    let prevRow: number[] = Array(n + 1).fill(0);
    let currRow: number[] = Array(n + 1).fill(0);
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                currRow[j] = prevRow[j - 1] + 1;
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
        currRow.fill(0); // Reset current row
    }
    
    if (maxLength === 0) return "";
    return str1.substring(endIndex - maxLength + 1, endIndex + 1);
}
function longestCommonSubstringSet(str1: string, str2: string): string {
    // Generate all substrings of str1 and store in a set
    const substrings = new Set<string>();
    
    for (let i = 0; i < str1.length; i++) {
        for (let j = i + 1; j <= str1.length; j++) {
            substrings.add(str1.substring(i, j));
        }
    }
    
    let longest = "";
    
    // Check all substrings of str2
    for (let i = 0; i < str2.length; i++) {
        for (let j = i + 1; j <= str2.length; j++) {
            const substring = str2.substring(i, j);
            if (substrings.has(substring) && substring.length > longest.length) {
                longest = substring;
            }
        }
    }
    
    return longest;
}
// Test the functions
console.log(longestCommonSubstring("abcdef", "zcdxy")); // "cd"
console.log(longestCommonSubstring("programming", "programmer")); // "programm"
console.log(longestCommonSubstring("hello", "world")); // ""
console.log(longestCommonSubstring("abc", "abc")); // "abc"

// You can also test the optimized version
console.log(longestCommonSubstringOptimized("abcdef", "zcdxy")); // "cd"
function longestCommonSubstringSafe(str1?: string, str2?: string): string {
    if (!str1 || !str2) {
        throw new Error("Both strings must be provided");
    }
    
    if (typeof str1 !== 'string' || typeof str2 !== 'string') {
        throw new Error("Inputs must be strings");
    }
    
    return longestCommonSubstringOptimized(str1, str2);
}
