class BurrowsWheelerTransform {
  /**
   * Encode a string using Burrows-Wheeler Transform
   */
  static encode(input: string): { encoded: string; index: number } {
    if (input.length === 0) {
      return { encoded: '', index: -1 };
    }

    // Create all rotations
    const rotations: string[] = [];
    for (let i = 0; i < input.length; i++) {
      rotations.push(input.slice(i) + input.slice(0, i));
    }

    // Sort rotations lexicographically
    const sortedRotations = [...rotations].sort();

    // Find the original string index in sorted rotations
    const index = sortedRotations.indexOf(input);

    // Extract last characters of each rotation
    const encoded = sortedRotations.map(rotation => rotation[rotation.length - 1]).join('');

    return { encoded, index };
  }

  /**
   * Decode a BWT-encoded string
   */
  static decode(encoded: string, index: number): string {
    if (encoded.length === 0) {
      return '';
    }

    // Initialize table with empty strings
    let table: string[] = new Array(encoded.length).fill('');

    // Reconstruct the original string through multiple passes
    for (let i = 0; i < encoded.length; i++) {
      // Prepend the encoded characters to each string
      for (let j = 0; j < encoded.length; j++) {
        table[j] = encoded[j] + table[j];
      }

      // Sort lexicographically
      table.sort();
    }

    // Return the string at the original index
    return table[index];
  }

  /**
   * Efficient decode using the LF mapping property
   */
  static decodeEfficient(encoded: string, index: number): string {
    if (encoded.length === 0) {
      return '';
    }

    // Create frequency table and cumulative counts
    const chars = encoded.split('');
    const sortedChars = [...chars].sort();
    
    // Reconstruct using the LF mapping
    const result: string[] = [];
    let currentIndex = index;
    
    for (let i = 0; i < encoded.length; i++) {
      const char = encoded[currentIndex];
      result.unshift(char);
      
      // Count occurrences of char before currentIndex in original encoded string
      const occurrencesBefore = chars
        .slice(0, currentIndex)
        .filter(c => c === char)
        .length;
      
      // Find position in sorted list
      const sortedIndex = sortedChars.indexOf(char) + occurrencesBefore;
      currentIndex = sortedIndex;
    }

    return result.join('');
  }
}

// Example usage and testing
function testBWT() {
  const testStrings = [
    "banana",
    "abracadabra",
    "mississippi",
    "typescript",
    "a",
    ""
  ];

  for (const testString of testStrings) {
    console.log(`Original: "${testString}"`);
    
    const encoded = BurrowsWheelerTransform.encode(testString);
    console.log(`Encoded: "${encoded.encoded}" (index: ${encoded.index})`);
    
    const decoded = BurrowsWheelerTransform.decode(encoded.encoded, encoded.index);
    console.log(`Decoded: "${decoded}"`);
    
    const decodedEfficient = BurrowsWheelerTransform.decodeEfficient(encoded.encoded, encoded.index);
    console.log(`Efficient decoded: "${decodedEfficient}"`);
    
    console.log(`Match: ${decoded === testString && decodedEfficient === testString}`);
    console.log('---');
  }
}

// Run tests
testBWT();

// Export for use in other modules
export { BurrowsWheelerTransform };
// Simple usage
const original = "banana";
const { encoded, index } = BurrowsWheelerTransform.encode(original);
const decoded = BurrowsWheelerTransform.decode(encoded, index);

console.log(`Original: ${original}`);
console.log(`Encoded: ${encoded}`);
console.log(`Decoded: ${decoded}`);
