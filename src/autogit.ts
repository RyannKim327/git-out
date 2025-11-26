function bwt(input: string): { transformed: string, index: number } {
    const n = input.length;
    const rotations: string[] = [];

    // Generate all rotations
    for (let i = 0; i < n; i++) {
        rotations.push(input.slice(i) + input.slice(0, i));
    }

    // Sort rotations lexicographically
    const sorted = rotations.slice().sort();

    // Get the last column
    const lastColumn = sorted.map(row => row[n - 1]).join('');

    // Find the index of the original string in sorted rotations
    const index = sorted.indexOf(input);

    return { transformed: lastColumn, index };
}

// Example
const result = bwt("banana$"); // '$' as a terminator symbol
console.log(result.transformed); // "annb$aa"
console.log(result.index);       // position of original string in sorted rotations
function inverseBwt(lastColumn: string, index: number): string {
    const n = lastColumn.length;

    // First column is just the sorted chars of lastColumn
    const firstColumn = lastColumn.split('').sort();

    // Map from character occurrence to row mapping
    const rankLast: number[] = [];
    const occurrenceMapLast: Record<string, number> = {};
    for (const char of lastColumn) {
        occurrenceMapLast[char] = (occurrenceMapLast[char] ?? 0) + 1;
        rankLast.push(occurrenceMapLast[char]);
    }

    const occurrenceMapFirst: Record<string, number> = {};
    const firstColumnRank: number[] = [];
    for (const char of firstColumn) {
        occurrenceMapFirst[char] = (occurrenceMapFirst[char] ?? 0) + 1;
        firstColumnRank.push(occurrenceMapFirst[char]);
    }

    // Link last column to first column rows
    const rowMapping: number[] = [];
    for (let i = 0; i < n; i++) {
        const char = lastColumn[i];
        const rank = rankLast[i];
        // Find position of (char, rank) in firstColumn
        const position = firstColumnRank.findIndex((r, idx) =>
            firstColumn[idx] === char && r === rank
        );
        rowMapping[i] = position;
    }

    // Rebuild the string
    let row = index;
    let original = '';
    for (let i = 0; i < n; i++) {
        original += lastColumn[row];
        row = rowMapping[row];
    }

    return original;
}

// Example
const restored = inverseBwt("annb$aa", 3);
console.log(restored); // "banana$"
