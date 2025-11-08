class BurrowsWheelerTransform {
  /**
   * Encode a string using Burrows-Wheeler Transform
   */
  static encode(input: string): { transformed: string; index: number } {
    if (!input.length) return { transformed: '', index: -1 };
    
    const rotations = this.generateRotations(input);
    const sortedRotations = [...rotations].sort();
    
    const lastColumn = sortedRotations.map(rotation => 
      rotation[rotation.length - 1]
    ).join('');
    
    const originalIndex = sortedRotations.indexOf(input);
    
    return {
      transformed: lastColumn,
      index: originalIndex
    };
  }

  /**
   * Decode a BWT-transformed string
   */
  static decode(transformed: string, index: number): string {
    if (!transformed.length || index === -1) return '';
    
    const table: string[] = Array(transformed.length).fill('');
    
    // Reconstruct the original string through multiple passes
    for (let i = 0; i < transformed.length; i++) {
      for (let j = 0; j < transformed.length; j++) {
        table[j] = transformed[j] + table[j];
      }
      table.sort();
    }
    
    return table[index];
  }

  /**
   * Generate all rotations of the input string
   */
  private static generateRotations(input: string): string[] {
    const rotations: string[] = [];
    const len = input.length;
    
    for (let i = 0; i < len; i++) {
      rotations.push(input.slice(i) + input.slice(0, i));
    }
    
    return rotations;
  }
}
class OptimizedBWT {
  /**
   * Optimized BWT encoding using cyclic shifts
   */
  static encode(input: string): { transformed: string; index: number } {
    const len = input.length;
    if (len === 0) return { transformed: '', index: -1 };
    
    // Create cyclic shifts with their indices
    const shifts = Array.from({ length: len }, (_, i) => ({
      string: input.slice(i) + input.slice(0, i),
      originalIndex: i
    }));
    
    // Sort lexicographically
    shifts.sort((a, b) => a.string.localeCompare(b.string));
    
    // Extract last column and find original index
    const transformed = shifts.map(shift => 
      shift.string.charAt(len - 1)
    ).join('');
    
    const index = shifts.findIndex(shift => shift.originalIndex === 0);
    
    return { transformed, index };
  }

  /**
   * Efficient decoding using the LF mapping property
   */
  static decode(transformed: string, index: number): string {
    const len = transformed.length;
    if (len === 0 || index < 0) return '';
    
    // Build the decoding table
    const table: string[][] = Array(len);
    for (let i = 0; i < len; i++) {
      table[i] = [];
    }
    
    // Multiple passes to reconstruct
    for (let pass = 0; pass < len; pass++) {
      for (let i = 0; i < len; i++) {
        table[i].unshift(transformed[i]);
      }
      table.sort((a, b) => {
        const aStr = a.join('');
        const bStr = b.join('');
        return aStr.localeCompare(bStr);
      });
    }
    
    return table[index].join('');
  }
}
// Example usage
const testString = "banana";
console.log("Original:", testString);

// Basic implementation
const basicResult = BurrowsWheelerTransform.encode(testString);
console.log("BWT encoded:", basicResult.transformed);
console.log("BWT index:", basicResult.index);
const decodedBasic = BurrowsWheelerTransform.decode(
  basicResult.transformed, 
  basicResult.index
);
console.log("Decoded:", decodedBasic);

// Optimized implementation
const optimizedResult = OptimizedBWT.encode(testString);
console.log("Optimized BWT:", optimizedResult.transformed);
const decodedOptimized = OptimizedBWT.decode(
  optimizedResult.transformed, 
  optimizedResult.index
);
console.log("Optimized decoded:", decodedOptimized);
class BWT {
  private static readonly EOF = '$'; // End-of-file marker (optional)

  /**
   * Encode with optional EOF marker
   */
  static encode(input: string, useEOF: boolean = false): { transformed: string; index: number } {
    let workingString = input;
    if (useEOF && !input.includes(this.EOF)) {
      workingString = input + this.EOF;
    }
    
    const len = workingString.length;
    const rotations: string[] = [];
    
    for (let i = 0; i < len; i++) {
      rotations.push(workingString.slice(i) + workingString.slice(0, i));
    }
    
    rotations.sort();
    
    const transformed = rotations.map(rot => rot.charAt(len - 1)).join('');
    const index = rotations.indexOf(workingString);
    
    return { transformed, index };
  }

  /**
   * Decode with optional EOF handling
   */
  static decode(transformed: string, index: number, hadEOF: boolean = false): string {
    if (transformed.length === 0) return '';
    
    let table = Array(transformed.length).fill('');
    
    for (let i = 0; i < transformed.length; i++) {
      for (let j = 0; j < transformed.length; j++) {
        table[j] = transformed[j] + table[j];
      }
      table.sort();
    }
    
    const result = table[index];
    return hadEOF ? result.replace(this.EOF, '') : result;
  }

  /**
   * Calculate compression ratio (theoretical)
   */
  static calculateCompressionRatio(original: string, transformed: string): number {
    const originalEntropy = this.calculateEntropy(original);
    const transformedEntropy = this.calculateEntropy(transformed);
    return transformedEntropy / originalEntropy;
  }

  /**
   * Simple entropy calculation for comparison
   */
  private static calculateEntropy(str: string): number {
    const len = str.length;
    const freq: Map<string, number> = new Map();
    
    for (const char of str) {
      freq.set(char, (freq.get(char) || 0) + 1);
    }
    
    let entropy = 0;
    for (const [char, count] of freq) {
      const probability = count / len;
      entropy -= probability * Math.log2(probability);
    }
    
    return entropy;
  }
}

// Example with compression analysis
const text = "abracadabra";
const result = BWT.encode(text, true);
console.log(`Original: ${text}`);
console.log(`BWT: ${result.transformed}`);
console.log(`Compression ratio: ${BWT.calculateCompressionRatio(text, result.transformed)}`);
