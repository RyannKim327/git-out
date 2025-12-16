class BurrowsWheelerTransform {
  /**
   * Applies the Burrows-Wheeler Transform to a string
   */
  static transform(input: string): { transformed: string; index: number } {
    if (!input) return { transformed: "", index: -1 };
    
    // Add end-of-file marker if not present
    const text = input.endsWith('$') ? input : input + '$';
    
    // Generate all rotations
    const rotations: string[] = [];
    for (let i = 0; i < text.length; i++) {
      rotations.push(text.slice(i) + text.slice(0, i));
    }
    
    // Sort rotations lexicographically
    rotations.sort();
    
    // Extract last column and find original index
    let originalIndex = -1;
    const transformed = rotations.map((rotation, idx) => {
      if (rotation === text) originalIndex = idx;
      return rotation.charAt(rotation.length - 1);
    }).join('');
    
    return { transformed, index: originalIndex };
  }
  
  /**
   * Inverse Burrows-Wheeler Transform
   */
  static inverseTransform(transformed: string, index: number): string {
    if (!transformed || index < 0 || index >= transformed.length) {
      return "";
    }
    
    // Create and sort the table
    let table: string[] = Array(transformed.length).fill("");
    
    // Reconstruct by repeatedly sorting and prepending the transformed string
    for (let i = 0; i < transformed.length; i++) {
      for (let j = 0; j < transformed.length; j++) {
        table[j] = transformed.charAt(j) + table[j];
      }
      table.sort();
    }
    
    // Return the original string (remove $ if it was added)
    const result = table[index];
    return result.endsWith('$') ? result.slice(0, -1) : result;
  }
  
  /**
   * More efficient inverse transform using the LF mapping property
   */
  static inverseTransformEfficient(transformed: string, index: number): string {
    if (!transformed || index < 0 || index >= transformed.length) {
      return "";
    }
    
    // Count frequencies and create first column
    const chars = transformed.split('');
    const sorted = [...chars].sort();
    
    // Create mapping using LF property
    const counts: { [key: string]: number } = {};
    const next: number[] = [];
    
    // First pass: count occurrences
    for (const char of chars) {
      counts[char] = (counts[char] || 0) + 1;
    }
    
    // Second pass: build next array using LF mapping
    const positions: { [key: string]: number[] } = {};
    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];
      if (!positions[char]) positions[char] = [];
      positions[char].push(i);
    }
    
    // Reconstruct the original string
    let result = "";
    let currentIndex = index;
    
    for (let i = 0; i < transformed.length - 1; i++) { // -1 to exclude the $ if present
      const char = sorted[currentIndex];
      result = char + result;
      
      // Find which occurrence of this character we're at
      const charPositions = positions[char];
      const occurrenceIndex = charPositions.indexOf(currentIndex);
      currentIndex = charPositions[occurrenceIndex];
    }
    
    return result;
  }
}
// Example usage
const examples = [
  "banana",
  "mississippi",
  "abracadabra",
  "typescript"
];

console.log("Burrows-Wheeler Transform Examples:");
console.log("=".repeat(50));

for (const example of examples) {
  console.log(`Original: "${example}"`);
  
  // Transform
  const { transformed, index } = BurrowsWheelerTransform.transform(example);
  console.log(`Transformed: "${transformed}" (index: ${index})`);
  
  // Inverse transform
  const reconstructed = BurrowsWheelerTransform.inverseTransform(transformed, index);
  console.log(`Reconstructed: "${reconstructed}"`);
  console.log(`Match: ${reconstructed === example}`);
  console.log("-".repeat(30));
}
interface BWTResult {
  transformed: string;
  index: number;
  compressionRatio?: number;
}

class EnhancedBWT {
  /**
   * Optimized BWT using suffix arrays (more efficient for large inputs)
   */
  static transformOptimized(input: string): BWTResult {
    if (!input) return { transformed: "", index: -1 };
    
    const text = input.endsWith('$') ? input : input + '$';
    const n = text.length;
    
    // Create suffix array (simplified approach)
    const suffixes: { index: number; suffix: string }[] = [];
    for (let i = 0; i < n; i++) {
      suffixes.push({ index: i, suffix: text.slice(i) });
    }
    
    // Sort suffixes lexicographically
    suffixes.sort((a, b) => a.suffix.localeCompare(b.suffix));
    
    // Build transformed string and find original index
    let originalIndex = -1;
    const transformedChars: string[] = [];
    
    suffixes.forEach((suffix, idx) => {
      const charIndex = (suffix.index === 0) ? n - 1 : suffix.index - 1;
      transformedChars.push(text[charIndex]);
      
      if (suffix.index === 0) {
        originalIndex = idx;
      }
    });
    
    const transformed = transformedChars.join('');
    const compressionRatio = input.length / transformed.length;
    
    return { transformed, index: originalIndex, compressionRatio };
  }
  
  /**
   * Fast inverse transform using counting sort approach
   */
  static inverseTransformFast(transformed: string, index: number): string {
    const n = transformed.length;
    if (index < 0 || index >= n) return "";
    
    // Count frequencies and create mapping
    const counts: number[] = Array(256).fill(0); // ASCII counts
    const positions: number[] = [];
    
    // Count character frequencies and record positions
    for (let i = 0; i < n; i++) {
      const charCode = transformed.charCodeAt(i);
      counts[charCode]++;
      positions.push(counts[charCode] - 1);
    }
    
    // Build first column and mapping
    let total = 0;
    const firstOccurrence: number[] = Array(256).fill(-1);
    const firstColumn: string[] = [];
    
    for (let i = 0; i < 256; i++) {
      if (counts[i] > 0) {
        firstOccurrence[i] = total;
        for (let j = 0; j < counts[i]; j++) {
          firstColumn.push(String.fromCharCode(i));
        }
        total += counts[i];
      }
    }
    
    // Reconstruct original string
    let result = "";
    let currentIndex = index;
    
    for (let i = 0; i < n - 1; i++) { // -1 to exclude the $ marker
      const char = transformed.charAt(currentIndex);
      result = char + result;
      
      const charCode = char.charCodeAt(0);
      const occurrence = positions[currentIndex];
      currentIndex = firstOccurrence[charCode] + occurrence;
    }
    
    return result;
  }
  
  /**
   * Compress BWT output using run-length encoding
   */
  static compressBWT(transformed: string): string {
    let compressed = "";
    let count = 1;
    let currentChar = transformed[0];
    
    for (let i = 1; i < transformed.length; i++) {
      if (transformed[i] === currentChar) {
        count++;
      } else {
        compressed += count > 1 ? `${count}${currentChar}` : currentChar;
        currentChar = transformed[i];
        count = 1;
      }
    }
    
    compressed += count > 1 ? `${count}${currentChar}` : currentChar;
    return compressed;
  }
  
  /**
   * Decompress run-length encoded BWT
   */
  static decompressBWT(compressed: string): string {
    let decompressed = "";
    let i = 0;
    
    while (i < compressed.length) {
      if (/\d/.test(compressed[i])) {
        // Parse number followed by character
        let numStr = "";
        while (/\d/.test(compressed[i])) {
          numStr += compressed[i];
          i++;
        }
        const count = parseInt(numStr, 10);
        const char = compressed[i];
        decompressed += char.repeat(count);
        i++;
      } else {
        decompressed += compressed[i];
        i++;
      }
    }
    
    return decompressed;
  }
}
// Test the implementation
function testBWT() {
  const testCases = [
    "hello",
    "algorithm",
    "data compression",
    "a".repeat(10), // Repeated characters
    "abcabcabc"     // Pattern
  ];
  
  console.log("Testing BWT Implementation:");
  console.log("=".repeat(50));
  
  for (const testCase of testCases) {
    console.log(`Testing: "${testCase}"`);
    
    // Basic transform
    const basicResult = BurrowsWheelerTransform.transform(testCase);
    console.log(`Basic BWT: "${basicResult.transformed}"`);
    
    // Optimized transform
    const optimizedResult = EnhancedBWT.transformOptimized(testCase);
    console.log(`Optimized BWT: "${optimizedResult.transformed}"`);
    
    // Inverse transform
    const reconstructed = BurrowsWheelerTransform.inverseTransform(
      basicResult.transformed, 
      basicResult.index
    );
    
    console.log(`Reconstructed: "${reconstructed}"`);
    console.log(`Success: ${reconstructed === testCase}`);
    
    // Compression test
    const compressed = EnhancedBWT.compressBWT(basicResult.transformed);
    const decompressed = EnhancedBWT.decompressBWT(compressed);
    
    console.log(`Compressed: "${compressed}"`);
    console.log(`Compression ratio: ${(testCase.length / compressed.length).toFixed(2)}`);
    console.log("-".repeat(40));
  }
}

// Run tests
testBWT();
