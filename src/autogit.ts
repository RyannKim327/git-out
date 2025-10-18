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
    
    // Reconstruct the LCS
    let i = m, j = n;
    const lcs: string[] = [];
    
    while (i > 0 && j > 0) {
        if (text1[i - 1] === text2[j - 1]) {
            lcs.push(text1[i - 1]);
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }
    
    return lcs.reverse().join('');
}

// Example usage
const text1 = "ABCDGH";
const text2 = "AEDFHR";
const result = longestCommonSubsequence(text1, text2);
console.log(`LCS: ${result}`); // Output: "ADH"
function longestCommonSubsequenceOptimized(text1: string, text2: string): string {
    // Ensure text1 is the shorter string for space optimization
    if (text1.length > text2.length) {
        [text1, text2] = [text2, text1];
    }
    
    const m = text1.length;
    const n = text2.length;
    
    let prev: number[] = Array(m + 1).fill(0);
    let curr: number[] = Array(m + 1).fill(0);
    const sequence: number[][] = [];
    
    // Build DP with tracking
    for (let j = 1; j <= n; j++) {
        for (let i = 1; i <= m; i++) {
            if (text1[i - 1] === text2[j - 1]) {
                curr[i] = prev[i - 1] + 1;
                sequence.push([i, j, i - 1, j - 1]); // Track the path
            } else {
                if (prev[i] > curr[i - 1]) {
                    curr[i] = prev[i];
                    sequence.push([i, j, i - 1, j]); // Track the path
                } else {
                    curr[i] = curr[i - 1];
                    sequence.push([i, j, i, j - 1]); // Track the path
                }
            }
        }
        [prev, curr] = [curr, prev];
    }
    
    // Reconstruct LCS (simplified - in practice, you'd need more complex backtracking)
    return reconstructLCS(text1, text2, prev[m]);
}

function reconstructLCS(text1: string, text2: string, length: number): string {
    // For space-optimized version, reconstruction is complex
    // This is a simplified version - use the standard method if you need exact reconstruction
    return `LCS length: ${length}`;
}
interface LCSResult {
    sequence: string;
    length: number;
    table?: number[][];
}

class LongestCommonSubsequence {
    static findLCS(text1: string, text2: string): LCSResult {
        const m = text1.length;
        const n = text2.length;
        
        // Create and fill DP table
        const dp: number[][] = Array(m + 1)
            .fill(0)
            .map(() => Array(n + 1).fill(0));
        
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                if (text1[i - 1] === text2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        
        // Reconstruct the sequence
        const sequence = this.reconstructSequence(text1, text2, dp);
        
        return {
            sequence,
            length: sequence.length,
            table: dp
        };
    }
    
    private static reconstructSequence(text1: string, text2: string, dp: number[][]): string {
        let i = text1.length;
        let j = text2.length;
        const lcs: string[] = [];
        
        while (i > 0 && j > 0) {
            if (text1[i - 1] === text2[j - 1]) {
                lcs.push(text1[i - 1]);
                i--;
                j--;
            } else if (dp[i - 1][j] > dp[i][j - 1]) {
                i--;
            } else {
                j--;
            }
        }
        
        return lcs.reverse().join('');
    }
    
    // Find all LCS sequences (if there are multiple)
    static findAllLCS(text1: string, text2: string): string[] {
        const m = text1.length;
        const n = text2.length;
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
        
        return this.findAllSequences(text1, text2, dp, m, n);
    }
    
    private static findAllSequences(
        text1: string, 
        text2: string, 
        dp: number[][], 
        i: number, 
        j: number
    ): string[] {
        if (i === 0 || j === 0) {
            return [''];
        }
        
        if (text1[i - 1] === text2[j - 1]) {
            const sequences = this.findAllSequences(text1, text2, dp, i - 1, j - 1);
            return sequences.map(seq => seq + text1[i - 1]);
        }
        
        const result: string[] = [];
        
        if (dp[i - 1][j] >= dp[i][j - 1]) {
            result.push(...this.findAllSequences(text1, text2, dp, i - 1, j));
        }
        
        if (dp[i][j - 1] >= dp[i - 1][j]) {
            result.push(...this.findAllSequences(text1, text2, dp, i, j - 1));
        }
        
        // Remove duplicates
        return [...new Set(result)];
    }
}

// Example usage
const examples = [
    { text1: "ABCDGH", text2: "AEDFHR" },
    { text1: "AGGTAB", text2: "GXTXAYB" },
    { text1: "ABC", text2: "AC" },
    { text1: "hello", text2: "world" }
];

examples.forEach(({ text1, text2 }) => {
    const result = LongestCommonSubsequence.findLCS(text1, text2);
    console.log(`Text1: "${text1}", Text2: "${text2}"`);
    console.log(`LCS: "${result.sequence}", Length: ${result.length}`);
    console.log('---');
});

// Find all possible LCS
const allSequences = LongestCommonSubsequence.findAllLCS("ABCBDAB", "BDCAB");
console.log("All LCS sequences:", allSequences);
