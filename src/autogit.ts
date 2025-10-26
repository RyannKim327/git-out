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
const text1 = "ABCDGH";
const text2 = "AEDFHR";
console.log(longestCommonSubsequence(text1, text2)); // Output: "ADH"
interface LCSResult {
    length: number;
    sequence: string;
}

function findLCS(text1: string, text2: string): LCSResult {
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
    
    // Reconstruct LCS
    let i = m, j = n;
    const sequence: string[] = [];
    
    while (i > 0 && j > 0) {
        if (text1[i - 1] === text2[j - 1]) {
            sequence.unshift(text1[i - 1]);
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
        sequence: sequence.join('')
    };
}

// Example usage
const result = findLCS("ABCDGH", "AEDFHR");
console.log(result); // Output: { length: 3, sequence: "ADH" }
function lcsLength(text1: string, text2: string): number {
    const m = text1.length;
    const n = text2.length;
    
    // Only keep two rows at a time
    let prev: number[] = Array(n + 1).fill(0);
    let curr: number[] = Array(n + 1).fill(0);
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                curr[j] = prev[j - 1] + 1;
            } else {
                curr[j] = Math.max(prev[j], curr[j - 1]);
            }
        }
        // Swap arrays
        [prev, curr] = [curr, prev];
    }
    
    return prev[n];
}
function lcsRecursive(text1: string, text2: string): string {
    const memo = new Map<string, string>();
    
    function solve(i: number, j: number): string {
        if (i === 0 || j === 0) return '';
        
        const key = `${i},${j}`;
        if (memo.has(key)) return memo.get(key)!;
        
        if (text1[i - 1] === text2[j - 1]) {
            const result = solve(i - 1, j - 1) + text1[i - 1];
            memo.set(key, result);
            return result;
        } else {
            const lcs1 = solve(i - 1, j);
            const lcs2 = solve(i, j - 1);
            const result = lcs1.length > lcs2.length ? lcs1 : lcs2;
            memo.set(key, result);
            return result;
        }
    }
    
    return solve(text1.length, text2.length);
}
class LCSFinder {
    constructor(private text1: string, private text2: string) {}
    
    find(): string {
        const dp = this.buildDPTable();
        return this.reconstructLCS(dp);
    }
    
    private buildDPTable(): number[][] {
        const m = this.text1.length;
        const n = this.text2.length;
        
        const dp: number[][] = Array(m + 1)
            .fill(0)
            .map(() => Array(n + 1).fill(0));
        
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                if (this.text1[i - 1] === this.text2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        
        return dp;
    }
    
    private reconstructLCS(dp: number[][]): string {
        let i = this.text1.length;
        let j = this.text2.length;
        const sequence: string[] = [];
        
        while (i > 0 && j > 0) {
            if (this.text1[i - 1] === this.text2[j - 1]) {
                sequence.unshift(this.text1[i - 1]);
                i--;
                j--;
            } else if (dp[i - 1][j] > dp[i][j - 1]) {
                i--;
            } else {
                j--;
            }
        }
        
        return sequence.join('');
    }
    
    getLength(): number {
        return this.find().length;
    }
}

// Example usage
const finder = new LCSFinder("ABCDGH", "AEDFHR");
console.log(finder.find()); // Output: "ADH"
console.log(finder.getLength()); // Output: 3
