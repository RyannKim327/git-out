class KMP {
  /**
   * Builds the prefix table (longest prefix suffix) for the KMP algorithm
   * @param pattern The pattern to build the prefix table for
   * @returns The prefix table array
   */
  private static buildPrefixTable(pattern: string): number[] {
    const n = pattern.length;
    const prefixTable: number[] = new Array(n).fill(0);
    
    let length = 0; // length of the previous longest prefix suffix
    let i = 1;
    
    while (i < n) {
      if (pattern[i] === pattern[length]) {
        length++;
        prefixTable[i] = length;
        i++;
      } else {
        if (length !== 0) {
          length = prefixTable[length - 1];
        } else {
          prefixTable[i] = 0;
          i++;
        }
      }
    }
    
    return prefixTable;
  }

  /**
   * Searches for all occurrences of pattern in text using KMP algorithm
   * @param text The text to search in
   * @param pattern The pattern to search for
   * @returns Array of starting indices where pattern is found
   */
  static search(text: string, pattern: string): number[] {
    if (pattern.length === 0) return [];
    if (text.length < pattern.length) return [];
    
    const prefixTable = KMP.buildPrefixTable(pattern);
    const result: number[] = [];
    
    let i = 0; // index for text
    let j = 0; // index for pattern
    
    while (i < text.length) {
      if (text[i] === pattern[j]) {
        i++;
        j++;
        
        if (j === pattern.length) {
          result.push(i - j);
          j = prefixTable[j - 1];
        }
      } else {
        if (j !== 0) {
          j = prefixTable[j - 1];
        } else {
          i++;
        }
      }
    }
    
    return result;
  }

  /**
   * Checks if pattern exists in text using KMP algorithm
   * @param text The text to search in
   * @param pattern The pattern to search for
   * @returns True if pattern is found, false otherwise
   */
  static contains(text: string, pattern: string): boolean {
    return KMP.search(text, pattern).length > 0;
  }

  /**
   * Finds the first occurrence of pattern in text
   * @param text The text to search in
   * @param pattern The pattern to search for
   * @returns The starting index of first occurrence, or -1 if not found
   */
  static findFirst(text: string, pattern: string): number {
    const indices = KMP.search(text, pattern);
    return indices.length > 0 ? indices[0] : -1;
  }
}

// Example usage
function demonstrateKMP() {
  const text = "ABABDABACDABABCABAB";
  const pattern = "ABABCABAB";
  
  console.log("Text:", text);
  console.log("Pattern:", pattern);
  
  // Find all occurrences
  const indices = KMP.search(text, pattern);
  console.log("Occurrences at indices:", indices);
  
  // Check if pattern exists
  const exists = KMP.contains(text, pattern);
  console.log("Pattern exists:", exists);
  
  // Find first occurrence
  const firstIndex = KMP.findFirst(text, pattern);
  console.log("First occurrence at:", firstIndex);
  
  // Test with multiple patterns
  const testCases = [
    { text: "hello world", pattern: "world", expected: [6] },
    { text: "aaaaa", pattern: "aa", expected: [0, 1, 2, 3] },
    { text: "abc", pattern: "xyz", expected: [] }
  ];
  
  testCases.forEach((testCase, index) => {
    const result = KMP.search(testCase.text, testCase.pattern);
    console.log(`Test ${index + 1}:`, {
      expected: testCase.expected,
      actual: result,
      match: JSON.stringify(testCase.expected) === JSON.stringify(result)
    });
  });
}

// Run demonstration
demonstrateKMP();
const kmpSearch = (text: string, pattern: string): number[] => {
  if (pattern.length === 0) return [];
  
  const buildPrefixTable = (pattern: string): number[] => {
    const n = pattern.length;
    const prefixTable: number[] = new Array(n).fill(0);
    let length = 0;
    let i = 1;
    
    while (i < n) {
      if (pattern[i] === pattern[length]) {
        length++;
        prefixTable[i] = length;
        i++;
      } else {
        if (length !== 0) {
          length = prefixTable[length - 1];
        } else {
          prefixTable[i] = 0;
          i++;
        }
      }
    }
    return prefixTable;
  };
  
  const prefixTable = buildPrefixTable(pattern);
  const result: number[] = [];
  let i = 0, j = 0;
  
  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i++;
      j++;
      
      if (j === pattern.length) {
        result.push(i - j);
        j = prefixTable[j - 1];
      }
    } else {
      if (j !== 0) {
        j = prefixTable[j - 1];
      } else {
        i++;
      }
    }
  }
  
  return result;
};

// Usage
const result = kmpSearch("ABABDABACDABABCABAB", "ABABCABAB");
console.log(result); // [10]
