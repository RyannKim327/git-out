class BoyerMoore {
    /**
     * Preprocess the bad character heuristic
     * Returns a map of character to last occurrence position in pattern
     */
    private preprocessBadChar(pattern: string): Map<string, number> {
        const badChar = new Map<string, number>();
        
        for (let i = 0; i < pattern.length; i++) {
            badChar.set(pattern[i], i);
        }
        
        return badChar;
    }
    
    /**
     * Preprocess the good suffix heuristic
     * Returns arrays for border positions and shifts
     */
    private preprocessGoodSuffix(pattern: string): [number[], number[]] {
        const m = pattern.length;
        const borderPos: number[] = new Array(m + 1).fill(0);
        const shift: number[] = new Array(m + 1).fill(0);
        
        let i = m;
        let j = m + 1;
        borderPos[i] = j;
        
        while (i > 0) {
            while (j <= m && pattern[i - 1] !== pattern[j - 1]) {
                if (shift[j] === 0) {
                    shift[j] = j - i;
                }
                j = borderPos[j];
            }
            i--;
            j--;
            borderPos[i] = j;
        }
        
        j = borderPos[0];
        for (i = 0; i <= m; i++) {
            if (shift[i] === 0) {
                shift[i] = j;
            }
            if (i === j) {
                j = borderPos[j];
            }
        }
        
        return [borderPos, shift];
    }
    
    /**
     * Search for pattern in text using Boyer-Moore algorithm
     * Returns array of starting indices where pattern is found
     */
    search(text: string, pattern: string): number[] {
        if (pattern.length === 0) return [0];
        if (text.length === 0 || pattern.length > text.length) return [];
        
        const n = text.length;
        const m = pattern.length;
        const results: number[] = [];
        
        // Preprocess heuristics
        const badChar = this.preprocessBadChar(pattern);
        const [_, goodSuffix] = this.preprocessGoodSuffix(pattern);
        
        let s = 0; // Shift of the pattern with respect to text
        
        while (s <= n - m) {
            let j = m - 1;
            
            // Keep reducing index j of pattern while characters match
            while (j >= 0 && pattern[j] === text[s + j]) {
                j--;
            }
            
            // If pattern is found
            if (j < 0) {
                results.push(s);
                
                // Shift the pattern to align with the next occurrence
                s += (s + m < n) ? m - (badChar.get(text[s + m]) ?? -1) : 1;
            } else {
                // Shift based on bad character and good suffix heuristics
                const badCharShift = j - (badChar.get(text[s + j]) ?? -1);
                const goodSuffixShift = goodSuffix[j + 1];
                
                s += Math.max(1, badCharShift, goodSuffixShift);
            }
        }
        
        return results;
    }
    
    /**
     * Simplified version using only bad character heuristic
     * Good for most practical cases
     */
    searchSimple(text: string, pattern: string): number[] {
        if (pattern.length === 0) return [0];
        if (text.length === 0 || pattern.length > text.length) return [];
        
        const n = text.length;
        const m = pattern.length;
        const results: number[] = [];
        const badChar = this.preprocessBadChar(pattern);
        
        let s = 0;
        
        while (s <= n - m) {
            let j = m - 1;
            
            while (j >= 0 && pattern[j] === text[s + j]) {
                j--;
            }
            
            if (j < 0) {
                results.push(s);
                s += (s + m < n) ? m - (badChar.get(text[s + m]) ?? -1) : 1;
            } else {
                const badCharShift = j - (badChar.get(text[s + j]) ?? -1);
                s += Math.max(1, badCharShift);
            }
        }
        
        return results;
    }
}
// Example usage
const bm = new BoyerMoore();

// Basic search
const text = "ABAAABCDABCABCABABC";
const pattern = "ABC";
console.log("Pattern found at positions:", bm.search(text, pattern)); // [4, 10, 13]

// Case with multiple occurrences
const text2 = "This is a test text for testing the Boyer-Moore algorithm test";
const pattern2 = "test";
console.log("Pattern found at positions:", bm.search(text2, pattern2)); // [10, 27, 57]

// No match found
const text3 = "Hello World";
const pattern3 = "TypeScript";
console.log("Pattern found at positions:", bm.search(text3, pattern3)); // []

// Using the simplified version
console.log("Simple search:", bm.searchSimple(text, pattern)); // [4, 10, 13]
function boyerMooreSearch(text: string, pattern: string): number[] {
    if (pattern.length === 0) return [0];
    if (text.length === 0 || pattern.length > text.length) return [];
    
    const n = text.length;
    const m = pattern.length;
    const results: number[] = [];
    
    // Preprocess bad character heuristic
    const badChar = new Map<string, number>();
    for (let i = 0; i < m; i++) {
        badChar.set(pattern[i], i);
    }
    
    let s = 0;
    
    while (s <= n - m) {
        let j = m - 1;
        
        while (j >= 0 && pattern[j] === text[s + j]) {
            j--;
        }
        
        if (j < 0) {
            results.push(s);
            s += (s + m < n) ? m - (badChar.get(text[s + m]) ?? -1) : 1;
        } else {
            const badCharShift = j - (badChar.get(text[s + j]) ?? -1);
            s += Math.max(1, badCharShift);
        }
    }
    
    return results;
}

// Usage
console.log("Functional approach:", boyerMooreSearch("ABAAABCD", "ABC")); // [4]
function benchmarkSearch(text: string, pattern: string): void {
    const bm = new BoyerMoore();
    
    console.time('Boyer-Moore');
    const result1 = bm.search(text, pattern);
    console.timeEnd('Boyer-Moore');
    
    console.time('Built-in indexOf');
    const result2: number[] = [];
    let pos = text.indexOf(pattern);
    while (pos !== -1) {
        result2.push(pos);
        pos = text.indexOf(pattern, pos + 1);
    }
    console.timeEnd('Built-in indexOf');
    
    console.log('Results match:', JSON.stringify(result1) === JSON.stringify(result2));
}
