function longestCommonSubsequence(text1: string, text2: string): string {
    const m = text1.length;
    const n = text2.length;
    
    // Create DP table
    const dp: number[][] = Array.from({ length: m + 1 }, () => 
        Array.from({ length: n + 1 }, () => 0)
    );
    
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
const result1 = longestCommonSubsequence("ABCDGH", "AEDFHR");
console.log(result1); // "ADH"
function lcsLength(text1: string, text2: string): number {
    const m = text1.length;
    const n = text2.length;
    
    // Use two rows instead of full table
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
        // Swap arrays for next iteration
        [prev, curr] = [curr, prev];
    }
    
    return prev[n];
}
interface LCSResult {
    sequence: string;
    length: number;
    positions: { text1: number[]; text2: number[] };
}

function findLCS(text1: string, text2: string): LCSResult {
    const m = text1.length;
    const n = text2.length;
    
    // Create DP table and direction table
    const dp: number[][] = Array.from({ length: m + 1 }, () => 
        new Array(n + 1).fill(0)
    );
    
    const direction: string[][] = Array.from({ length: m + 1 }, () => 
        new Array(n + 1).fill('')
    );
    
    // Fill DP and direction tables
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                direction[i][j] = 'diagonal';
            } else if (dp[i - 1][j] >= dp[i][j - 1]) {
                dp[i][j] = dp[i - 1][j];
                direction[i][j] = 'up';
            } else {
                dp[i][j] = dp[i][j - 1];
                direction[i][j] = 'left';
            }
        }
    }
    
    // Backtrack to find LCS and positions
    let i = m, j = n;
    const sequence: string[] = [];
    const pos1: number[] = [];
    const pos2: number[] = [];
    
    while (i > 0 && j > 0) {
        if (direction[i][j] === 'diagonal') {
            sequence.unshift(text1[i - 1]);
            pos1.unshift(i - 1);
            pos2.unshift(j - 1);
            i--;
            j--;
        } else if (direction[i][j] === 'up') {
            i--;
        } else {
            j--;
        }
    }
    
    return {
        sequence: sequence.join(''),
        length: dp[m][n],
        positions: {
            text1: pos1,
            text2: pos2
        }
    };
}

// Example usage
const result = findLCS("ABCDGH", "AEDFHR");
console.log(result);
// Output: { sequence: "ADH", length: 3, positions: { text1: [0, 3, 5], text2: [0, 2, 5] } }
function findMultipleLCS(strings: string[]): string {
    if (strings.length === 0) return '';
    if (strings.length === 1) return strings[0];
    
    let result = strings[0];
    
    for (let i = 1; i < strings.length; i++) {
        result = longestCommonSubsequence(result, strings[i]);
        if (result === '') break; // Early exit if no common subsequence
    }
    
    return result;
}

// Example usage
const multipleResult = findMultipleLCS(["ABCDGH", "AEDFHR", "ADHXYZ"]);
console.log(multipleResult); // "ADH"
