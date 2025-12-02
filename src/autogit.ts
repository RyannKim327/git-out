function longestCommonSubstring(str1: string, str2: string): string {
    const m = str1.length;
    const n = str2.length;
    
    // Create DP table
    const dp: number[][] = new Array(m + 1);
    for (let i = 0; i <= m; i++) {
        dp[i] = new Array(n + 1).fill(0);
    }
    
    let maxLength = 0;
    let endIndex = 0;
    
    // Fill DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                
                if (dp[i][j] > maxLength) {
                    maxLength = dp[i][j];
                    endIndex = i - 1; // Store ending index in str1
                }
            } else {
                dp[i][j] = 0;
            }
        }
    }
    
    if (maxLength === 0) return "";
    
    return str1.substring(endIndex - maxLength + 1, endIndex + 1);
}

// Example usage
const result = longestCommonSubstring("abcdef", "zcdemf");
console.log(result); // Output: "cde"
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

// Example usage
const result2 = longestCommonSubstringBruteForce("abcdef", "zcdemf");
console.log(result2); // Output: "cde"
function longestCommonSubstringOptimized(str1: string, str2: string): string {
    let longest = "";
    const maxPossibleLength = Math.min(str1.length, str2.length);
    
    for (let length = maxPossibleLength; length > 0; length--) {
        for (let i = 0; i <= str1.length - length; i++) {
            const substring = str1.substring(i, i + length);
            
            if (str2.includes(substring)) {
                return substring; // Return immediately when found
            }
        }
    }
    
    return "";
}

// Example usage
const result3 = longestCommonSubstringOptimized("abcdef", "zcdemf");
console.log(result3); // Output: "cde"
interface LCSResult {
    substring: string;
    length: number;
    positions: { str1: number; str2: number };
}

function findLongestCommonSubstrings(
    str1: string, 
    str2: string, 
    findAll = false
): LCSResult[] {
    const m = str1.length;
    const n = str2.length;
    const dp: number[][] = Array.from({ length: m + 1 }, () => 
        new Array(n + 1).fill(0)
    );
    
    let maxLength = 0;
    const results: LCSResult[] = [];
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                
                if (dp[i][j] > maxLength) {
                    maxLength = dp[i][j];
                    if (!findAll) results.length = 0; // Clear previous results
                }
                
                if (dp[i][j] === maxLength) {
                    const substring = str1.substring(i - maxLength, i);
                    results.push({
                        substring,
                        length: maxLength,
                        positions: { 
                            str1: i - maxLength, 
                            str2: j - maxLength 
                        }
                    });
                }
            }
        }
    }
    
    return results;
}

// Example usage
const results = findLongestCommonSubstrings("abcxyzdef", "xyzabc");
console.log(results[0].substring); // Output: "abc" or "xyz" (depending on order)
// For single result (most common use case)
const lcs = longestCommonSubstring("hello world", "world hello");
console.log(lcs); // "hello"

// For case-insensitive comparison
const caseInsensitive = longestCommonSubstring(
    "Hello".toLowerCase(), 
    "HELLO".toLowerCase()
);
console.log(caseInsensitive); // "hello"

// For multiple results
const allResults = findLongestCommonSubstrings("abcxyz", "xyzabc", true);
console.log(allResults.map(r => r.substring)); // ["abc", "xyz"]
