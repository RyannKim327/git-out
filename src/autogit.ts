function longestCommonSubstring(str1: string, str2: string): string {
    const m = str1.length;
    const n = str2.length;
    
    // Create a DP table
    const dp: number[][] = Array(m + 1).fill(null).map(
        () => Array(n + 1).fill(0)
    );
    
    let maxLength = 0;
    let endIndex = 0;
    
    // Fill the DP table
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
    
    return maxLength > 0 ? str1.substring(endIndex - maxLength + 1, endIndex + 1) : "";
}

// Example usage
const result1 = longestCommonSubstring("abcdef", "zcdemf");
console.log(result1); // "cde"
function longestCommonSubstringOptimized(str1: string, str2: string): string {
    const m = str1.length;
    const n = str2.length;
    
    let maxLength = 0;
    let endIndex = 0;
    
    // Only keep track of current and previous rows
    let prev: number[] = Array(n + 1).fill(0);
    let curr: number[] = Array(n + 1).fill(0);
    
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
        curr.fill(0); // Reset current row
    }
    
    return maxLength > 0 ? str1.substring(endIndex - maxLength + 1, endIndex + 1) : "";
}
function getAllSuffixes(str: string): string[] {
    const suffixes: string[] = [];
    for (let i = 0; i < str.length; i++) {
        suffixes.push(str.substring(i));
    }
    return suffixes.sort();
}

function longestCommonSubstringSuffix(str1: string, str2: string): string {
    const suffixes1 = getAllSuffixes(str1);
    const suffixes2 = getAllSuffixes(str2);
    
    let longest = "";
    
    // Compare each suffix from str1 with each suffix from str2
    for (const suffix1 of suffixes1) {
        for (const suffix2 of suffixes2) {
            let current = "";
            const minLength = Math.min(suffix1.length, suffix2.length);
            
            for (let i = 0; i < minLength; i++) {
                if (suffix1[i] === suffix2[i]) {
                    current += suffix1[i];
                } else {
                    break;
                }
            }
            
            if (current.length > longest.length) {
                longest = current;
            }
        }
    }
    
    return longest;
}
interface LCSResult {
    substrings: string[];
    length: number;
}

function findAllLongestCommonSubstrings(str1: string, str2: string): LCSResult {
    const m = str1.length;
    const n = str2.length;
    
    const dp: number[][] = Array(m + 1).fill(null).map(
        () => Array(n + 1).fill(0)
    );
    
    let maxLength = 0;
    const result: string[] = [];
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                
                if (dp[i][j] > maxLength) {
                    maxLength = dp[i][j];
                    result.length = 0; // Clear previous results
                    result.push(str1.substring(i - maxLength, i));
                } else if (dp[i][j] === maxLength && maxLength > 0) {
                    result.push(str1.substring(i - maxLength, i));
                }
            } else {
                dp[i][j] = 0;
            }
        }
    }
    
    // Remove duplicates
    const uniqueResults = [...new Set(result)];
    
    return {
        substrings: uniqueResults,
        length: maxLength
    };
}

// Example usage
const result2 = findAllLongestCommonSubstrings("abcxyz", "xyzabc");
console.log(result2); // { substrings: ["abc", "xyz"], length: 3 }
// Test cases
console.log(longestCommonSubstring("abcdef", "zcdemf")); // "cde"
console.log(longestCommonSubstring("programming", "program")); // "program"
console.log(longestCommonSubstring("hello", "world")); // "l" or "o" (depends on algorithm)
console.log(longestCommonSubstring("abc", "def")); // ""

// With the optimized version
console.log(longestCommonSubstringOptimized("typescript", "javascript")); // "script"
