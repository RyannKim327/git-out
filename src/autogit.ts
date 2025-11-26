function buildShiftTable(pattern: string): { [char: string]: number } {
    const table: { [char: string]: number } = {};
    const m = pattern.length;
    
    for (let i = 0; i < m - 1; i++) {
        table[pattern[i]] = m - i - 1;
    }
    return table;
}

function boyerMooreHorspool(text: string, pattern: string): number[] {
    const n = text.length;
    const m = pattern.length;
    const table = buildShiftTable(pattern);
    const result: number[] = [];
    
    let i = 0;
    while (i <= n - m) {
        let j = m - 1;
        while (j >= 0 && pattern[j] === text[i + j]) {
            j--;
        }
        if (j < 0) {
            result.push(i); // Match found at index i
            i += m; // To find non-overlapping matches
        } else {
            const shift = table[text[i + m - 1]] ?? m;
            i += shift;
        }
    }
    return result;
}

// Usage example:
const text = "abacaabadcabacabaabb";
const pattern = "abacab";
console.log(boyerMooreHorspool(text, pattern)); // Output: [6]
