function longestCommonSubstring(str1: string, str2: string): string {
    const m = str1.length;
    const n = str2.length;
    
    // Create a DP table to store lengths of common substrings
    const dp: number[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
    let maxLength = 0;
    let endIndex = 0;
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                
                if (dp[i][j] > maxLength) {
                    maxLength = dp[i][j];
                    endIndex = i - 1;
                }
            } else {
                dp[i][j] = 0;
            }
        }
    }
    
    return maxLength > 0 ? str1.substring(endIndex - maxLength + 1, endIndex + 1) : '';
}

// Example usage
const result = longestCommonSubstring("abcdef", "zcdemf");
console.log(result); // "cde"
function longestCommonSubstringBruteForce(str1: string, str2: string): string {
    let longest = '';
    
    for (let i = 0; i < str1.length; i++) {
        for (let j = 0; j < str2.length; j++) {
            let k = 0;
            
            // Compare characters until they don't match
            while (
                i + k < str1.length && 
                j + k < str2.length && 
                str1[i + k] === str2[j + k]
            ) {
                k++;
            }
            
            // Update longest substring if current is longer
            if (k > longest.length) {
                longest = str1.substring(i, i + k);
            }
        }
    }
    
    return longest;
}
function longestCommonSubstringSafe(str1: string, str2: string): string {
    if (typeof str1 !== 'string' || typeof str2 !== 'string') {
        throw new Error('Both arguments must be strings');
    }
    
    if (str1.length === 0 || str2.length === 0) {
        return '';
    }
    
    const m = str1.length;
    const n = str2.length;
    const dp: number[][] = [];
    
    // Initialize DP table
    for (let i = 0; i <= m; i++) {
        dp[i] = new Array(n + 1).fill(0);
    }
    
    let maxLength = 0;
    let endIndex = 0;
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                
                if (dp[i][j] > maxLength) {
                    maxLength = dp[i][j];
                    endIndex = i - 1;
                }
            }
        }
    }
    
    return maxLength > 0 ? str1.substring(endIndex - maxLength + 1, endIndex + 1) : '';
}

// Test cases
console.log(longestCommonSubstringSafe("abcdef", "zcdemf")); // "cde"
console.log(longestCommonSubstringSafe("hello", "world"));   // "l"
console.log(longestCommonSubstringSafe("", "test"));         // ""
// Find common substring between two strings
const string1 = "typescript is awesome";
const string2 = "javascript is also awesome";

const commonSubstring = longestCommonSubstring(string1, string2);
console.log(`Longest common substring: "${commonSubstring}"`);
// Output: " is awesome"
