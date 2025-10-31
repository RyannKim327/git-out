class BurrowsWheelerTransform {
  /**
   * Apply the Burrows-Wheeler Transform to a string
   * @param input The input string to transform
   * @returns The transformed string and the original index
   */
  static encode(input: string): { transformed: string; index: number } {
    if (input.length === 0) {
      return { transformed: '', index: -1 };
    }

    // Add termination character if not present (optional)
    const terminatedInput = input + '$';
    
    // Generate all rotations
    const rotations: string[] = [];
    for (let i = 0; i < terminatedInput.length; i++) {
      const rotation = terminatedInput.slice(i) + terminatedInput.slice(0, i);
      rotations.push(rotation);
    }

    // Sort rotations lexicographically
    rotations.sort();

    // Extract last characters and find original index
    const transformed = rotations.map(rotation => rotation.charAt(rotation.length - 1)).join('');
    const index = rotations.indexOf(terminatedInput);

    return { transformed, index };
  }

  /**
   * Reverse the Burrows-Wheeler Transform
   * @param transformed The transformed string
   * @param index The original index
   * @returns The original string
   */
  static decode(transformed: string, index: number): string {
    if (transformed.length === 0 || index === -1) {
      return '';
    }

    // Initialize table with empty strings
    const table: string[] = Array(transformed.length).fill('');
    
    // Reconstruct the table by repeatedly inserting the transformed string
    // and sorting lexicographically
    for (let i = 0; i < transformed.length; i++) {
      for (let j = 0; j < transformed.length; j++) {
        table[j] = transformed.charAt(j) + table[j];
      }
      table.sort();
    }

    // Find the original string (remove termination character if used)
    const result = table[index];
    return result.endsWith('$') ? result.slice(0, -1) : result;
  }
}
class EfficientBWT {
  /**
   * Optimized BWT encoding using cyclic rotations
   */
  static encode(input: string): { transformed: string; index: number } {
    if (input.length === 0) return { transformed: '', index: -1 };
    
    const s = input + '$';
    const n = s.length;
    
    // Create rotation indices instead of actual strings
    const indices = Array.from({ length: n }, (_, i) => i);
    
    // Sort indices based on their rotations
    indices.sort((i, j) => {
      for (let k = 0; k < n; k++) {
        const charI = s[(i + k) % n];
        const charJ = s[(j + k) % n];
        if (charI !== charJ) return charI.localeCompare(charJ);
      }
      return 0;
    });
    
    // Build transformed string and find original index
    let transformed = '';
    let originalIndex = -1;
    
    for (let i = 0; i < n; i++) {
      const lastCharIndex = (indices[i] + n - 1) % n;
      transformed += s[lastCharIndex];
      if (indices[i] === 0) originalIndex = i;
    }
    
    return { transformed, index: originalIndex };
  }

  /**
   * Efficient decoding using the "LF mapping" property
   */
  static decode(transformed: string, index: number): string {
    if (transformed.length === 0 || index === -1) return '';
    
    const n = transformed.length;
    const counts: Map<string, number> = new Map();
    const firstOccurrence: Map<string, number> = new Map();
    
    // Count characters and track first occurrences
    const sorted = Array.from(transformed).sort();
    for (let i = 0; i < n; i++) {
      const char = sorted[i];
      if (!firstOccurrence.has(char)) {
        firstOccurrence.set(char, i);
      }
    }
    
    // Create next array using LF mapping
    const next: number[] = new Array(n);
    const charCount: Map<string, number> = new Map();
    
    for (let i = 0; i < n; i++) {
      const char = transformed[i];
      const count = (charCount.get(char) || 0) + 1;
      charCount.set(char, count);
      next[i] = firstOccurrence.get(char)! + count - 1;
    }
    
    // Reconstruct the original string
    let result = '';
    let current = index;
    
    for (let i = 0; i < n - 1; i++) { // -1 to remove termination char
      result = transformed[current] + result;
      current = next[current];
    }
    
    return result;
  }
}
// Test the implementation
function testBWT() {
  const testCases = [
    "banana",
    "abracadabra",
    "mississippi",
    "typescript",
    "a",
    ""
  ];

  for (const testCase of testCases) {
    console.log(`Original: "${testCase}"`);
    
    // Basic implementation
    const encoded = BurrowsWheelerTransform.encode(testCase);
    const decoded = BurrowsWheelerTransform.decode(encoded.transformed, encoded.index);
    
    console.log(`Basic - Encoded: "${encoded.transformed}", Index: ${encoded.index}`);
    console.log(`Basic - Decoded: "${decoded}"`);
    console.log(`Basic - Match: ${decoded === testCase}`);
    
    // Efficient implementation
    const efficientEncoded = EfficientBWT.encode(testCase);
    const efficientDecoded = EfficientBWT.decode(efficientEncoded.transformed, efficientEncoded.index);
    
    console.log(`Efficient - Encoded: "${efficientEncoded.transformed}", Index: ${efficientEncoded.index}`);
    console.log(`Efficient - Decoded: "${efficientDecoded}"`);
    console.log(`Efficient - Match: ${efficientDecoded === testCase}`);
    
    console.log('---');
  }
}

// Run tests
testBWT();
// Helper function to measure performance
function measurePerformance(input: string, repetitions: number = 1000) {
  console.log(`Performance test for: "${input}"`);
  
  // Basic implementation
  console.time('Basic BWT');
  for (let i = 0; i < repetitions; i++) {
    const encoded = BurrowsWheelerTransform.encode(input);
    BurrowsWheelerTransform.decode(encoded.transformed, encoded.index);
  }
  console.timeEnd('Basic BWT');
  
  // Efficient implementation
  console.time('Efficient BWT');
  for (let i = 0; i < repetitions; i++) {
    const encoded = EfficientBWT.encode(input);
    EfficientBWT.decode(encoded.transformed, encoded.index);
  }
  console.timeEnd('Efficient BWT');
}

// Example usage
measurePerformance("banana", 1000);
