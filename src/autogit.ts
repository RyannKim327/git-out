/**
 * Performs the Burrows-Wheeler Transform on a given input string.
 * @param input The string to be transformed
 * @returns A tuple containing the transformed string and the index of the original string
 */
function burrowsWheelerTransform(input: string): [string, number] {
    // Append end-of-string marker ($) to the input
    const sentinel = '$';
    const transformed = input + sentinel;
    const len = transformed.length;

    // Generate array of rotation starting indices [0, 1, ..., len - 1]
    const rotations = Array.from({ length: len }, (_, i) => i);

    // Sort rotations lexicographically using cyclic comparisons
    rotations.sort((a, b) => {
        for (let k = 0; k < len; k++) {
            const cA = transformed.charCodeAt((a + k) % len);
            const cB = transformed.charCodeAt((b + k) % len);
            if (cA !== cB) return cA - cB;
        }
        return 0; // Equal rotations
    });

    // Find the index of the original rotation (starting at 0)
    const originalIndex = rotations.indexOf(0);

    // Construct the transformed string using last characters of sorted rotations
    let bwtString = '';
    for (const rotation of rotations) {
        const lastCharIndex = (rotation - 1 + len) % len;
        bwtString += transformed[lastCharIndex];
    }

    return [bwtString, originalIndex];
}

// Example Usage
const [bwt, idx] = burrowsWheelerTransform('banana');
console.log(`Transformed: "${bwt}"\nOriginal Index: ${idx}`);
// Output for "banana": Transformed: "annb$aa", Original Index: 4
