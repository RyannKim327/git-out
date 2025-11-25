class BurrowsWheelerTransform {
  /**
   * Applies the Burrows-Wheeler Transform to a string
   * @param input The input string to transform
   * @returns The transformed string and the original index
   */
  static transform(input: string): { output: string; index: number } {
    if (input.length === 0) return { output: '', index: -1 };
    
    // Add EOF marker if not present
    const eof = '$';
    let text = input;
    if (!input.includes(eof)) {
      text = input + eof;
    }

    // Generate all rotations
    const rotations: string[] = [];
    for (let i = 0; i < text.length; i++) {
      rotations.push(text.slice(i) + text.slice(0, i));
    }

    // Sort rotations lexicographically
    rotations.sort();

    // Extract last characters and find original index
    let originalIndex = -1;
    const output = rotations.map((rotation, idx) => {
      if (rotation === text) originalIndex = idx;
      return rotation.charAt(rotation.length - 1);
    }).join('');

    return { output, index: originalIndex };
  }

  /**
   * Inverse Burrows-Wheeler Transform
   * @param transformed The transformed string
   * @param index The original index of the input string
   * @returns The original string
   */
  static inverseTransform(transformed: string, index: number): string {
    if (transformed.length === 0) return '';
    if (index < 0 || index >= transformed.length) {
      throw new Error('Invalid index');
    }

    // Initialize table with empty strings
    const table: string[] = Array(transformed.length).fill('');
    
    // Reconstruct through multiple passes
    for (let i = 0; i < transformed.length; i++) {
      for (let j = 0; j < transformed.length; j++) {
        table[j] = transformed.charAt(j) + table[j];
      }
      table.sort();
    }

    // Find and return the original string (remove EOF marker)
    const result = table[index];
    return result.endsWith('$') ? result.slice(0, -1) : result;
  }
}
class OptimizedBWT {
  /**
   * More efficient BWT implementation using cyclic rotations
   */
  static transform(input: string): { output: string; index: number } {
    const eof = '$';
    const text = input.includes(eof) ? input : input + eof;
    const n = text.length;

    // Create array of indices and sort based on rotations
    const indices = Array.from({ length: n }, (_, i) => i);
    
    indices.sort((i, j) => {
      for (let k = 0; k < n; k++) {
        const charI = text.charAt((i + k) % n);
        const charJ = text.charAt((j + k) % n);
        if (charI !== charJ) return charI.localeCompare(charJ);
      }
      return 0;
    });

    // Find original index and build output
    let originalIndex = -1;
    const outputChars: string[] = [];
    
    indices.forEach((idx, pos) => {
      if (idx === 0) originalIndex = pos;
      outputChars.push(text.charAt((idx + n - 1) % n));
    });

    return { output: outputChars.join(''), index: originalIndex };
  }

  /**
   * Efficient inverse transform using the LF mapping
   */
  static inverseTransform(transformed: string, index: number): string {
    const n = transformed.length;
    
    // Create frequency table and cumulative counts
    const freq: Map<string, number> = new Map();
    const firstOccurrence: Map<string, number> = new Map();
    const counts: number[] = [];
    
    // Count frequencies and record first occurrences
    let total = 0;
    for (let i = 0; i < n; i++) {
      const char = transformed.charAt(i);
      if (!freq.has(char)) {
        freq.set(char, 0);
        firstOccurrence.set(char, i);
      }
      freq.set(char, freq.get(char)! + 1);
      counts[i] = total++;
    }

    // Build the LF mapping
    const lfMap: number[] = Array(n);
    const charCounts: Map<string, number> = new Map();
    
    for (let i = 0; i < n; i++) {
      const char = transformed.charAt(i);
      const count = charCounts.get(char) || 0;
      lfMap[i] = firstOccurrence.get(char)! + count;
      charCounts.set(char, count + 1);
    }

    // Reconstruct the original string
    let result = '';
    let current = index;
    
    for (let i = 0; i < n - 1; i++) { // -1 to exclude EOF
      const char = transformed.charAt(current);
      result = char + result;
      current = lfMap[current];
    }

    return result;
  }
}
// Basic usage
const testString = "banana";
const result = BurrowsWheelerTransform.transform(testString);
console.log(`Original: ${testString}`);
console.log(`BWT: ${result.output}`);
console.log(`Index: ${result.index}`);

const reconstructed = BurrowsWheelerTransform.inverseTransform(result.output, result.index);
console.log(`Reconstructed: ${reconstructed}`);

// Optimized version
const optimizedResult = OptimizedBWT.transform(testString);
console.log(`Optimized BWT: ${optimizedResult.output}`);

const optimizedReconstructed = OptimizedBWT.inverseTransform(optimizedResult.output, optimizedResult.index);
console.log(`Optimized Reconstructed: ${optimizedReconstructed}`);
function testBWT(): void {
  const testCases = [
    "banana",
    "mississippi",
    "abracadabra",
    "hello world",
    "a",
    ""
  ];

  testCases.forEach(testCase => {
    console.log(`\nTesting: "${testCase}"`);
    
    // Test basic implementation
    const basicResult = BurrowsWheelerTransform.transform(testCase);
    const basicReconstructed = BurrowsWheelerTransform.inverseTransform(
      basicResult.output, 
      basicResult.index
    );
    
    console.log(`Basic - Match: ${testCase === basicReconstructed}`);
    
    // Test optimized implementation
    const optimizedResult = OptimizedBWT.transform(testCase);
    const optimizedReconstructed = OptimizedBWT.inverseTransform(
      optimizedResult.output,
      optimizedResult.index
    );
    
    console.log(`Optimized - Match: ${testCase === optimizedReconstructed}`);
  });
}

// Run tests
testBWT();
