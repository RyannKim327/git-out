/**
 * Rabin-Karp string searching algorithm implementation
 * Finds all occurrences of pattern in text using rolling hash
 */
export class RabinKarp {
  private readonly base: number;
  private readonly prime: number;
  private readonly textLength: number;
  private readonly patternLength: number;

  constructor(base: number = 31, prime: number = 1000000007) {
    this.base = base;
    this.prime = prime;
  }

  /**
   * Computes hash of a string using polynomial rolling hash
   */
  private computeHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * this.base + (str.charCodeAt(i) - 'a'.charCodeAt(0) + 1)) % this.prime;
    }
    return hash;
  }

  /**
   * Precomputes the power of base for rolling hash calculation
   */
  private computePower(length: number): number {
    let power = 1;
    for (let i = 0; i < length; i++) {
      power = (power * this.base) % this.prime;
    }
    return power;
  }

  /**
   * Searches for all occurrences of pattern in text
   * @param text - The text to search in
   * @param pattern - The pattern to search for
   * @returns Array of starting indices where pattern is found
   */
  public search(text: string, pattern: string): number[] {
    const results: number[] = [];
    
    if (pattern.length === 0) return results;
    if (text.length < pattern.length) return results;

    this.textLength = text.length;
    this.patternLength = pattern.length;

    // Precompute pattern hash
    const patternHash = this.computeHash(pattern);
    
    // Precompute rolling hash for first window of text
    let textHash = 0;
    for (let i = 0; i < this.patternLength; i++) {
      textHash = (textHash * this.base + (text.charCodeAt(i) - 'a'.charCodeAt(0) + 1)) % this.prime;
    }

    // Precompute base^patternLength
    const power = this.computePower(this.patternLength);

    // Check first window
    if (this.compareStrings(text, pattern, 0)) {
      results.push(0);
    }

    // Slide the window and compute rolling hash
    for (let i = 1; i <= this.textLength - this.patternLength; i++) {
      // Remove the first character of previous window
      textHash = (textHash - (text.charCodeAt(i - 1) - 'a'.charCodeAt(0) + 1) * power) % this.prime;
      
      // Add the new character
      textHash = (textHash * this.base + (text.charCodeAt(i + this.patternLength - 1) - 'a'.charCodeAt(0) + 1)) % this.prime;
      
      // Handle negative hash
      if (textHash < 0) {
        textHash += this.prime;
      }

      // If hashes match, verify actual strings (to avoid hash collisions)
      if (textHash === patternHash && this.compareStrings(text, pattern, i)) {
        results.push(i);
      }
    }

    return results;
  }

  /**
   * Compares actual substrings to verify hash matches
   * This prevents false positives due to hash collisions
   */
  private compareStrings(text: string, pattern: string, startIndex: number): boolean {
    for (let i = 0; i < this.patternLength; i++) {
      if (text.charAt(startIndex + i) !== pattern.charAt(i)) {
        return false;
      }
    }
    return true;
  }
}

// Usage example and test function
function demonstrateRabinKarp() {
  const searcher = new RabinKarp(31, 1000000007);
  
  // Test cases
  const testCases = [
    { text: "hello world", pattern: "world", expected: [6] },
    { text: "aaaaa", pattern: "aa", expected: [0, 1, 2, 3] },
    { text: "ABCABCDABABCDABCDABCD", pattern: "ABCDABCD", expected: [0, 9, 15] },
    { text: "testing123", pattern: "xyz", expected: [] },
    { text: "banana", pattern: "ana", expected: [1, 3] }
  ];

  testCases.forEach((testCase, index) => {
    const result = searcher.search(testCase.text, testCase.pattern);
    console.log(`Test ${index + 1}:`);
    console.log(`Text: "${testCase.text}"`);
    console.log(`Pattern: "${testCase.pattern}"`);
    console.log(`Found at indices: [${result.join(', ')}]`);
    console.log(`Expected: [${testCase.expected.join(', ')}]`);
    console.log(`Match: ${JSON.stringify(result) === JSON.stringify(testCase.expected)}`);
    console.log('');
  });
}

// More flexible version that handles any characters (not just lowercase letters)
export class RabinKarpUniversal {
  private readonly base: number;
  private readonly prime: number;

  constructor(base: number = 31, prime: number = 1000000009) {
    this.base = base;
    this.prime = prime;
  }

  private computeHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      // Use full char code for any character
      hash = (hash * this.base + str.charCodeAt(i)) % this.prime;
    }
    return hash;
  }

  private computePower(length: number): number {
    let power = 1;
    for (let i = 0; i < length; i++) {
      power = (power * this.base) % this.prime;
    }
    return power;
  }

  public search(text: string, pattern: string): number[] {
    const results: number[] = [];
    
    if (pattern.length === 0) return results;
    if (text.length < pattern.length) return results;

    const patternHash = this.computeHash(pattern);
    let textHash = 0;
    
    // Initialize first window
    for (let i = 0; i < pattern.length; i++) {
      textHash = (textHash * this.base + text.charCodeAt(i)) % this.prime;
    }

    const power = this.computePower(pattern.length);

    if (this.compareStrings(text, pattern, 0)) {
      results.push(0);
    }

    // Rolling hash for subsequent windows
    for (let i = 1; i <= text.length - pattern.length; i++) {
      textHash = (textHash - text.charCodeAt(i - 1) * power) % this.prime;
      if (textHash < 0) textHash += this.prime;
      
      textHash = (textHash * this.base + text.charCodeAt(i + pattern.length - 1)) % this.prime;

      if (textHash === patternHash && this.compareStrings(text, pattern, i)) {
        results.push(i);
      }
    }

    return results;
  }

  private compareStrings(text: string, pattern: string, startIndex: number): boolean {
    for (let i = 0; i < pattern.length; i++) {
      if (text.charAt(startIndex + i) !== pattern.charAt(i)) {
        return false;
      }
    }
    return true;
  }
}

// Export a simple function for easy usage
export function rabinKarpSearch(text: string, pattern: string, base: number = 31, prime: number = 1000000007): number[] {
  const searcher = new RabinKarp(base, prime);
  return searcher.search(text, pattern);
}

// Example usage:
/*
const text = "hello world hello";
const pattern = "hello";
const positions = rabinKarpSearch(text, pattern);
console.log(`Pattern found at positions: ${positions}`); // Output: Pattern found at positions: 0,11
*/
// Simple usage
const searcher = new RabinKarp();
const positions = searcher.search("hello world", "world");
console.log(positions); // [6]

// Or use the utility function
const positions2 = rabinKarpSearch("banana", "ana");
console.log(positions2); // [1, 3]
