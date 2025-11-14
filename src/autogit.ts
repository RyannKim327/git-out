function boyerMooreSearch(text: string, pattern: string): number[] {
    const m = pattern.length;
    const n = text.length;
    const matches: number[] = [];

    if (m === 0 || n === 0 || m > n) {
        return matches;
    }

    // Build bad character table
    const badCharShift: Record<string, number> = {};
    const ALPHABET_SIZE = 256; // ASCII range

    // Initialize with m (pattern length)
    for (let i = 0; i < ALPHABET_SIZE; i++) {
        badCharShift[String.fromCharCode(i)] = m;
    }

    // Set actual shifts based on pattern chars
    for (let i = 0; i < m - 1; i++) {
        badCharShift[pattern[i]] = m - i - 1;
    }

    // Search
    let skip = 0;
    while (skip <= n - m) {
        let j = m - 1;

        // Compare pattern backwards
        while (j >= 0 && pattern[j] === text[skip + j]) {
            j--;
        }

        if (j < 0) {
            matches.push(skip);
            skip += m; // or shift more intelligently using good-suffix (optional)
        } else {
            const badChar = text[skip + j];
            skip += badCharShift[badChar] || m;
        }
    }

    return matches;
}

// Example usage:
const text = "HERE IS A SIMPLE EXAMPLE";
const pattern = "EXAMPLE";
console.log(boyerMooreSearch(text, pattern)); // Output: [17]
