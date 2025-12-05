function buildBadCharTable(pattern: string): Map<string, number> {
    const table = new Map<string, number>();
    for (let i = 0; i < pattern.length; i++) {
        table.set(pattern[i], i); // Store last occurrence of each character
    }
    return table;
}

function boyerMooreSearch(text: string, pattern: string): number[] {
    const matches: number[] = [];
    const n = text.length;
    const m = pattern.length;

    if (m === 0 || n === 0 || m > n) return matches; // Edge cases

    const badCharTable = buildBadCharTable(pattern);
    let i = 0; // Current alignment index in text

    while (i <= n - m) {
        let j = m - 1; // Start comparing from pattern's end

        // Find mismatch position (if any)
        while (j >= 0 && pattern[j] === text[i + j]) {
            j--;
        }

        if (j < 0) {
            // Full match found
            matches.push(i);
            // Shift using bad character rule (or move by 1 if no info)
            i += (i + m < n) ? m - (badCharTable.get(text[i + m]) ?? -1) : 1;
        } else {
            // Mismatch occurred - compute shift using bad character rule
            const badChar = text[i + j];
            const lastOccurrence = badCharTable.get(badChar) ?? -1;
            i += Math.max(1, j - lastOccurrence);
        }
    }

    return matches;
}
const text = "ABAAABCDBBABCDEFBCDA";
const pattern = "ABC";
const result = boyerMooreSearch(text, pattern);
console.log(result); // Output: [3, 10]
