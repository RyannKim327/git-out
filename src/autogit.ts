function longestCommonSubstring(str1: string, str2: string): string {
    let longest = '';
    
    // Compare all possible substrings of str1 with str2
    for (let i = 0; i < str1.length; i++) {
        for (let j = i + 1; j <= str1.length; j++) {
            const substring = str1.substring(i, j);
            
            // If this substring exists in str2 and it's longer than current longest
            if (str2.includes(substring) && substring.length > longest.length) {
                longest = substring;
            }
        }
    }
    
    return longest;
}

// Example usage
const result1 = longestCommonSubstring("ABABC", "BABCA");
console.log(result1); // "BABC"

const result2 = longestCommonSubstring("hello world", "world peace");
console.log(result2); // "world"
function longestCommonSubstringDP(str1: string, str2: string): string {
    const m = str1.length;
    const n = str2.length;
    
    // Create a 2D array to store lengths of common substrings
    const dp: number[][] = Array(m + 1)
        .fill(0)
        .map(() => Array(n + 1).fill(0));
    
    let longestLength = 0;
    let endIndex = 0;
    
    // Fill the DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                
                if (dp[i][j] > longestLength) {
                    longestLength = dp[i][j];
                    endIndex = i - 1;
                }
            } else {
                dp[i][j] = 0;
            }
        }
    }
    
    // Extract the longest common substring
    if (longestLength === 0) {
        return '';
    }
    
    return str1.substring(endIndex - longestLength + 1, endIndex + 1);
}

// Example usage
console.log(longestCommonSubstringDP("ABABC", "BABCA")); // "BABC"
console.log(longestCommonSubstringDP("hello world", "world peace")); // "world"
interface LCSResult {
    substring: string;
    length: number;
    positions: {
        str1: { start: number; end: number };
        str2: { start: number; end: number };
    };
}

function findLongestCommonSubstrings(
    str1: string, 
    str2: string, 
    findAll: boolean = false
): LCSResult[] {
    const m = str1.length;
    const n = str2.length;
    
    const dp: number[][] = Array(m + 1)
        .fill(0)
        .map(() => Array(n + 1).fill(0));
    
    let maxLength = 0;
    const results: LCSResult[] = [];
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                
                if (dp[i][j] > maxLength) {
                    maxLength = dp[i][j];
                    if (!findAll) {
                        // Clear previous results if we only want the longest
                        results.length = 0;
                    }
                }
                
                if (dp[i][j] === maxLength && maxLength > 0) {
                    const start1 = i - maxLength;
                    const end1 = i - 1;
                    const substring = str1.substring(start1, end1 + 1);
                    
                    // Find position in str2
                    const start2 = j - maxLength;
                    const end2 = j - 1;
                    
                    results.push({
                        substring,
                        length: maxLength,
                        positions: {
                            str1: { start: start1, end: end1 },
                            str2: { start: start2, end: end2 }
                        }
                    });
                }
            } else {
                dp[i][j] = 0;
            }
        }
    }
    
    // Remove duplicates and return
    return results.filter((result, index, self) => 
        index === self.findIndex(r => r.substring === result.substring)
    );
}

// Example usage
const singleResult = findLongestCommonSubstrings("ABABC", "BABCA");
console.log(singleResult[0].substring); // "BABC"

const allResults = findLongestCommonSubstrings("ABCABC", "ABC", true);
console.log(allResults.map(r => r.substring)); // ["ABC", "ABC"]
// Performance test function
function measurePerformance(str1: string, str2: string): void {
    console.time('Basic Method');
    const basicResult = longestCommonSubstring(str1, str2);
    console.timeEnd('Basic Method');
    
    console.time('DP Method');
    const dpResult = longestCommonSubstringDP(str1, str2);
    console.timeEnd('DP Method');
    
    console.log(`Basic: "${basicResult}", DP: "${dpResult}"`);
}

// Test with different string sizes
measurePerformance("short", "shorter");
measurePerformance("this is a longer test string", "another longer test example");
