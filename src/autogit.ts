class BurrowsWheelerTransform {
  /**
   * Apply the Burrows-Wheeler Transform to a string
   * @param input The input string to transform
   * @returns The transformed string and the original row index
   */
  static encode(input: string): { transformed: string; index: number } {
    if (input.length === 0) {
      return { transformed: "", index: -1 };
    }

    // Add end-of-file marker if not present
    const EOF = '$';
    const text = input.endsWith(EOF) ? input : input + EOF;

    // Generate all rotations
    const rotations: string[] = [];
    for (let i = 0; i < text.length; i++) {
      rotations.push(text.slice(i) + text.slice(0, i));
    }

    // Sort rotations lexicographically
    rotations.sort();

    // Extract last characters and find original string index
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
   * @param index The original row index
   * @returns The original string
   */
  static decode(transformed: string, index: number): string {
    if (transformed.length === 0 || index === -1) {
      return "";
    }

    // Create table and reconstruct step by step
    const table: string[][] = Array(transformed.length)
      .fill(null)
      .map(() => Array(transformed.length).fill(''));

    for (let col = 0; col < transformed.length; col++) {
      // Add the transformed string as the last column
      for (let row = 0; row < transformed.length; row++) {
        table[row][col] = transformed.charAt(row);
      }

      // Sort rows lexicographically
      table.sort((a, b) => {
        const strA = a.slice(0, col + 1).join('');
        const strB = b.slice(0, col + 1).join('');
        return strA.localeCompare(strB);
      });
    }

    // Find the row that ends with the EOF marker and return without it
    const result = table[index].join('');
    return result.endsWith('$') ? result.slice(0, -1) : result;
  }
}
class OptimizedBWT {
  /**
   * Optimized BWT encoding using suffix arrays (more efficient for large inputs)
   */
  static encode(input: string): { transformed: string; index: number } {
    if (input.length === 0) {
      return { transformed: "", index: -1 };
    }

    const EOF = '$';
    const text = input.endsWith(EOF) ? input : input + EOF;
    const n = text.length;

    // Generate suffix array
    const suffixes: Array<{ index: number; suffix: string }> = [];
    for (let i = 0; i < n; i++) {
      suffixes.push({
        index: i,
        suffix: text.slice(i) + text.slice(0, i)
      });
    }

    // Sort suffixes lexicographically
    suffixes.sort((a, b) => a.suffix.localeCompare(b.suffix));

    // Build transformed string and find original index
    let originalIndex = -1;
    const lastColumn: string[] = [];

    suffixes.forEach((suffix, idx) => {
      const lastCharIndex = (suffix.index - 1 + n) % n;
      lastColumn.push(text[lastCharIndex]);
      
      if (suffix.index === 0) {
        originalIndex = idx;
      }
    });

    return {
      transformed: lastColumn.join(''),
      index: originalIndex
    };
  }

  /**
   * Efficient decoding using the LF mapping property
   */
  static decode(transformed: string, index: number): string {
    if (transformed.length === 0 || index === -1) {
      return "";
    }

    const n = transformed.length;
    
    // Create an array of pairs (char, index) and sort
    const pairs: Array<[string, number]> = transformed
      .split('')
      .map((char, idx) => [char, idx] as [string, number]);

    // Get the first column by sorting the transformed string
    const firstColumn = [...pairs].sort((a, b) => 
      a[0].localeCompare(b[0]) || a[1] - b[1]
    );

    // Create mapping from last to first column
    const mapping: number[] = firstColumn.map(pair => pair[1]);

    // Reconstruct the original string
    const result: string[] = [];
    let currentIndex = index;

    for (let i = 0; i < n - 1; i++) { // -1 to exclude EOF marker
      const char = transformed[currentIndex];
      result.push(char);
      currentIndex = mapping[currentIndex];
    }

    // Reverse because we reconstructed backwards
    return result.reverse().join('');
  }
}
// Test the BWT implementation
function testBWT() {
  const testCases = [
    "banana",
    "mississippi",
    "abracadabra",
    "hello world",
    "a",
    ""
  ];

  console.log("Testing Burrows-Wheeler Transform:\n");

  for (const testCase of testCases) {
    console.log(`Original: "${testCase}"`);

    // Test basic implementation
    const encoded = BurrowsWheelerTransform.encode(testCase);
    console.log(`Encoded: "${encoded.transformed}" (index: ${encoded.index})`);

    const decoded = BurrowsWheelerTransform.decode(encoded.transformed, encoded.index);
    console.log(`Decoded: "${decoded}"`);
    console.log(`Success: ${decoded === testCase}`);
    console.log("---");

    // Test optimized implementation
    const optEncoded = OptimizedBWT.encode(testCase);
    const optDecoded = OptimizedBWT.decode(optEncoded.transformed, optEncoded.index);
    console.log(`Optimized - Success: ${optDecoded === testCase}`);
    console.log("==========");
  }
}

// Run tests
testBWT();

// Example with file-like data
function processTextData() {
  const sampleText = "the quick brown fox jumps over the lazy dog";
  
  console.log("\nProcessing sample text:");
  console.log(`Original: ${sampleText}`);
  
  const encoded = OptimizedBWT.encode(sampleText);
  console.log(`Encoded: ${encoded.transformed}`);
  console.log(`Compression: ${((1 - encoded.transformed.length / sampleText.length) * 100).toFixed(1)}% (theoretical)`);
  
  const decoded = OptimizedBWT.decode(encoded.transformed, encoded.index);
  console.log(`Decoded: ${decoded}`);
  console.log(`Match: ${decoded === sampleText}`);
}

processTextData();
