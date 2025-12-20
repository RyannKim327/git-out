function longestCommonSubsequence(text1: string, text2: string): string {
    const m = text1.length;
    const n = text2.length;
    
    // Create DP table
    const dp: number[][] = Array(m + 1)
        .fill(null)
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
    let i = m, j = n;
    const result: string[] = [];
    
    while (i > 0 && j > 0) {
        if (text1[i - 1] === text2[j - 1]) {
            result.unshift(text1[i - 1]);
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }
    
    return result.join('');
}
class LCS {
    /**
     * Finds the longest common subsequence between two strings
     */
    public static findLCS(text1: string, text2: string): string {
        const dp = this.buildDPTable(text1, text2);
        return this.backtrackLCS(text1, text2, dp);
    }
    
    /**
     * Returns just the length of the LCS
     */
    public static lengthOfLCS(text1: string, text2: string): number {
        const dp = this.buildDPTable(text1, text2);
        return dp[text1.length][text2.length];
    }
    
    /**
     * Builds the DP table for LCS calculation
     */
    private static buildDPTable(text1: string, text2: string): number[][] {
        const m = text1.length;
        const n = text2.length;
        
        const dp: number[][] = Array(m + 1)
            .fill(null)
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
        
        return dp;
    }
    
    /**
     * Backtracks through the DP table to find the actual LCS string
     */
    private static backtrackLCS(text1: string, text2: string, dp: number[][]): string {
        let i = text1.length;
        let j = text2.length;
        const result: string[] = [];
        
        while (i > 0 && j > 0) {
            if (text1[i - 1] === text2[j - 1]) {
                result.unshift(text1[i - 1]);
                i--;
                j--;
            } else if (dp[i - 1][j] > dp[i][j - 1]) {
                i--;
            } else {
                j--;
            }
        }
        
        return result.join('');
    }
    
    /**
     * Returns all possible LCS sequences (if there are multiple)
     */
    public static findAllLCS(text1: string, text2: string): string[] {
        const dp = this.buildDPTable(text1, text2);
        return this.backtrackAllLCS(text1, text2, text1.length, text2.length, dp);
    }
    
    private static backtrackAllLCS(
        text1: string, 
        text2: string, 
        i: number, 
        j: number, 
        dp: number[][],
        memo: Map<string, string[]> = new Map()
    ): string[] {
        const key = `${i},${j}`;
        
        // Memoization check
        if (memo.has(key)) {
            return memo.get(key)!;
        }
        
        // Base cases
        if (i === 0 || j === 0) {
            return [''];
        }
        
        if (text1[i - 1] === text2[j - 1]) {
            const sequences = this.backtrackAllLCS(text1, text2, i - 1, j - 1, dp, memo);
            const result = sequences.map(seq => seq + text1[i - 1]);
            memo.set(key, result);
            return result;
        }
        
        const result: string[] = [];
        
        if (dp[i - 1][j] >= dp[i][j - 1]) {
            result.push(...this.backtrackAllLCS(text1, text2, i - 1, j, dp, memo));
        }
        
        if (dp[i][j - 1] >= dp[i - 1][j]) {
            result.push(...this.backtrackAllLCS(text1, text2, i, j - 1, dp, memo));
        }
        
        // Remove duplicates
        const uniqueResult = Array.from(new Set(result));
        memo.set(key, uniqueResult);
        return uniqueResult;
    }
}
// Basic usage
const lcs1 = longestCommonSubsequence("ABCDGH", "AEDFHR");
console.log(lcs1); // Output: "ADH"

// Using the utility class
const lcs2 = LCS.findLCS("AGGTAB", "GXTXAYB");
console.log(lcs2); // Output: "GTAB"

const length = LCS.lengthOfLCS("ABCBDAB", "BDCAB");
console.log(length); // Output: 4

// Find all possible LCS sequences
const allLCS = LCS.findAllLCS("ABC", "ACB");
console.log(allLCS); // Output: ["AB", "AC"]
function longestCommonSubsequenceOptimized(text1: string, text2: string): string {
    const m = text1.length;
    const n = text2.length;
    
    // Use only two rows to save space
    let prev: number[] = new Array(n + 1).fill(0);
    let curr: number[] = new Array(n + 1).fill(0);
    
    // Store the DP table for backtracking
    const dp: number[][] = [];
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                curr[j] = prev[j - 1] + 1;
            } else {
                curr[j] = Math.max(prev[j], curr[j - 1]);
            }
        }
        dp.push([...curr]);
        [prev, curr] = [curr, prev];
    }
    
    // Backtracking would need the full DP table, so we return just the length
    return dp[m - 1][n].toString(); // This returns the length, not the string
}
