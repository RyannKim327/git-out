class BoyerMoore {
  private badCharacterTable: Map<string, number>;
  private goodSuffixTable: number[];

  constructor() {
    this.badCharacterTable = new Map();
    this.goodSuffixTable = [];
  }

  /**
   * Precomputes the bad character table for the pattern
   * Maps each character to the rightmost position it appears in the pattern
   */
  private buildBadCharacterTable(pattern: string): void {
    this.badCharacterTable.clear();
    
    for (let i = 0; i < pattern.length; i++) {
      this.badCharacterTable.set(pattern[i], i);
    }
  }

  /**
   * Precomputes the good suffix table for the pattern
   * Helps skip portions of text when a suffix matches but isn't the full pattern
   */
  private buildGoodSuffixTable(pattern: string): void {
    const m = pattern.length;
    this.goodSuffixTable = new Array(m).fill(0);
    
    // Build suffix table
    let j = m;
    let k = m - 1;
    
    // First pass: find suffixes that match pattern from the end
    for (let i = m - 2; i >= 0; i--) {
      while (j > 0 && pattern[i] !== pattern[j - 1]) {
        if (pattern[i] < pattern[j - 1]) {
          this.goodSuffixTable[i] = j;
        }
        j = this.goodSuffixTable[j - 1];
      }
      if (i === j - 1) {
        j--;
      }
      k = i - j + 1;
    }
    
    // Second pass: fill remaining entries
    for (let i = 0; i < m - 1; i++) {
      this.goodSuffixTable[i] = k;
      k = Math.max(k - 1, 0);
    }
  }

  /**
   * Preprocesses the pattern to build lookup tables
   */
  private preprocess(pattern: string): void {
    this.buildBadCharacterTable(pattern);
    this.buildGoodSuffixTable(pattern);
  }

  /**
   * Main Boyer-Moore search algorithm
   */
  search(text: string, pattern: string): number[] {
    if (pattern.length === 0) return [];
    if (text.length < pattern.length) return [];

    this.preprocess(pattern);
    const m = pattern.length;
    const n = text.length;
    const matches: number[] = [];

    let i = m - 1; // Position in text

    while (i < n) {
      let j = m - 1; // Position in pattern

      // Compare characters from right to left
      while (j >= 0 && pattern[j] === text[i - (m - 1 - j)]) {
        j--;
      }

      if (j < 0) {
        // Found a match
        matches.push(i - m + 1);
        
        // Move past the match using good suffix rule
        if (i + 1 < n) {
          i += this.goodSuffixTable[0];
        } else {
          break;
        }
      } else {
        // No match - decide how much to skip
        let skip = 0;
        
        // Good suffix rule
        if (j < m - 1) {
          skip = Math.max(1, j - this.goodSuffixTable[j]);
        } else {
          // Bad character rule
          const textChar = text[i];
          const lastPatternPos = this.badCharacterTable.get(textChar) || -1;
          skip = Math.max(1, i - lastPatternPos);
        }
        
        i += skip;
      }
    }

    return matches;
  }

  /**
   * Simple version that returns first match or -1 if not found
   */
  searchFirst(text: string, pattern: string): number {
    const matches = this.search(text, pattern);
    return matches.length > 0 ? matches[0] : -1;
  }
}

// Usage example and tests
function demonstrateBoyerMoore() {
  const bm = new BoyerMoore();
  
  // Test cases
  const tests = [
    { text: "Here is a simple example", pattern: "simple", expected: 8 },
    { text: "ABABDABACDABABCABAB", pattern: "ABABCABAB", expected: 10 },
    { text: "mississippi", pattern: "issip", expected: 4 },
    { text: "aaaaa", pattern: "aaa", expected: 0 },
    { text: "abc", pattern: "xyz", expected: -1 }
  ];

  console.log("Boyer-Moore Algorithm Tests:");
  console.log("=============================");
  
  tests.forEach((test, index) => {
    const result = bm.searchFirst(test.text, test.pattern);
    const status = result === test.expected ? "PASS" : "FAIL";
    console.log(`${index + 1}. Text: "${test.text}", Pattern: "${test.pattern}"`);
    console.log(`   Expected: ${test.expected}, Got: ${result} [${status}]`);
    console.log();
  });

  // Show all matches
  const text = "abacabadacabacabaabacaba";
  const pattern = "abacaba";
  const allMatches = bm.search(text, pattern);
  console.log(`All matches for "abacaba" in "${text}":`, allMatches);
  console.log(`Positions: ${allMatches.map(pos => `"${text.substring(pos, pos + 7)}"`).join(', ')}`);
}

// Run the demonstration
demonstrateBoyerMoore();
const bm = new BoyerMoore();

// Find first occurrence
const pos = bm.searchFirst("Hello world", "world"); // Returns 6

// Find all occurrences
const positions = bm.search("mississippi", "iss"); // Returns [1, 4, 7]
