function computePrefixTable(pattern: string): number[] {
    const m = pattern.length;
    const prefixTable = new Array(m).fill(0);
    let k = 0; // Length of the previous longest prefix-suffix

    for (let i = 1; i < m; i++) {
        while (k > 0 && pattern[k] !== pattern[i]) {
            k = prefixTable[k - 1];
        }
        if (pattern[k] === pattern[i]) {
            k++;
        }
        prefixTable[i] = k;
    }

    return prefixTable;
}
function kmpSearch(text: string, pattern: string): number[] {
    const n = text.length;
    const m = pattern.length;
    if (m === 0) return []; // Edge case: empty pattern

    const prefixTable = computePrefixTable(pattern);
    const matches: number[] = [];
    let q = 0; // Number of characters matched so far

    for (let i = 0; i < n; i++) {
        while (q > 0 && pattern[q] !== text[i]) {
            q = prefixTable[q - 1];
        }
        if (pattern[q] === text[i]) {
            q++;
        }
        if (q === m) {
            matches.push(i - m + 1); // Found a match at index i - m + 1
            q = prefixTable[q - 1]; // Continue for overlapping matches
        }
    }

    return matches;
}
// Example
const text = "ABABDABACDABABCABAB";
const pattern = "ABABCABAB";
const matchIndices = kmpSearch(text, pattern);
console.log(matchIndices); // Output: [10] (match starts at index 10)

// Another example with overlaps
const text2 = "aaaa";
const pattern2 = "aa";
console.log(kmpSearch(text2, pattern2)); // Output: [0, 1, 2] (overlapping matches)
