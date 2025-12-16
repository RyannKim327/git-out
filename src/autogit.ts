function longestCommonSubstring(str1: string, str2: string): string {
    const m = str1.length;
    const n = str2.length;
    
    // Create a 2D array to store lengths of common substrings
    const dp: number[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
    
    let maxLength = 0;  // Length of longest common substring
    let endIndex = 0;   // Ending index in str1 of longest common substring
    
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
    
    // Extract the longest common substring
    if (maxLength === 0) return "";
    return str1.substring(endIndex - maxLength + 1, endIndex + 1);
}

// Example usage
const str1 = "abcdefgh";
const str2 = "xycdeklm";
console.log(longestCommonSubstring(str1, str2)); // "cde"
function longestCommonSubstringOptimized(str1: string, str2: string): string {
    const m = str1.length;
    const n = str2.length;
    
    // Use only two rows to save space
    let prev = Array(n + 1).fill(0);
    let curr = Array(n + 1).fill(0);
    
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
        // Swap rows
        [prev, curr] = [curr, prev];
    }
    
    if (maxLength === 0) return "";
    return str1.substring(endIndex - maxLength + 1, endIndex + 1);
}
function longestCommonSubstringBruteForce(str1: string, str2: string): string {
    let longest = "";
    
    // Check all substrings of str1 against str2
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
interface LCSResult {
    substring: string;
    length: number;
    positionInStr1: number;
    positionInStr2: number;
}

function findLongestCommonSubstring(
    str1: string, 
    str2: string
): LCSResult {
    if (typeof str1 !== 'string' || typeof str2 !== 'string') {
        throw new Error('Both inputs must be strings');
    }
    
    if (str1.length === 0 || str2.length === 0) {
        return {
            substring: "",
            length: 0,
            positionInStr1: -1,
            positionInStr2: -1
        };
    }
    
    const m = str1.length;
    const n = str2.length;
    const dp: number[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
    
    let maxLength = 0;
    let endIndexStr1 = 0;
    let endIndexStr2 = 0;
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                if (dp[i][j] > maxLength) {
                    maxLength = dp[i][j];
                    endIndexStr1 = i - 1;
                    endIndexStr2 = j - 1;
                }
            } else {
                dp[i][j] = 0;
            }
        }
    }
    
    if (maxLength === 0) {
        return {
            substring: "",
            length: 0,
            positionInStr1: -1,
            positionInStr2: -1
        };
    }
    
    const substring = str1.substring(endIndexStr1 - maxLength + 1, endIndexStr1 + 1);
    
    return {
        substring,
        length: maxLength,
        positionInStr1: endIndexStr1 - maxLength + 1,
        positionInStr2: endIndexStr2 - maxLength + 1
    };
}

// Example usage with detailed result
const result = findLongestCommonSubstring("abcdefgh", "xycdeklm");
console.log(result);
// Output: { substring: "cde", length: 3, positionInStr1: 2, positionInStr2: 2 }
