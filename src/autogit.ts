class BurrowsWheelerTransform {
  /**
   * Apply Burrows-Wheeler Transform to a string
   */
  static encode(input: string): { bwt: string; index: number } {
    if (input.length === 0) {
      return { bwt: '', index: 0 };
    }

    // Check if input contains null character
    if (input.includes('\0')) {
      throw new Error('Input string cannot contain null character (\\0)');
    }

    // Create rotations
    const rotations: string[] = [];
    let rotation = input + '$'; // Use $ as EOF marker
    const len = rotation.length;

    for (let i = 0; i < len; i++) {
      rotations.push(rotation);
      rotation = rotation.slice(1) + rotation[0];
    }

    // Sort rotations lexicographically
    rotations.sort();

    // Extract last characters and find original rotation index
    let bwt = '';
    let originalIndex = -1;

    for (let i = 0; i < rotations.length; i++) {
      bwt += rotations[i][len - 1];
      if (rotations[i] === input + '$') {
        originalIndex = i;
      }
    }

    return { bwt, index: originalIndex };
  }

  /**
   * Reverse Burrows-Wheeler Transform
   */
  static decode(bwt: string, index: number): string {
    if (bwt.length === 0) {
      return '';
    }

    if (index < 0 || index >= bwt.length) {
      throw new Error('Invalid index for decoding');
    }

    // Create table and reconstruct original string
    const table: string[] = new Array(bwt.length).fill('');
    
    // Perform multiple passes (one for each character)
    for (let i = 0; i < bwt.length; i++) {
      for (let j = 0; j < bwt.length; j++) {
        table[j] = bwt[j] + table[j];
      }
      table.sort();
    }

    // Find the string that ends with '$'
    for (const str of table) {
      if (str.endsWith('$')) {
        return str.slice(0, -1); // Remove '$' marker
      }
    }

    // Alternative decoding method (more efficient)
    return this.decodeEfficient(bwt, index);
  }

  /**
   * More efficient decoding algorithm
   */
  private static decodeEfficient(bwt: string, index: number): string {
    const len = bwt.length;
    
    // Create an array of pairs (char, index)
    const pairs: Array<[string, number]> = [];
    for (let i = 0; i < len; i++) {
      pairs.push([bwt[i], i]);
    }

    // Sort pairs to get the first column
    pairs.sort((a, b) => {
      if (a[0] === b[0]) {
        return a[1] - b[1];
      }
      return a[0].localeCompare(b[0]);
    });

    // Reconstruct the original string
    let result = '';
    let currentIndex = index;

    for (let i = 0; i < len - 1; i++) { // -1 because we skip the '$'
      const char = pairs[currentIndex][0];
      if (char === '$') {
        continue; // Skip the end marker during reconstruction
      }
      result = char + result;
      currentIndex = pairs[currentIndex][1];
    }

    return result;
  }
}
class OptimizedBWT {
  /**
   * Optimized BWT encoding using suffix array-like approach
   */
  static encode(input: string): { bwt: string; index: number } {
    if (input.length === 0) return { bwt: '', index: 0 };

    const str = input + '\0'; // Using null character as terminator
    const n = str.length;
    
    // Create suffix array indices
    const indices: number[] = Array.from({ length: n }, (_, i) => i);
    
    // Sort indices based on suffixes
    indices.sort((i, j) => {
      while (i < n && j < n) {
        if (str[i] !== str[j]) {
          return str.charCodeAt(i) - str.charCodeAt(j);
        }
        i++;
        j++;
      }
      return i === n ? -1 : 1;
    });

    // Build BWT string and find original index
    let bwt = '';
    let originalIndex = -1;
    
    for (let i = 0; i < n; i++) {
      const idx = indices[i];
      if (idx === 0) {
        bwt += str[n - 1];
        originalIndex = i;
      } else {
        bwt += str[idx - 1];
      }
    }

    return { bwt, index: originalIndex };
  }

  /**
   * Efficient decoding using LF mapping
   */
  static decode(bwt: string, index: number): string {
    const n = bwt.length;
    
    // Count occurrences of each character
    const charCount: Map<string, number> = new Map();
    for (const char of bwt) {
      charCount.set(char, (charCount.get(char) || 0) + 1);
    }

    // Build first column (sorted BWT)
    const sortedChars = [...bwt].sort();
    
    // Build LF mapping
    const lfMapping: number[] = new Array(n);
    const charFirstOccurrence: Map<string, number> = new Map();
    const charOccurrenceCount: Map<string, number> = new Map();

    // Find first occurrence of each character in sorted array
    for (let i = 0; i < n; i++) {
      const char = sortedChars[i];
      if (!charFirstOccurrence.has(char)) {
        charFirstOccurrence.set(char, i);
      }
    }

    // Build occurrence counts for each character
    for (let i = 0; i < n; i++) {
      const char = bwt[i];
      const count = charOccurrenceCount.get(char) || 0;
      lfMapping[i] = charFirstOccurrence.get(char)! + count;
      charOccurrenceCount.set(char, count + 1);
    }

    // Reconstruct original string
    let result = '';
    let currentPos = index;
    
    for (let i = 0; i < n - 1; i++) { // Skip the null terminator
      const char = bwt[currentPos];
      if (char !== '\0') {
        result = char + result;
      }
      currentPos = lfMapping[currentPos];
    }

    return result;
  }
}
// Example usage
function demonstrateBWT() {
  const testStrings = [
    "banana",
    "abracadabra",
    "mississippi",
    "a",
    ""
  ];

  for (const testStr of testStrings) {
    console.log(`Original: "${testStr}"`);
    
    // Using basic implementation
    const encoded = BurrowsWheelerTransform.encode(testStr);
    console.log(`BWT: "${encoded.bwt}" (index: ${encoded.index})`);
    
    const decoded = BurrowsWheelerTransform.decode(encoded.bwt, encoded.index);
    console.log(`Decoded: "${decoded}"`);
    console.log(`Match: ${decoded === testStr}`);
    console.log('---');
    
    // Using optimized implementation
    const optEncoded = OptimizedBWT.encode(testStr);
    const optDecoded = OptimizedBWT.decode(optEncoded.bwt, optEncoded.index);
    console.log(`Optimized - Match: ${optDecoded === testStr}`);
    console.log('========');
  }
}

// Run demonstration
demonstrateBWT();
// Simple test suite
class BWTTest {
  static runTests() {
    const testCases = [
      { input: "banana", expected: "annb$aa" },
      { input: "abracadabra", expected: "ard$rcaaaabb" },
      { input: "mississippi", expected: "ipssm$pissii" }
    ];

    for (const testCase of testCases) {
      const result = BurrowsWheelerTransform.encode(testCase.input);
      console.log(`Input: "${testCase.input}"`);
      console.log(`Expected BWT pattern: ${testCase.expected}`);
      console.log(`Actual BWT: "${result.bwt}"`);
      
      const decoded = BurrowsWheelerTransform.decode(result.bwt, result.index);
      console.log(`Decoded: "${decoded}"`);
      console.log(`Test passed: ${decoded === testCase.input}`);
      console.log('---');
    }
  }
}

// Run tests
BWTTest.runTests();
