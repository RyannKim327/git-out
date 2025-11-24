function computeLPSArray(pattern: string): number[] {
    const lps: number[] = new Array(pattern.length).fill(0);
    let len = 0;  // Length of the previous longest prefix suffix
    let i = 1;

    while (i < pattern.length) {
        if (pattern[i] === pattern[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len !== 0) {
                // Fall back to the previous longest prefix
                len = lps[len - 1];
            } else {
                // No matching prefix found
                lps[i] = 0;
                i++;
            }
        }
    }
    return lps;
}

function kmpSearch(text: string, pattern: string): number[] {
    if (pattern.length === 0) return [];
    
    const lps = computeLPSArray(pattern);
    const matches: number[] = [];
    
    let i = 0;  // Index for text
    let j = 0;  // Index for pattern

    while (i < text.length) {
        if (pattern[j] === text[i]) {
            i++;
            j++;
        }

        // Pattern found
        if (j === pattern.length) {
            matches.push(i - j);
            j = lps[j - 1];
        }
        // Mismatch after j matches
        else if (i < text.length && pattern[j] !== text[i]) {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }

    return matches;
}

// Example usage:
const text = "ABABDABACDABABCABAB";
const pattern = "ABABCABAB";
const result = kmpSearch(text, pattern);

console.log("Pattern found at indices:", result);  // Output: [10]
// Find all occurrences of "ABC" in text
const matches = kmpSearch("ABCDSGDABCEGABC", "ABC");
console.log(matches);  // Output: [0, 7, 11]
