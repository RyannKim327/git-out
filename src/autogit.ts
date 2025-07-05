function computeLPSArray(pattern: string): number[] {
    const m = pattern.length;
    const lps = new Array(m).fill(0); // Initialize LPS array
    let len = 0; // Length of the previous longest prefix suffix
    let i = 1;

    while (i < m) {
        if (pattern[i] === pattern[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len !== 0) {
                len = lps[len - 1]; // Use the LPS array to fall back
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }

    return lps;
}

function KMPSearch(text: string, pattern: string): number[] {
    const n = text.length;
    const m = pattern.length;
    const lps = computeLPSArray(pattern);
    const occurrences: number[] = [];

    let i = 0; // Index for text
    let j = 0; // Index for pattern

    while (i < n) {
        if (pattern[j] === text[i]) {
            i++;
            j++;
        }

        if (j === m) {
            // Found the pattern at index (i - j)
            occurrences.push(i - j);
            j = lps[j - 1]; // Use LPS array to find the next positions
        } else if (i < n && pattern[j] !== text[i]) {
            // Mismatch after j matches
            if (j !== 0) {
                j = lps[j - 1]; // Use LPS array
            } else {
                i++;
            }
        }
    }

    return occurrences; // Return all starting indices of matches
}

// Example usage
const text = "ABABDABACDABABCABAB";
const pattern = "ABABCABAB";
const result = KMPSearch(text, pattern);
console.log("Pattern found at indices:", result);
