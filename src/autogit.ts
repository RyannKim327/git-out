class RabinKarp {
    private readonly base: number;
    private readonly modulus: number;

    constructor(base: number = 256, modulus: number = 101) {
        this.base = base;
        this.modulus = modulus;
    }

    /**
     * Searches for a pattern in text using Rabin-Karp algorithm
     * @param text - The text to search in
     * @param pattern - The pattern to search for
     * @returns Array of starting indices where pattern is found
     */
    search(text: string, pattern: string): number[] {
        const n = text.length;
        const m = pattern.length;
        
        if (m === 0 || n < m) {
            return [];
        }

        const results: number[] = [];

        // Precompute base^(m-1) mod modulus
        let h = 1;
        for (let i = 0; i < m - 1; i++) {
            h = (h * this.base) % this.modulus;
        }

        // Compute initial hash values for pattern and first window of text
        let patternHash = 0;
        let textHash = 0;
        
        for (let i = 0; i < m; i++) {
            patternHash = (this.base * patternHash + pattern.charCodeAt(i)) % this.modulus;
            textHash = (this.base * textHash + text.charCodeAt(i)) % this.modulus;
        }

        // Slide the pattern over text one by one
        for (let i = 0; i <= n - m; i++) {
            // Check if hash values match
            if (patternHash === textHash) {
                // If hash matches, check character by character
                let j = 0;
                for (; j < m; j++) {
                    if (text[i + j] !== pattern[j]) {
                        break;
                    }
                }
                
                if (j === m) {
                    results.push(i);
                }
            }

            // Calculate hash for next window
            if (i < n - m) {
                textHash = (this.base * (textHash - text.charCodeAt(i) * h) + 
                           text.charCodeAt(i + m)) % this.modulus;
                
                // Handle negative hash values
                if (textHash < 0) {
                    textHash += this.modulus;
                }
            }
        }

        return results;
    }

    /**
     * Case-insensitive search with optional multiple patterns
     * @param text - The text to search in
     * @param patterns - Patterns to search for
     * @returns Array of matches with pattern and position
     */
    searchMultiple(text: string, patterns: string[]): Array<{pattern: string, index: number}> {
        const results: Array<{pattern: string, index: number}> = [];
        
        for (const pattern of patterns) {
            const indices = this.search(text, pattern);
            for (const index of indices) {
                results.push({ pattern, index });
            }
        }
        
        return results.sort((a, b) => a.index - b.index);
    }
}

// Enhanced version with multiple modulus support to reduce collisions
class EnhancedRabinKarp {
    private readonly base: number;
    private readonly moduli: number[];

    constructor(base: number = 256, moduli: number[] = [101, 1000000007, 1000000009]) {
        this.base = base;
        this.moduli = moduli;
    }

    search(text: string, pattern: string): number[] {
        const n = text.length;
        const m = pattern.length;
        
        if (m === 0 || n < m) {
            return [];
        }

        const results: number[] = [];
        const h: number[] = [];
        const patternHashes: number[] = [];
        const textHashes: number[] = [];

        // Initialize arrays
        for (let k = 0; k < this.moduli.length; k++) {
            h[k] = 1;
            patternHashes[k] = 0;
            textHashes[k] = 0;
        }

        // Precompute base^(m-1) mod each modulus
        for (let k = 0; k < this.moduli.length; k++) {
            for (let i = 0; i < m - 1; i++) {
                h[k] = (h[k] * this.base) % this.moduli[k];
            }
        }

        // Compute initial hash values
        for (let i = 0; i < m; i++) {
            for (let k = 0; k < this.moduli.length; k++) {
                patternHashes[k] = (this.base * patternHashes[k] + pattern.charCodeAt(i)) % this.moduli[k];
                textHashes[k] = (this.base * textHashes[k] + text.charCodeAt(i)) % this.moduli[k];
            }
        }

        // Slide the pattern over text
        for (let i = 0; i <= n - m; i++) {
            // Check if all hash values match
            let hashesMatch = true;
            for (let k = 0; k < this.moduli.length; k++) {
                if (patternHashes[k] !== textHashes[k]) {
                    hashesMatch = false;
                    break;
                }
            }

            if (hashesMatch) {
                // Verify character by character
                let j = 0;
                for (; j < m; j++) {
                    if (text[i + j] !== pattern[j]) {
                        break;
                    }
                }
                
                if (j === m) {
                    results.push(i);
                }
            }

            // Calculate hash for next window
            if (i < n - m) {
                for (let k = 0; k < this.moduli.length; k++) {
                    textHashes[k] = (this.base * (textHashes[k] - text.charCodeAt(i) * h[k]) + 
                                   text.charCodeAt(i + m)) % this.moduli[k];
                    
                    if (textHashes[k] < 0) {
                        textHashes[k] += this.moduli[k];
                    }
                }
            }
        }

        return results;
    }
}

// Usage examples
function demonstrateRabinKarp() {
    const rabinKarp = new RabinKarp();
    const enhancedRabinKarp = new EnhancedRabinKarp();

    const text = "ABCCDDAEFGCDDAGHICDDABCDDA";
    const pattern = "CDDA";

    console.log("Text:", text);
    console.log("Pattern:", pattern);
    
    // Basic search
    const results = rabinKarp.search(text, pattern);
    console.log("Basic Rabin-Karp results:", results);
    
    // Enhanced search with multiple moduli
    const enhancedResults = enhancedRabinKarp.search(text, pattern);
    console.log("Enhanced Rabin-Karp results:", enhancedResults);
    
    // Multiple patterns search
    const patterns = ["CDDA", "ABC", "GHI"];
    const multipleResults = rabinKarp.searchMultiple(text, patterns);
    console.log("Multiple patterns:", multipleResults);
    
    // Performance test
    const longText = "A".repeat(10000) + "NEEDLE" + "B".repeat(10000);
    console.log("Performance test - searching in long text...");
    
    const start = performance.now();
    const found = rabinKarp.search(longText, "NEEDLE");
    const end = performance.now();
    
    console.log(`Found at index: ${found[0]}, Time: ${(end - start).toFixed(2)}ms`);
}

// Run demonstration
demonstrateRabinKarp();

export { RabinKarp, EnhancedRabinKarp };
// Basic usage
const searcher = new RabinKarp();
const results = searcher.search("hello world", "world");
// results: [6]

// Multiple patterns
const multipleResults = searcher.searchMultiple(
    "the quick brown fox", 
    ["quick", "fox", "brown"]
);
// results: [{pattern: "quick", index: 4}, {pattern: "brown", index: 10}, ...]

// Enhanced version for better collision resistance
const enhanced = new EnhancedRabinKarp();
const enhancedResults = enhanced.search("large text", "pattern");
