function longestCommonSubstring(str1: string, str2: string): string {
    if (str1.length === 0 || str2.length === 0) return '';

    const len1 = str1.length;
    const len2 = str2.length;
    let maxLength = 0;
    let endIndex = 0;

    // Initialize previous row with zeros (size len2 + 1 for 0-based indexing)
    let prevRow: number[] = new Array(len2 + 1).fill(0);

    for (let i = 1; i <= len1; i++) {
        const currRow: number[] = new Array(len2 + 1).fill(0);

        for (let j = 1; j <= len2; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                currRow[j] = prevRow[j - 1] + 1;

                // Update maxLength and endIndex if a longer substring is found
                if (currRow[j] > maxLength) {
                    maxLength = currRow[j];
                    endIndex = i - 1; // end index in str1 (0-based)
                }
            } else {
                currRow[j] = 0; // No match, reset length
            }
        }

        // Update previous row for the next iteration
        prevRow = currRow;
    }

    return maxLength > 0
        ? str1.substring(endIndex - maxLength + 1, endIndex + 1)
        : '';
}
console.log(longestCommonSubstring("ABABC", "BABCA")); // Output: "BABC"
console.log(longestCommonSubstring("XYZ", "XYZ"));     // Output: "XYZ"
console.log(longestCommonSubstring("ABCD", "XYZ"));    // Output: ""
