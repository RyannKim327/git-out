class BurrowsWheelerTransform {
    /**
     * Applies the Burrows-Wheeler Transform to a string
     * @param input The input string to transform
     * @returns The transformed string and the original index
     */
    static encode(input: string): { transformed: string; index: number } {
        if (input.length === 0) {
            return { transformed: '', index: -1 };
        }

        // Add end-of-string marker if not present
        const text = input + '$';
        
        // Generate all cyclic rotations
        const rotations: string[] = [];
        for (let i = 0; i < text.length; i++) {
            rotations.push(text.substring(i) + text.substring(0, i));
        }

        // Sort rotations lexicographically
        rotations.sort();

        // Extract last characters and find original string index
        let originalIndex = -1;
        const lastColumn: string[] = [];
        
        for (let i = 0; i < rotations.length; i++) {
            lastColumn.push(rotations[i].charAt(rotations[i].length - 1));
            if (rotations[i] === text) {
                originalIndex = i;
            }
        }

        return {
            transformed: lastColumn.join(''),
            index: originalIndex
        };
    }

    /**
     * Decodes a Burrows-Wheeler transformed string
     * @param transformed The transformed string
     * @param index The original index from encoding
     * @returns The original string
     */
    static decode(transformed: string, index: number): string {
        if (transformed.length === 0) {
            return '';
        }

        if (index < 0 || index >= transformed.length) {
            throw new Error('Invalid index provided');
        }

        // Create and sort the table iteratively
        let table: string[] = Array(transformed.length).fill('');
        
        for (let i = 0; i < transformed.length; i++) {
            // Prepend each character to the corresponding string
            for (let j = 0; j < transformed.length; j++) {
                table[j] = transformed.charAt(j) + table[j];
            }
            
            // Sort lexicographically
            table.sort();
        }

        // The original string is at the given index (without the '$' marker)
        const result = table[index];
        return result.substring(0, result.length - 1); // Remove the '$' marker
    }

    /**
     * More efficient decoding using the LF mapping property
     * @param transformed The transformed string
     * @param index The original index from encoding
     * @returns The original string
     */
    static decodeEfficient(transformed: string, index: number): string {
        if (transformed.length === 0) {
            return '';
        }

        if (index < 0 || index >= transformed.length) {
            throw new Error('Invalid index provided');
        }

        // Create an array of indices and sort by the transformed string
        const indices = Array.from({ length: transformed.length }, (_, i) => i);
        
        // Sort indices based on the transformed string characters
        indices.sort((a, b) => {
            const charA = transformed.charAt(a);
            const charB = transformed.charAt(b);
            return charA.localeCompare(charB);
        });

        // Reconstruct the original string
        let result = '';
        let currentIndex = index;
        
        for (let i = 0; i < transformed.length - 1; i++) { // -1 to exclude the '$'
            currentIndex = indices[currentIndex];
            result = transformed.charAt(currentIndex) + result;
        }

        return result;
    }
}

// Example usage and test cases
function testBWT(): void {
    console.log('Testing Burrows-Wheeler Transform:\n');

    const testCases = [
        'banana',
        'abracadabra',
        'mississippi',
        'typescript',
        'a',
        ''
    ];

    for (const testCase of testCases) {
        if (testCase === '') continue; // Skip empty string test
        
        console.log(`Original: "${testCase}"`);
        
        // Encode
        const encoded = BurrowsWheelerTransform.encode(testCase);
        console.log(`Encoded: "${encoded.transformed}" (index: ${encoded.index})`);
        
        // Decode using both methods
        const decoded1 = BurrowsWheelerTransform.decode(encoded.transformed, encoded.index);
        const decoded2 = BurrowsWheelerTransform.decodeEfficient(encoded.transformed, encoded.index);
        
        console.log(`Decoded (basic): "${decoded1}"`);
        console.log(`Decoded (efficient): "${decoded2}"`);
        console.log(`Match: ${decoded1 === testCase && decoded2 === testCase}`);
        console.log('---');
    }

    // Test empty string
    const emptyEncoded = BurrowsWheelerTransform.encode('');
    console.log(`Empty string test: "${emptyEncoded.transformed}"`);
}

// Utility function to measure performance
function measurePerformance(input: string): void {
    console.log(`\nPerformance measurement for: "${input}"`);
    
    const startEncode = performance.now();
    const encoded = BurrowsWheelerTransform.encode(input);
    const encodeTime = performance.now() - startEncode;
    
    const startDecodeBasic = performance.now();
    BurrowsWheelerTransform.decode(encoded.transformed, encoded.index);
    const decodeBasicTime = performance.now() - startDecodeBasic;
    
    const startDecodeEfficient = performance.now();
    BurrowsWheelerTransform.decodeEfficient(encoded.transformed, encoded.index);
    const decodeEfficientTime = performance.now() - startDecodeEfficient;
    
    console.log(`Encode time: ${encodeTime.toFixed(3)}ms`);
    console.log(`Decode (basic) time: ${decodeBasicTime.toFixed(3)}ms`);
    console.log(`Decode (efficient) time: ${decodeEfficientTime.toFixed(3)}ms`);
}

// Export for use in other modules
export { BurrowsWheelerTransform, testBWT, measurePerformance };

// Run tests if this file is executed directly
if (require.main === module) {
    testBWT();
    measurePerformance('abracadabraabracadabraabracadabra'); // Longer string for performance test
}
// Simple usage
const original = "banana";
const encoded = BurrowsWheelerTransform.encode(original);
const decoded = BurrowsWheelerTransform.decodeEfficient(encoded.transformed, encoded.index);

console.log(`Original: ${original}`);
console.log(`Encoded: ${encoded.transformed}`);
console.log(`Decoded: ${decoded}`);
