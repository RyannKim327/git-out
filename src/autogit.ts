function createBadCharacterTable(pattern: string): number[] {
    const table: number[] = new Array(256).fill(-1);
    const patternLength = pattern.length;

    for (let i = 0; i < patternLength; i++) {
        table[pattern.charCodeAt(i)] = i;
    }

    return table;
}

function boyerMooreHorspool(text: string, pattern: string): number[] {
    const badCharTable = createBadCharacterTable(pattern);
    const patternLength = pattern.length;
    const textLength = text.length;
    const result: number[] = [];

    let skip: number = 0; // Skip counter

    while (textLength - skip >= patternLength) {
        let j: number = patternLength - 1;

        // Compare the pattern with the text from right to left
        while (j >= 0 && pattern[j] === text[skip + j]) {
            j--;
        }

        // If the pattern is found
        if (j < 0) {
            result.push(skip); // Store the position of the match
            // Shift the pattern to the right based on the bad character table
            skip += (skip + patternLength < textLength) ? patternLength - badCharTable[text.charCodeAt(skip + patternLength)] : 1;
        } else {
            // Shift the pattern based on the bad character table
            skip += Math.max(1, j - badCharTable[text.charCodeAt(skip + j)]);
        }
    }

    return result;
}

// Example usage:
const text = "ababcabcabababd";
const pattern = "ababd";

const result = boyerMooreHorspool(text, pattern);
console.log(result); // Output: [10] (the starting index of the match)
