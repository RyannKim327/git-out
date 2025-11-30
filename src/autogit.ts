/**
 * Encodes a string using Burrows-Wheeler Transform
 * @param input The string to be transformed (should include a unique EOF character like '$')
 * @returns An object containing the transformed string and the index of the original string
 */
export function bwtEncode(input: string): { bwt: string; index: number; } {
    if (input.length === 0) throw new Error("Input cannot be empty");

    const rotations: string[] = [];
    const n = input.length;

    // Generate all rotations
    for (let i = 0; i < n; i++) {
        rotations.push(input.slice(i) + input.slice(0, i));
    }

    // Sort rotations lexicographically
    rotations.sort();

    // Extract last characters and find original index
    const bwt = rotations.map(rotation => rotation[n - 1]).join('');
    const index = rotations.indexOf(input);

    return { bwt, index };
}

/**
 * Decodes a Burrows-Wheeler Transformed string
 * @param bwt The transformed string
 * @param index The index of the original string in the sorted rotations
 * @returns The original string
 */
export function bwtDecode(bwt: string, index: number): string {
    if (bwt.length === 0) throw new Error("BWT string cannot be empty");
    if (index < 0 || index >= bwt.length) throw new Error("Invalid index");

    // Initialize table with empty strings
    let table: string[] = Array.from({ length: bwt.length }, () => '');

    for (let i = 0; i < bwt.length; i++) {
        // Prepend each character to the corresponding row
        for (let j = 0; j < bwt.length; j++) {
            table[j] = bwt[j] + table[j];
        }

        // Sort the table lexicographically after each iteration
        table.sort();
    }

    // The original string is at the given index
    return table[index];
}

// Example usage:
const testString = "banana$";
console.log("Original string:", testString);

// Encode
const encoded = bwtEncode(testString);
console.log("BWT encoded:", encoded.bwt, "Index:", encoded.index);

// Decode
const decoded = bwtDecode(encoded.bwt, encoded.index);
console.log("BWT decoded:", decoded);
Original string: banana$
BWT encoded: annb$aa Index: 4
BWT decoded: banana$
