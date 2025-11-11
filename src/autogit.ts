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
    
    // Reconstruct the LCS string
    let i = m, j = n;
    let result = '';
    
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

// Example usage
const str1 = "ABCDGH";
const str2 = "AEDFHR";
console.log(longestCommonSubsequence(str1, str2)); // Output: "ADH"
function lcsLength(text1: string, text2: string): number {
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
    
    return dp[m][n];
}

// Example usage
console.log(lcsLength("ABCDGH", "AEDFHR")); // Output: 3
function lcsMemo(text1: string, text2: string): string {
    const memo: Map<string, string> = new Map();
    
    function helper(i: number, j: number): string {
        if (i === 0 || j === 0) return '';
        
        const key = `${i},${j}`;
        if (memo.has(key)) return memo.get(key)!;
        
        let result: string;
        
        if (text1[i - 1] === text2[j - 1]) {
            result = helper(i - 1, j - 1) + text1[i - 1];
        } else {
            const lcs1 = helper(i - 1, j);
            const lcs2 = helper(i, j - 1);
            result = lcs1.length > lcs2.length ? lcs1 : lcs2;
        }
        
        memo.set(key, result);
        return result;
    }
    
    return helper(text1.length, text2.length);
}
function lcsAll(text1: string, text2: string): {
    length: number;
    sequence: string;
    indices1: number[];
    indices2: number[];
} {
    const m = text1.length;
    const n = text2.length;
    const dp: number[][] = Array(m + 1)
        .fill(null)
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
    
    // Reconstruct results
    let i = m, j = n;
    let sequence = '';
    const indices1: number[] = [];
    const indices2: number[] = [];
    
    while (i > 0 && j > 0) {
        if (text1[i - 1] === text2[j - 1]) {
            sequence = text1[i - 1] + sequence;
            indices1.unshift(i - 1);
            indices2.unshift(j - 1);
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }
    
    return {
        length: sequence.length,
        sequence,
        indices1,
        indices2
    };
}
