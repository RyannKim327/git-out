interface BWTResult {
    transformed: string;
    originalIndex: number;
}

class BurrowsWheelerTransform {
    /**
     * Applies the Burrows-Wheeler Transform to a string
     */
    static encode(input: string): BWTResult {
        if (input.length === 0) {
            return { transformed: '', originalIndex: 0 };
        }

        // Add end-of-text marker if not present
        const text = input + '$';
        
        // Generate all rotations
        const rotations: string[] = [];
        for (let i = 0; i < text.length; i++) {
            const rotation = text.substring(i) + text.substring(0, i);
            rotations.push(rotation);
        }

        // Sort rotations lexicographically
        rotations.sort();

        // Extract last characters and find original string index
        let transformed = '';
        let originalIndex = -1;
        
        for (let i = 0; i < rotations.length; i++) {
            transformed += rotations[i].charAt(rotations[i].length - 1);
            if (rotations[i] === text) {
                originalIndex = i;
            }
        }

        return { transformed, originalIndex };
    }

    /**
     * Reverses the Burrows-Wheeler Transform
     */
    static decode(transformed: string, originalIndex: number): string {
        if (transformed.length === 0) {
            return '';
        }

        // Create and sort the table columns
        let table: string[] = new Array(transformed.length).fill('');
        
        // Reconstruct the table by repeatedly inserting the transformed string
        // as the first column and sorting
        for (let i = 0; i < transformed.length; i++) {
            // Prepend the transformed string to each row
            for (let j = 0; j < transformed.length; j++) {
                table[j] = transformed.charAt(j) + table[j];
            }
            
            // Sort lexicographically
            table.sort();
        }

        // The original string is at the originalIndex position
        // Remove the '$' marker if present
        const result = table[originalIndex];
        return result.endsWith('$') ? result.slice(0, -1) : result;
    }

    /**
     * More efficient decoding using the LF mapping property
     */
    static decodeEfficient(transformed: string, originalIndex: number): string {
        if (transformed.length === 0) {
            return '';
        }

        // Create an array of indices and sort by the characters
        const indices = Array.from({ length: transformed.length }, (_, i) => i);
        
        // Sort indices based on the characters they point to
        indices.sort((a, b) => {
            const charA = transformed.charAt(a);
            const charB = transformed.charAt(b);
            return charA.localeCompare(charB);
        });

        // Reconstruct the original string
        let result = '';
        let currentIndex = originalIndex;
        
        for (let i = 0; i < transformed.length - 1; i++) { // -1 to exclude the '$'
            currentIndex = indices[currentIndex];
            result += transformed.charAt(currentIndex);
        }

        return result;
    }
}

// Helper function for testing and demonstration
class BWTUtils {
    /**
     * Validates that encode/decode work correctly
     */
    static testRoundTrip(input: string): boolean {
        const encoded = BurrowsWheelerTransform.encode(input);
        const decoded = BurrowsWheelerTransform.decode(encoded.transformed, encoded.originalIndex);
        const decodedEfficient = BurrowsWheelerTransform.decodeEfficient(encoded.transformed, encoded.originalIndex);
        
        console.log(`Input: "${input}"`);
        console.log(`BWT: "${encoded.transformed}" (index: ${encoded.originalIndex})`);
        console.log(`Decoded: "${decoded}"`);
        console.log(`Efficient Decoded: "${decodedEfficient}"`);
        console.log(`Match: ${decoded === input && decodedEfficient === input}`);
        console.log('---');
        
        return decoded === input && decodedEfficient === input;
    }

    /**
     * Shows the rotation table for visualization
     */
    static showRotations(input: string): void {
        const text = input + '$';
        const rotations: string[] = [];
        
        for (let i = 0; i < text.length; i++) {
            const rotation = text.substring(i) + text.substring(0, i);
            rotations.push(rotation);
        }

        rotations.sort();
        
        console.log('Rotation Table:');
        rotations.forEach((rotation, index) => {
            console.log(`${index}: ${rotation}`);
        });
    }
}

// Example usage and tests
function demonstrateBWT(): void {
    console.log('=== Burrows-Wheeler Transform Demonstration ===\n');

    // Test cases
    const testStrings = [
        'banana',
        'abracadabra',
        'mississippi',
        'a',
        '',
        'hello world'
    ];

    // Test round trips
    testStrings.forEach(str => {
        BWTUtils.testRoundTrip(str);
    });

    // Show rotation table for better understanding
    console.log('\n=== Rotation Table Example ===');
    BWTUtils.showRotations('banana');
}

// Performance comparison
function benchmarkBWT(): void {
    console.log('\n=== Performance Comparison ===');
    
    const testString = 'abracadabra'.repeat(100); // Longer string for benchmarking
    const startTime = performance.now();
    
    const encoded = BurrowsWheelerTransform.encode(testString);
    const decodeTime1 = performance.now();
    
    BurrowsWheelerTransform.decode(encoded.transformed, encoded.originalIndex);
    const decodeTime2 = performance.now();
    
    BurrowsWheelerTransform.decodeEfficient(encoded.transformed, encoded.originalIndex);
    const endTime = performance.now();
    
    console.log(`Encode time: ${(decodeTime1 - startTime).toFixed(2)}ms`);
    console.log(`Decode time (basic): ${(decodeTime2 - decodeTime1).toFixed(2)}ms`);
    console.log(`Decode time (efficient): ${(endTime - decodeTime2).toFixed(2)}ms`);
}

// Run demonstration
demonstrateBWT();
benchmarkBWT();

export { BurrowsWheelerTransform, BWTUtils, BWTResult };
// Simple usage
const input = "banana";
const encoded = BurrowsWheelerTransform.encode(input);
console.log(encoded.transformed); // Output: "annb$aa"

const decoded = BurrowsWheelerTransform.decode(encoded.transformed, encoded.originalIndex);
console.log(decoded); // Output: "banana"
