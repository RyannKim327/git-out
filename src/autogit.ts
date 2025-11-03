function longestCommonSubsequence(text1: string, text2: string): string {
    const m = text1.length;
    const n = text2.length;
    
    // Create DP table
    const dp: number[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
    
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
            lcs.unshift(text1[i - 1]);
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }
    
    return lcs.join('');
}

// Example usage
const result = longestCommonSubsequence("ABCDGH", "AEDFHR");
console.log(result); // Output: "ADH"
function lcsLength(text1: string, text2: string): number {
    const m = text1.length;
    const n = text2.length;
    const dp: number[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
    
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (text1[i] === text2[j]) {
                dp[i + 1][j + 1] = dp[i][j] + 1;
            } else {
                dp[i + 1][j + 1] = Math.max(dp[i][j + 1], dp[i + 1][j]);
            }
        }
    }
    
    return dp[m][n];
}
function lcsOptimized(text1: string, text2: string): string {
    const m = text1.length;
    const n = text2.length;
    
    // Use only two rows to save space
    let prev: number[] = new Array(n + 1).fill(0);
    let curr: number[] = new Array(n + 1).fill(0);
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                curr[j] = prev[j - 1] + 1;
            } else {
                curr[j] = Math.max(prev[j], curr[j - 1]);
            }
        }
        [prev, curr] = [curr, prev]; // Swap arrays
    }
    
    // For reconstructing, we'd need the full DP table
    // This version is mainly for getting the length efficiently
    
    return reconstructLCS(text1, text2, prev[n]);
}

// Helper function to reconstruct (requires full DP table)
function reconstructLCS(text1: string, text2: string, length: number): string {
    // For simplicity, use the first method's reconstruction
    return longestCommonSubsequence(text1, text2);
}
function lcsRecursive(text1: string, text2: string): string {
    const memo: Map<string, string> = new Map();
    
    function helper(i: number, j: number): string {
        if (i === text1.length || j === text2.length) return '';
        
        const key = `${i},${j}`;
        if (memo.has(key)) return memo.get(key)!;
        
        let result: string;
        
        if (text1[i] === text2[j]) {
            result = text1[i] + helper(i + 1, j + 1);
        } else {
            const lcs1 = helper(i + 1, j);
            const lcs2 = helper(i, j + 1);
            result = lcs1.length > lcs2.length ? lcs1 : lcs2;
        }
        
        memo.set(key, result);
        return result;
    }
    
    return helper(0, 0);
}
interface LCSResult {
    sequence: string;
    length: number;
    positions1: number[];
    positions2: number[];
}

function findLCSWithDetails(text1: string, text2: string): LCSResult {
    const m = text1.length;
    const n = text2.length;
    
    // DP table
    const dp: number[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
    
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
    
    // Reconstruct with positions
    const sequence: string[] = [];
    const positions1: number[] = [];
    const positions2: number[] = [];
    
    let i = m, j = n;
    while (i > 0 && j > 0) {
        if (text1[i - 1] === text2[j - 1]) {
            sequence.unshift(text1[i - 1]);
            positions1.unshift(i - 1);
            positions2.unshift(j - 1);
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }
    
    return {
        sequence: sequence.join(''),
        length: sequence.length,
        positions1,
        positions2
    };
}

// Usage example
const strings1 = "ABCDGH";
const strings2 = "AEDFHR";
const result = findLCSWithDetails(strings1, strings2);

console.log(`LCS: ${result.sequence}`); // "ADH"
console.log(`Length: ${result.length}`); // 3
console.log(`Positions in text1: ${result.positions1}`); // [0, 3, 5]
console.log(`Positions in text2: ${result.positions2}`); // [0, 3, 5]
