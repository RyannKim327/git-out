function lcsRecursive(str1: string, str2: string, i: number = 0, j: number = 0): string {
    if (i === str1.length || j === str2.length) {
        return '';
    }
    
    if (str1[i] === str2[j]) {
        return str1[i] + lcsRecursive(str1, str2, i + 1, j + 1);
    } else {
        const lcs1 = lcsRecursive(str1, str2, i + 1, j);
        const lcs2 = lcsRecursive(str1, str2, i, j + 1);
        return lcs1.length > lcs2.length ? lcs1 : lcs2;
    }
}

// Usage
const result1 = lcsRecursive("ABCDGH", "AEDFHR");
console.log(result1); // "ADH"
function lcsMemo(str1: string, str2: string): string {
    const memo: Map<string, string> = new Map();
    
    function helper(i: number, j: number): string {
        const key = `${i},${j}`;
        if (memo.has(key)) {
            return memo.get(key)!;
        }
        
        if (i === str1.length || j === str2.length) {
            return '';
        }
        
        let result: string;
        if (str1[i] === str2[j]) {
            result = str1[i] + helper(i + 1, j + 1);
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

// Usage
const result2 = lcsMemo("ABCDGH", "AEDFHR");
console.log(result2); // "ADH"
function lcsDP(str1: string, str2: string): string {
    const m = str1.length;
    const n = str2.length;
    
    // Create DP table
    const dp: number[][] = Array.from({ length: m + 1 }, () => 
        Array.from({ length: n + 1 }, () => 0)
    );
    
    // Fill DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    // Reconstruct LCS from DP table
    let i = m, j = n;
    const lcsChars: string[] = [];
    
    while (i > 0 && j > 0) {
        if (str1[i - 1] === str2[j - 1]) {
            lcsChars.unshift(str1[i - 1]);
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }
    
    return lcsChars.join('');
}

// Usage
const result3 = lcsDP("ABCDGH", "AEDFHR");
console.log(result3); // "ADH"
class LongestCommonSubsequence {
    constructor(private str1: string, private str2: string) {}
    
    // Get just the length of LCS
    getLength(): number {
        const m = this.str1.length;
        const n = this.str2.length;
        const dp: number[] = new Array(n + 1).fill(0);
        
        for (let i = 1; i <= m; i++) {
            let prev = 0;
            for (let j = 1; j <= n; j++) {
                const temp = dp[j];
                if (this.str1[i - 1] === this.str2[j - 1]) {
                    dp[j] = prev + 1;
                } else {
                    dp[j] = Math.max(dp[j], dp[j - 1]);
                }
                prev = temp;
            }
        }
        
        return dp[n];
    }
    
    // Get the actual LCS string
    getSequence(): string {
        return lcsDP(this.str1, this.str2);
    }
    
    // Get all possible LCS sequences
    getAllSequences(): string[] {
        const sequences: Set<string> = new Set();
        this.findAllSequences(this.str1.length, this.str2.length, "", sequences);
        return Array.from(sequences);
    }
    
    private findAllSequences(i: number, j: number, current: string, sequences: Set<string>): void {
        if (i === 0 || j === 0) {
            if (current.length > 0) {
                sequences.add(current);
            }
            return;
        }
        
        if (this.str1[i - 1] === this.str2[j - 1]) {
            this.findAllSequences(i - 1, j - 1, this.str1[i - 1] + current, sequences);
        } else {
            // Explore both possibilities
            this.findAllSequences(i - 1, j, current, sequences);
            this.findAllSequences(i, j - 1, current, sequences);
        }
    }
}

// Usage
const lcs = new LongestCommonSubsequence("ABCBDAB", "BDCABA");
console.log(lcs.getLength()); // 4
console.log(lcs.getSequence()); // "BCBA" or "BDAB" (depends on path)
console.log(lcs.getAllSequences()); // ["BCBA", "BDAB", "BCAB"]
function benchmarkLCS(): void {
    const str1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const str2 = "ZYXWVUTSRQPONMLKJIHGFEDCBA";
    
    console.time("DP Tabulation");
    const result1 = lcsDP(str1, str2);
    console.timeEnd("DP Tabulation");
    
    console.time("DP Memoization");
    const result2 = lcsMemo(str1, str2);
    console.timeEnd("DP Memoization");
    
    console.log("Results:", result1, result2);
}

benchmarkLCS();
