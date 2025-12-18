class BurrowsWheelerTransform {
  /**
   * Apply the Burrows-Wheeler Transform to a string
   * @param input The input string to transform
   * @returns The transformed string and the original row index
   */
  static encode(input: string): { transformed: string; index: number } {
    if (input.length === 0) {
      return { transformed: '', index: -1 };
    }

    // Add end-of-text marker if not present
    const text = input + '$';
    
    // Generate all rotations
    const rotations: string[] = [];
    for (let i = 0; i < text.length; i++) {
      rotations.push(text.slice(i) + text.slice(0, i));
    }

    // Sort rotations lexicographically
    rotations.sort();

    // Extract last characters and find original row
    let transformed = '';
    let originalIndex = -1;
    
    for (let i = 0; i < rotations.length; i++) {
      transformed += rotations[i].charAt(rotations[i].length - 1);
      if (rotations[i] === text) {
        originalIndex = i;
      }
    }

    return { transformed, index: originalIndex };
  }

  /**
   * Reverse the Burrows-Wheeler Transform
   * @param transformed The transformed string
   * @param index The original row index
   * @returns The original string
   */
  static decode(transformed: string, index: number): string {
    if (transformed.length === 0 || index === -1) {
      return '';
    }

    if (index < 0 || index >= transformed.length) {
      throw new Error('Invalid index');
    }

    // Create table and reconstruct step by step
    const table: string[] = new Array(transformed.length).fill('');
    
    for (let step = 0; step < transformed.length; step++) {
      // Add the transformed string as the first column and sort
      for (let i = 0; i < transformed.length; i++) {
        table[i] = transformed.charAt(i) + table[i];
      }
      
      // Sort lexicographically
      table.sort();
    }

    // Find the row that ends with '$' (our end marker)
    for (const row of table) {
      if (row.endsWith('$')) {
        // Remove the '$' marker and return
        return row.slice(0, -1);
      }
    }

    throw new Error('Could not find original string');
  }

  /**
   * More efficient decode using the "LF Mapping" property
   * @param transformed The transformed string
   * @param index The original row index
   * @returns The original string
   */
  static decodeEfficient(transformed: string, index: number): string {
    if (transformed.length === 0 || index === -1) {
      return '';
    }

    if (index < 0 || index >= transformed.length) {
      throw new Error('Invalid index');
    }

    // Create an array of characters and sort them to get first column
    const firstCol = transformed.split('').sort();
    
    // Create LF mapping using next occurrence tracking
    const occurrences: Map<string, number> = new Map();
    const nextOccurrence: number[] = new Array(transformed.length);
    
    // Count occurrences and track positions
    for (let i = 0; i < transformed.length; i++) {
      const char = transformed.charAt(i);
      const count = occurrences.get(char) || 0;
      nextOccurrence[i] = count;
      occurrences.set(char, count + 1);
    }

    // Build mapping from first column to original positions
    const firstOccurrence: Map<string, number> = new Map();
    for (let i = 0; i < firstCol.length; i++) {
      const char = firstCol[i];
      if (!firstOccurrence.has(char)) {
        firstOccurrence.set(char, i);
      }
    }

    // Reconstruct the original string
    let result = '';
    let currentIndex = index;
    
    for (let i = 0; i < transformed.length - 1; i++) { // -1 to exclude '$'
      const char = transformed.charAt(currentIndex);
      result = char + result;
      
      if (char === '$') break; // Should not happen until the end
      
      const firstIdx = firstOccurrence.get(char)!;
      currentIndex = firstIdx + nextOccurrence[currentIndex];
    }

    return result;
  }
}

// Example usage and testing
function testBWT() {
  console.log('=== Burrows-Wheeler Transform Tests ===\n');

  const testCases = [
    'banana',
    'abracadabra',
    'mississippi',
    'a',
    'test',
    ''
  ];

  for (const testCase of testCases) {
    console.log(`Input: "${testCase}"`);
    
    const encoded = BurrowsWheelerTransform.encode(testCase);
    console.log(`Encoded: "${encoded.transformed}" (index: ${encoded.index})`);
    
    const decoded = BurrowsWheelerTransform.decode(encoded.transformed, encoded.index);
    const decodedEff = BurrowsWheelerTransform.decodeEfficient(encoded.transformed, encoded.index);
    
    console.log(`Decoded: "${decoded}"`);
    console.log(`Efficient Decoded: "${decodedEff}"`);
    console.log(`Match: ${decoded === testCase && decodedEff === testCase}`);
    console.log('---');
  }
}

// Advanced version with better performance for large inputs
class EfficientBWT {
  /**
   * More efficient encoding using suffix arrays
   */
  static encode(input: string): { transformed: string; index: number } {
    if (input.length === 0) {
      return { transformed: '', index: -1 };
    }

    const text = input + '$';
    const n = text.length;
    
    // Create suffix array
    const suffixes: Array<{ index: number; suffix: string }> = [];
    for (let i = 0; i < n; i++) {
      suffixes.push({ index: i, suffix: text.slice(i) });
    }

    // Sort suffixes
    suffixes.sort((a, b) => a.suffix.localeCompare(b.suffix));

    // Build BWT result
    let transformed = '';
    let originalIndex = -1;
    
    for (let i = 0; i < n; i++) {
      const prevIndex = (suffixes[i].index - 1 + n) % n;
      transformed += text.charAt(prevIndex);
      
      if (suffixes[i].index === 0) {
        originalIndex = i;
      }
    }

    return { transformed, index: originalIndex };
  }

  /**
   * Most efficient decoding using LF mapping
   */
  static decode(transformed: string, index: number): string {
    const n = transformed.length;
    if (n === 0 || index === -1) return '';

    // Count occurrences and build cumulative counts
    const charCounts: Map<string, number> = new Map();
    for (const char of transformed) {
      charCounts.set(char, (charCounts.get(char) || 0) + 1);
    }

    // Sort characters and build first occurrence mapping
    const sortedChars = Array.from(charCounts.keys()).sort();
    let cumulative = 0;
    const firstOccurrence: Map<string, number> = new Map();
    
    for (const char of sortedChars) {
      firstOccurrence.set(char, cumulative);
      cumulative += charCounts.get(char)!;
    }

    // Build next occurrence mapping
    const nextOccurrence: number[] = new Array(n);
    const charSeen: Map<string, number> = new Map();
    
    for (let i = 0; i < n; i++) {
      const char = transformed[i];
      const seen = charSeen.get(char) || 0;
      nextOccurrence[i] = seen;
      charSeen.set(char, seen + 1);
    }

    // Reconstruct
    let result = '';
    let ptr = index;
    
    for (let i = 0; i < n - 1; i++) {
      const char = transformed[ptr];
      if (char === '$') break;
      
      result = char + result;
      ptr = firstOccurrence.get(char)! + nextOccurrence[ptr];
    }

    return result;
  }
}

// Run tests
testBWT();
const result = BurrowsWheelerTransform.encode("banana");
// { transformed: "annb$aa", index: 3 }

const original = BurrowsWheelerTransform.decode("annb$aa", 3);
// "banana"
