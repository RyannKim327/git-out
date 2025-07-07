function kmpSearch(text: string, pattern: string): number[] {
    const lps = computeLPSArray(pattern);
    const result: number[] = [];
    let i = 0; // index for text
    let j = 0; // index for pattern

    while (i < text.length) {
        if (pattern[j] === text[i]) {
            i++;
            j++;
        }

        if (j === pattern.length) {
            result.push(i - j); // Match found, add the starting index to result
            j = lps[j - 1]; // Reset j using the LPS array
        } else if (i < text.length && pattern[j] !== text[i]) {
            if (j !== 0) {
                j = lps[j - 1]; // Use LPS to skip characters
            } else {
                i++;
            }
        }
    }

    return result; // Return all starting indices of matches
}

function computeLPSArray(pattern: string): number[] {
    const lps = new Array(pattern.length).fill(0);
    let length = 0; // Length of the previous longest prefix suffix
    let i = 1;

    while (i < pattern.length) {
        if (pattern[i] === pattern[length]) {
            length++;
            lps[i] = length;
            i++;
        } else {
            if (length !== 0) {
                length = lps[length - 1]; // Use the previous LPS value
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }

    return lps;
}

// Example usage:
const text = "ababcabcabababd";
const pattern = "ababd";
const matches = kmpSearch(text, pattern);
console.log("Pattern found at indices:", matches);
