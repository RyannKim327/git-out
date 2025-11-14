class BoyerMooreHorspool {
  /**
   * Preprocess the pattern to create the bad character shift table
   * @param pattern - The pattern to search for
   * @returns Map of characters to shift distances
   */
  private preprocessPattern(pattern: string): Map<string, number> {
    const patternLength = pattern.length;
    const badCharTable = new Map<string, number>();
    
    // For all characters except the last one, set the shift distance
    for (let i = 0; i < patternLength - 1; i++) {
      const character = pattern[i];
      const shift = patternLength - i - 1;
      badCharTable.set(character, shift);
    }
    
    return badCharTable;
  }

  /**
   * Search for pattern in text using Boyer-Moore-Horspool algorithm
   * @param text - The text to search in
   * @param pattern - The pattern to search for
   * @returns Array of starting indices where pattern is found
   */
  search(text: string, pattern: string): number[] {
    if (pattern.length === 0 || text.length === 0 || pattern.length > text.length) {
      return [];
    }

    const textLength = text.length;
    const patternLength = pattern.length;
    const badCharTable = this.preprocessPattern(pattern);
    const matches: number[] = [];

    let i = 0; // Current position in text
    
    while (i <= textLength - patternLength) {
      let j = patternLength - 1; // Compare from right to left
      
      // Compare pattern with current window of text
      while (j >= 0 && pattern[j] === text[i + j]) {
        j--;
      }
      
      if (j < 0) {
        // Pattern found
        matches.push(i);
        i += patternLength; // Shift by pattern length for next search
      } else {
        // Calculate shift based on bad character rule
        const badChar = text[i + patternLength - 1];
        const shift = badCharTable.get(badChar) || patternLength;
        i += shift;
      }
    }
    
    return matches;
  }
}
interface BoyerMooreHorspoolResult {
  positions: number[];
  searchTime: number;
}

class EnhancedBoyerMooreHorspool {
  private pattern: string = '';
  private patternLength: number = 0;
  private badCharTable: Map<string, number> = new Map();
  private defaultShift: number = 0;

  /**
   * Preprocess the pattern and create the shift table
   */
  private preprocessPattern(): void {
    this.patternLength = this.pattern.length;
    this.badCharTable.clear();
    
    // Calculate shift for each character in pattern
    for (let i = 0; i < this.patternLength - 1; i++) {
      const character = this.pattern[i];
      const shift = this.patternLength - i - 1;
      this.badCharTable.set(character, shift);
    }
    
    // Default shift is pattern length
    this.defaultShift = this.patternLength;
  }

  /**
   * Set the pattern to search for
   */
  setPattern(pattern: string): void {
    this.pattern = pattern;
    this.preprocessPattern();
  }

  /**
   * Search for the preprocessed pattern in the given text
   */
  search(text: string): BoyerMooreHorspoolResult {
    if (this.patternLength === 0 || text.length === 0) {
      return { positions: [], searchTime: 0 };
    }

    const startTime = performance.now();
    const textLength = text.length;
    const matches: number[] = [];
    let i = 0;

    while (i <= textLength - this.patternLength) {
      let j = this.patternLength - 1;
      
      // Compare from right to left
      while (j >= 0 && this.pattern[j] === text[i + j]) {
        j--;
      }
      
      if (j < 0) {
        matches.push(i);
        i += this.patternLength;
      } else {
        const badChar = text[i + this.patternLength - 1];
        const shift = this.badCharTable.get(badChar) ?? this.defaultShift;
        i += shift;
      }
    }

    const searchTime = performance.now() - startTime;
    
    return { positions: matches, searchTime };
  }
}
// Example 1: Basic usage
const bmh = new BoyerMooreHorspool();
const text = "ABAAABCDABCABCDABCDABDE";
const pattern = "ABCD";

const results = bmh.search(text, pattern);
console.log(`Pattern found at positions: ${results}`); // [4, 10, 14]

// Example 2: Enhanced version with timing
const enhancedBmh = new EnhancedBoyerMooreHorspool();
enhancedBmh.setPattern("ABCD");

const result = enhancedBmh.search(text);
console.log(`Pattern found at positions: ${result.positions}`); // [4, 10, 14]
console.log(`Search time: ${result.searchTime.toFixed(2)}ms`);

// Example 3: Case-sensitive search
const caseSensitiveText = "Hello World hello WORLD";
const casePattern = "hello";

const caseResults = bmh.search(caseSensitiveText, casePattern);
console.log(`Case-sensitive results: ${caseResults}`); // [12]

// Example 4: No matches found
const noMatchText = "This is a sample text";
const noMatchPattern = "xyz";

const noMatchResults = bmh.search(noMatchText, noMatchPattern);
console.log(`No match results: ${noMatchResults}`); // []
