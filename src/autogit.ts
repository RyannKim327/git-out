class BurrowsWheelerTransform {
  /**
   * Apply Burrows-Wheeler Transform to a string
   */
  static encode(input: string): { transformed: string; originalIndex: number } {
    if (input.length === 0) {
      return { transformed: '', originalIndex: -1 };
    }

    // Create all rotations of the input string
    const rotations: string[] = [];
    for (let i = 0; i < input.length; i++) {
      rotations.push(input.slice(i) + input.slice(0, i));
    }

    // Sort rotations lexicographically
    rotations.sort();

    // Extract last characters and find original string index
    let originalIndex = -1;
    const transformed = rotations.map((rotation, index) => {
      if (rotation === input) {
        originalIndex = index;
      }
      return rotation.charAt(rotation.length - 1);
    }).join('');

    return { transformed, originalIndex };
  }

  /**
   * Reverse Burrows-Wheeler Transform
   */
  static decode(transformed: string, originalIndex: number): string {
    if (transformed.length === 0) {
      return '';
    }

    if (originalIndex < 0 || originalIndex >= transformed.length) {
      throw new Error('Invalid original index');
    }

    // Create table and reconstruct the original string
    const table: string[] = new Array(transformed.length).fill('');
    
    // Perform the reverse transformation
    for (let i = 0; i < transformed.length; i++) {
      for (let j = 0; j < transformed.length; j++) {
        table[j] = transformed.charAt(j) + table[j];
      }
      table.sort();
    }

    // The original string is at the specified index
    return table[originalIndex];
  }
}
class OptimizedBWT {
  /**
   * Optimized BWT encoding using suffix array-like approach
   */
  static encode(input: string): { transformed: string; originalIndex: number } {
    const n = input.length;
    if (n === 0) return { transformed: '', originalIndex: -1 };

    // Create an array of indices and sort based on rotations
    const indices = Array.from({ length: n }, (_, i) => i);
    
    indices.sort((a, b) => {
      for (let i = 0; i < n; i++) {
        const charA = input.charAt((a + i) % n);
        const charB = input.charAt((b + i) % n);
        if (charA !== charB) {
          return charA.localeCompare(charB);
        }
      }
      return 0;
    });

    // Build transformed string and find original index
    let originalIndex = -1;
    const transformedChars: string[] = [];
    
    for (let i = 0; i < n; i++) {
      const prevIndex = (indices[i] + n - 1) % n;
      transformedChars.push(input.charAt(prevIndex));
      
      if (indices[i] === 0) {
        originalIndex = i;
      }
    }

    return { transformed: transformedChars.join(''), originalIndex };
  }

  /**
   * Efficient BWT decoding using the "LF mapping" property
   */
  static decode(transformed: string, originalIndex: number): string {
    const n = transformed.length;
    if (n === 0) return '';
    
    // Create an array of characters and their counts
    const chars = transformed.split('');
    
    // Create the first column by sorting the transformed string
    const firstColumn = [...chars].sort();
    
    // Build the next array using LF mapping
    const next: number[] = new Array(n);
    const count: { [key: string]: number } = {};
    const positions: { [key: string]: number[] } = {};
    
    // Count occurrences and track positions
    for (let i = 0; i < n; i++) {
      const char = chars[i];
      count[char] = (count[char] || 0) + 1;
      if (!positions[char]) positions[char] = [];
      positions[char].push(i);
    }
    
    // Build next array
    const charCount: { [key: string]: number } = {};
    for (let i = 0; i < n; i++) {
      const char = firstColumn[i];
      charCount[char] = (charCount[char] || 0);
      next[i] = positions[char][charCount[char]++];
    }
    
    // Reconstruct the original string
    const result: string[] = [];
    let current = originalIndex;
    
    for (let i = 0; i < n; i++) {
      result.push(firstColumn[current]);
      current = next[current];
    }
    
    return result.join('');
  }
}
// Test the BWT implementation
function testBWT() {
  const testStrings = [
    "banana",
    "abracadabra",
    "mississippi",
    "hello world",
    "a",
    ""
  ];

  for (const testString of testStrings) {
    console.log(`Original: "${testString}"`);
    
    // Test basic implementation
    const encoded = BurrowsWheelerTransform.encode(testString);
    console.log(`BWT encoded: "${encoded.transformed}" (index: ${encoded.originalIndex})`);
    
    const decoded = BurrowsWheelerTransform.decode(encoded.transformed, encoded.originalIndex);
    console.log(`BWT decoded: "${decoded}"`);
    console.log(`Match: ${decoded === testString}`);
    console.log('---');
    
    // Test optimized implementation
    const encodedOpt = OptimizedBWT.encode(testString);
    const decodedOpt = OptimizedBWT.decode(encodedOpt.transformed, encodedOpt.originalIndex);
    console.log(`Optimized match: ${decodedOpt === testString}`);
    console.log('==========');
  }
}

// Run tests
testBWT();

// Example with special characters
const specialText = "Hello, 世界! 🚀";
const encoded = OptimizedBWT.encode(specialText);
const decoded = OptimizedBWT.decode(encoded.transformed, encoded.originalIndex);
console.log(`Special characters test: ${specialText === decoded}`);
// Performance test function
function performanceTest() {
  const longText = "the quick brown fox jumps over the lazy dog ".repeat(100);
  
  console.time('Basic BWT encode');
  const basicEncoded = BurrowsWheelerTransform.encode(longText);
  console.timeEnd('Basic BWT encode');
  
  console.time('Optimized BWT encode');
  const optimizedEncoded = OptimizedBWT.encode(longText);
  console.timeEnd('Optimized BWT encode');
  
  console.time('Basic BWT decode');
  BurrowsWheelerTransform.decode(basicEncoded.transformed, basicEncoded.originalIndex);
  console.timeEnd('Basic BWT decode');
  
  console.time('Optimized BWT decode');
  OptimizedBWT.decode(optimizedEncoded.transformed, optimizedEncoded.originalIndex);
  console.timeEnd('Optimized BWT decode');
}

// performanceTest();
