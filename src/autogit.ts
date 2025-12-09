function longestCommonSubsequence(text1: string, text2: string): string {
    const m = text1.length;
    const n = text2.length;
    
    // Create DP table
    const dp: number[][] = Array(m + 1)
        .fill(0)
        .map(() => Array(n + 1).fill(0));
    
    // Fill DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    // Backtrack to find the actual LCS string
    let lcs = '';
    let i = m, j = n;
    
    while (i > 0 && j > 0) {
        if (text1[i - 1] === text2[j - 1]) {
            lcs = text1[i - 1] + lcs;
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }
    
    return lcs;
}

// Example usage
const str1 = "ABCDGH";
const str2 = "AEDFHR";
const result = longestCommonSubsequence(str1, str2);
console.log(`LCS of "${str1}" and "${str2}": "${result}"`); // Output: "ADH"
interface LCSResult {
    length: number;
    sequence: string;
}

function findLCS(text1: string, text2: string): LCSResult {
    const m = text1.length;
    const n = text2.length;
    
    // Create DP table for lengths
    const dp: number[][] = Array(m + 1)
        .fill(0)
        .map(() => Array(n + 1).fill(0));
    
    // Fill DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    // Backtrack to find the actual LCS
    let sequence = '';
    let i = m, j = n;
    
    while (i > 0 && j > 0) {
        if (text1[i - 1] === text2[j - 1]) {
            sequence = text1[i - 1] + sequence;
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }
    
    return {
        length: dp[m][n],
        sequence: sequence
    };
}

// Example usage
const result = findLCS("ABCDGH", "AEDFHR");
console.log(`Length: ${result.length}, Sequence: "${result.sequence}"`);
// Output: Length: 3, Sequence: "ADH"
function optimizedLCS(text1: string, text2: string): string {
    if (text1.length < text2.length) {
        // Make sure text1 is the longer string for optimization
        [text1, text2] = [text2, text1];
    }
    
    const m = text1.length;
    const n = text2.length;
    
    // Use only two rows for DP to save space
    let prev = new Array(n + 1).fill(0);
    let curr = new Array(n + 1).fill(0);
    
    // Store the DP table for backtracking
    const dpTable: number[][] = [];
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                curr[j] = prev[j - 1] + 1;
            } else {
                curr[j] = Math.max(prev[j], curr[j - 1]);
            }
        }
        
        // Store current row and prepare for next iteration
        dpTable.push([...curr]);
        [prev, curr] = [curr, prev];
        curr.fill(0);
    }
    
    // Reconstruct the LCS using the stored DP table
    let lcs = '';
    let i = m, j = n;
    
    while (i > 0 && j > 0) {
        const currentRow = dpTable[i - 1];
        const prevRow = i > 1 ? dpTable[i - 2] : new Array(n + 1).fill(0);
        
        if (text1[i - 1] === text2[j - 1]) {
            lcs = text1[i - 1] + lcs;
            i--;
            j--;
        } else if (i > 1 && prevRow[j] > currentRow[j - 1]) {
            i--;
        } else {
            j--;
        }
    }
    
    return lcs;
}
class LCSFinder {
    static findLCS(text1: string, text2: string): string {
        const m = text1.length;
        const n = text2.length;
        
        const dp: number[][] = Array(m + 1)
            .fill(0)
            .map(() => Array(n + 1).fill(0));
        
        // Build DP table
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                if (text1[i - 1] === text2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        
        // Backtrack
        let result = '';
        let i = m, j = n;
        
        while (i > 0 && j > 0) {
            if (text1[i - 1] === text2[j - 1]) {
                result = text1[i - 1] + result;
                i--;
                j--;
            } else if (dp[i - 1][j] > dp[i][j - 1]) {
                i--;
            } else {
                j--;
            }
        }
        
        return result;
    }
    
    static findLCSLength(text1: string, text2: string): number {
        return this.findLCS(text1, text2).length;
    }
}

// Test cases
const testCases = [
    { text1: "ABCDGH", text2: "AEDFHR", expected: "ADH" },
    { text1: "AGGTAB", text2: "GXTXAYB", expected: "GTAB" },
    { text1: "abc", text2: "abc", expected: "abc" },
    { text1: "abc", text2: "def", expected: "" },
    { text1: "", text2: "abc", expected: "" },
];

// Run tests
testCases.forEach((testCase, index) => {
    const result = LCSFinder.findLCS(testCase.text1, testCase.text2);
    const passed = result === testCase.expected;
    console.log(`Test ${index + 1}: ${passed ? 'PASS' : 'FAIL'}`);
    console.log(`  Input: "${testCase.text1}", "${testCase.text2}"`);
    console.log(`  Expected: "${testCase.expected}"`);
    console.log(`  Got: "${result}"\n`);
});
