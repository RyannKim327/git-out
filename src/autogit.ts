function buildLPS(pattern: string): number[] {
    const lps: number[] = new Array(pattern.length).fill(0);
    let length = 0; // length of the previous longest prefix suffix
    let i = 1; // start from the second character

    while (i < pattern.length) {
        if (pattern[i] === pattern[length]) {
            length++;
            lps[i] = length;
            i++;
        } else {
            if (length !== 0) {
                length = lps[length - 1]; // Use the previous prefix suffix
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }

    return lps;
}

function kmpSearch(text: string, pattern: string): number[] {
    const lps = buildLPS(pattern);
    const result: number[] = [];
    let i = 0; // index for text
    let j = 0; // index for pattern

    while (i < text.length) {
        if (pattern[j] === text[i]) {
            i++;
            j++;
        }

        if (j === pattern.length) {
            // Found pattern at index (i - j)
            result.push(i - j);
            j = lps[j - 1]; // Continue searching for more occurrences
        } else if (i < text.length && pattern[j] !== text[i]) {
            // Mismatch after j matches
            if (j !== 0) {
                j = lps[j - 1]; // Use the previous prefix suffix
            } else {
                i++;
            }
        }
    }

    return result; // Return the list of starting indices of matches
}

// Example usage:
const text = "ababcabcabababd";
const pattern = "ababd";
const indices = kmpSearch(text, pattern);
console.log(`Pattern found at indices: ${indices}`);
Pattern found at indices: [2]
