function longestCommonSubstringBruteForce(str1: string, str2: string): string {
    let longest = '';
    
    for (let i = 0; i < str1.length; i++) {
        for (let j = 0; j < str2.length; j++) {
            let k = 0;
            while (
                i + k < str1.length &&
                j + k < str2.length &&
                str1[i + k] === str2[j + k]
            ) {
                k++;
            }
            
            if (k > longest.length) {
                longest = str1.substring(i, i + k);
            }
        }
    }
    
    return longest;
}
function longestCommonSubstringDP(str1: string, str2: string): string {
    const m = str1.length;
    const n = str2.length;
    
    // Create DP table
    const dp: number[][] = Array(m + 1)
        .fill(null)
        .map(() => Array(n + 1).fill(0));
    
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
    
    return str1.substring(endIndex - maxLength + 1, endIndex + 1);
}
function longestCommonSubstringOptimized(str1: string, str2: string): string {
    const m = str1.length;
    const n = str2.length;
    
    const dp: number[] = new Array(n + 1).fill(0);
    let maxLength = 0;
    let endIndex = 0;
    
    for (let i = 1; i <= m; i++) {
        let prev = 0;
        for (let j = 1; j <= n; j++) {
            const temp = dp[j];
            
            if (str1[i - 1] === str2[j - 1]) {
                dp[j] = prev + 1;
                
                if (dp[j] > maxLength) {
                    maxLength = dp[j];
                    endIndex = i - 1;
                }
            } else {
                dp[j] = 0;
            }
            
            prev = temp;
        }
    }
    
    return str1.substring(endIndex - maxLength + 1, endIndex + 1);
}
// Helper function to build suffix array
function buildSuffixArray(str: string): string[] {
    const suffixes: string[] = [];
    for (let i = 0; i < str.length; i++) {
        suffixes.push(str.substring(i));
    }
    return suffixes.sort();
}

function longestCommonSubstringSuffix(str1: string, str2: string): string {
    const combined = [str1, str2];
    let longest = '';
    
    // Compare all substrings
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
const testCases = [
    { str1: "abcdef", str2: "xyzabc", expected: "abc" },
    { str1: "programming", str2: "programmer", expected: "programm" },
    { str1: "hello", str2: "world", expected: "l" },
    { str1: "abc", str2: "def", expected: "" }
];

function testLongestCommonSubstring() {
    console.log("Testing Longest Common Substring Functions:");
    console.log("==========================================");
    
    testCases.forEach((testCase, index) => {
        const result1 = longestCommonSubstringBruteForce(testCase.str1, testCase.str2);
        const result2 = longestCommonSubstringDP(testCase.str1, testCase.str2);
        const result3 = longestCommonSubstringOptimized(testCase.str1, testCase.str2);
        
        console.log(`Test ${index + 1}:`);
        console.log(`Strings: "${testCase.str1}" and "${testCase.str2}"`);
        console.log(`Brute Force: "${result1}"`);
        console.log(`DP: "${result2}"`);
        console.log(`Optimized DP: "${result3}"`);
        console.log(`Expected: "${testCase.expected}"`);
        console.log("---");
    });
}

// Run tests
testLongestCommonSubstring();
