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

    // Create all rotations
    const rotations: string[] = [];
    for (let i = 0; i < input.length; i++) {
      rotations.push(input.slice(i) + input.slice(0, i));
    }

    // Sort rotations lexicographically
    rotations.sort();

    // Find the original string index
    const index = rotations.indexOf(input);

    // Extract last characters
    const transformed = rotations.map(rotation => rotation.charAt(rotation.length - 1)).join('');

    return { transformed, index };
  }

  /**
   * Reverses the Burrows-Wheeler Transform
   * @param transformed The transformed string
   * @param index The original index
   * @returns The original string
   */
  static decode(transformed: string, index: number): string {
    if (transformed.length === 0) {
      return '';
    }

    // Initialize table with empty strings
    let table: string[] = new Array(transformed.length).fill('');

    // Reconstruct by repeatedly inserting transformed chars and sorting
    for (let i = 0; i < transformed.length; i++) {
      for (let j = 0; j < transformed.length; j++) {
        table[j] = transformed.charAt(j) + table[j];
      }
      table.sort();
    }

    return table[index];
  }

  /**
   * Optimized decode using the LF mapping property
   * @param transformed The transformed string
   * @param index The original index
   * @returns The original string
   */
  static decodeOptimized(transformed: string, index: number): string {
    if (transformed.length === 0) {
      return '';
    }

    // Create frequency table and next pointers
    const chars = transformed.split('');
    const sortedChars = [...chars].sort();
    
    // Build the next pointer array
    const next: number[] = new Array(chars.length);
    const used: boolean[] = new Array(chars.length).fill(false);
    
    for (let i = 0; i < chars.length; i++) {
      const char = sortedChars[i];
      for (let j = 0; j < chars.length; j++) {
        if (chars[j] === char && !used[j]) {
          next[i] = j;
          used[j] = true;
          break;
        }
      }
    }
    
    // Reconstruct the original string
    let result = '';
    let ptr = index;
    
    for (let i = 0; i < chars.length; i++) {
      result = transformed.charAt(ptr) + result;
      ptr = next[ptr];
    }
    
    return result;
  }
}

// Usage Examples
const examples = () => {
  // Test with different strings
  const testStrings = ['banana', 'typescript', 'mississippi', 'a', ''];

  testStrings.forEach(input => {
    console.log(`Original: "${input}"`);
    
    const encoded = BurrowsWheelerTransform.encode(input);
    console.log(`Encoded: "${encoded.transformed}" (index: ${encoded.index})`);
    
    const decoded = BurrowsWheelerTransform.decode(encoded.transformed, encoded.index);
    console.log(`Decoded: "${decoded}"`);
    
    const decodedOptimized = BurrowsWheelerTransform.decodeOptimized(encoded.transformed, encoded.index);
    console.log(`Optimized Decode: "${decodedOptimized}"`);
    
    console.log('---');
  });
};

// Run examples
examples();

// Export for use in other modules
export { BurrowsWheelerTransform };
// Simple usage
const input = "banana";
const encoded = BurrowsWheelerTransform.encode(input);
console.log(encoded); // { transformed: "nnbaaa", index: 3 }

const decoded = BurrowsWheelerTransform.decode(encoded.transformed, encoded.index);
console.log(decoded); // "banana"
