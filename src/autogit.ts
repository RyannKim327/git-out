class BoyerMoore {
  private pattern: string;
  private patternLength: number;
  private badCharTable: Map<number, number>;
  private goodSuffixTable: number[];

  constructor(pattern: string) {
    this.pattern = pattern;
    this.patternLength = pattern.length;
    this.badCharTable = new Map();
    this.goodSuffixTable = new Array(this.patternLength).fill(0);
    this.preprocessBadCharacter();
    this.preprocessGoodSuffix();
  }

  private preprocessBadCharacter(): void {
    for (let i = 0; i < this.patternLength; i++) {
      this.badCharTable.set(this.pattern.charCodeAt(i), this.patternLength - 1 - i);
    }
  }

  private preprocessGoodSuffix(): void {
    // Preprocess for strong good suffix rule
    const suffixes = this.computeSuffixes();
    
    // Case 1: The matching suffix appears elsewhere in the pattern
    for (let i = 0; i < this.patternLength; i++) {
      this.goodSuffixTable[i] = this.patternLength;
    }

    // Case 2: The matching suffix has a prefix that matches a suffix of the pattern
    let j = 0;
    for (let i = this.patternLength - 1; i >= 0; i--) {
      if (suffixes[i] === i + 1) {
        for (; j < this.patternLength - 1 - i; j++) {
          if (this.goodSuffixTable[j] === this.patternLength) {
            this.goodSuffixTable[j] = this.patternLength - 1 - i;
          }
        }
      }
    }

    // Case 3: If there's no match, shift by the pattern length
    for (let i = 0; i <= this.patternLength - 2; i++) {
      this.goodSuffixTable[this.patternLength - 1 - suffixes[i]] = this.patternLength - 1 - i;
    }
  }

  private computeSuffixes(): number[] {
    const suffixes = new Array(this.patternLength).fill(0);
    suffixes[this.patternLength - 1] = this.patternLength;
    
    let f = 0, g = this.patternLength - 1;
    for (let i = this.patternLength - 2; i >= 0; i--) {
      if (i > g && suffixes[i + this.patternLength - 1 - f] < i - g) {
        suffixes[i] = suffixes[i + this.patternLength - 1 - f];
      } else {
        g = Math.min(i, g);
        f = i;
        while (g >= 0 && this.pattern[g] === this.pattern[g + this.patternLength - 1 - f]) {
          g--;
        }
        suffixes[i] = f - g;
      }
    }
    
    return suffixes;
  }

  public search(text: string): number[] {
    const matches: number[] = [];
    let n = text.length;
    let m = this.patternLength;
    
    let i = 0;
    while (i <= n - m) {
      let j = m - 1;
      
      // Find mismatch
      while (j >= 0 && this.pattern[j] === text[i + j]) {
        j--;
      }
      
      if (j < 0) {
        // Found a match
        matches.push(i);
        i += this.goodSuffixTable[0];
      } else {
        const badCharShift = this.badCharTable.get(text.charCodeAt(i + j)) ?? m;
        const goodSuffixShift = this.goodSuffixTable[j];
        i += Math.max(goodSuffixShift, badCharShift);
      }
    }
    
    return matches;
  }
}

// Usage example:
const pattern = "example";
const bm = new BoyerMoore(pattern);
const text = "This is an example text with example pattern";
const results = bm.search(text);
console.log("Pattern found at indices:", results);
