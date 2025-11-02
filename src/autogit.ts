class BurrowsWheelerTransform {
  /**
   * Apply the Burrows-Wheeler Transform to a string
   */
  static encode(input: string): { transformed: string; index: number } {
    if (input.length === 0) {
      return { transformed: "", index: -1 };
    }

    // Create all rotations
    const rotations: string[] = [];
    for (let i = 0; i < input.length; i++) {
      rotations.push(input.slice(i) + input.slice(0, i));
    }

    // Sort rotations lexicographically
    rotations.sort();

    // Find the original string index in sorted rotations
    const index = rotations.indexOf(input);
    
    // Get last characters of each rotation
    const transformed = rotations.map(rotation => rotation.charAt(rotation.length - 1)).join('');

    return { transformed, index };
  }

  /**
   * Reverse the Burrows-Wheeler Transform
   */
  static decode(transformed: string, index: number): string {
    if (transformed.length === 0) {
      return "";
    }

    // Create table for reconstruction
    let table: string[] = Array(transformed.length).fill('');
    
    // Reconstruct by repeatedly inserting the transformed string
    // and sorting the table
    for (let i = 0; i < transformed.length; i++) {
      for (let j = 0; j < transformed.length; j++) {
        table[j] = transformed[j] + table[j];
      }
      table.sort();
    }

    return table[index];
  }
}
class OptimizedBWT {
  /**
   * Optimized BWT encoding using cyclic rotations
   */
  static encode(input: string): { transformed: string; index: number } {
    if (input.length === 0) {
      return { transformed: "", index: -1 };
    }

    // Add EOF marker (optional, but useful for certain applications)
    const s = input;
    
    // Create rotations and sort
    const rotations: { rotation: string; index: number }[] = [];
    for (let i = 0; i < s.length; i++) {
      rotations.push({
        rotation: s.slice(i) + s.slice(0, i),
        index: i
      });
    }

    rotations.sort((a, b) => a.rotation.localeCompare(b.rotation));
    
    // Find original index and build transformed string
    let originalIndex = -1;
    const transformedChars: string[] = [];
    
    rotations.forEach((rot, i) => {
      transformedChars.push(rot.rotation.charAt(rot.rotation.length - 1));
      if (rot.index === 0) {
        originalIndex = i;
      }
    });

    return { 
      transformed: transformedChars.join(''), 
      index: originalIndex 
    };
  }

  /**
   * Efficient decoding using the LF mapping property
   */
  static decode(transformed: string, index: number): string {
    if (transformed.length === 0) {
      return "";
    }

    // Create frequency table and cumulative counts
    const freq: Record<string, number> = {};
    const chars: string[] = [];
    
    // Count frequencies and collect unique characters
    for (const char of transformed) {
      freq[char] = (freq[char] || 0) + 1;
      if (!chars.includes(char)) {
        chars.push(char);
      }
    }
    
    chars.sort();
    
    // Create cumulative frequency table
    const cumulative: Record<string, number> = {};
    let total = 0;
    for (const char of chars) {
      cumulative[char] = total;
      total += freq[char];
    }
    
    // Build the LF mapping
    const mapping: number[] = new Array(transformed.length);
    const count: Record<string, number> = {};
    
    for (let i = 0; i < transformed.length; i++) {
      const char = transformed[i];
      count[char] = (count[char] || 0) + 1;
      mapping[i] = cumulative[char] + count[char] - 1;
    }
    
    // Reconstruct the original string
    const result: string[] = [];
    let pos = index;
    
    for (let i = 0; i < transformed.length; i++) {
      const char = transformed[pos];
      result.unshift(char);
      pos = mapping[pos];
    }
    
    return result.join('');
  }
}
// Test the implementation
function testBWT() {
  const testStrings = [
    "banana",
    "hello world",
    "typescript",
    "abracadabra",
    "mississippi"
  ];

  for (const testStr of testStrings) {
    console.log(`Original: "${testStr}"`);
    
    // Basic implementation
    const encoded = BurrowsWheelerTransform.encode(testStr);
    const decoded = BurrowsWheelerTransform.decode(encoded.transformed, encoded.index);
    
    console.log(`Basic - Encoded: "${encoded.transformed}", Index: ${encoded.index}`);
    console.log(`Basic - Decoded: "${decoded}"`);
    console.log(`Basic - Match: ${testStr === decoded}`);
    
    // Optimized implementation
    const optimizedEncoded = OptimizedBWT.encode(testStr);
    const optimizedDecoded = OptimizedBWT.decode(
      optimizedEncoded.transformed, 
      optimizedEncoded.index
    );
    
    console.log(`Optimized - Encoded: "${optimizedEncoded.transformed}", Index: ${optimizedEncoded.index}`);
    console.log(`Optimized - Decoded: "${optimizedDecoded}"`);
    console.log(`Optimized - Match: ${testStr === optimizedDecoded}`);
    console.log('---');
  }
}

// Run tests
testBWT();
// Additional utility functions
class BWTUtils {
  /**
   * Calculate compression ratio
   */
  static compressionRatio(original: string, transformed: string): number {
    return transformed.length / original.length;
  }

  /**
   * Check if string is suitable for BWT (common use case)
   */
  static isSuitableForBWT(input: string): boolean {
    // BWT works best on repetitive data
    const uniqueChars = new Set(input).size;
    return uniqueChars < input.length / 2;
  }

  /**
   * Move-to-front transform (often used with BWT)
   */
  static moveToFrontEncode(input: string): number[] {
    const alphabet = Array.from(new Set(input)).sort();
    const result: number[] = [];
    
    for (const char of input) {
      const index = alphabet.indexOf(char);
      result.push(index);
      // Move to front
      alphabet.splice(index, 1);
      alphabet.unshift(char);
    }
    
    return result;
  }
}
