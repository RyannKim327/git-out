function longestCommonSubstring(str1: string, str2: string): string {
    const m = str1.length;
    const n = str2.length;
    
    // Create a DP table
    const dp: number[][] = Array(m + 1)
        .fill(null)
        .map(() => Array(n + 1).fill(0));
    
    let maxLength = 0;
    let endIndex = 0;
    
    // Fill the DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                
                // Update maximum length and end index
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
    return maxLength > 0 
        ? str1.substring(endIndex - maxLength + 1, endIndex + 1)
        : "";
}

// Example usage
const result = longestCommonSubstring("ABABC", "BABCA");
console.log(result); // "BABC"
function longestCommonSubstringOptimized(str1: string, str2: string): string {
    if (str1.length === 0 || str2.length === 0) return "";
    
    // Ensure str1 is the shorter string for space optimization
    if (str1.length > str2.length) {
        [str1, str2] = [str2, str1];
    }
    
    let maxLength = 0;
    let endIndex = 0;
    
    // Use two rows to store DP values
    let prevRow = new Array(str1.length + 1).fill(0);
    let currRow = new Array(str1.length + 1).fill(0);
    
    for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
            if (str2[i - 1] === str1[j - 1]) {
                currRow[j] = prevRow[j - 1] + 1;
                
                if (currRow[j] > maxLength) {
                    maxLength = currRow[j];
                    endIndex = j - 1;
                }
            } else {
                currRow[j] = 0;
            }
        }
        
        // Swap rows for next iteration
        [prevRow, currRow] = [currRow, prevRow];
        currRow.fill(0);
    }
    
    return maxLength > 0 
        ? str1.substring(endIndex - maxLength + 1, endIndex + 1)
        : "";
}
function longestCommonSubstringSuffix(str1: string, str2: string): string {
    // Combine strings with special separator
    const combined = str1 + '#' + str2 + '$';
    const suffixes: { suffix: string; index: number; fromFirst: boolean }[] = [];
    
    // Generate all suffixes with their origin information
    for (let i = 0; i < combined.length - 1; i++) {
        suffixes.push({
            suffix: combined.substring(i),
            index: i,
            fromFirst: i < str1.length
        });
    }
    
    // Sort suffixes lexicographically
    suffixes.sort((a, b) => a.suffix.localeCompare(b.suffix));
    
    let maxLength = 0;
    let maxStart = 0;
    
    // Find longest common prefix between adjacent suffixes from different strings
    for (let i = 0; i < suffixes.length - 1; i++) {
        const current = suffixes[i];
        const next = suffixes[i + 1];
        
        // Ensure suffixes come from different strings
        if (current.fromFirst !== next.fromFirst) {
            const commonPrefixLength = commonPrefix(current.suffix, next.suffix);
            
            if (commonPrefixLength > maxLength) {
                maxLength = commonPrefixLength;
                maxStart = current.fromFirst ? current.index : next.index;
            }
        }
    }
    
    return maxLength > 0 ? str1.substring(maxStart, maxStart + maxLength) : "";
}

function commonPrefix(a: string, b: string): number {
    let length = 0;
    const minLength = Math.min(a.length, b.length);
    
    while (length < minLength && a[length] === b[length]) {
        length++;
    }
    
    return length;
}
function allLongestCommonSubstrings(str1: string, str2: string): string[] {
    const m = str1.length;
    const n = str2.length;
    const dp: number[][] = Array(m + 1)
        .fill(null)
        .map(() => Array(n + 1).fill(0));
    
    let maxLength = 0;
    const result: string[] = [];
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                
                if (dp[i][j] > maxLength) {
                    maxLength = dp[i][j];
                    result.length = 0; // Clear previous results
                }
                
                if (dp[i][j] === maxLength && maxLength > 0) {
                    const substring = str1.substring(i - maxLength, i);
                    if (!result.includes(substring)) {
                        result.push(substring);
                    }
                }
            } else {
                dp[i][j] = 0;
            }
        }
    }
    
    return result;
}

// Example
console.log(allLongestCommonSubstrings("ABABC", "BABCA")); // ["BABC"]
// Test cases
console.log(longestCommonSubstring("ABABC", "BABCA")); // "BABC"
console.log(longestCommonSubstring("hello world", "world hello")); // "hello"
console.log(longestCommonSubstring("programming", "program")); // "program"
console.log(longestCommonSubstring("abc", "def")); // ""
