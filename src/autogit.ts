function longestCommonSubstring(s1: string, s2: string): string {
    const n = s1.length;
    const m = s2.length;

    // dp[i][j] will store the length of the longest common substring ending at s1[i-1] and s2[j-1]
    // Initialize a 2D array with zeros. Dimensions (n+1) x (m+1) for easier 1-based indexing for strings.
    const dp: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

    let maxLength = 0; // Stores the maximum length found so far
    let endIndexS1 = 0; // Stores the ending index in s1 of the longest common substring

    // Fill the dp table
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            // If characters match, extend the common substring
            if (s1[i - 1] === s2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];

                // If this new length is greater than maxLength, update maxLength and endIndexS1
                if (dp[i][j] > maxLength) {
                    maxLength = dp[i][j];
                    endIndexS1 = i - 1; // Current index in s1 (0-based)
                }
            } else {
                // If characters don't match, the common substring ending here is broken, so reset to 0
                dp[i][j] = 0;
            }
        }
    }

    // If no common substring found (maxLength is 0), return an empty string
    if (maxLength === 0) {
        return "";
    }

    // Extract the longest common substring using maxLength and endIndexS1
    // The substring starts at endIndexS1 - maxLength + 1 and ends at endIndexS1
    return s1.substring(endIndexS1 - maxLength + 1, endIndexS1 + 1);
}

// --- Test Cases ---
console.log(`"abcdef", "xyzdefg" -> "${longestCommonSubstring("abcdef", "xyzdefg")}"`); // Expected: "def"
console.log(`"ABCDGH", "ACDGHR" -> "${longestCommonSubstring("ABCDGH", "ACDGHR")}"`);   // Expected: "CDGH"
console.log(`"ABC", "BABC" -> "${longestCommonSubstring("ABC", "BABC")}"`);         // Expected: "ABC"
console.log(`"AB", "BA" -> "${longestCommonSubstring("AB", "BA")}"`);             // Expected: "B" or "A" (depends on order, here "B")
console.log(`"abc", "xyz" -> "${longestCommonSubstring("abc", "xyz")}"`);         // Expected: ""
console.log(`"", "test" -> "${longestCommonSubstring("", "test")}"`);               // Expected: ""
console.log(`"test", "" -> "${longestCommonSubstring("test", "")}"`);               // Expected: ""
console.log(`"aaaaa", "aaaaa" -> "${longestCommonSubstring("aaaaa", "aaaaa")}"`); // Expected: "aaaaa"
console.log(`"banana", "atana" -> "${longestCommonSubstring("banana", "atana")}"`); // Expected: "ana"
console.log(`"longestcommon", "commonstring" -> "${longestCommonSubstring("longestcommon", "commonstring")}"`); // Expected: "common"

// Case-insensitivity example (modify inputs)
const s1_case = "LongestCommon";
const s2_case = "commonString";
console.log(`"${s1_case}", "${s2_case}" (case-insensitive) -> "${longestCommonSubstring(s1_case.toLowerCase(), s2_case.toLowerCase())}"`); // Expected: "common"
function longestCommonSubstringCaseInsensitive(s1: string, s2: string): string {
    const s1Lower = s1.toLowerCase(); // Convert to lowercase
    const s2Lower = s2.toLowerCase(); // Convert to lowercase

    const n = s1Lower.length;
    const m = s2Lower.length;

    const dp: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

    let maxLength = 0;
    let endIndexS1 = 0; // This will still point to the index in the original s1Lower

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (s1Lower[i - 1] === s2Lower[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
                if (dp[i][j] > maxLength) {
                    maxLength = dp[i][j];
                    endIndexS1 = i - 1;
                }
            } else {
                dp[i][j] = 0;
            }
        }
    }

    if (maxLength === 0) {
        return "";
    }

    // Return the substring from the ORIGINAL s1, using the found indices.
    // This maintains the original casing of the common substring.
    return s1.substring(endIndexS1 - maxLength + 1, endIndexS1 + 1);
}

console.log(`"LongestCommon", "commonString" (case-insensitive func) -> "${longestCommonSubstringCaseInsensitive("LongestCommon", "commonString")}"`); // Expected: "Common"
