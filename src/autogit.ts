function longestCommonSubsequence(
  text1: string, 
  text2: string
): string {
  const memo: Map<string, string> = new Map();
  
  function lcsHelper(i: number, j: number): string {
    if (i === text1.length || j === text2.length) {
      return '';
    }
    
    const key = `${i},${j}`;
    if (memo.has(key)) {
      return memo.get(key)!;
    }
    
    if (text1[i] === text2[j]) {
      const result = text1[i] + lcsHelper(i + 1, j + 1);
      memo.set(key, result);
      return result;
    } else {
      const lcs1 = lcsHelper(i + 1, j);
      const lcs2 = lcsHelper(i, j + 1);
      const result = lcs1.length > lcs2.length ? lcs1 : lcs2;
      memo.set(key, result);
      return result;
    }
  }
  
  return lcsHelper(0, 0);
}
function longestCommonSubsequence(
  text1: string, 
  text2: string
): string {
  const m = text1.length;
  const n = text2.length;
  
  // Create DP table to store lengths
  const dp: number[][] = Array(m + 1)
    .fill(0)
    .map(() => Array(n + 1).fill(0));
  
  // Build the DP table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  
  // Reconstruct the LCS from the DP table
  let i = m;
  let j = n;
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
class LongestCommonSubsequence {
  /**
   * Finds the longest common subsequence between two strings
   */
  static find(text1: string, text2: string): string {
    if (text1.length === 0 || text2.length === 0) {
      return '';
    }
    
    const dp: number[][] = this.buildDPTable(text1, text2);
    return this.reconstructLCS(text1, text2, dp);
  }
  
  /**
   * Builds the dynamic programming table
   */
  private static buildDPTable(text1: string, text2: string): number[][] {
    const m = text1.length;
    const n = text2.length;
    
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
    
    return dp;
  }
  
  /**
   * Reconstructs the LCS from the DP table
   */
  private static reconstructLCS(
    text1: string, 
    text2: string, 
    dp: number[][]
  ): string {
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
   * Returns just the length of the LCS (more efficient for length-only)
   */
  static length(text1: string, text2: string): number {
    const dp = this.buildDPTable(text1, text2);
    return dp[text1.length][text2.length];
  }
  
  /**
   * Returns all longest common subsequences (if there are multiple with same length)
   */
  static findAll(text1: string, text2: string): string[] {
    const dp = this.buildDPTable(text1, text2);
    return this.findAllLCS(text1, text2, text1.length, text2.length, dp);
  }
  
  private static findAllLCS(
    text1: string,
    text2: string,
    i: number,
    j: number,
    dp: number[][],
    current: string = ''
  ): string[] {
    if (i === 0 || j === 0) {
      return [current];
    }
    
    if (text1[i - 1] === text2[j - 1]) {
      return this.findAllLCS(
        text1, text2, i - 1, j - 1, dp, text1[i - 1] + current
      );
    }
    
    const results: string[] = [];
    
    if (dp[i - 1][j] >= dp[i][j - 1]) {
      results.push(...this.findAllLCS(text1, text2, i - 1, j, dp, current));
    }
    
    if (dp[i][j - 1] >= dp[i - 1][j]) {
      results.push(...this.findAllLCS(text1, text2, i, j - 1, dp, current));
    }
    
    // Remove duplicates
    return [...new Set(results)];
  }
}
// Example usage
const text1 = "ABCDGH";
const text2 = "AEDFHR";

console.log("String 1:", text1);
console.log("String 2:", text2);
console.log("Longest Common Subsequence:", LongestCommonSubsequence.find(text1, text2));
console.log("Length of LCS:", LongestCommonSubsequence.length(text1, text2));
console.log("All LCS:", LongestCommonSubsequence.findAll(text1, text2));

// Output:
// String 1: ABCDGH
// String 2: AEDFHR
// Longest Common Subsequence: ADH
// Length of LCS: 3
// All LCS: [ 'ADH' ]

// More examples
const examples = [
  { text1: "abcdef", text2: "ace", expected: "ace" },
  { text1: "abc", text2: "def", expected: "" },
  { text1: "abc", text2: "abc", expected: "abc" },
  { text1: "abcde", text2: "ace", expected: "ace" }
];

examples.forEach(({ text1, text2, expected }) => {
  const result = LongestCommonSubsequence.find(text1, text2);
  console.log(`LCS of "${text1}" and "${text2}": "${result}" (expected: "${expected}")`);
});
