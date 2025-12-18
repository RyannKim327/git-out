function longestCommonSubstring(str1: string, str2: string): string {
    const m = str1.length;
    const n = str2.length;
    
    // Create a 2D array to store lengths of common substrings
    const dp: number[][] = Array(m + 1)
        .fill(0)
        .map(() => Array(n + 1).fill(0));
    
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
    
    if (maxLength === 0) return "";
    
    return str1.substring(endIndex - maxLength + 1, endIndex + 1);
}
function longestCommonSubstringOptimized(str1: string, str2: string): string {
    const m = str1.length;
    const n = str2.length;
    
    // Use only two rows to save space
    let prev: number[] = new Array(n + 1).fill(0);
    let curr: number[] = new Array(n + 1).fill(0);
    
    let maxLength = 0;
    let endIndex = 0;
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                curr[j] = prev[j - 1] + 1;
                
                if (curr[j] > maxLength) {
                    maxLength = curr[j];
                    endIndex = i - 1;
                }
            } else {
                curr[j] = 0;
            }
        }
        
        // Swap arrays for next iteration
        [prev, curr] = [curr, prev];
        curr.fill(0); // Reset current array
    }
    
    if (maxLength === 0) return "";
    
    return str1.substring(endIndex - maxLength + 1, endIndex + 1);
}
function longestCommonSubstringBruteForce(str1: string, str2: string): string {
    let longest = "";
    
    for (let i = 0; i < str1.length; i++) {
        for (let j = i + 1; j <= str1.length; j++) {
            const substring = str1.substring(i, j);
            
            if (str2.includes(substring) && substring.length > longest.length) {
                longest = substring;
            }
        }
    }
    
    return longest;
}
function getAllLongestCommonSubstrings(str1: string, str2: string): string[] {
    const m = str1.length;
    const n = str2.length;
    
    const dp: number[][] = Array(m + 1)
        .fill(0)
        .map(() => Array(n + 1).fill(0));
    
    let maxLength = 0;
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                maxLength = Math.max(maxLength, dp[i][j]);
            }
        }
    }
    
    const result: string[] = [];
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (dp[i][j] === maxLength) {
                const substring = str1.substring(i - maxLength, i);
                // Avoid duplicates
                if (!result.includes(substring)) {
                    result.push(substring);
                }
            }
        }
    }
    
    return result;
}
// Example usage
const str1 = "abcdef";
const str2 = "zcdemf";

console.log(longestCommonSubstring(str1, str2)); // "cde"
console.log(longestCommonSubstringOptimized(str1, str2)); // "cde"
console.log(longestCommonSubstringBruteForce(str1, str2)); // "cde"
console.log(getAllLongestCommonSubstrings("abcxyz", "xyzabc")); // ["abc", "xyz"]

// Edge cases
console.log(longestCommonSubstring("", "abc")); // ""
console.log(longestCommonSubstring("abc", "xyz")); // ""
console.log(longestCommonSubstring("same", "same")); // "same"
