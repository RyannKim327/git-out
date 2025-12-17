function longestCommonSubstring(str1: string, str2: string): string {
    const m = str1.length;
    const n = str2.length;
    
    // Create a 2D array to store lengths of common suffixes
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
    
    // Only store the previous row to save space
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
        
        // Swap rows for next iteration
        [prev, curr] = [curr, prev];
        curr.fill(0); // Reset current row
    }
    
    if (maxLength === 0) return "";
    
    return str1.substring(endIndex - maxLength + 1, endIndex + 1);
}
function longestCommonSubstringAlternative(str1: string, str2: string): string {
    let longest = "";
    
    // Generate all substrings of str1 and check if they exist in str2
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
// Test the functions
console.log(longestCommonSubstring("abcdef", "zcdxy")); // "cd"
console.log(longestCommonSubstring("programming", "program")); // "program"
console.log(longestCommonSubstring("hello", "world")); // ""
console.log(longestCommonSubstring("abc", "abc")); // "abc"

// Performance comparison
const str1 = "this is a longer string for testing performance";
const str2 = "another string with some common substring for testing";

console.time("Dynamic Programming");
console.log(longestCommonSubstring(str1, str2));
console.timeEnd("Dynamic Programming");

console.time("Optimized");
console.log(longestCommonSubstringOptimized(str1, str2));
console.timeEnd("Optimized");
interface LCSResult {
    substring: string;
    length: number;
    position1: number;
    position2: number;
}

function longestCommonSubstringDetailed(str1: string, str2: string): LCSResult {
    const m = str1.length;
    const n = str2.length;
    
    const dp: number[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
    
    let maxLength = 0;
    let endIndex1 = 0;
    let endIndex2 = 0;
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                
                if (dp[i][j] > maxLength) {
                    maxLength = dp[i][j];
                    endIndex1 = i - 1;
                    endIndex2 = j - 1;
                }
            }
        }
    }
    
    const substring = maxLength === 0 
        ? "" 
        : str1.substring(endIndex1 - maxLength + 1, endIndex1 + 1);
    
    return {
        substring,
        length: maxLength,
        position1: endIndex1 - maxLength + 1,
        position2: endIndex2 - maxLength + 1
    };
}
