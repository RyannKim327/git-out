function longestCommonSubstring(s1: string, s2: string): string {
    if (!s1 || !s2) return '';

    const m = s1.length, n = s2.length;
    // one‑dimensional DP (only the previous row is needed)
    const dp = new Array(n + 1).fill(0);
    let maxLen = 0;          // longest length seen so far
    let endIdxS1 = 0;        // index where that longest ends in s1

    for (let i = 1; i <= m; i++) {
        // iterate j from right to left so the current row doesn't overwrite the
        // values we still need from the previous row
        for (let j = n; j >= 1; j--) {
            if (s1[i - 1] === s2[j - 1]) {
                dp[j] = dp[j - 1] + 1;   // extend the matching suffix
                if (dp[j] > maxLen) {
                    maxLen = dp[j];
                    endIdxS1 = i;       // end in s1 (i-1 is *current* char)
                }
            } else {
                dp[j] = 0;
            }
        }
    }

    // Extract slice from s1 using the remembered end index and length
    return maxLen > 0 ? s1.slice(endIdxS1 - maxLen, endIdxS1) : '';
}

// Quick demo
console.log(longestCommonSubstring('abcdef', 'zbcdefg')); // → "bcdef"
