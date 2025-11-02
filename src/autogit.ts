/**
 * Performs Burrows-Wheeler Transform on a string
 * @param input Input string (must not contain the null terminator '\0')
 * @returns Object containing the transformed string and primary index
 */
function burrowsWheelerTransform(input: string): { transformed: string; index: number } {
    // Terminator character (modify if needed, must not appear in input)
    const terminator = '\0';

    // Check for terminator in input
    if (input.includes(terminator)) {
        throw new Error(`Input contains terminator character '${terminator}', which is not allowed.`);
    }

    // Append terminator character
    const str = input + terminator;
    const n = str.length;
    const rotations: string[] = [];

    // Generate all cyclic rotations
    for (let i = 0; i < n; i++) {
        rotations.push(str.slice(i) + str.slice(0, i));
    }

    // Sort rotations lexicographically
    rotations.sort();

    // Extract last characters to form transformed string
    const transformed = rotations.map(rotation => rotation[n - 1]).join('');

    // Find index of original string (with terminator appended)
    const index = rotations.indexOf(str);

    return { transformed, index };
}
// Example usage
const testString = "banana";
try {
    const result = burrowsWheelerTransform(testString);
    console.log(`Transformed: '${result.transformed}'`);
    console.log(`Primary Index: ${result.index}`);
} catch (error) {
    console.error(error.message);
}

// Output:
// Transformed: 'annb\0aa'
// Primary Index: 4
