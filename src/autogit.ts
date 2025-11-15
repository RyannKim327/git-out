class BurrowsWheelerTransform {
  
  /**
   * Apply the Burrows-Wheeler Transform to a string
   * @param input The input string to transform
   * @returns The transformed string and the original index (for reconstruction)
   */
  static encode(input: string): { transformed: string; index: number } {
    if (input.length === 0) {
      return { transformed: '', index: -1 };
    }

    // Add sentinel character if not present
    const text = input + '¶';
    
    // Generate all rotations
    const rotations: string[] = [];
    for (let i = 0; i < text.length; i++) {
      rotations.push(text.slice(i) + text.slice(0, i));
    }

    // Sort rotations lexicographically
    rotations.sort();

    // Extract last characters and find original string's position
    let originalIndex = -1;
    const lastColumn = rotations.map((rotation, idx) => {
      if (rotation === text) {
        originalIndex = idx;
      }
      return rotation.charAt(rotation.length - 1);
    });

    return {
      transformed: lastColumn.join(''),
      index: originalIndex
    };
  }

  /**
   * Reverse the Burrows-Wheeler Transform
   * @param transformed The transformed string
   * @param index The original index from encoding
   * @returns The original string (without sentinel character)
   */
  static decode(transformed: string, index: number): string {
    if (transformed.length === 0 || index === -1) {
      return '';
    }

    // Create and sort the first column
    const firstColumn = transformed.split('').sort();
    
    // Build the reconstruction table iteratively
    let table: string[][] = Array(transformed.length).fill(null).map(() => []);
    
    for (let i = 0; i < transformed.length; i++) {
      for (let j = 0; j < transformed.length; j++) {
        table[j] = [transformed.charAt(j)].concat(table[j]);
      }
      table.sort();
    }

    // The original string is at the given index (remove sentinel)
    const result = table[index].join('');
    return result.replace('¶', '');
  }

  /**
   * More efficient decoding using the LF mapping property
   */
  static decodeEfficient(transformed: string, index: number): string {
    if (transformed.length === 0 || index === -1) {
      return '';
    }

    // Create an array of indices for each character
    const chars = transformed.split('');
    
    // Count occurrences of each character
    const count: { [key: string]: number } = {};
    const positions: number[] = [];
    
    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];
      if (!count[char]) {
        count[char] = 0;
      }
      positions.push(count[char]++);
    }

    // Get sorted characters and build next array
    const sortedChars = [...chars].sort();
    const next: number[] = Array(chars.length).fill(0);
    
    const charFirstOccurrence: { [key: string]: number } = {};
    for (let i = 0; i < sortedChars.length; i++) {
      const char = sortedChars[i];
      if (charFirstOccurrence[char] === undefined) {
        charFirstOccurrence[char] = i;
      }
    }

    // Build the next array
    const charCount: { [key: string]: number } = {};
    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];
      if (!charCount[char]) {
        charCount[char] = 0;
      }
      next[charFirstOccurrence[char] + charCount[char]] = i;
      charCount[char]++;
    }

    // Reconstruct the original string
    let current = index;
    const result: string[] = [];
    
    for (let i = 0; i < chars.length - 1; i++) { // -1 to exclude sentinel
      current = next[current];
      result.push(chars[current]);
    }

    return result.reverse().join('').replace('¶', '');
  }
}
// Example usage
function demonstrateBWT() {
  const testStrings = [
    "banana",
    "mississippi",
    "typescript",
    "abracadabra",
    "hello world"
  ];

  for (const testString of testStrings) {
    console.log(`\nOriginal: "${testString}"`);
    
    // Encode
    const encoded = BurrowsWheelerTransform.encode(testString);
    console.log(`Encoded: "${encoded.transformed}" (index: ${encoded.index})`);
    
    // Decode using efficient method
    const decoded = BurrowsWheelerTransform.decodeEfficient(
      encoded.transformed, 
      encoded.index
    );
    console.log(`Decoded: "${decoded}"`);
    console.log(`Match: ${testString === decoded}`);
    
    // Compression ratio (for demonstration)
    const originalSize = testString.length;
    const encodedSize = encoded.transformed.length;
    console.log(`Compression ratio: ${((encodedSize / originalSize) * 100).toFixed(1)}%`);
  }
}

// Run demonstration
demonstrateBWT();
interface BWTResult {
  transformed: string;
  index: number;
  compressionHint: number;
}

class AdvancedBWT extends BurrowsWheelerTransform {
  
  /**
   * Enhanced encoding with compression analysis
   */
  static encodeAdvanced(input: string): BWTResult {
    const basicResult = this.encode(input);
    
    // Calculate run-length encoding potential
    let runs = 0;
    let currentChar = '';
    let currentRun = 0;
    
    for (const char of basicResult.transformed) {
      if (char === currentChar) {
        currentRun++;
      } else {
        if (currentRun > 1) runs++;
        currentChar = char;
        currentRun = 1;
      }
    }
    if (currentRun > 1) runs++;
    
    const compressionHint = runs / basicResult.transformed.length;
    
    return {
      ...basicResult,
      compressionHint
    };
  }

  /**
   * BWT followed by Move-to-Front transform (often used together)
   */
  static encodeWithMTF(input: string): { bwt: BWTResult; mtf: number[] } {
    const bwt = this.encodeAdvanced(input);
    const mtf = this.moveToFrontTransform(bwt.transformed);
    
    return { bwt, mtf };
  }

  private static moveToFrontTransform(input: string): number[] {
    const alphabet = Array.from(new Set(input.split(''))).sort();
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

// Example of advanced usage
function advancedDemo() {
  const text = "banana";
  console.log(`Advanced BWT for: "${text}"`);
  
  const advanced = AdvancedBWT.encodeAdvanced(text);
  console.log(`Transformed: "${advanced.transformed}"`);
  console.log(`Compression hint: ${advanced.compressionHint.toFixed(3)}`);
  
  const withMTF = AdvancedBWT.encodeWithMTF(text);
  console.log(`MTF codes: [${withMTF.mtf.join(', ')}]`);
}
