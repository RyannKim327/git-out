class BurrowsWheelerTransform {
  /**
   * Applies the Burrows-Wheeler Transform to a string
   */
  static transform(input: string): { transformed: string; index: number } {
    if (input.length === 0) {
      return { transformed: "", index: -1 };
    }

    // Create all rotations of the input string
    const rotations: string[] = [];
    for (let i = 0; i < input.length; i++) {
      rotations.push(input.slice(i) + input.slice(0, i));
    }

    // Sort rotations lexicographically
    rotations.sort();

    // Extract the last character of each rotation
    const transformed = rotations.map(rotation => rotation[rotation.length - 1]).join('');
    
    // Find the index of the original string in the sorted list
    const index = rotations.indexOf(input);

    return { transformed, index };
  }

  /**
   * Reverses the Burrows-Wheeler Transform
   */
  static inverseTransform(transformed: string, index: number): string {
    if (transformed.length === 0) {
      return "";
    }

    if (index < 0 || index >= transformed.length) {
      throw new Error("Invalid index for inverse transform");
    }

    // Create a table and reconstruct the original string
    const table: string[] = new Array(transformed.length).fill('');
    
    // Perform multiple passes to reconstruct the original string
    for (let i = 0; i < transformed.length; i++) {
      for (let j = 0; j < transformed.length; j++) {
        table[j] = transformed[j] + table[j];
      }
      table.sort();
    }

    return table[index];
  }
}
interface BWTResult {
  transformed: string;
  index: number;
}

class OptimizedBWT {
  /**
   * More efficient BWT implementation using suffix array concepts
   */
  static transform(input: string): BWTResult {
    const n = input.length;
    if (n === 0) return { transformed: "", index: -1 };

    // Create suffix array indices
    const indices = Array.from({ length: n }, (_, i) => i);
    
    // Sort indices based on the cyclic rotations
    indices.sort((i, j) => {
      for (let k = 0; k < n; k++) {
        const charI = input[(i + k) % n];
        const charJ = input[(j + k) % n];
        if (charI !== charJ) {
          return charI.localeCompare(charJ);
        }
      }
      return 0;
    });

    // Build the transformed string and find the original index
    let transformed = '';
    let originalIndex = -1;
    
    for (let i = 0; i < n; i++) {
      const lastCharIndex = (indices[i] + n - 1) % n;
      transformed += input[lastCharIndex];
      
      if (indices[i] === 0) {
        originalIndex = i;
      }
    }

    return { transformed, index: originalIndex };
  }

  /**
   * Efficient inverse transform using the "LF mapping" property
   */
  static inverseTransform(transformed: string, index: number): string {
    const n = transformed.length;
    if (n === 0) return "";
    
    if (index < 0 || index >= n) {
      throw new Error("Invalid index for inverse transform");
    }

    // Count occurrences of each character
    const charCount: Map<string, number> = new Map();
    for (const char of transformed) {
      charCount.set(char, (charCount.get(char) || 0) + 1);
    }

    // Build the first column of the BWT matrix (sorted chars)
    const sortedChars = Array.from(charCount.keys()).sort();
    let firstColumn = '';
    for (const char of sortedChars) {
      firstColumn += char.repeat(charCount.get(char)!);
    }

    // Build the LF mapping
    const lfMapping: number[] = new Array(n);
    const charPositions: Map<string, number[]> = new Map();
    
    for (let i = 0; i < n; i++) {
      const char = transformed[i];
      if (!charPositions.has(char)) {
        charPositions.set(char, []);
      }
      charPositions.get(char)!.push(i);
    }

    // Create mapping from first column to transformed string
    const charFirstOccurrence: Map<string, number> = new Map();
    let currentPos = 0;
    for (const char of firstColumn) {
      if (!charFirstOccurrence.has(char)) {
        charFirstOccurrence.set(char, currentPos);
      }
      currentPos++;
    }

    // Reconstruct the original string
    let result = '';
    let currentIndex = index;
    
    for (let i = 0; i < n; i++) {
      const char = transformed[currentIndex];
      result = char + result;
      
      const charIndexInFirst = firstColumn.indexOf(char, charFirstOccurrence.get(char)!);
      const rank = charPositions.get(char)!.indexOf(currentIndex);
      currentIndex = charIndexInFirst + rank;
    }

    return result;
  }
}
// Test the implementation
function testBWT() {
  const testCases = [
    "banana",
    "mississippi",
    "typescript",
    "a",
    "",
    "abracadabra"
  ];

  for (const testCase of testCases) {
    console.log(`\nTesting: "${testCase}"`);
    
    // Using basic implementation
    const result = BurrowsWheelerTransform.transform(testCase);
    const reconstructed = BurrowsWheelerTransform.inverseTransform(result.transformed, result.index);
    
    console.log(`Original: ${testCase}`);
    console.log(`BWT: ${result.transformed} (index: ${result.index})`);
    console.log(`Reconstructed: ${reconstructed}`);
    console.log(`Match: ${testCase === reconstructed}`);

    // Using optimized implementation
    const optimizedResult = OptimizedBWT.transform(testCase);
    const optimizedReconstructed = OptimizedBWT.inverseTransform(
      optimizedResult.transformed, 
      optimizedResult.index
    );
    
    console.log(`Optimized Match: ${testCase === optimizedReconstructed}`);
  }
}

// Run tests
testBWT();
// Helper function to validate BWT results
function validateBWT(input: string): boolean {
  try {
    const result = OptimizedBWT.transform(input);
    const reconstructed = OptimizedBWT.inverseTransform(result.transformed, result.index);
    return input === reconstructed;
  } catch (error) {
    return false;
  }
}

// Function to measure compression potential
function calculateCompressionRatio(input: string): number {
  const originalSize = input.length * 8; // Assuming 8 bits per character
  const bwtResult = OptimizedBWT.transform(input);
  
  // Simple run-length encoding simulation
  let compressedSize = 0;
  let currentChar = '';
  let count = 0;
  
  for (const char of bwtResult.transformed) {
    if (char === currentChar) {
      count++;
    } else {
      if (currentChar !== '') {
        compressedSize += 8 + 16; // char + count (simplified)
      }
      currentChar = char;
      count = 1;
    }
  }
  
  if (currentChar !== '') {
    compressedSize += 8 + 16; // char + count
  }
  
  return originalSize / compressedSize;
}
