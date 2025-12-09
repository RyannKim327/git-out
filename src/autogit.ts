function longestCommonSubstring(str1: string, str2: string): string {
    if (str1.length === 0 || str2.length === 0) return '';

    let maxLength = 0;
    let endIndex = 0;
    const dp: number[] = new Array(str2.length + 1).fill(0);

    for (let i = 0; i < str1.length; i++) {
        let diagonal = 0; // Tracks dp[i-1][j-1] from previous row
        for (let j = 0; j < str2.length; j++) {
            const temp = dp[j + 1]; // Save previous row's dp[j+1]
            if (str1[i] === str2[j]) {
                dp[j + 1] = diagonal + 1;
                if (dp[j + 1] > maxLength) {
                    maxLength = dp[j + 1];
                    endIndex = i;
                }
            } else {
                dp[j + 1] = 0;
            }
            diagonal = temp; // Update diagonal for next iteration
        }
    }

    if (maxLength === 0) return '';
    return str1.substring(endIndex - maxLength + 1, endIndex + 1);
}
console.log(longestCommonSubstring('abcdef', 'xbcdeft')); // Outputs 'bcdef'
console.log(longestCommonSubstring('hello world', 'wow world')); // Outputs ' world'
console.log(longestCommonSubstring('abc', 'def')); // Outputs '' (no common substring)
