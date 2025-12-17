class BoyerMoore {
    /**
     * Preprocess the pattern to create bad character table
     */
    private preprocessBadCharacter(pattern: string): Map<string, number> {
        const table = new Map<string, number>();
        const patternLength = pattern.length;
        
        for (let i = 0; i < patternLength - 1; i++) {
            table.set(pattern[i], patternLength - 1 - i);
        }
        
        // Default value for characters not in pattern
        table.set('*', patternLength);
        
        return table;
    }

    /**
     * Preprocess the pattern to create good suffix table
     */
    private preprocessGoodSuffix(pattern: string): number[] {
        const patternLength = pattern.length;
        const table: number[] = new Array(patternLength).fill(0);
        const suffix: number[] = new Array(patternLength).fill(0);
        
        // Case 1: The matching suffix occurs somewhere else in the pattern
        let lastPrefixPosition = patternLength;
        for (let i = patternLength - 1; i >= 0; i--) {
            if (this.isPrefix(pattern, i + 1)) {
                lastPrefixPosition = i + 1;
            }
            suffix[i] = lastPrefixPosition + (patternLength - 1 - i);
        }
        
        // Case 2: The matching suffix has a border
        for (let i = 0; i < patternLength - 1; i++) {
            const suffixLength = this.suffixLength(pattern, i);
            table[patternLength - 1 - suffixLength] = patternLength - 1 - i + suffixLength;
        }
        
        return table;
    }

    /**
     * Check if pattern[start...end] is a prefix of the pattern
     */
    private isPrefix(pattern: string, start: number): boolean {
        for (let i = start, j = 0; i < pattern.length; i++, j++) {
            if (pattern[i] !== pattern[j]) {
                return false;
            }
        }
        return true;
    }

    /**
     * Return the length of the longest suffix ending at position i
     */
    private suffixLength(pattern: string, position: number): number {
        let length = 0;
        let i = position;
        let j = pattern.length - 1;
        
        while (i >= 0 && pattern[i] === pattern[j]) {
            length++;
            i--;
            j--;
        }
        
        return length;
    }

    /**
     * Search for pattern in text using Boyer-Moore algorithm
     */
    search(text: string, pattern: string): number[] {
        const results: number[] = [];
        const textLength = text.length;
        const patternLength = pattern.length;
        
        if (patternLength === 0 || textLength < patternLength) {
            return results;
        }

        const badCharTable = this.preprocessBadCharacter(pattern);
        const goodSuffixTable = this.preprocessGoodSuffix(pattern);
        
        let i = patternLength - 1;
        
        while (i < textLength) {
            let j = patternLength - 1;
            
            // Compare pattern with text from right to left
            while (j >= 0 && text[i] === pattern[j]) {
                i--;
                j--;
            }
            
            // Pattern found
            if (j < 0) {
                results.push(i + 1);
                i += patternLength + 1;
                continue;
            }
            
            // Calculate shift using bad character and good suffix rules
            const badCharShift = badCharTable.get(text[i]) || patternLength;
            const goodSuffixShift = goodSuffixTable[j];
            
            // Use the maximum shift
            i += Math.max(badCharShift, goodSuffixShift);
        }
        
        return results;
    }

    /**
     * Simplified version using only bad character rule (easier to implement)
     */
    searchSimple(text: string, pattern: string): number[] {
        const results: number[] = [];
        const textLength = text.length;
        const patternLength = pattern.length;
        
        if (patternLength === 0 || textLength < patternLength) {
            return results;
        }

        const badCharTable = this.preprocessBadCharacter(pattern);
        
        let i = 0;
        
        while (i <= textLength - patternLength) {
            let j = patternLength - 1;
            
            // Compare pattern with text from right to left
            while (j >= 0 && pattern[j] === text[i + j]) {
                j--;
            }
            
            // Pattern found
            if (j < 0) {
                results.push(i);
                i += patternLength;
            } else {
                // Shift based on bad character rule
                const char = text[i + j];
                const shift = badCharTable.get(char) || patternLength;
                i += Math.max(1, shift - (patternLength - 1 - j));
            }
        }
        
        return results;
    }
}

// Usage example
const bm = new BoyerMoore();

// Example usage
const text = "ABABDABACDABABCABAB";
const pattern = "ABABCABAB";

console.log("Text:", text);
console.log("Pattern:", pattern);

// Using the full algorithm
const results = bm.search(text, pattern);
console.log("Full algorithm results:", results);

// Using simplified version
const simpleResults = bm.searchSimple(text, pattern);
console.log("Simplified algorithm results:", simpleResults);

// Test with multiple occurrences
const text2 = "This is a test text with test pattern test";
const pattern2 = "test";
console.log("\nMultiple occurrences:");
console.log("Text:", text2);
console.log("Pattern:", pattern2);
console.log("Results:", bm.searchSimple(text2, pattern2));
interface BoyerMooreTable {
    badChar: Map<string, number>;
    goodSuffix: number[];
}

class OptimizedBoyerMoore {
    private buildBadCharacterTable(pattern: string): Map<string, number> {
        const table = new Map<string, number>();
        const length = pattern.length;
        
        for (let i = 0; i < length - 1; i++) {
            table.set(pattern[i], length - 1 - i);
        }
        
        return table;
    }

    private buildGoodSuffixTable(pattern: string): number[] {
        const length = pattern.length;
        const table = new Array(length).fill(length);
        const suffix = new Array(length).fill(0);
        
        // Precompute suffix array
        suffix[length - 1] = length;
        
        for (let i = length - 2; i >= 0; i--) {
            let j = i;
            while (j >= 0 && pattern[j] === pattern[length - 1 - i + j]) {
                j--;
            }
            suffix[i] = i - j;
        }
        
        // Build good suffix table
        for (let i = 0; i < length; i++) {
            if (suffix[i] === i + 1) {
                for (let j = 0; j < length - 1 - i; j++) {
                    if (table[j] === length) {
                        table[j] = length - 1 - i;
                    }
                }
            }
        }
        
        for (let i = 0; i < length - 1; i++) {
            table[length - 1 - suffix[i]] = Math.min(
                table[length - 1 - suffix[i]], 
                length - 1 - i
            );
        }
        
        return table;
    }

    preprocess(pattern: string): BoyerMooreTable {
        return {
            badChar: this.buildBadCharacterTable(pattern),
            goodSuffix: this.buildGoodSuffixTable(pattern)
        };
    }

    search(text: string, pattern: string): number[] {
        const results: number[] = [];
        const n = text.length;
        const m = pattern.length;
        
        if (m === 0 || n < m) return results;
        
        const { badChar, goodSuffix } = this.preprocess(pattern);
        
        let i = m - 1;
        
        while (i < n) {
            let j = m - 1;
            
            while (j >= 0 && text[i] === pattern[j]) {
                i--;
                j--;
            }
            
            if (j < 0) {
                results.push(i + 1);
                i += m + 1;
            } else {
                const badCharShift = badChar.get(text[i]) || m;
                const goodSuffixShift = goodSuffix[j];
                i += Math.max(badCharShift, goodSuffixShift);
            }
        }
        
        return results;
    }
}

// Alternative: Simple Boyer-Moore with only bad character rule
function boyerMooreSearch(text: string, pattern: string): number[] {
    const results: number[] = [];
    const n = text.length;
    const m = pattern.length;
    
    if (m === 0 || n < m) return results;
    
    // Build bad character table
    const badChar = new Map<string, number>();
    for (let i = 0; i < m - 1; i++) {
        badChar.set(pattern[i], m - 1 - i);
    }
    
    let i = 0;
    while (i <= n - m) {
        let j = m - 1;
        
        while (j >= 0 && pattern[j] === text[i + j]) {
            j--;
        }
        
        if (j < 0) {
            results.push(i);
            i += m;
        } else {
            const shift = badChar.get(text[i + j]) || m;
            i += Math.max(1, shift - (m - 1 - j));
        }
    }
    
    return results;
}

// Example usage
const text = "This is a test of the Boyer-Moore algorithm test";
const pattern = "test";

console.log("Text:", text);
console.log("Pattern:", pattern);
console.log("Positions:", boyerMooreSearch(text, pattern));
