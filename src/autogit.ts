/**
 * Performs the Burrows-Wheeler Transform (BWT) on the input string.
 * @param input The input string to transform.
 * @returns The BWT of the input string.
 */
function burrowsWheelerTransform(input: string): string {
    const length = input.length;
    const rotations: string[] = [];

    // Generate all rotations of the input string
    for (let i = 0; i < length; i++) {
        // Rotate the string by i positions
        const rotation = input.slice(i) + input.slice(0, i);
        rotations.push(rotation);
    }

    // Sort all rotations lexicographically
    rotations.sort();

    // Construct the BWT by taking the last character from each rotation
    const lastColumn = rotations.map(rotation => rotation.charAt(rotation.length - 1));

    // Join the last characters to form the transformed string
    return lastColumn.join('');
}

// Example usage:
const inputString = "banana";
const bwtResult = burrowsWheelerTransform(inputString);
console.log(`BWT of "${inputString}":`, bwtResult);
banana
ananab
nanaba
anaban
nabanA
abanan
abanan
anaban
ananab
banana
nabanA
nanaba
